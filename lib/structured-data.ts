import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  getSiteURL,
  normalizeMediaURL,
} from '@/lib/site'
import { CMSAnnouncement, CMSPost } from '@/types/cms'

function getRichTextPlainText(content: unknown, maxLength = 160) {
  const root = (content as any)?.root
  const children = root?.children

  if (!Array.isArray(children)) return SITE_DESCRIPTION

  const texts: string[] = []

  function walk(node: any) {
    if (!node) return

    if (typeof node.text === 'string') {
      texts.push(node.text)
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(walk)
    }
  }

  children.forEach(walk)

  const text = texts.join(' ').replace(/\s+/g, ' ').trim()

  if (!text) return SITE_DESCRIPTION

  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text
}

function getPostImage(post: CMSPost) {
  const thumbnail = post.thumbnail

  if (thumbnail && typeof thumbnail === 'object' && 'url' in thumbnail) {
    return normalizeMediaURL(thumbnail.url)
  }

  return getSiteURL('/og/default.png')
}

export function buildWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_TITLE,
    alternateName: SITE_NAME,
    url: getSiteURL(),
    description: SITE_DESCRIPTION,
    inLanguage: 'zh-Hant-TW',
    publisher: {
      '@type': 'Organization',
      name: SITE_TITLE,
      url: getSiteURL(),
      logo: {
        '@type': 'ImageObject',
        url: getSiteURL('/logo.png'),
      },
    },
  }
}

export function buildOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_TITLE,
    alternateName: SITE_NAME,
    url: getSiteURL(),
    description: SITE_DESCRIPTION,
    logo: {
      '@type': 'ImageObject',
      url: getSiteURL('/logo.png'),
    },
    sameAs: [
      // 之後如果有社群連結可以放這裡：
      'https://www.facebook.com/fur.times.official',
      // 'https://www.instagram.com/...',
      // 'https://threads.net/@...',
    ],
  }
}

export function buildPostStructuredData(post: CMSPost) {
  const url = getSiteURL(`/posts/${post.slug}`)
  const image = getPostImage(post)

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: getRichTextPlainText(post.content),
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: [image],
    datePublished: post.publishedAt || post.createdAt || undefined,
    dateModified: post.updatedAt || post.publishedAt || undefined,
    inLanguage: 'zh-Hant-TW',
    publisher: {
      '@type': 'Organization',
      name: SITE_TITLE,
      logo: {
        '@type': 'ImageObject',
        url: getSiteURL('/logo.png'),
      },
    },
  }
}

export function buildAnnouncementStructuredData(
  announcement: CMSAnnouncement
) {
  const url = getSiteURL(`/announcements/${announcement.slug}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: announcement.title,
    description: getRichTextPlainText(announcement.body),
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    datePublished: announcement.publishedAt || announcement.createdAt || undefined,
    dateModified:
      announcement.updatedAt || announcement.publishedAt || undefined,
    inLanguage: 'zh-Hant-TW',
    publisher: {
      '@type': 'Organization',
      name: SITE_TITLE,
      logo: {
        '@type': 'ImageObject',
        url: getSiteURL('/logo.png'),
      },
    },
  }
}

export function buildBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
