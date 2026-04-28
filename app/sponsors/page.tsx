import SponsorCard from '@/components/SponsorCard'
import SectionHeading from '@/components/SectionHeading'
import { getSponsors } from '@/lib/cms'

export default async function SponsorsPage() {
  const sponsors = await getSponsors(100)

  const companySponsors = sponsors.filter(
    (sponsor) => sponsor.sponsorType === 'company'
  )

  const individualSponsors = sponsors.filter(
    (sponsor) => sponsor.sponsorType === 'individual'
  )

  const primarySponsors = companySponsors.filter(
    (sponsor) => sponsor.tier === 'primary'
  )

  const secondarySponsors = companySponsors.filter(
    (sponsor) => sponsor.tier === 'secondary'
  )

  const standardSponsors = companySponsors.filter(
    (sponsor) => sponsor.tier === 'standard'
  )

  const specialSponsors = companySponsors.filter(
    (sponsor) => sponsor.tier === 'special'
  )

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
      <section className="mb-12 rounded-3xl border bg-white p-8 shadow-sm">
        <p className="mb-3 text-sm font-medium text-zinc-500">
          Sponsor / Partnership
        </p>

        <h1 className="text-4xl font-bold tracking-tight">支持獸時報</h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
          獸時報透過贊助與合作，持續整理獸文化活動、創作與社群資訊。
          歡迎廠商、組織與個人以不同形式支持內容產出。
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#"
            className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-700"
          >
            我要贊助
          </a>

          <a
            href="#"
            className="rounded-xl border px-5 py-3 text-sm font-medium hover:bg-zinc-50"
          >
            合作洽談
          </a>
        </div>
      </section>

      <section className="mb-14">
        <SectionHeading
          title="廠商 / 組織贊助"
          subtitle="感謝支持獸時報與獸文化內容發展的合作夥伴。"
        />

        <SponsorTierSection title="主要贊助" sponsors={primarySponsors} />
        <SponsorTierSection title="協力贊助" sponsors={secondarySponsors} />
        <SponsorTierSection title="一般贊助" sponsors={standardSponsors} compact />
        <SponsorTierSection title="特別贊助" sponsors={specialSponsors} compact />
      </section>

      <section>
        <SectionHeading
          title="個人贊助"
          subtitle="感謝每一位支持獸時報持續運作的獸迷朋友。"
        />

        {individualSponsors.length === 0 ? (
          <p className="text-zinc-600">目前沒有個人贊助資料。</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {individualSponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} compact />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

function SponsorTierSection({
  title,
  sponsors,
  compact = false,
}: {
  title: string
  sponsors: Awaited<ReturnType<typeof getSponsors>>
  compact?: boolean
}) {
  if (sponsors.length === 0) return null

  return (
    <div className="mb-10">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>

      <div
        className={
          compact
            ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'
            : 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
        }
      >
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} compact={compact} />
        ))}
      </div>
    </div>
  )
}
