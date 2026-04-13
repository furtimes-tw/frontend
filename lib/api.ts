import qs from "qs";
import { fetchAPI } from "./strapi";
import type { Post, StrapiListResponse } from "@/types/post";

export async function getPosts() {
  const query = qs.stringify(
    {
      fields: ["title", "content", "category", "published", "publishedAt", "createdAt", "updatedAt"],
      sort: ["publishedAt:desc"],
      pagination: {
        pageSize: 10,
      },
    },
    { encodeValuesOnly: true }
  );

  return fetchAPI<StrapiListResponse<Post>>(`/api/posts?${query}`);
}
