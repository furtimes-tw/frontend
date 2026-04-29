import {
  CMSAnnouncement,
  CMSPost,
  CMSPostCategory,
  CMSSponsor,
  CMSTag,
  PayloadListResponse,
} from '@/types/cms'

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

export function getCategoryLabel(category: CMSPostCategory) {
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

export function isValidCategory(value: string): value is CMSPostCategory {
  return ['Newsflash', 'Report', 'Sponsor', 'Column', 'Interview'].includes(value)
}

export function formatDate(dateString?: string | null) {
  if (!dateString) return '未設定發布時間'

  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(dateString))
}

async function fetchCMS<T>(path: string, revalidate = 60): Promise<T> {
  const res = await fetch(buildURL(path), {
    next: { revalidate },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch CMS data: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export async function getPosts(limit = 12): Promise<CMSPost[]> {
  const data = await fetchCMS<PayloadListResponse<CMSPost>>(
    `/api/posts?depth=2&sort=-publishedAt&limit=${limit}`
  )
  return data.docs
}

export async function getPostBySlug(slug: string): Promise<CMSPost | null> {
  const data = await fetchCMS<PayloadListResponse<CMSPost>>(
    `/api/posts?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`
  )
  return data.docs[0] ?? null
}

export async function getPostsByCategory(
  category: CMSPostCategory,
  limit = 12
): Promise<CMSPost[]> {
  const data = await fetchCMS<PayloadListResponse<CMSPost>>(
    `/api/posts?where[category][equals]=${encodeURIComponent(category)}&depth=2&sort=-publishedAt&limit=${limit}`
  )
  return data.docs
}

export async function getPostsByTagSlug(
  slug: string,
  limit = 24
): Promise<CMSPost[]> {
  const tag = await getTagBySlug(slug)

  if (!tag) return []

  const data = await fetchCMS<PayloadListResponse<CMSPost>>(
    `/api/posts?where[tags][in]=${encodeURIComponent(String(tag.id))}&depth=2&sort=-publishedAt&limit=${limit}`
  )

  return data.docs
}

export async function getTagBySlug(slug: string): Promise<CMSTag | null> {
  const data = await fetchCMS<PayloadListResponse<CMSTag>>(
    `/api/tags?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`
  )

  return data.docs[0] ?? null
}

export async function getAllTags(limit = 100): Promise<CMSTag[]> {
  const data = await fetchCMS<PayloadListResponse<CMSTag>>(
    `/api/tags?sort=name&limit=${limit}`
  )
  return data.docs
}

export async function getLatestNewsflash(limit = 5): Promise<CMSPost[]> {
  return getPostsByCategory('Newsflash', limit)
}

export async function getLatestReports(limit = 6): Promise<CMSPost[]> {
  return getPostsByCategory('Report', limit)
}

export async function getAnnouncementBySlug(
  slug: string
): Promise<CMSAnnouncement | null> {
  const data = await fetchCMS<PayloadListResponse<CMSAnnouncement>>(
    `/api/announcements?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`
  )

  return data.docs[0] ?? null
}

export async function getAnnouncements(limit = 5): Promise<CMSAnnouncement[]> {
  const data = await fetchCMS<PayloadListResponse<CMSAnnouncement>>(
    `/api/announcements?sort=-pinned,-publishedAt&limit=${limit}`
  )
  return data.docs
}

function compareSponsors(a: CMSSponsor, b: CMSSponsor) {
  const tierRank: Record<CMSSponsor['tier'], number> = {
    primary: 1,
    secondary: 2,
    standard: 3,
    special: 4,
    individual: 5,
  }

  const tierDiff = tierRank[a.tier] - tierRank[b.tier]
  if (tierDiff !== 0) return tierDiff

  return (a.sortOrder ?? 100) - (b.sortOrder ?? 100)
}

export async function getSponsors(limit = 100): Promise<CMSSponsor[]> {
  const data = await fetchCMS<PayloadListResponse<CMSSponsor>>(
    `/api/sponsors?depth=1&sort=sortOrder&limit=${limit}`
  )
  return data.docs.sort(compareSponsors)
}

export async function getFeaturedSponsors(limit = 12): Promise<CMSSponsor[]> {
  const data = await fetchCMS<PayloadListResponse<CMSSponsor>>(
    `/api/sponsors?where[featured][equals]=true&depth=1&limit=100`
  )

  return data.docs
    .filter(
      (sponsor) =>
        sponsor.sponsorType === 'company' &&
        ['primary', 'secondary', 'special'].includes(sponsor.tier)
    )
    .sort(compareSponsors)
    .slice(0, limit)
}
