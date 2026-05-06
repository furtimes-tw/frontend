import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: '關於 FurTimes',
  description:
    '了解獸時報的媒體定位、內容方向、編輯原則與合作方式。',
  path: '/about',
})

const focusItems = [
  {
    title: '活動與聚會',
    description:
      '大型獸聚、販售會、主題活動、社群企劃與相關活動資訊。',
  },
  {
    title: '創作與人物',
    description:
      '創作者、表演者、主辦方、社群參與者與相關人物故事。',
  },
  {
    title: '社群與文化',
    description:
      '獸文化中的互動、議題、趨勢、觀察與文化脈絡。',
  },
  {
    title: '合作與產業',
    description:
      '贊助、品牌合作、活動協力、周邊製作與文化產業連結。',
  },
]

const contentTypes = [
  {
    title: '報導',
    description:
      '以活動、社群與產業消息為主的新聞整理與採訪內容。',
  },
  {
    title: '快訊',
    description:
      '簡短、即時、以資訊傳遞與導流為主的更新。',
  },
  {
    title: '專欄',
    description:
      '觀點、評論、文化觀察與長篇討論。',
  },
  {
    title: '專訪',
    description:
      '與創作者、主辦方、社群人物或相關單位的對話。',
  },
  {
    title: '贊助內容',
    description:
      '合作曝光、互惠報導與贊助回饋內容，並會盡可能清楚標示。',
  },
]

const editorialPrinciples = [
  {
    title: '準確',
    description:
      '發布前盡可能確認時間、地點、主辦單位、來源與相關資訊。',
  },
  {
    title: '透明',
    description:
      '涉及合作、贊助或互惠內容時，會以適當方式標示。',
  },
  {
    title: '尊重',
    description:
      '尊重受訪者意願、個人界線與創作脈絡，同時注重著作權。',
  },
  {
    title: '脈絡',
    description:
      '不只整理資訊，也嘗試補足事件背景、文化脈絡與社群觀點。',
  },
]

export default function AboutPage() {
  return (
    <main>
      <section className="border-b border-ft-border bg-ft-card">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-medium text-ft-accent">
            About FurTimes
          </p>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-ft-text sm:text-5xl">
            關於獸時報
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-ft-muted">
            聚焦臺灣獸文化，<br />
            記錄活動、創作、社群與相關產業消息，<br />
            整理值得被看見的故事。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/posts"
              className="rounded-full bg-ft-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(40,129,159,0.35)] transition hover:-translate-y-0.5 hover:bg-ft-brand-dark"
            >
              查看最新文章
            </Link>

            <Link
              href="/sponsors"
              className="rounded-full border border-ft-border bg-ft-card px-5 py-3 text-sm font-medium text-ft-muted transition hover:-translate-y-0.5 hover:border-ft-accent-border hover:bg-ft-accent-soft hover:text-ft-text"
            >
              贊助與合作
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="text-sm font-medium text-ft-accent">Who We Are</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ft-text">
            我們是誰
          </h2>
        </div>

        <div className="rounded-3xl border border-ft-border bg-ft-card p-7 shadow-sm">
          <div className="space-y-5 text-base leading-8 text-ft-muted">
            <p>
              獸時報是一個非營利的小型團隊，<br />
              長期以圖片與文字紀錄發生在台灣的獸文化動態，<br />
              旨在透過報導與長文讓中文社會看到台灣的獸文化足跡與實踐。
            </p>

          </div>
        </div>
      </section>

      <section className="border-y border-ft-border bg-ft-surface">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-medium text-ft-accent">Focus</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ft-text">
              我們關注什麼
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ft-muted">
              台灣的獸文化相關活動消息（如獸聚、販售會、表演等）、人物故事、社群動態、產業發展等。
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {focusItems.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-ft-border bg-ft-card p-5 shadow-sm"
              >
                <h3 className="text-lg font-bold text-ft-text">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ft-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-ft-accent">Content</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ft-text">
            內容類型
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {contentTypes.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-ft-border bg-ft-card p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-ft-text">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ft-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-ft-border bg-ft-card">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-medium text-ft-accent">
              Editorial Principles
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ft-text">
              編輯原則
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ft-muted">
              獸時報所發布的新聞會按照新聞格式撰寫，並傳達事實。
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {editorialPrinciples.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-ft-border bg-ft-surface p-5"
              >
                <div className="mb-4 inline-flex rounded-full border border-ft-accent-border bg-ft-accent-soft px-3 py-1 text-xs font-medium text-ft-accent">
                  {item.title}
                </div>
                <p className="text-sm leading-6 text-ft-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article className="rounded-3xl border border-ft-border bg-ft-card p-7 shadow-sm">
          <p className="text-sm font-medium text-ft-accent">
            Submission / Tips
          </p>
          <h2 className="mt-2 text-2xl font-bold text-ft-text">
            投稿與提供資訊
          </h2>
          <p className="mt-4 text-sm leading-7 text-ft-muted">
            如果你有任何獸文化相關的消息、<br />
            活動資訊、創作者故事或其他線索，<br />
            歡迎隨時聯絡我們的編輯團隊！<br />
            我們非常樂意聽到來自社群的分享與建議，<br />
            也希望能凝聚社群的聲音。
          </p>

          <div className="mt-6">
            <a
              href="mailto:furtimestw@gmail.com"
              className="inline-flex rounded-full border border-ft-border bg-ft-card px-4 py-2 text-sm font-medium text-ft-muted transition hover:border-ft-accent-border hover:bg-ft-accent-soft hover:text-ft-text"
            >
              聯絡編輯團隊
            </a>
          </div>
        </article>

        <article className="rounded-3xl border border-ft-border bg-ft-card p-7 shadow-sm">
          <p className="text-sm font-medium text-ft-accent">
            Sponsor / Partnership
          </p>
          <h2 className="mt-2 text-2xl font-bold text-ft-text">
            贊助與合作
          </h2>
          <p className="mt-4 text-sm leading-7 text-ft-muted">
            獸時報歡迎與相關品牌、活動或創作者合作，<br />
            以互惠的方式推廣獸文化相關的消息與內容；<br />
            同時我們也歡迎個人或團體以贊助的方式支持獸時報的運作與發展。<br />
            <br />
            如果你有合作提案或想了解更多合作方式，歡迎隨時聯絡我們！
          </p>

          <div className="mt-6">
            <Link
              href="/sponsors"
              className="inline-flex rounded-full bg-ft-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-ft-brand-dark"
            >
              查看贊助與合作
            </Link>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-ft-border bg-ft-card p-7 shadow-sm">
          <p className="text-sm font-medium text-ft-accent">Contact</p>
          <h2 className="mt-2 text-2xl font-bold text-ft-text">聯絡方式</h2>

          <div className="mt-5 grid gap-4 text-sm text-ft-muted sm:grid-cols-3">
            <div>
              <div className="text-xl font-medium text-ft-text">一般聯絡</div>
              <a
                href="mailto:contact@furtimes.tw"
                className="mt-1 inline-block hover:text-ft-accent"
              >
                contact@furtimes.tw
              </a>
            </div>

            <div>
              <div className="text-xl font-medium text-ft-text">投稿 / 線索</div>
              <a
                href="mailto:editorial@furtimes.tw"
                className="mt-1 inline-block hover:text-ft-accent"
              >
                editorial@furtimes.tw
              </a>
            </div>

            <div>
              <div className="text-xl font-medium text-ft-text">合作 / 贊助</div>
              <a
                href="mailto:sponsor@furtimes.tw"
                className="mt-1 inline-block hover:text-ft-accent"
              >
                sponsor@furtimes.tw
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
