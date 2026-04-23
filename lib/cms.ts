import { CMSPost, PayloadListResponse } from '@/types/cms'

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL

if (!CMS_URL) {
  throw new Error('Missing NEXT_PUBLIC_CMS_URL in environment variables')
}

function buildURL(path: string) {
  return `${CMS_URL}${path}`
}

export function getMediaURL(path?: string | null) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${CMS_URL}${path}`
}

export function getCategoryLabel(category: CMSPost['category']) {
  switch (category) {
    case 'Newsflash':
      return '快訊'
    case 'Report':
      return '報導'
    case 'Sponsor':
      return '贊助'
    case 'Column':
      return '專欄'
    case 'Interview':
      return '專訪'
    default:
      return category
  }
}

export async function getPosts(): Promise<CMSPost[]> {
  const url = buildURL('/api/posts?depth=1&sort=-publishedAt')

  const res = await fetch(url, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`)
  }

  const data: PayloadListResponse<CMSPost> = await res.json()
  return data.docs
}

export async function getPostBySlug(slug: string): Promise<CMSPost | null> {
  const url = buildURL(
    `/api/posts?where[slug][equals]=${encodeURIComponent(slug)}&depth=1&limit=1`
  )

  const res = await fetch(url, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.status}`)
  }

  const data: PayloadListResponse<CMSPost> = await res.json()
  return data.docs[0] ?? null
}
