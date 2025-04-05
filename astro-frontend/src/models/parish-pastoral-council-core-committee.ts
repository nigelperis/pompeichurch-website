import type { BlocksContent } from '@strapi/blocks-react-renderer';
import { Locale } from '~/enums/locale';

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
}

interface Media {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}

 interface PastoralCoreCommittee {
  id: number;
  documentId: string;
  sNo: number;
  image: Media;
  name: string;
  position: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: Locale;
}

interface PastoralCoreCommitteeData{
  data: PastoralCoreCommittee[];
  meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

export type { PastoralCoreCommittee, PastoralCoreCommitteeData };
