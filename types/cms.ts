export type CMSMedia = {
  id: number | string
  alt?: string | null
  url?: string | null
  filename?: string | null
}

export type CMSTag = {
  id: number | string
  name: string
  slug: string
}

export type CMSPost = {
  id: number | string
  title: string
  slug: string
  category: 'Newsflash' | 'Report' | 'Sponsor' | 'Column' | 'Interview'
  publishedAt?: string | null
  content?: unknown
  thumbnail?: CMSMedia | number | string | null
  tags?: CMSTag[] | (number | string)[] | null
}

export type PayloadListResponse<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
