export type ReligiousVocationRole = "priest" | "nun";

export interface ReligiousVocationImage {
  url: string;
  width?: number;
  height?: number;
}

export interface ReligiousVocation {
  id: number;
  documentId?: string;
  name_en: string;
  name_kok?: string | null;
  role: ReligiousVocationRole;
  ward: string;
  congregation_eng: string;
  congregation_kok?: string | null;
  parents_eng?: string | null;
  parents_kok?: string | null;
  dob?: string | null;
  dod?: string | null;
  image?: ReligiousVocationImage | null;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface ReligiousVocationData {
  data: ReligiousVocation[];
  meta?: unknown;
}
