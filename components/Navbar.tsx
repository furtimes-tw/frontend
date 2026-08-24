'use client'

import Link from 'next/link'
import { useState } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import { features } from '@/lib/features'

const navItems = [
  { href: '/', label: '首頁' },
  { href: '/posts', label: '文章' },
  { href: '/category/Newsflash', label: '快訊' },
  { href: '/announcements', label: '公告' },
  ...(features.sponsors
      ? [{ href: '/sponsors', label: '贊助' }]
      : []),
  { href: '/about', label: '關於' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ft-border bg-ft-card/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-3"
            aria-label="獸時報 FurTimes 首頁"
          >
            <span className="relative block h-8 w-[49px] shrink-0">
              <img
                src="/brand/furtimes-symbol-brand.svg"
                alt="獸時報 logo"
                aria-hidden="true"
                className="h-8 w-auto shrink-0"
              />
            </span>

            <span className="hidden text-lg font-bold tracking-tight text-ft-text sm:inline">
              獸時報 FurTimes
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-ft-muted transition hover:bg-ft-accent-soft hover:text-ft-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? '關閉選單' : '開啟選單'}
              aria-expanded={menuOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ft-border bg-ft-card text-ft-muted transition hover:border-ft-accent-border hover:bg-ft-accent-soft hover:text-ft-accent md:hidden"
            >
              <span className="relative block h-4 w-4" aria-hidden="true">
                <span
                  className={`absolute left-0 top-1 block h-0.5 w-4 rounded-full bg-current transition duration-200 ${
                    menuOpen ? 'translate-y-1 rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 block h-0.5 w-4 rounded-full bg-current transition duration-200 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 top-3 block h-0.5 w-4 rounded-full bg-current transition duration-200 ${
                    menuOpen ? '-translate-y-1 -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity,transform] duration-200 ease-out md:hidden ${
            menuOpen
              ? 'grid-rows-[1fr] translate-y-0 opacity-100'
              : 'grid-rows-[0fr] -translate-y-2 opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <nav className="flex flex-col gap-1 border-t border-ft-border py-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-ft-muted transition hover:bg-ft-accent-soft hover:text-ft-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
