import type { ReactNode } from "react";

export function highlightSearchMatches(
  text: string,
  indices: readonly (readonly [number, number])[],
): ReactNode {
  if (!indices.length) return text;

  const ranges = indices
    .map(([start, end]) => [
      Math.max(0, start),
      Math.min(text.length - 1, end),
    ] as [number, number])
    .filter(([start, end]) => start <= end)
    .sort(([firstStart], [secondStart]) => firstStart - secondStart);

  const mergedRanges: [number, number][] = [];
  for (const [start, end] of ranges) {
    const previous = mergedRanges[mergedRanges.length - 1];
    if (previous && start <= previous[1] + 1) {
      previous[1] = Math.max(previous[1], end);
    } else {
      mergedRanges.push([start, end]);
    }
  }

  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const [start, end] of mergedRanges) {
    if (cursor < start) parts.push(text.slice(cursor, start));
    parts.push(
      <mark key={`${start}-${end}`} className="bg-natgeo-yellow">
        {text.slice(start, end + 1)}
      </mark>,
    );
    cursor = end + 1;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}
