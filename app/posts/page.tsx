import PostCard from '@/components/PostCard'
import SectionHeading from '@/components/SectionHeading'
import { getPosts } from '@/lib/cms'

export default async function PostsPage() {
  const posts = await getPosts(24)

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <SectionHeading
        title="所有文章"
        subtitle="目前由 CMS 發布的最新文章內容。"
      />

      {posts.length === 0 ? (
        <p>目前沒有文章。</p>
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
