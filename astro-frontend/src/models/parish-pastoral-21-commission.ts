import { Locale } from "~/enums/locale";

export interface SubCommission {
  id: number;
  title: string;
  secretary: string;
}

export interface CommissionBlock {
  id: number;
  commissionTitle: string;
  convenor: string;
  subCommissions: SubCommission[];
}

export interface CoordinatorName {
  id: number;
  name: string;
  position: string;
  locale: Locale;
}

interface ParishPastoral21Commission {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: Locale;
  coordinatorName: CoordinatorName[];
  commissions: CommissionBlock[];
}

interface ParishPastoral21CommissionData {
  data: ParishPastoral21Commission[];
  meta: {};
}

export type { ParishPastoral21Commission, ParishPastoral21CommissionData };
