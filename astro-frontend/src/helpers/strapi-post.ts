interface StrapiPostProps {
  endpoint: `/${string}`;
  body?: Record<string, any>;
}

/**
 * Makes a POST request to the Strapi API
 * @param endpoint - The endpoint to POST to (must begin with a forward slash and exclude the `/api` prefix)
 * @param body - Optional JSON body
 * @returns
 * @example
 * const data = await strapiPost({
 *   endpoint: '/events/my-event-slug/like',
 *   body: {},
 * });
 */
export async function strapiPost<T>({
  endpoint,
  body = {},
}: StrapiPostProps): Promise<T | undefined> {
  if (!import.meta.env.STRAPI_URL) {
    throw new Error("Strapi Base URL not found!");
  }

  const url = new URL(`/api${endpoint}`, import.meta.env.STRAPI_URL);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error(`Failed to POST to ${endpoint}: ${res.statusText}`);
  }

  const data = (await res.json()) as unknown as T;
  return data;
}
