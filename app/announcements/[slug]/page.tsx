import Link from 'next/link'
import { notFound } from 'next/navigation'
import RichTextContent from '@/components/RichTextContent'
import { formatDate, getAnnouncementBySlug } from '@/lib/cms'

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
