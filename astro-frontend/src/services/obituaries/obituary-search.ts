import type { Obituary } from "~/models/obituary";
import { createFuzzySearch } from "~/services/search/fuzzy-search";
import { listObituaries } from "./list-obituaries";

const fuzzyObituarySearch = createFuzzySearch<Obituary>({
  keys: [
    "konkaniName",
    "englishName",
    "age",
    "relationNameEn",
    "relationNameKok",
  ],
  loadPage: async (page, pageSize) => {
    const result = await listObituaries({ page, pageSize });
    return {
      items: result.obituaries,
      pageCount: result.pagination.pageCount,
    };
  },
});

export function searchObituaries(query: string) {
  return fuzzyObituarySearch(query);
}
