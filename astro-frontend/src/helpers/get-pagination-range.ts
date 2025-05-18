export const getPaginationRange = (currentPage: number, totalPages: number) => {
  const range = [];
  const delta = 2;

  range.push(1);

  if (currentPage - delta > 2) {
    range.push("...");
  }

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage + delta < totalPages - 1) {
    range.push("...");
  }

  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
};
