import Link from 'next/link'

type Props = {
  title: string
  description?: string
  actionHref?: string
  actionLabel?: string
}

export default function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: Props) {
  return (
    <div className="rounded-3xl border border-ft-border bg-ft-card px-6 py-10 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-ft-accent-border bg-ft-accent-soft text-ft-accent">
        ！
      </div>

      <h2 className="text-xl font-bold text-ft-text">{title}</h2>

      {description ? (
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ft-muted">
          {description}
        </p>
      ) : null}

      {actionHref && actionLabel ? (
        <div className="mt-6">
          <Link
            href={actionHref}
            className="inline-flex rounded-full border border-ft-border bg-ft-card px-4 py-2 text-sm font-medium text-ft-muted transition hover:border-ft-accent-border hover:bg-ft-accent-soft hover:text-ft-text"
          >
            {actionLabel}
          </Link>
        </div>
      ) : null}
    </div>
  )
}
