import type { BlocksContent } from '@strapi/blocks-react-renderer';
import type { Locale } from '~/enums/locale';

export interface PopesIntention {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: Locale;
  month?: string;
  monthlyIntention?: BlocksContent;
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

export interface PopesIntentionsResponse {
  data: PopesIntention;
  meta: Meta;
}