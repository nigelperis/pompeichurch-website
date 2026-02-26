import { ReligiousVocationRole } from "~/enums/religious-vocation-role";

export interface ReligiousVocationImage {
  url: string;
  width?: number;
  height?: number;
}

export interface ReligiousVocation {
  id: number;
  documentId?: string;
  englishName: string;
  konkaniName?: string | null;
  role: ReligiousVocationRole;
  ward: string;
  englishCongregationName: string;
  konkaniCongregationName?: string | null;
  englishParentsName?: string | null;
  konkaniParentsName?: string | null;
  dateOfBirth?: string | null;
  dateofDeath?: string | null;
  image?: ReligiousVocationImage | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
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

export interface ReligiousVocationData {
  data: ReligiousVocation[];
  meta?: Meta;
}
