import { listObituaries } from "./list-obituaries";

/**
 * Searches for obituaries based on the given query.
 * The query is searched in the following fields:
 * - konkaniName (Konkani name)
 * - englishName (English name)
 * - age (age)
 * - relationNameEn (English relationship name)
 * - relationNameKok (Konkani relationship name)
 * If the query is empty or less than 2 characters, an empty array is returned.
 * @param {string} query - The query to search for.
 * @returns {Promise<Obituary[]>} A promise that resolves to an array of obituaries.
 */
export async function searchObituaries(query: string) {
  if (!query || query.length < 2) {
    return [];
  }

  const filters = {
    $or: [
      { konkaniName: { $containsi: query } },
      { englishName: { $containsi: query } },
      { age: { $containsi: query } },
      { relationNameEn: { $containsi: query } },
      { relationNameKok: { $containsi: query } },
    ],
  };

  const { obituaries } = await listObituaries({
    page: 1,
    pageSize: 10,
    filters,
  });

  return obituaries;
}
