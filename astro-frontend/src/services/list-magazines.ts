import { ROUTES } from "~/constants/strapi-endpoints";
import { strapiFetch } from "~/helpers/strapi-fetch";
import type {
  PompeichemFalkem,
  PompeichemFalkemData,
} from "~/models/pompeichem-falkem";

type ListMagazinesArgs = {
  page?: number;
  pageSize?: number;
  slug?: string;
  sortBy?: string;
  year?: number | string;
};

type ListMagazinesResult = {
  magazines: PompeichemFalkem[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
};

const DEFAULT_SORT = "dateOfPublish:desc";
async function listMagazines(
  args?: ListMagazinesArgs,
): Promise<ListMagazinesResult> {
  const {
    page = 1,
    pageSize = 25,
    slug,
    sortBy = DEFAULT_SORT,
    year,
  } = args ?? {};

  const queryParams = buildMagazineQueryParams({
    page,
    pageSize,
    slug,
    sortBy,
    year,
  });

  const data = await strapiFetch<PompeichemFalkemData>({
    endpoint: ROUTES.POMPEICHEM_FALKEM,
    queryParams,
  });

  return {
    magazines: data?.data ?? [],
    pagination:
      data?.meta?.pagination ??
      ({ total: 0, page, pageSize, pageCount: 0 } as const),
  };
}

async function getMagazineBySlug(
  slug: string,
): Promise<PompeichemFalkem | undefined> {
  if (!slug) return undefined;

  const { magazines } = await listMagazines({
    page: 1,
    pageSize: 1,
    slug,
  });

  return magazines[0];
}

export { getMagazineBySlug, listMagazines };

function buildMagazineQueryParams({
  page,
  pageSize,
  slug,
  sortBy,
  year,
}: Required<Pick<ListMagazinesArgs, "page" | "pageSize" | "sortBy">> &
  Pick<ListMagazinesArgs, "slug" | "year">): URLSearchParams {
  const queryParams = new URLSearchParams({
    "populate[0]": "coverImage",
    "populate[1]": "pdfFile",
    "sort[0]": sortBy,
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
  });

  const parsedYear = typeof year === "string" ? parseInt(year, 10) : year;
  if (typeof parsedYear === "number" && !Number.isNaN(parsedYear)) {
    queryParams.set("filters[dateOfPublish][$gte]", `${parsedYear}-01-01`);
    queryParams.set("filters[dateOfPublish][$lte]", `${parsedYear}-12-31`);
  }

  if (slug) {
    queryParams.set("filters[slug][$eq]", slug);
  }

  return queryParams;
}
