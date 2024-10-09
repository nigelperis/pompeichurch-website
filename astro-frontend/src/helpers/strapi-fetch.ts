interface Props {
	endpoint: string;
	query?: Record<string, string>;
	wrappedByKey?: string;
	wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from (withouth inclusion of api suffix)
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 * @example  strapiFetch({
		endpoint: '/landing-page-priest-message',
		query: {
			'populate[0]': 'signature',
			'populate[1]': 'coverImage',
			'populate[2]': 'parish_priest',
		},
		wrappedByKey: 'data',
	});
 */
export async function strapiFetch<T>({
	endpoint,
	query,
	wrappedByKey,
	wrappedByList,
}: Props): Promise<T> {
	if (endpoint.startsWith('/')) {
		endpoint = endpoint.slice(1);
	}

	const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

	if (query) {
		Object.entries(query).forEach(([key, value]) => {
			url.searchParams.append(key, value);
		});
	}

	const res = await fetch(url.toString());
	let data = await res.json();

	if (wrappedByKey) {
		data = data[wrappedByKey];
	}

	if (wrappedByList) {
		data = data[0];
	}

	return data as T;
}
