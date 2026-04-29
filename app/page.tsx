import Link from 'next/link'
import PostCard from '@/components/PostCard'
import SectionHeading from '@/components/SectionHeading'
import SponsorCard from '@/components/SponsorCard'
import {
  formatDate,
  getAnnouncements,
  getFeaturedSponsors,
  getLatestNewsflash,
  getLatestReports,
  getMediaURL,
} from '@/lib/cms'

function getThumbnail(post: any) {
  if (!post.thumbnail || typeof post.thumbnail !== 'object') return null
  if (!('url' in post.thumbnail)) return null
  return post.thumbnail
}

export default async function HomePage() {
  const [latestReports, latestNewsflash, announcements, featuredSponsors] =
    await Promise.all([
      getLatestReports(7),
      getLatestNewsflash(5),
      getAnnouncements(4),
      getFeaturedSponsors(6),
    ])

  const heroPost = latestReports[0]
  const secondaryReports = latestReports.slice(1)

  const heroThumbnail = heroPost ? getThumbnail(heroPost) : null

  return (
    <main>
      <section className="border-b bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
          <div>
            <p className="mb-3 text-sm font-medium text-zinc-500">
              Furry Culture / News / Community
            </p>

            {heroPost ? (
              <article className="overflow-hidden rounded-3xl border bg-white shadow-sm">
                {heroThumbnail?.url ? (
                  <img
                    src={getMediaURL(heroThumbnail.url)}
                    alt={heroThumbnail.alt || heroPost.title}
                    className="h-72 w-full object-cover"
                  />
                ) : null}

                <div className="p-6">
                  <div className="mb-3 text-sm text-zinc-500">
                    {formatDate(heroPost.publishedAt)}
                  </div>

                  <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                    <Link
                      href={`/posts/${heroPost.slug}`}
                      className="hover:underline"
                    >
                      {heroPost.title}
                    </Link>
                  </h1>

                  <div className="mt-5">
                    <Link
                      href={`/posts/${heroPost.slug}`}
                      className="inline-flex rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-700"
                    >
                      閱讀推薦報導
                    </Link>
                  </div>
                </div>
              </article>
            ) : (
              <div className="rounded-3xl border bg-white p-8 shadow-sm">
                <h1 className="text-4xl font-bold">獸時報 FurTimes</h1>
                <p className="mt-4 text-zinc-600">
                  目前尚無推薦報導。
                </p>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold">快訊</h2>
                <Link
                  href="/category/Newsflash"
                  className="text-sm text-zinc-500 hover:underline"
                >
                  更多
                </Link>
              </div>

              {latestNewsflash.length === 0 ? (
                <p className="text-sm text-zinc-600">目前沒有快訊。</p>
              ) : (
                <div className="space-y-4">
                  {latestNewsflash.map((post) => (
                    <article key={post.id}>
                      <div className="mb-1 text-xs text-zinc-500">
                        {formatDate(post.publishedAt)}
                      </div>
                      <h3 className="text-sm font-semibold leading-6">
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
            </section>

            <section className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold">公告</h2>
                <Link
                  href="/announcements"
                  className="text-sm text-zinc-500 hover:underline"
                >
                  更多
                </Link>
              </div>

              {announcements.length === 0 ? (
                <p className="text-sm text-zinc-600">目前沒有公告。</p>
              ) : (
                <div className="space-y-4">
                  {announcements.map((item) => (
                    <article key={item.id}>
                      <div className="mb-1 flex items-center gap-2 text-xs text-zinc-500">
                        {item.pinned ? (
                          <span className="rounded bg-zinc-100 px-2 py-0.5">
                            置頂
                          </span>
                        ) : null}
                        <time>{formatDate(item.publishedAt)}</time>
                      </div>
                      <h3 className="text-sm font-semibold leading-6">
                        <Link
                          href={`/announcements/${item.slug}`}
                          className="hover:underline"
                        >
                          {item.title}
                        </Link>
                      </h3>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <SectionHeading title="最新報導" subtitle="近期發布的主要文章。" />

        {secondaryReports.length === 0 ? (
          <p className="text-zinc-600">目前沒有更多報導文章。</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {secondaryReports.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link
            href="/posts"
            className="inline-flex rounded-lg border bg-white px-4 py-2 text-sm hover:bg-zinc-50"
          >
            查看所有文章
          </Link>
        </div>
      </section>

      <section className="border-y bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <SectionHeading
            title="探索內容分類"
            subtitle="依照文章類型瀏覽內容。"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/category/Report"
              className="rounded-2xl border p-5 hover:bg-zinc-50"
            >
              <h3 className="text-lg font-bold">報導</h3>
              <p className="mt-2 text-sm text-zinc-600">
                活動、社群與產業新聞整理。
              </p>
            </Link>

            <Link
              href="/category/Column"
              className="rounded-2xl border p-5 hover:bg-zinc-50"
            >
              <h3 className="text-lg font-bold">專欄</h3>
              <p className="mt-2 text-sm text-zinc-600">
                觀點、評論與長篇討論。
              </p>
            </Link>

            <Link
              href="/category/Interview"
              className="rounded-2xl border p-5 hover:bg-zinc-50"
            >
              <h3 className="text-lg font-bold">專訪</h3>
              <p className="mt-2 text-sm text-zinc-600">
                創作者、主辦方與社群人物訪談。
              </p>
            </Link>

            <Link
              href="/category/Sponsor"
              className="rounded-2xl border p-5 hover:bg-zinc-50"
            >
              <h3 className="text-lg font-bold">贊助內容</h3>
              <p className="mt-2 text-sm text-zinc-600">
                合作曝光與互惠報導。
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          title="贊助夥伴"
          subtitle="支持獸時報的主要合作夥伴。"
        />

        {featuredSponsors.length === 0 ? (
          <p className="text-zinc-600">
            目前沒有首頁可顯示的贊助商資料。
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredSponsors.map((sponsor) => (
              <SponsorCard
                key={sponsor.id}
                sponsor={sponsor}
                variant={sponsor.tier === 'primary' ? 'secondary' : 'standard'}
              />
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link
            href="/sponsors"
            className="inline-flex rounded-lg border bg-white px-4 py-2 text-sm hover:bg-zinc-50"
          >
            查看所有贊助與支持者
          </Link>
        </div>
      </section>
    </main>
  )
}
