import { CMSSponsor } from '@/types/cms'
import { getMediaURL } from '@/lib/cms'

type SponsorCardVariant =
    | 'primary'
    | 'secondary'
    | 'standard'
    | 'supporter'
    | 'special'

type Props = {
  sponsor: CMSSponsor
  compact?: boolean
}

function getLogo(sponsor: CMSSponsor) {
  if (!sponsor.logo || typeof sponsor.logo !== 'object') return null
  if (!('url' in sponsor.logo)) return null
  return sponsor.logo
}

export function getSponsorTierLabel(tier: CMSSponsor['tier']) {
  switch (tier) {
    case 'primary':
      return '主要贊助'
    case 'secondary':
      return '協力贊助'
    case 'standard':
      return '一般贊助'
    case 'supporter':
      return '個人贊助'
    case 'special':
      return '特別贊助'
    default:
      return tier
  }
}

function getCardClass(variant: SponsorCardVariant) {
  switch (variant) {
    case 'primary':
      return 'rounded-3xl border border-ft-border bg-ft-card p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
    case 'secondary':
      return 'rounded-2xl border border-ft-border bg-ft-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
    case 'standard':
      return 'rounded-2xl border border-ft-border bg-ft-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
    case 'supporter':
      return 'rounded-2xl border border-ft-border bg-ft-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
    case 'special':
      return 'rounded-2xl border border-ft-border bg-ft-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
  }
}

function getLogoBoxClass(variant: SponsorCardVariant) {
  switch (variant) {
    case 'primary':
      return 'mb-6 flex h-48 items-center justify-center rounded-2xl bg-ft-bg p-8'
    case 'secondary':
      return 'mb-5 flex h-36 items-center justify-center rounded-xl bg-ft-bg p-6'
    case 'standard':
      return 'mb-4 flex h-28 items-center justify-center rounded-xl bg-ft-bg p-5'
    case 'supporter':
      return 'mb-3 flex h-20 items-center justify-center rounded-xl bg-ft-bg p-4'
    case 'special':
      return 'mb-4 flex h-28 items-center justify-center rounded-xl bg-ft-bg p-5'
  }
}

function getTitleClass(variant: SponsorCardVariant) {
  switch (variant) {
    case 'primary':
      return 'text-2xl font-bold'
    case 'secondary':
      return 'text-xl font-bold'
    case 'standard':
      return 'text-lg font-bold'
    case 'supporter':
      return 'text-base font-semibold'
    case 'special':
      return 'text-lg font-semibold'
  }
}

export default function SponsorCard({
  sponsor,
  variant = 'standard',
}: Props) {
  const logo = getLogo(sponsor)

  const card = (
    <article className={`flex h-full flex-col ${getCardClass(variant)}`}>
      <div className={getLogoBoxClass(variant)}>
        {logo?.url ? (
          <img
            src={getMediaURL(logo.url)}
            alt={logo.alt || sponsor.name}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <span className="text-ft-subtle">{sponsor.name}</span>
        )}
      </div>

      <div className="mb-2 text-sm font-medium text-ft-accent">
        {getSponsorTierLabel(sponsor.tier)}
      </div>

      <h3 className={getTitleClass(variant)}>
        {sponsor.name}
      </h3>

      {sponsor.description &&
      variant !== 'individual' ? (
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-ft-muted">
          {sponsor.description}
        </p>
      ) : null}
    </article>
  )

  if (sponsor.link) {
    return (
      <a
        href={sponsor.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {card}
      </a>
    )
  }

  return card
}
