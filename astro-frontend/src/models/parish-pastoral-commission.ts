import { Locale } from "~/enums/locale";
import type { PastoralCoreCommittee } from "~/models/parish-pastoral-council";

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface Media {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SubCommission {
  id: number;
  title: string;
  secretary: string;
}

export interface CommissionBlock {
  id: number;
  commissionTitle: string;
  convenorName: string;
  convenorSex: string;
  convenorImage: Media;
  subCommissions: SubCommission[];
}

interface ParishPastoralCommission {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: Locale;
  commissionsTitle: string;
  totalCommissions: number;
  coordinatorName: PastoralCoreCommittee;
  commissions: CommissionBlock[];
}

interface ParishPastoralCommissionData {
  data: ParishPastoralCommission[];
  meta: {};
}

export type { ParishPastoralCommission, ParishPastoralCommissionData };
