import type { Metadata } from 'next'
import type { Event } from '@/lib/cms'
import Link from 'next/link'
import {
  formatEventDate,
  getEvents,
  getEventStatus,
  getEventStatusLabel,
} from '@/lib/cms'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: '近期活動',
  description: '整理近期獸文化相關活動資訊。',
  path: '/event',
})

function getTagSlug(event: Event) {
  if (!event.tag || typeof event.tag !== 'object') {
    return null
  }

  return event.tag.slug || null
}

function getEventMonthKey(date: string) {
  const value = new Date(date)

  const year = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    timeZone: 'Asia/Taipei',
  }).format(value)

  const month = new Intl.DateTimeFormat('en', {
    month: '2-digit',
    timeZone: 'Asia/Taipei',
  }).format(value)

  return `${year}-${month}`
}

function formatEventMonth(date: string) {
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    timeZone: 'Asia/Taipei',
  }).format(new Date(date))
}

function groupEventsByMonth(events: Event[]) {
  const groups = new Map<
    string,
    {
      label: string
      events: Event[]
    }
  >()

  for (const event of events) {
    const key = getEventMonthKey(event.startDate)

    if (!groups.has(key)) {
      groups.set(key, {
        label: formatEventMonth(event.startDate),
        events: [],
      })
    }

    groups.get(key)!.events.push(event)
  }

  return Array.from(groups.entries()).map(([key, value]) => ({
    key,
    ...value,
  }))
}

export default async function EventPage() {
  const events = await getEvents()
  const eventGroups = groupEventsByMonth(events)

  return (
    <main>
      <section className="border-b border-ft-border bg-ft-card">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-medium text-ft-accent">
            Events
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-ft-text">
            近期活動
          </h1>

          <p className="mt-4 max-w-2xl text-ft-muted">
            整理近期獸文化相關活動資訊。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        {events.length === 0 ? (
          <p className="text-ft-muted">目前沒有活動資訊。</p>
        ) : (
          <>
            <div className="hidden space-y-8 md:block">
              {eventGroups.map((group) => (
                <section key={group.key}>
                  <div className="mb-4 flex items-baseline gep-3">
                    <h2 className="text-2xl font-bold tracking-tight text-ft-text">
                      {group.label}
                    </h2>
                  </div>

                  <div className="overflow-hidden rounded-3xl border border-ft-border bg-ft-card shadow-sm">
                    <table className="w-full border-collapse text-left">
                      <thead className="border-b border-ft-border bg-ft-surface">
                        <tr>
                          <th className="px-5 py-4 text-sm font-semibold text-ft-text">
                            日期
                          </th>

                          <th className="px-5 py-4 text-sm font-semibold text-ft-text">
                            活動名稱
                          </th>

                          <th className="px-5 py-4 text-sm font-semibold text-ft-text">
                            地點
                          </th>

                          <th className="px-5 py-4 text-sm font-semibold text-ft-text">
                            活動狀態
                          </th>

                          <th className="px-5 py-4 text-sm font-semibold text-ft-text">
                            相關報導
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {group.events.map((event) => {
                          const status = getEventStatus(
                            event.regDateStart,
                            event.regDateEnd,
                            event.startDate,
                            event.endDate,
                          )

                          const tagSlug = getTagSlug(event)

                          return (
                            <tr
                              key={event.id}
                              className="transition hover:bg-ft-surface"
                            >
                              <td className="whitespace-nowrap px-5 py-4 text-sm text-ft-muted">
                                {formatEventDate(
                                  event.startDate,
                                  event.endDate,
                                )}
                              </td>

                              <td className="px-5 py-4">
                                <a
                                  href={event.officialURL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-semibold text-ft-text transition hover:text-ft-accent"
                                >
                                  {event.title}
                                </a>
                              </td>

                              <td className="px-5 py-4 text-sm text-ft-muted">
                                {event.location}
                              </td>

                              <td className="px-5 py-4 text-sm">
                                {getEventStatusLabel(status)}
                              </td>

                              <td className="px-5 py-4 text-sm">
                                {tagSlug ? (
                                  <Link
                                    href={`/tags/${tagSlug}`}
                                    className="text-ft-accent hover:underline"
                                  >
                                    查看相關報導
                                  </Link>
                                ) : (
                                  <span className="text-ft-subtle">-</span>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>
              ))}
            </div>

            <div className="grid gap-4 md:hidden">
              {events.map((event) => {
                const status = getEventStatus(
                  event.startDate,
                  event.endDate,
                )

                const tagSlug = getTagSlug(event)

                return (
                  <article
                    key={event.id}
                    className="rounded-2xl border border-ft-border bg-ft-card p-5 shadow-sm"
                  >
                    <div className="text-sm text-ft-subtle">
                      {formatEventDate(
                        event.startDate,
                        event.endDate,
                      )}
                    </div>

                    <h2 className="mt-2 text-lg font-bold">
                      <a
                        href={event.officialURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ft-text hover:text-ft-accent"
                      >
                        {event.title}
                      </a>
                    </h2>

                    <div className="mt-2 text-sm text-ft-muted">
                      {event.location}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                      <span>{getEventStatusLabel(status)}</span>

                      {tagSlug ? (
                        <Link
                          href={`/tags/${tagSlug}`}
                          className="text-ft-accent hover:underline"
                        >
                          相關報導
                        </Link>
                      ) : null}
                    </div>
                  </article>
                )
              })}
            </div>
          </>
        )}
      </section>
    </main>
  )
}
