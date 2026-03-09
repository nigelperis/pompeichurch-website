import { parseDateOnly } from "./get-funeral-details";

/**
 * Formats an ISO date string (YYYY-MM-DD) to DD-MM-YYYY format.
 * Returns undefined if the input date is null, undefined, or invalid.
 *
 * @param {string | null | undefined} isoDate - The ISO date string to format
 * @returns {string | undefined} The formatted date string in DD-MM-YYYY format, or undefined if input is invalid
 *
 * @example
 * formatDate("2023-12-25") // returns "25-12-2023"
 * formatDate(null) // returns undefined
 */
export function formatDate(
  isoDate: string | null | undefined,
): string | undefined {
  const dateObj = parseDateOnly(isoDate);
  if (!dateObj) return undefined;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(dateObj)
    .replace(/\//g, "-");
}
