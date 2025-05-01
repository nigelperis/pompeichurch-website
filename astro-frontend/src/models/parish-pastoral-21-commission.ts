import { Locale } from "~/enums/locale";

export interface SubCommission {
  id: number;
  title?: string;
  secretary?: string;
}

export interface CommissionBlock {
  id: number;
  commissionTitle?: string;
  convenor?: string;
  subCommissions?: SubCommission[];
}

interface ParishPastoral21Commission {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: Locale;
  sNo: number;
  commission: CommissionBlock[];
}

interface ParishPastoral21CommissionData {
  data: ParishPastoral21Commission[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type { ParishPastoral21Commission, ParishPastoral21CommissionData };