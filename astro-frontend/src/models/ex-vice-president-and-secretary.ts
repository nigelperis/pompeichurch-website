import { ExOfficeBearersRole } from "~/enums/ex-office-bearers-role";

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

interface Image {
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

interface Terms {
  termNo: number;
  startDate: string;
  endDate: string;
}

interface ExVicePresidentsAndSecretaries {
  id: number;
  documentId: string;
  nameEn: string;
  nameKok: string;
  terms?: Terms[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: Image;
  role: ExOfficeBearersRole;
}

interface ExVicePresidentsAndSecretariesData {
  data: ExVicePresidentsAndSecretaries[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
export type {
  ExVicePresidentsAndSecretaries,
  ExVicePresidentsAndSecretariesData,
};
