import Fuse, { type FuseResultMatch } from "fuse.js";

export interface FuzzySearchResult<T> {
  item: T;
  matches: readonly FuseResultMatch[];
}

interface SearchPage<T> {
  items: T[];
  pageCount: number;
}

interface FuzzySearchOptions<T extends object> {
  keys: readonly (keyof T & string)[];
  loadPage: (
    page: number,
    pageSize: number,
    scope?: string,
  ) => Promise<SearchPage<T>>;
  pageSize?: number;
  resultLimit?: number;
  cacheTtlMs?: number;
  threshold?: number;
}

interface CachedSearchIndex<T> {
  expiresAt: number;
  promise: Promise<Fuse<T>>;
}

export function createFuzzySearch<T extends object>({
  keys,
  loadPage,
  pageSize = 100,
  resultLimit = 10,
  cacheTtlMs = 60_000,
  threshold = 0.35,
}: FuzzySearchOptions<T>) {
  const searchIndexes = new Map<string, CachedSearchIndex<T>>();

  async function loadItems(scope?: string): Promise<T[]> {
    const firstPage = await loadPage(1, pageSize, scope);
    if (firstPage.pageCount <= 1) return firstPage.items;

    const remainingPages = await Promise.all(
      Array.from({ length: firstPage.pageCount - 1 }, async (_, index) =>
        (await loadPage(index + 2, pageSize, scope)).items,
      ),
    );

    return firstPage.items.concat(...remainingPages);
  }

  function getSearchIndex(scope?: string): Promise<Fuse<T>> {
    const cacheKey = scope ?? "";
    const cachedIndex = searchIndexes.get(cacheKey);

    if (cachedIndex && cachedIndex.expiresAt > Date.now()) {
      return cachedIndex.promise;
    }

    const promise = loadItems(scope).then(
      (items) =>
        new Fuse<T>(items, {
          keys: [...keys],
          threshold,
          ignoreLocation: true,
          minMatchCharLength: 2,
          includeMatches: true,
        }),
    );

    searchIndexes.set(cacheKey, {
      expiresAt: Date.now() + cacheTtlMs,
      promise,
    });

    void promise.catch(() => {
      if (searchIndexes.get(cacheKey)?.promise === promise) {
        searchIndexes.delete(cacheKey);
      }
    });

    return promise;
  }

  return async function search(
    query: string,
    scope?: string,
  ): Promise<FuzzySearchResult<T>[]> {
    const normalizedQuery = query.trim().replace(/\s+/g, " ");
    if (normalizedQuery.length < 2) return [];

    const searchIndex = await getSearchIndex(scope);

    return searchIndex
      .search(normalizedQuery)
      .slice(0, resultLimit)
      .map(({ item, matches }) => ({
        item,
        matches: matches ?? [],
      }));
  };
}
