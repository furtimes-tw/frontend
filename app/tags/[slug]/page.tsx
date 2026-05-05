import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import SectionHeading from '@/components/SectionHeading'
import { getPostsByTagSlug, getTagBySlug } from '@/lib/cms'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tag = await getTagBySlug(slug)

  if (!tag) {
    return buildMetadata({
      title: '標籤',
      description: '依照標籤瀏覽文章。',
      path: `/tags/${slug}`,
    })
  }

  return buildMetadata({
    title: `#${tag.name}`,
    description: `瀏覽所有帶有「${tag.name}」標籤的文章。`,
    path: `/tags/${tag.slug}`,
  })
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const tag = await getTagBySlug(slug)

  if (!tag) {
    notFound()
  }

  const posts = await getPostsByTagSlug(slug, 24)

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        title={`#${tag.name}`}
        subtitle={`顯示所有帶有「${tag.name}」標籤的文章。`}
      />

      {posts.length === 0 ? (
        <p className="text-ft-muted">目前這個標籤沒有文章。</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
