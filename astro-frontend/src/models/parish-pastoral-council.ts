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

interface ParishPastoralCouncilData {
  data: ParishPastoralCouncil[];
  meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

export type { ParishPastoralCouncilData };