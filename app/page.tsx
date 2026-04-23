import Link from 'next/link'
import { getPosts, getCategoryLabel, getMediaURL } from '@/lib/cms'
import { CMSPost } from '@/types/cms'

function formatDate(dateString?: string | null) {
  if (!dateString) return '未設定發布時間'

  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(dateString))
}

function getThumbnail(post: CMSPost) {
  if (!post.thumbnail || typeof post.thumbnail !== 'object') return null
  if (!('url' in post.thumbnail)) return null
  return post.thumbnail
}

function getTags(post: CMSPost) {
  if (!Array.isArray(post.tags)) return []

  return post.tags.filter(
    (tag): tag is { id: number | string; name: string; slug: string } =>
      typeof tag === 'object' && tag !== null && 'name' in tag && 'slug' in tag
  )
}

export default async function HomePage() {
  const posts = await getPosts()

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">FurTimes 測試首頁</h1>

      {posts.length === 0 ? (
        <p>目前沒有文章。</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => {
            const thumbnail = getThumbnail(post)
            const tags = getTags(post)

            return (
              <article
                key={post.id}
                className="rounded-xl border p-5 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-3 text-sm text-gray-600">
                  <span className="rounded bg-gray-100 px-2 py-1">
                    {getCategoryLabel(post.category)}
                  </span>
                  <time>{formatDate(post.publishedAt)}</time>
                </div>

                {thumbnail?.url ? (
                  <img
                    src={getMediaURL(thumbnail.url)}
                    alt={thumbnail.alt || post.title}
                    className="mb-4 h-56 w-full rounded-lg object-cover"
                  />
                ) : null}

                <h2 className="mb-3 text-2xl font-semibold">
                  <Link href={`/posts/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>

                {tags.length > 0 ? (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      )}
    </main>
  )
}
