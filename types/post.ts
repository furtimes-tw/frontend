export interface PostContentTextNode {
  text?: string;
  type: string;
}

export interface PostContentNode {
  type: string;
  children?: PostContentTextNode[];
}

export interface Post {
  id: number;
  documentId: string;
  title: string;
  content?: PostContentNode[];
  category?: string | null;
  published?: string | null;
  publishedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
