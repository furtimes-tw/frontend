import "./globals.css";
import Link from "next/link";
import Script from 'next/script';
import ThemeToggle from '@/components/ThemeToggle'
import Footer from '@/components/Footer'

export const metadata = {
  title: "獸時報 FurTimes",
  description: "獸時報新聞網",
};

const navItems = [
  { href: '/', label: '首頁' },
  { href: '/posts', label: '文章' },
  { href: '/category/Newsflash', label: '快訊' },
  { href: '/announcements', label: '公告' },
  { href: '/sponsors', label: '贊助' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body className="bg-ft-bg text-ft-text">
        <Script id="theme-init" strategy="beforeInteractive">
            {`
                (function() {
                    try {
                        var savedTheme = localStorage.getItem('theme');
                        var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        var theme = savedTheme || (systemDark ? 'dark' : 'light');
                        document.documentElement.dataset.theme = theme;
                    } catch (e) {}
                })();
            `}
        </Script>

        <header className="sticky top-0 z-50 border-b border-ft-border bg-ft-card/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-xl font-bold tracking-tight text-ft-text">
              獸時報 FurTimes
            </Link>

            <div className="flex items-center gap-5">
              <nav className="flex flex-wrap items-center gap-4 text-sm text-ft-muted">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="hover:text-ft-accent">
                    {item.label}
                  </Link>
                ))}
              </nav>

              <ThemeToggle />
            </div>
          </div>
        </header>

        {children}
        <Footer />
      </body>
    </html>
  );
}
