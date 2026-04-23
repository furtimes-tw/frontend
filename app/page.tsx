import Link from 'next/link'
import PostCard from '@/components/PostCard'
import SectionHeading from '@/components/SectionHeading'
import {
  formatDate,
  getAnnouncements,
  getLatestNewsflash,
  getLatestReports,
} from '@/lib/cms'

export default async function HomePage() {
  const [latestReports, latestNewsflash, announcements] = await Promise.all([
    getLatestReports(6),
    getLatestNewsflash(5),
    getAnnouncements(5),
  ])

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="mb-14">
        <SectionHeading
          title="最新報導"
          subtitle="來自 CMS 的最新文章內容。"
        />

        {latestReports.length === 0 ? (
          <p>目前沒有報導文章。</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {latestReports.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link
            href="/posts"
            className="inline-flex rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
          >
            查看所有文章
          </Link>
        </div>
      </section>

      <section className="mb-14 grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            title="快訊"
            subtitle="簡短更新與活動導流內容。"
          />

          {latestNewsflash.length === 0 ? (
            <p>目前沒有快訊。</p>
          ) : (
            <div className="space-y-4">
              {latestNewsflash.map((post) => (
                <article key={post.id} className="rounded-xl border p-4">
                  <div className="mb-2 text-sm text-gray-600">
                    {formatDate(post.publishedAt)}
                  </div>
                  <h3 className="text-lg font-semibold">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h3>
                </article>
              ))}
            </div>
          )}
        </div>

        <div>
          <SectionHeading
            title="公告"
            subtitle="由 CMS 管理的最新公告。"
          />

          {announcements.length === 0 ? (
            <p>目前沒有公告。</p>
          ) : (
            <div className="space-y-4">
              {announcements.map((item) => (
                <article key={item.id} className="rounded-xl border p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                    {item.pinned ? (
                      <span className="rounded bg-gray-100 px-2 py-1">置頂</span>
                    ) : null}
                    <time>{formatDate(item.publishedAt)}</time>
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
