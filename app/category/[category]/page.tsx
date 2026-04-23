import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import SectionHeading from '@/components/SectionHeading'
import {
  getCategoryLabel,
  getPostsByCategory,
  isValidCategory,
} from '@/lib/cms'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params

  if (!isValidCategory(category)) {
    notFound()
  }

  const posts = await getPostsByCategory(category, 24)

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <SectionHeading
        title={`${getCategoryLabel(category)}分類`}
        subtitle={`顯示所有屬於「${getCategoryLabel(category)}」的文章。`}
      />

      {posts.length === 0 ? (
        <p>目前這個分類沒有文章。</p>
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
