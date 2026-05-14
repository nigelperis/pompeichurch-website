type PompeichemFalkemEntry = {
  dateOfPublish?: string | null;
  documentId?: string | null;
  id?: number | null;
  magazineTitle?: string | null;
  slug?: string | null;
  specialEditionTitle?: string | null;
};

const CONTENT_TYPE_UID = "api::pompeichem-falkem.pompeichem-falkem";

export function getPompeichemFalkemSlug(
  entry: PompeichemFalkemEntry | null | undefined,
): string {
  const base = slugifyMagazinePart(getMagazineSlugTitle(entry));
  const year = getMagazinePublishYear(entry);

  if (base && year) return `${base}-${year}`;
  return base || year || "pompeichem-falkem";
}

export async function assignPompeichemFalkemSlug(
  strapi: any,
  entry: PompeichemFalkemEntry | null | undefined,
  current?: Pick<PompeichemFalkemEntry, "documentId" | "id">,
): Promise<string> {
  if (entry?.magazineTitle) {
    entry.magazineTitle = normalizeMagazineTitle(entry.magazineTitle);
  }

  const slug = await findAvailablePompeichemFalkemSlug(
    strapi,
    getPompeichemFalkemSlug(entry),
    current,
  );

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

  return normalizeMagazineTitle(entry?.magazineTitle);
}

function getMagazinePublishYear(
  entry: PompeichemFalkemEntry | null | undefined,
): string {
  const date = new Date(entry?.dateOfPublish ?? "");
  return Number.isNaN(date.getTime()) ? "" : String(date.getFullYear());
}

function slugifyMagazinePart(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeMagazineTitle(value: string | null | undefined): string {
  return (value ?? "").trim().replace(/\bissue\b/gi, "Edition");
}

async function findAvailablePompeichemFalkemSlug(
  strapi: any,
  baseSlug: string,
  current?: Pick<PompeichemFalkemEntry, "documentId" | "id">,
): Promise<string> {
  const rootSlug = baseSlug || "pompeichem-falkem";

  for (let suffix = 1; ; suffix++) {
    const candidate = suffix === 1 ? rootSlug : `${rootSlug}-${suffix}`;
    const existing = (await strapi.db.query(CONTENT_TYPE_UID).findOne({
      where: { slug: candidate },
      select: ["id", "documentId"],
    })) as Pick<PompeichemFalkemEntry, "documentId" | "id"> | null;

    if (!existing || isCurrentEntry(existing, current)) {
      return candidate;
    }
  }
}

function isCurrentEntry(
  existing: Pick<PompeichemFalkemEntry, "documentId" | "id"> | null | undefined,
  current: Pick<PompeichemFalkemEntry, "documentId" | "id"> | null | undefined,
): boolean {
  if (!existing || !current) return false;
  if (existing.documentId && current.documentId) {
    return existing.documentId === current.documentId;
  }
  if (existing.id && current.id) {
    return existing.id === current.id;
  }
  return false;
}
