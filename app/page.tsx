import Link from 'next/link'
import PostCard from '@/components/PostCard'
import SectionHeading from '@/components/SectionHeading'
import {
  formatDate,
  getAnnouncements,
  getLatestNewsflash,
  getLatestReports,
  getSponsors,
} from '@/lib/cms'
import { getMediaURL } from '@/lib/cms'

function getLogo(sponsor: any) {
  if (!sponsor.logo || typeof sponsor.logo !== 'object') return null
  if (!('url' in sponsor.logo)) return null
  return sponsor.logo
}

export default async function HomePage() {
  const [latestReports, latestNewsflash, announcements, sponsors] =
    await Promise.all([
      getLatestReports(4),
      getLatestNewsflash(3),
      getAnnouncements(3),
      getSponsors(3),
    ])

  return (
    <main>
      <section className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-medium text-zinc-500">
            Furry Culture / News / Community
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            獸時報 FurTimes
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
            聚焦獸文化活動、創作、社群與相關產業消息，整理值得被看見的故事。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <SectionHeading title="最新報導" />

        {latestReports.length === 0 ? (
          <p className="text-zinc-600">目前沒有報導文章。</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {latestReports.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link href="/posts" className="inline-flex rounded-lg border bg-white px-4 py-2 text-sm hover:bg-zinc-50">
            查看所有文章
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading title="快訊" />

          <div className="space-y-4">
            {latestNewsflash.map((post) => (
              <article key={post.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                <div className="mb-2 text-sm text-zinc-500">
                  {formatDate(post.publishedAt)}
                </div>
                <h3 className="text-lg font-semibold">
                  <Link href={`/posts/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
              </article>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading title="公告" />

          <div className="space-y-4">
            {announcements.map((item) => (
              <article key={item.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-sm text-zinc-500">
                  {item.pinned ? (
                    <span className="rounded bg-zinc-100 px-2 py-1 text-xs">
                      置頂
                    </span>
                  ) : null}
                  <time>{formatDate(item.publishedAt)}</time>
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </article>
            ))}
          </div>

          <div className="mt-6">
            <Link href="/announcements" className="inline-flex rounded-lg border bg-white px-4 py-2 text-sm hover:bg-zinc-50">
              查看所有公告
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <SectionHeading title="贊助夥伴" />

        {sponsors.length === 0 ? (
          <p className="text-zinc-600">目前沒有贊助商資料。</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sponsors.map((sponsor) => {
              const logo = getLogo(sponsor)

              return (
                <div key={sponsor.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                  <div className="flex h-24 items-center justify-center rounded-xl bg-zinc-50">
                    {logo?.url ? (
                      <img
                        src={getMediaURL(logo.url)}
                        alt={logo.alt || sponsor.name}
                        className="max-h-16 max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-sm text-zinc-400">{sponsor.name}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-6">
          <Link href="/sponsors" className="inline-flex rounded-lg border bg-white px-4 py-2 text-sm hover:bg-zinc-50">
            查看所有贊助夥伴
          </Link>
        </div>
      </section>
    </main>
  )
}
