'use client'

import Link from 'next/link'
import { useState } from 'react'
import ThemeToggle from '@/components/ThemeToggle'

const navItems = [
  { href: '/', label: '首頁' },
  { href: '/posts', label: '文章' },
  { href: '/category/Newsflash', label: '快訊' },
  { href: '/announcements', label: '公告' },
  { href: '/sponsors', label: '贊助' },
  { href: '/about', label: '關於' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ft-border bg-ft-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-ft-text"
          onClick={closeMenu}
        >
          獸時報 FurTimes
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-4 text-sm text-ft-muted md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-ft-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ft-border bg-ft-card text-ft-muted transition hover:border-ft-accent-border hover:bg-ft-accent-soft hover:text-ft-text md:hidden"
            aria-label={isOpen ? '關閉選單' : '開啟選單'}
            aria-expanded={isOpen}
          >
            <span className="sr-only">{isOpen ? '關閉選單' : '開啟選單'}</span>
            <span aria-hidden="true" className="relative block h-4 w-4">
              <span
                className={
                  isOpen
                    ? 'absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rotate-45 rounded bg-current transition'
                    : 'absolute left-0 top-0 h-0.5 w-4 rounded bg-current transition'
                }
              />
              <span
                className={
                  isOpen
                    ? 'absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 opacity-0 transition'
                    : 'absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded bg-current transition'
                }
              />
              <span
                className={
                  isOpen
                    ? 'absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 -rotate-45 rounded bg-current transition'
                    : 'absolute bottom-0 left-0 h-0.5 w-4 rounded bg-current transition'
                }
              />
            </span>
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-ft-border bg-ft-card md:hidden">
          <nav className="mx-auto grid max-w-6xl gap-1 px-5 py-3 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-xl px-3 py-2 text-sm font-medium text-ft-muted transition hover:bg-ft-accent-soft hover:text-ft-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
