import type { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, getSiteURL } from '@/lib/site'

type BuildMetadataArgs = {
  title?: string
  description?: string
  path?: string
  image?: string | null
  type?: 'website' | 'article'
  publishedTime?: string | null
  modifiedTime?: string | null
  tags?: string[]
}

const DEFAULT_OG_IMAGE = getSiteURL('/og/default.png')

export function buildPageTitle(title?: string) {
  if (!title) return SITE_TITLE
  return `${title}｜${SITE_NAME}`
}

export function buildMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = '/',
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
}: BuildMetadataArgs = {}): Metadata {
  const pageTitle = buildPageTitle(title)
  const url = getSiteURL(path)
  const ogImage = image || DEFAULT_OG_IMAGE

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(getSiteURL()),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: 'zh_TW',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || SITE_TITLE,
        },
      ],
      ...(type === 'article'
        ? {
            publishedTime: publishedTime || undefined,
            modifiedTime: modifiedTime || undefined,
            tags,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [ogImage],
    },
  }
}
