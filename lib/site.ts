export const SITE_NAME = 'FurTimes'
export const SITE_TITLE = '獸時報 FurTimes'
export const SITE_DESCRIPTION = '獸時報新聞網'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'http://localhost:3000'

export const CMS_URL =
  process.env.NEXT_PUBLIC_CMS_URL?.replace(/\/$/, '') ||
  'http://localhost:3001'

export function getSiteURL(path = '') {
  if (!path) return SITE_URL
  return `${SITE_URL}/${path.startsWith('/') ? path : `/${path}`}`
}

export function getCMSURL(path = '') {
  if (!path) return CMS_URL
  return `${CMS_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function normalizeMediaURL(url?: string | null) {
  if (!url) return ''

  if (url.startsWith('/')) {
    return getCMSURL(url)
  }

  try {
    const parsed = new URL(url)

    if (
      parsed.hostname === 'localhost' ||
      parsed.hostname === '127.0.0.1' ||
      parsed.hostname.startsWith('192.168.')
    ) {
      return getCMSURL(parsed.pathname)
    }

    return url
  } catch {
    return url
  }
}
