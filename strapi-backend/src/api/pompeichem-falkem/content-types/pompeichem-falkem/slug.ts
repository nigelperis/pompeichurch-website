type PompeichemFalkemEntry = {
  dateOfPublish?: string | null;
  magazineTitle?: string | null;
  slug?: string | null;
  specialEditionTitle?: string | null;
};

export function getPompeichemFalkemSlug(
  entry: PompeichemFalkemEntry | null | undefined,
): string {
  const base = slugifyMagazinePart(getMagazineSlugTitle(entry));
  const year = getMagazinePublishYear(entry?.dateOfPublish);

  if (base && year) return `${base}-${year}`;
  return base || year || "pompeichem-falkem";
}

export function assignPompeichemFalkemSlug(
  entry: PompeichemFalkemEntry | null | undefined,
): string {
  const slug = getPompeichemFalkemSlug(entry);

  if (entry) {
    entry.slug = slug;
  }

  return slug;
}

function getMagazineSlugTitle(
  entry: PompeichemFalkemEntry | null | undefined,
): string {
  const specialTitle = (entry?.specialEditionTitle ?? "").trim();
  if (specialTitle) return specialTitle;

  return (entry?.magazineTitle ?? "").trim();
}

function getMagazinePublishYear(
  dateOfPublish: string | null | undefined,
): string {
  const date = new Date(dateOfPublish ?? "");
  return Number.isNaN(date.getTime()) ? "" : String(date.getFullYear());
}

function slugifyMagazinePart(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
