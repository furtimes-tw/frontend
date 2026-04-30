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
      typeof tag === 'object' &&
      tag !== null &&
      'id' in tag &&
      'name' in tag &&
      'slug' in tag &&
      typeof tag.slug === 'string' &&
      tag.slug.length > 0
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
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link
            href="/"
            className="text-sm font-medium text-ft-muted hover:text-ft-accent"
          >
            ← 返回首頁
          </Link>
        </div>

        <div className="mb-4 flex items-center gap-3 text-sm text-ft-muted">
          <span className="rounded-full border border-ft-accent-border bg-ft-accent-soft px-3 py-1 text-xs font-medium text-ft-accent">
            {getCategoryLabel(post.category)}
          </span>
          <time>{formatDate(post.publishedAt)}</time>
        </div>

        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-ft-text">
          {post.title}
        </h1>

        {thumbnail?.url ? (
          <img
            src={getMediaURL(thumbnail.url)}
            alt={thumbnail.alt || post.title}
            className="mb-8 h-72 w-full rounded-2xl border border-ft-border object-cover"
          />
        ) : null}

        {tags.length > 0 ? (
          <div className="mb-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/tags/${tag.slug}`}
                className="rounded-full bg-ft-accent-soft px-3 py-1 text-sm text-ft-accent hover:bg-ft-accent hover:text-white"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        ) : null}

        <section className="text-[17px] leading-8">
          <RichTextContent content={post.content as any} />
        </section>
      </article>
    </main>
  )
}
