import Link from 'next/link'
import { CMSPost } from '@/types/cms'
import { formatDate, getCategoryLabel, getMediaURL } from '@/lib/cms'

type Props = {
  post: CMSPost
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

export default function PostCard({ post }: Props) {
  const thumbnail = getThumbnail(post)
  const tags = getTags(post)

  return (
    <article className="overflow-hidden rounded-xl border border-ft-border bg-ft-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {thumbnail?.url ? (
        <img
          src={getMediaURL(thumbnail.url)}
          alt={thumbnail.alt || post.title}
          className="h-52 w-full object-cover"
        />
      ) : null}

      <div className="p-5">
        <div className="mb-3 flex items-center gap-3 text-sm text-gray-600">
          <Link
            href={`/category/${post.category}`}
            className="rounded-full border border-ft-accent-border bg-ft-accent-soft px-3 py-1 text-xs font-medium text-ft-accent hover:bg-ft-accent hover:text-white"
          >
            {getCategoryLabel(post.category)}
          </Link>
          <time className="text-ft-subtle">{formatDate(post.publishedAt)}</time>
        </div>

        <h3 className="mb-3 text-xl font-semibold leading-snug">
          <Link href={`/posts/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
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
      </div>
    </article>
  )
}
