import "./globals.css";
import Link from "next/link";

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
    <html lang="zh-Hant">
      <body className="bg-ft-bg text-ft-text">
        <header className="sticky top-0 z-50 border-b border-ft-border bg-ft-card/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-xl font-bold tracking-tight text-ft-text">
              獸時報 FurTimes
            </Link>

           <nav className="flex flex-wrap items-center gap-4 text-sm text-ft-muted">
             {navItems.map((item) => (
               <Link key={item.href} href={item.href} className="hover:text-ft-accent">
                 {item.label}
               </Link>
             ))}
           </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
