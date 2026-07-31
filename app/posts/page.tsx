import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import SectionHeading from '@/components/SectionHeading'
import EmptyState from '@/components/EmptyState'
import Pagination from '@/components/Pagination'
import { getPaginatedPosts } from '@/lib/cms'
import { buildMetadata } from '@/lib/seo'

const POSTS_PER_PAGE = 12

export const metadata: Metadata = buildMetadata({
  title: '所有文章',
  description: '瀏覽獸時報 FurTimes 的最新文章、報導、快訊、專欄與專訪。',
  path: '/posts',
})

export default async function PostsPage() {
  const posts = await getPaginatedPosts(1, POSTS_PER_PAGE)

  return (
    <main>
      <section className="border-b border-ft-border bg-ft-card">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-medium text-ft-accent">Posts</p>
          <h1 className="text-4xl font-bold tracking-tight text-ft-text">
            所有文章
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <SectionHeading title="文章列表" />

        {posts.docs.length === 0 ? (
          <EmptyState
            title="目前沒有文章"
            description="文章發布後會顯示在這裡。"
          />
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.docs.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <Pagination
              currentPage={posts.page}
              totalPages={posts.totalPages}
              basePath="/posts"
            />
          </>
        )}
      </section>
    </main>
  )
}
