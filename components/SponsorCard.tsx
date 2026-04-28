import { CMSSponsor } from '@/types/cms'
import { getMediaURL } from '@/lib/cms'

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

export default function SponsorCard({ sponsor, compact = false }: Props) {
  const logo = getLogo(sponsor)

  const card = (
    <article className="flex h-full flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={
          compact
            ? 'mb-4 flex h-24 items-center justify-center rounded-xl bg-zinc-50 p-4'
            : 'mb-5 flex h-36 items-center justify-center rounded-xl bg-zinc-50 p-5'
        }
      >
        {logo?.url ? (
          <img
            src={getMediaURL(logo.url)}
            alt={logo.alt || sponsor.name}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <span className="text-zinc-400">{sponsor.name}</span>
        )}
      </div>

      <div className="mb-2 text-sm font-medium text-zinc-500">
        {getSponsorTierLabel(sponsor.tier)}
      </div>

      <h3 className="text-xl font-bold">{sponsor.name}</h3>

      {sponsor.description ? (
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600">
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
