type Props = {
  title: string
  subtitle?: string
}

export default function SectionHeading({ title, subtitle }: Props) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold tracking-tight text-ft-text">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm leading-6 text-ft-muted">{subtitle}</p> : null}
    </div>
  )
}
