import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-ft-border bg-ft-card px-6 py-14 text-center shadow-sm">
        <p className="text-sm font-medium text-ft-accent">404 | Not Found</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ft-text">
          找不到這個頁面
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-ft-muted">
          這個頁面可能已經移動、刪除，或尚未公開。你可以回到首頁，或查看最新文章。
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-ft-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(40,129,159,0.35)] transition hover:-translate-y-0.5 hover:bg-ft-brand-dark"
          >
            返回首頁
          </Link>

          <Link
            href="/posts"
            className="rounded-full border border-ft-border bg-ft-card px-5 py-3 text-sm font-medium text-ft-muted transition hover:-translate-y-0.5 hover:border-ft-accent-border hover:bg-ft-accent-soft hover:text-ft-text"
          >
            查看最新文章
          </Link>
        </div>
      </div>
    </main>
  )
}
