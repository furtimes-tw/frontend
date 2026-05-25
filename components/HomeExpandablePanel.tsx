'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type PanelItem = {
  id: string | number
  title: string
  href: string
  date?: string
  pinned?: boolean
}

type Props = {
  title: string
  eyebrow: string
  moreHref: string
  moreLabel: string
  emptyText: string
  items: PanelItem[]
}

export default function HomeExpandablePanel({
  title,
  eyebrow,
  moreHref,
  moreLabel,
  emptyText,
  items,
}: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    if (open) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <>
      <section
        className="group flex min-h-0 cursor-pointer flex-col rounded-3xl border border-ft-border bg-ft-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-ft-accent-border hover:shadow-md"
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setOpen(true)
          }
        }}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-ft-accent">{eyebrow}</p>
            <h2 className="mt-1 text-xl font-bold text-ft-text">{title}</h2>
          </div>

          <span className="rounded-full border border-ft-border bg-ft-surface px-3 py-1 text-xs font-medium text-ft-muted transition group-hover:border-ft-accent-border group-hover:text-ft-accent">
            展開
          </span>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-ft-muted">{emptyText}</p>
        ) : (
          <div className="flex flex-1 flex-col gap-4">
            {items.slice(0, 3).map((item) => (
              <article key={item.id} className="pointer-events-none">
                <div className="mb-1 flex items-center gap-2 text-xs text-ft-subtle">
                  {item.pinned ? (
                    <span className="rounded border border-ft-accent-border bg-ft-accent-soft px-2 py-0.5 text-ft-accent">
                      置頂
                    </span>
                  ) : null}
                  {item.date ? <time>{item.date}</time> : null}
                </div>

                <h3 className="line-clamp-2 text-sm font-semibold leading-6 text-ft-text transition group-hover:text-ft-accent">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>
        )}
      </section>

      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 px-4 py-8 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <section
            className="max-h-[min(760px,90vh)] w-full max-w-2xl overflow-hidden rounded-3xl border border-ft-border bg-ft-card shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${title}-modal-title`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-ft-border px-6 py-5">
              <div>
                <p className="text-xs font-medium text-ft-accent">{eyebrow}</p>
                <h2
                  id={`${title}-modal-title`}
                  className="mt-1 text-2xl font-bold text-ft-text"
                >
                  {title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ft-border bg-ft-surface text-ft-muted transition hover:border-ft-accent-border hover:bg-ft-accent-soft hover:text-ft-accent"
                aria-label="關閉"
              >
                ×
              </button>
            </div>

            <div className="max-h-[58vh] overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <p className="text-sm text-ft-muted">{emptyText}</p>
              ) : (
                <div className="grid gap-3">
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl border border-ft-border bg-ft-surface p-4 transition hover:border-ft-accent-border hover:bg-ft-accent-soft"
                    >
                      <div className="mb-2 flex items-center gap-2 text-xs text-ft-subtle">
                        {item.pinned ? (
                          <span className="rounded border border-ft-accent-border bg-ft-accent-soft px-2 py-0.5 text-ft-accent">
                            置頂
                          </span>
                        ) : null}
                        {item.date ? <time>{item.date}</time> : null}
                      </div>

                      <h3 className="text-base font-semibold leading-7 text-ft-text">
                        {item.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-ft-border px-6 py-4">
              <Link
                href={moreHref}
                onClick={() => setOpen(false)}
                className="inline-flex rounded-full bg-ft-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-ft-accent-dark"
              >
                {moreLabel}
              </Link>
            </div>
          </section>
        </div>
      ) : null}
    </>
  )
}
