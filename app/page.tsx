import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/api";

export default async function HomePage() {
  const res = await getPosts();
  const posts = res.data.slice(0, 5);

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold">FurTimes</h1>
        <p className="mt-2 text-zinc-600">
          獸時報新聞網；測試中。
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">最新文章</h2>
          <Link href="/posts" className="text-sm text-blue-600 hover:underline">
            看更多
          </Link>
        </div>

        <div className="grid gap-4">
          {posts.length === 0 ? (
            <p className="text-zinc-500">目前還沒有文章。</p>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </section>
    </div>
  );
}
