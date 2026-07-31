import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import SectionHeading from '@/components/SectionHeading'
import Pagination from '@/components/Pagination'
import { getPaginatedPosts } from '@/lib/cms'
import { buildMetadata } from '@/lib/seo'

const POSTS_PER_PAGE = 12

type Props = {
  params: Promise<{
    page: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params
  const pageNumber = Number(page)

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    return buildMetadata({
      title: '文章列表',
      path: '/posts',
    })
  }

  return buildMetadata({
    title: `所有文章｜第 ${pageNumber} 頁`,
    description: `瀏覽獸時報 FurTimes 的文章列表第 ${pageNumber} 頁。`,
    path: `/posts/page/${pageNumber}`,
  })
}

export default async function PostsPaginatedPage({ params }: Props) {
  const { page } = await params
  const pageNumber = Number(page)

  if (!Number.isInteger(pageNumber) || pageNumber < 2) {
    notFound()
  }

  const posts = await getPaginatedPosts(pageNumber, POSTS_PER_PAGE)

  if (pageNumber > posts.totalPages && posts.totalPages > 0) {
    notFound()
  }

  return (
    <main>
      <section className="border-b border-ft-border bg-ft-card">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-medium text-ft-accent">Posts</p>
          <h1 className="text-4xl font-bold tracking-tight text-ft-text">
            所有文章
          </h1>
          <p className="mt-4 max-w-2xl text-ft-muted">
            文章列表第 {pageNumber} 頁。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <SectionHeading title={`文章列表｜第 ${pageNumber} 頁`} />

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
      </section>
    </main>
  )
}
