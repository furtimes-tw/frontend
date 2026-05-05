import "./globals.css";
import type { Metadata } from 'next';
import Script from 'next/script';
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata()

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

        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
