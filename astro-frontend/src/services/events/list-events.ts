import { strapiFetch } from "~/helpers/strapi-fetch";
import type { Event, EventData } from '~/models/event';


interface EventsPagination {
	events: Event[];
	pagination: {
		total: number;
		page: number;
		pageSize: number;
		pageCount: number;
	};
}

async function listEvents(args?: {
  page?: number;
  pageSize?: number;
  sortBy?: string[];
  filters?: Record<string, any>;
}): Promise<EventsPagination> {
  const { page = 1, pageSize = 25, sortBy = ['eventDate:desc'], filters } = args ?? {};
  const endpoint = '/events';

  const queryParams = new URLSearchParams({
		'populate[0]': 'eventImage',
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
  });

  sortBy.forEach((s, i) => queryParams.append(`sort[${i}]`, s));

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([op, val]) => {
          queryParams.append(`filters[${key}][${op}]`, String(val));
        });
      } else {
        queryParams.append(`filters[${key}]`, String(value));
      }
    });
  }

  const data = await strapiFetch<EventData>({ endpoint, queryParams });

  return {
    events: data?.data ?? [],
    pagination: data?.meta?.pagination ?? {
      total: 0,
      page,
      pageSize,
      pageCount: 0,
    },
  };
}


export { listEvents };