export interface ParishPastoralCouncil {
  id: number;
  documentId: string;
  sNo: number;
  name: string;
  association: string;
  position: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface Meta {
  pagination: Pagination;
}

interface ParishPastoralCouncilData {
  data: ParishPastoralCouncil[];
  meta: Meta;
}

export type { ParishPastoralCouncilData };