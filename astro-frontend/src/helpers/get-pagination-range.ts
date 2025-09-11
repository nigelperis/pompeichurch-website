import { PAGINATION_BETWEEN_COUNT } from "~/constants/index.ts";

export const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  siblingCount: number = PAGINATION_BETWEEN_COUNT,
) => {
  const range: (number | string)[] = [];

  range.push(1);

  if (currentPage - siblingCount > 2) {
    range.push("...");
  }

  for (
    let i = Math.max(2, currentPage - siblingCount);
    i <= Math.min(totalPages - 1, currentPage + siblingCount);
    i++
  ) {
    range.push(i);
  }

  if (currentPage + siblingCount < totalPages - 1) {
    range.push("...");
  }

  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
};
