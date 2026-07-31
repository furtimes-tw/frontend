import type { Metadata } from 'next'
import Link from 'next/link'
import PostCard from '@/components/PostCard'
import SectionHeading from '@/components/SectionHeading'
import SponsorCard from '@/components/SponsorCard'
import EmptyState from '@/components/EmptyState'
import HomeExpandablePanel from '@/components/HomeExpandablePanel'
import {
  formatDate,
  getFeaturedPost,
  getAnnouncements,
  getFeaturedSponsors,
  getLatestNewsflash,
  getLatestReports,
  getMediaURL,
} from '@/lib/cms'
import { buildMetadata } from '@/lib/seo'
import { features } from '@/lib/features'

export const metadata: Metadata = buildMetadata({
  description:
    '獸時報 FurTimes 聚焦獸文化活動、創作、社群與相關產業消息，整理值得被看見的故事。',
  path: '/',
})

function getThumbnail(post: any) {
  if (!post.thumbnail || typeof post.thumbnail !== 'object') return null
  if (!('url' in post.thumbnail)) return null

  return post.thumbnail
}

export default async function HomePage() {
  const [
    featuredPost,
    latestReports,
    latestNewsflash,
    announcements,
    featuredSponsors,
  ] = await Promise.all([
    getFeaturedPost(),
    getLatestReports(8),
    getLatestNewsflash(5),
    getAnnouncements(4),
    features.sponsors ? getFeaturedSponsors(6) : Promise.resolve([]),
  ])

  const heroPost = featuredPost ?? latestReports[0]
  const reportPosts = latestReports
  const heroThumbnail = heroPost ? getThumbnail(heroPost) : null
  const newsflashPanelItems = latestNewsflash.map((post) => ({
    id: post.id,
    title: post.title,
    href: `/posts/${post.slug}`,
    date: formatDate(post.publishedAt),
  }))

  const announcementPanelItems = announcements.map((item) => ({
    id: item.id,
    title: item.title,
    href: `/announcements/${item.slug}`,
    date: formatDate(item.publishedAt),
    pinned: item.pinned,
  }))

  return (
    <main>
      <section className="border-b border-ft-border bg-ft-surface">
        <div className="mx-auto grid max-w-6xl items-stretch gap-8 px-5 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)] lg:px-8">
          <div className="flex h-full flex-col">
            {heroPost ? (
              <article className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-ft-border bg-ft-card shadow-sm">
                {heroThumbnail?.url ? (
                  <img
                    src={getMediaURL(heroThumbnail.url)}
                    alt={heroThumbnail.alt || heroPost.title}
                    className="h-72 w-full object-cover"
                  />
                ) : null}

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 text-sm text-ft-subtle">
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

                  <div className="mt-auto pt-8">
                    <Link
                      href={`/posts/${heroPost.slug}`}
                      className="inline-flex rounded-full bg-ft-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(40,129,159,0.35)] transition hover:-translate-y-0.5 hover:bg-ft-brand-dark hover:shadow-[0_12px_26px_rgba(40,129,159,0.45)]"
                    >
                      閱讀推薦報導
                    </Link>
                  </div>
                </div>
              </article>
            ) : (
              <div className="flex flex-1 flex-col justify-center rounded-3xl border border-ft-border bg-ft-card p-8 shadow-sm">
                <h1 className="text-4xl font-bold">獸時報 FurTimes</h1>
                <p className="mt-4 text-ft-muted">目前尚無推薦報導。</p>
              </div>
            )}
          </div>

          <aside className="grid h-full gap-6 lg:grid-rows-2">
            <HomeExpandablePanel
              title="快訊"
              eyebrow="Newsflash"
              moreHref="/category/Newsflash"
              moreLabel="查看所有快訊"
              emptyText="目前沒有快訊。"
              items={newsflashPanelItems}
            />

            <HomeExpandablePanel
              title="公告"
              eyebrow="Announcements"
              moreHref="/announcements"
              moreLabel="查看所有公告"
              emptyText="目前沒有公告。"
              items={announcementPanelItems}
            />
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <SectionHeading title="最新報導" />

        {reportPosts.length === 0 ? (
          <p className="text-ft-muted">目前沒有更多報導文章。</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {reportPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link
            href="/posts"
            className="inline-flex rounded-full border border-ft-border bg-ft-card px-5 py-3 text-sm font-medium text-ft-muted transition hover:-translate-y-0.5 hover:bg-ft-accent-soft hover:text-ft-text"
          >
            查看所有文章
          </Link>
        </div>
      </section>

      <section className="border-y border-ft-border bg-ft-surface">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <SectionHeading title="探索內容分類" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/category/Report"
              className="rounded-2xl border border-ft-border bg-ft-card p-5 transition hover:border-ft-accent-border hover:bg-ft-accent-soft"
            >
              <h3 className="text-lg font-bold text-ft-text">報導</h3>
              <p className="mt-2 text-sm text-ft-muted">
                活動、社群與產業新聞整理。
              </p>
            </Link>

            <Link
              href="/category/Column"
              className="rounded-2xl border border-ft-border bg-ft-card p-5 transition hover:border-ft-accent-border hover:bg-ft-accent-soft"
            >
              <h3 className="text-lg font-bold text-ft-text">專欄</h3>
              <p className="mt-2 text-sm text-ft-muted">
                觀點、評論與長篇討論。
              </p>
            </Link>

            <Link
              href="/category/Interview"
              className="rounded-2xl border border-ft-border bg-ft-card p-5 transition hover:border-ft-accent-border hover:bg-ft-accent-soft"
            >
              <h3 className="text-lg font-bold text-ft-text">專訪</h3>
              <p className="mt-2 text-sm text-ft-muted">
                創作者、主辦方與社群人物訪談。
              </p>
            </Link>

            {features.sponsors ? (
              <Link
                href="/category/Sponsor"
                className="rounded-2xl border border-ft-border bg-ft-card p-5 transition hover:border-ft-accent-border hover:bg-ft-accent-soft"
              >
                <h3 className="text-lg font-bold text-ft-text">贊助內容</h3>
                <p className="mt-2 text-sm text-ft-muted">
                  合作曝光與互惠報導。
                </p>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {features.sponsors ? (
        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
          <SectionHeading title="贊助夥伴" />

          {featuredSponsors.length === 0 ? (
            <EmptyState
              title="目前沒有贊助夥伴"
              description="我們正在積極尋找贊助夥伴，如有興趣歡迎與我們洽談！"
              actionHref="/sponsors"
              actionLabel="了解如何贊助"
            />
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
              className="inline-flex rounded-full border border-ft-border bg-ft-card px-4 py-2 text-sm text-ft-muted transition hover:border-ft-accent-border hover:bg-ft-accent-soft hover:text-ft-text"
            >
              查看所有贊助與支持者
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  )
}
