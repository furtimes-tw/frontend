import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/api";

export default async function PostsPage() {
  const res = await getPosts();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">文章列表</h1>

      <div className="grid gap-4">
        {res.data.length === 0 ? (
          <p className="text-zinc-500">目前沒有文章。</p>
        ) : (
          res.data.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}
