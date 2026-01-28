import { listObituaries } from "./list-obituaries";

export async function searchObituaries(query: string) {
  if (!query || query.length < 2) {
    return [];
  }

  const filters = {
    $or: [
      { konkaniName: { $containsi: query } },
      { englishName: { $containsi: query } },
    ],
  };

  const { obituaries } = await listObituaries({
    page: 1,
    pageSize: 10,
    filters,
  });

  return obituaries;
}
