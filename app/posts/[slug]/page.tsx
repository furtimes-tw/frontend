import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getCategoryLabel, getMediaURL } from '@/lib/cms'
import { CMSPost } from '@/types/cms'
import RichTextContent from '@/components/RichTextContent'

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

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const thumbnail = getThumbnail(post)
  const tags = getTags(post)

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-6">
        <Link href="/" className="text-sm text-gray-600 hover:underline">
          ← 返回首頁
        </Link>
      </div>

      <div className="mb-4 flex items-center gap-3 text-sm text-gray-600">
        <span className="rounded bg-gray-100 px-2 py-1">
          {getCategoryLabel(post.category)}
        </span>
        <time>{formatDate(post.publishedAt)}</time>
      </div>

      <h1 className="mb-6 text-4xl font-bold">{post.title}</h1>

      {thumbnail?.url ? (
        <img
          src={getMediaURL(thumbnail.url)}
          alt={thumbnail.alt || post.title}
          className="mb-8 h-72 w-full rounded-xl object-cover"
        />
      ) : null}

      {tags.length > 0 ? (
        <div className="mb-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.id}
	      href={`/tags/${tag.slug}`}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      ) : null}

      <section>
        <RichTextContent content={post.content} />
      </section>
    </main>
  )
}
