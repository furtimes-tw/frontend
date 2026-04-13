import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "FurTimes",
  description: "獸時報新聞網",
};

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

            <nav className="flex gap-4 text-sm">
              <Link href="/" className="hover:underline">
                首頁
              </Link>
              <Link href="/posts" className="hover:underline">
                文章
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
