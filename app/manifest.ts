import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '獸時報 FurTimes',
    short_name: 'FurTimes',
    description:
      '聚焦獸文化活動、創作、社群與相關產業消息，整理值得被看見的故事。',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#28819F',
    icons: [
      {
        src: '/brand/furtimes-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/brand/furtimes-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
