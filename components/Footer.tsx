import Link from 'next/link'

const footerLinks = [
  {
    title: '內容',
    links: [
      { href: '/posts', label: '所有文章' },
      { href: '/category/Newsflash', label: '快訊' },
      { href: '/category/Report', label: '報導' },
      { href: '/category/Column', label: '專欄' },
      { href: '/category/Interview', label: '專訪' },
    ],
  },
  {
    title: '網站',
    links: [
      { href: '/announcements', label: '公告' },
      { href: '/sponsors', label: '贊助' },
      { href: '/about', label: '關於 FurTimes' },
    ],
  },
  {
    title: '合作',
    links: [
      { href: '/sponsors', label: '贊助與合作' },
      { href: 'mailto:furtimestw@gmail.com', label: '聯絡我們', external: true },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ft-border bg-ft-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-6 md:grid-cols-[1.4fr_2fr] lg:px-8">
        <div>
          <Link href="/" className="text-xl font-bold tracking-tight text-ft-text">
            獸時報 FurTimes
          </Link>

          <p className="mt-3 max-w-md text-sm leading-6 text-ft-muted">
            聚焦獸文化活動、創作、社群與相關產業消息，<br/>整理值得被看見的故事。
          </p>

          <p className="mt-5 text-xs text-ft-subtle">
            © {year} FurTimes. All rights reserved.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-ft-text">
                {group.title}
              </h2>

              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-sm text-ft-muted hover:text-ft-accent"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-ft-muted hover:text-ft-accent"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
