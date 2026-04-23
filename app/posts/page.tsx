import Link from 'next/link'
import { getPosts, getCategoryLabel } from '@/lib/cms'

function formatDate(dateString?: string | null) {
  if (!dateString) return '未設定發布時間'

  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(dateString))
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">所有文章</h1>

      {posts.length === 0 ? (
        <p>目前沒有文章。</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="rounded-lg border p-4">
              <Link
                href={`/posts/${post.slug}`}
                className="text-xl font-semibold hover:underline"
              >
                {post.title}
              </Link>
              <div className="mt-2 text-sm text-gray-600">
                {getCategoryLabel(post.category)}・{formatDate(post.publishedAt)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
