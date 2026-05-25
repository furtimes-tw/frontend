'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  const savedTheme = window.localStorage.getItem('theme')

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initialTheme = getInitialTheme()

    setTheme(initialTheme)
    document.documentElement.dataset.theme = initialTheme
    setMounted(true)
  }, [])

  function toggleTheme() {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'

    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem('theme', nextTheme)
  }

  const label = theme === 'dark' ? '切換為淺色模式' : '切換為深色模式'
  const icon = !mounted ? '◐' : theme === 'dark' ? '☀︎' : '☾'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ft-border bg-ft-card text-ft-muted transition hover:border-ft-accent-border hover:bg-ft-accent-soft hover:text-ft-accent"
    >
      <span
        aria-hidden="true"
        className="grid h-5 w-5 place-items-center text-base leading-none"
      >
        {icon}
      </span>
    </button>
  )
}
