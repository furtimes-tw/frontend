import SponsorCard from '@/components/SponsorCard'
import SectionHeading from '@/components/SectionHeading'
import { getSponsors } from '@/lib/cms'

type SponsorVariant =
  | 'primary'
  | 'secondary'
  | 'standard'
  | 'individual'
  | 'special'

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
      <section className="mb-12 rounded-3xl border border-ft-border bg-ft-card p-8 shadow-sm">
        <p className="mb-3 text-sm font-medium text-ft-accent">
          Sponsor / Partnership
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-ft-text">
          支持獸時報
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-ft-muted">
          獸時報透過贊助與合作，持續整理獸文化活動、創作與社群資訊。<br />
          歡迎廠商、組織與個人以不同形式支持內容產出。
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#"
            className="rounded-full bg-ft-accent px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(40,129,159,0.35)] transition hover:-translate-y-0.5 hover:bg-ft-accent-dark hover:shadow-[0_12px_26px_rgba(40,129,159,0.45)]"
          >
            我要贊助
          </a>

          <a
            href="#"
            className="rounded-full border border-ft-border bg-ft-card px-5 py-3 text-sm font-medium text-ft-muted transition hover:-translate-y-0.5 hover:border-ft-accent-border hover:bg-ft-accent-soft hover:text-ft-text"
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

        <SponsorTierSection
          title="主要贊助"
          sponsors={primarySponsors}
          variant="primary"
        />

        <SponsorTierSection
          title="協力贊助"
          sponsors={secondarySponsors}
          variant="secondary"
        />

        <SponsorTierSection
          title="一般贊助"
          sponsors={standardSponsors}
          variant="standard"
        />

        <SponsorTierSection
          title="特別感謝"
          sponsors={specialSponsors}
          variant="special"
        />
      </section>

      <section>
        <SectionHeading
          title="個人贊助"
          subtitle="感謝每一位支持獸時報持續運作的獸迷朋友。"
        />

        {individualSponsors.length === 0 ? (
          <p className="text-ft-muted">目前沒有個人贊助資料。</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {individualSponsors.map((sponsor) => (
              <SponsorCard
                key={sponsor.id}
                sponsor={sponsor}
                variant="individual"
              />
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
  variant,
}: {
  title: string
  sponsors: Awaited<ReturnType<typeof getSponsors>>
  variant: SponsorVariant
}) {
  if (sponsors.length === 0) return null

  const gridClass =
    variant === 'primary'
      ? 'grid gap-6 md:grid-cols-2'
      : variant === 'secondary'
      ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
      : variant === 'standard'
      ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'
      : variant === 'special'
      ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'
      : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-5'

  return (
    <div className="mb-12">
      <h2 className="mb-5 text-xl font-bold text-ft-text">{title}</h2>

      <div className={gridClass}>
        {sponsors.map((sponsor) => (
          <SponsorCard
            key={sponsor.id}
            sponsor={sponsor}
            variant={variant}
          />
        ))}
      </div>
    </div>
  )
}
