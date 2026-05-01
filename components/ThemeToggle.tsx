'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getSystemTheme(): Theme {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }

  return 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme') as Theme | null
    const initialTheme = savedTheme ?? getSystemTheme()

    setTheme(initialTheme)
    applyTheme(initialTheme)
    setMounted(true)
  }, [])

  function toggleTheme() {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'

    setTheme(nextTheme)
    applyTheme(nextTheme)
    window.localStorage.setItem('theme', nextTheme)
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className="rounded-full border border-ft-border px-3 py-1.5 text-sm text-ft-muted"
        aria-label="切換深淺模式"
      >
        主題
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-ft-border bg-ft-card px-3 py-1.5 text-sm text-ft-muted transition hover:border-ft-accent-border hover:bg-ft-accent-soft hover:text-ft-text"
      aria-label="切換深淺模式"
    >
      <span
        className="flex h-4 w-8 items-center rounded-full border border-ft-border bg-ft-surface p-0.5"
        aria-hidden="true"
      >
        <span
          className={
            theme === 'dark'
              ? 'h-3 w-3 translate-x-4 rounded-full bg-ft-accent transition'
              : 'h-3 w-3 translate-x-0 rounded-full bg-ft-accent transition'
          }
        />
      </span>

      <span>{theme === 'dark' ? '深色' : '淺色'}</span>
    </button>
  )
}
