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
          <Link href="/announcements" className="text-sm text-zinc-600 hover:underline">
            ← 返回公告列表
          </Link>
        </div>

        <div className="mb-4 flex items-center gap-2 text-sm text-zinc-500">
          {announcement.pinned ? (
            <span className="rounded bg-zinc-100 px-2 py-1 text-xs">置頂</span>
          ) : null}
          <time>{formatDate(announcement.publishedAt)}</time>
        </div>

        <h1 className="mb-8 text-4xl font-bold leading-tight">
          {announcement.title}
        </h1>

        <RichTextContent content={announcement.body as any} />
      </article>
    </main>
  )
}
