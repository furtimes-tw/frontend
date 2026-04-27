import SectionHeading from '@/components/SectionHeading'
import { getMediaURL, getSponsors } from '@/lib/cms'

function getLogo(sponsor: any) {
  if (!sponsor.logo || typeof sponsor.logo !== 'object') return null
  if (!('url' in sponsor.logo)) return null
  return sponsor.logo
}

export default async function SponsorsPage() {
  const sponsors = await getSponsors(50)

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        title="贊助夥伴"
        subtitle="感謝支持獸時報與獸文化內容發展的夥伴。"
      />

      {sponsors.length === 0 ? (
        <p className="text-zinc-600">目前沒有贊助商資料。</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((sponsor) => {
            const logo = getLogo(sponsor)

            const card = (
              <article className="flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-32 items-center justify-center rounded-xl bg-zinc-50 p-4">
                  {logo?.url ? (
                    <img
                      src={getMediaURL(logo.url)}
                      alt={logo.alt || sponsor.name}
                      className="max-h-24 max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-zinc-400">No Logo</span>
                  )}
                </div>

                <div className="mb-2 text-sm text-zinc-500">{sponsor.tier}</div>
                <h2 className="text-xl font-bold">{sponsor.name}</h2>
              </article>
            )

            return sponsor.link ? (
              <a
                key={sponsor.id}
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:-translate-y-0.5"
              >
                {card}
              </a>
            ) : (
              <div key={sponsor.id}>{card}</div>
            )
          })}
        </div>
      )}
    </main>
  )
}
