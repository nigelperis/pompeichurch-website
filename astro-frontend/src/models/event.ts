/**
 *
* Prompt used in deepseek R1 to generate this schema
				Generate TypeScript interfaces from this Strapi v5 response structure and attached schema file. Follow these requirements:

				FILE: schema-definition.json (Uploaded Strapi v5 schema)

				RULES:
				1. Required Fields:
					- These fields MUST be required if present:
						* id
						* documentId
						* createdAt
						* updatedAt
						* publishedAt
					- All other fields optional unless schema explicitly marks required

				2. Component Handling:
					- Use `BlocksContent` for rich text blocks:
						`import type { BlocksContent } from '@strapi/blocks-react-renderer'`
					- Create separate interfaces for components/nested objects
					- Maintain original content structure relationships

				3. Timestamp Enforcement:
					- Always include as non-nullable strings when present:
						createdAt: string;
						updatedAt: string;
						publishedAt: string;

				4. Interface Organization:
					- Break complex objects into individual interfaces
					- Use interface composition for reusable components
					- Avoid monolithic single interfaces

				5. Output Format:
					- Only show final TypeScript code
					- Include required imports
					- No comments/explanations
					- Proper indentation and type safety

				Example Response Structure:
				\<PASTE_JSON_RESPONSE_HERE\>

 */
import type { BlocksContent } from "@strapi/blocks-react-renderer";

interface EventImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    large: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

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

interface Event {
  id: number;
  slug: string;
  documentId: string;
  konkaniTitle: string;
  englishTitle: string;
  eventDate: string;
  shortDescription: string;
  description: BlocksContent;
  facebookLink: string;
  instagramLink: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  eventImage: EventImage;
}

interface EventData {
  data: Event[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface EventsPagination {
  events: Event[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

export type { Event, EventData, EventsPagination };
