import type { Locale } from "~/enums/locale";

export interface ContactInfo {
  id: number;
  documentId: string;
  secretaryName: string;
  email: string;
  contactNumber: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: Locale;
}

interface ContactDetails {
  data: ContactInfo;
  meta: Record<string, unknown>;
}

export type { ContactDetails };
