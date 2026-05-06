import type { Metadata } from 'next'
import Link from 'next/link'
import SectionHeading from '@/components/SectionHeading'
import RichTextContent from '@/components/RichTextContent'
import EmptyState from '@/components/EmptyState'
import { formatDate, getAnnouncements } from '@/lib/cms'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: '公告',
  description: '最新站務與活動公告。',
  path: '/announcements',
})

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements(30)

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        title="公告"
      />

      {announcements.length === 0 ? (
        <EmptyState
            title="目前沒有公告"
            description="目前沒有任何公告。"
            actionHref="/"
            actionLabel="返回首頁"
        />
      ) : (
        <div className="space-y-6">
          {announcements.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-ft-border bg-ft-card p-6 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2 text-sm text-ft-muted">
                {item.pinned ? (
                  <span className="rounded-full border border-ft-accent-border bg-ft-accent-soft px-3 py-1 text-xs font-medium text-ft-accent">
                    置頂
                  </span>
                ) : null}
                <time>{formatDate(item.publishedAt)}</time>
              </div>

              <h2 className="mb-4 text-2xl font-bold text-ft-text">
                <Link
                  href={`/announcements/${item.slug}`}
                  className="hover:text-ft-accent"
                >
                  {item.title}
                </Link>
              </h2>

              {item.body ? (
                <div className="line-clamp-4">
                  <RichTextContent content={item.body as any} />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
