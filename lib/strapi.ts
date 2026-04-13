const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

export function getStrapiURL(path = ""): string {
  return `${STRAPI_URL}${path}`;
}

export async function fetchAPI<T>(path: string): Promise<T> {
  const response = await fetch(getStrapiURL(path), {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
