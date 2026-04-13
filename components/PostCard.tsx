import type { Post } from "@/types/post";

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(dateString));
}

function getExcerpt(content?: Post["content"]) {
  if (!content || content.length === 0) return "";

  for (const block of content) {
    if (!block.children) continue;

    const text = block.children
      .map((child) => child.text || "")
      .join("")
      .trim();

    if (text) return text;
  }

  return "";
}

function formatCategory(category?: string | null) {
  switch (category) {
    case "Newsflash":
      return "快訊";
    case "Announcement":
      return "公告";
    case "Column":
      return "專欄";
    case "Article":
      return "文章";
    case "Sponsor":
      return "合作夥伴";
    default:
      return category || "未分類";
  }
}

export default function PostCard({ post }: { post: Post }) {
  const excerpt = getExcerpt(post.content);

  return (
    <article className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-2 text-sm text-zinc-500">
        <span>{formatCategory(post.category)}</span>
        <span className="mx-2">•</span>
        <time>{formatDate(post.published || post.publishedAt)}</time>
      </div>

      <h2 className="text-xl font-semibold">{post.title}</h2>

      {excerpt ? (
        <p className="mt-3 text-sm leading-6 text-zinc-600">{excerpt}</p>
      ) : null}
    </article>
  );
}
