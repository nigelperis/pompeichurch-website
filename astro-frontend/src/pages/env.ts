import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  return new Response(`${import.meta.env.PUBLIC_ENVIRONMENT}`);
};