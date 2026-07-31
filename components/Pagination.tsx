import Link from 'next/link'

type PaginationProps = {
  currentPage: number
  totalPages: number
  basePath: string
}

function getPageHref(basePath: string, page: number) {
  if (page <= 1) return basePath
  return `${basePath}/page/${page}`
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="文章分頁"
    >
      {currentPage > 1 ? (
        <Link
          href={getPageHref(basePath, currentPage - 1)}
          className="rounded-full border border-ft-border bg-ft-card px-4 py-2 text-sm text-ft-muted transition hover:border-ft-accent-border hover:bg-ft-accent-soft hover:text-ft-text"
        >
          上一頁
        </Link>
      ) : null}

      {pages.map((page) => {
        const isCurrent = page === currentPage

        return (
          <Link
            key={page}
            href={getPageHref(basePath, page)}
            aria-current={isCurrent ? 'page' : undefined}
            className={
              isCurrent
                ? 'rounded-full bg-ft-brand px-4 py-2 text-sm font-semibold text-white'
                : 'rounded-full border border-ft-border bg-ft-card px-4 py-2 text-sm text-ft-muted transition hover:border-ft-accent-border hover:bg-ft-accent-soft hover:text-ft-text'
            }
          >
            {page}
          </Link>
        )
      })}

      {currentPage < totalPages ? (
        <Link
          href={getPageHref(basePath, currentPage + 1)}
          className="rounded-full border border-ft-border bg-ft-card px-4 py-2 text-sm text-ft-muted transition hover:border-ft-accent-border hover:bg-ft-accent-soft hover:text-ft-text"
        >
          下一頁
        </Link>
      ) : null}
    </nav>
  )
}
