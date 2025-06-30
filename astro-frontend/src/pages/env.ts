import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  return new Response(`What is env: ${import.meta.env.PUBLIC_ENVIRONMENT}`);
};
