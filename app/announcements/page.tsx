import SectionHeading from '@/components/SectionHeading'
import RichTextContent from '@/components/RichTextContent'
import { formatDate,getAnnouncements } from '@/lib/cms'

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements(30)

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
      <SectionHeading title="公告" />

      {announcements.length === 0 ? (
        <p className="text-zinc-600">目前沒有公告。</p>
      ) : (
        <div className="space-y-6">
          {announcements.map((item) => (
            <article key={item.id} className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm text-zinc-600">
                {item.pinned ? (
                  <span className="rounded bg-zinc-100 px-2 py-1 text-xs font-medium">
                    置頂
                  </span>
                ) : null}
                <time>{formatDate(item.publishedAt)}</time>
              </div>

              <h2 className="mb-4 text-2xl font-bold">{item.title}</h2>

              {item.body ? <RichTextContent content={item.body as any} /> : null}
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
