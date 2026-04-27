import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "FurTimes",
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
      <body className="bg-zinc-50 text-zinc-900">
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-xl font-bold">
              FurTimes
            </Link>

           <nav className="flex flex-wrap items-center gap-4 text-sm text-zinc-700">
             {navItems.map((item) => (
               <Link key={item.href} href={item.href} className="hover:text-zinc-950">
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
