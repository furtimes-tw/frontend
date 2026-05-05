import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import RichTextContent from '@/components/RichTextContent'
import { formatDate, getAnnouncementBySlug } from '@/lib/cms'
import { buildMetadata } from '@/lib/seo'

function getAnnouncementDescription(announcement: any) {
  const content = announcement.body
  const children = content?.root?.children

  if (!Array.isArray(children)) {
    return undefined
  }

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

  if (!text) return undefined

  return text.length > 120 ? `${text.slice(0, 120)}…` : text
}

function getAnnouncementDescription(announcement: any) {
  const content = announcement.body
  const children = content?.root?.children

  if (!Array.isArray(children)) {
    return undefined
  }

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

  if (!text) return undefined

  return text.length > 120 ? `${text.slice(0, 120)}…` : text
}

export default async function AnnouncementPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const announcement = await getAnnouncementBySlug(slug)

  if (!announcement) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link
            href="/announcements"
            className="text-sm font-medium text-ft-muted hover:text-ft-accent"
          >
            ← 返回公告列表
          </Link>
        </div>

        <div className="mb-4 flex items-center gap-2 text-sm text-ft-muted">
          {announcement.pinned ? (
            <span className="rounded-full border border-ft-accent-border bg-ft-accent-soft px-3 py-1 text-xs font-medium text-ft-accent">
              置頂
            </span>
          ) : null}
          <time>{formatDate(announcement.publishedAt)}</time>
        </div>

        <h1 className="mb-8 text-4xl font-bold leading-tight tracking-tight text-ft-text">
          {announcement.title}
        </h1>

        {announcement.body ? (
          <RichTextContent content={announcement.body as any} />
        ) : (
          <p className="text-ft-muted">此公告沒有內文。</p>
        )}
      </article>
    </main>
  )
}
