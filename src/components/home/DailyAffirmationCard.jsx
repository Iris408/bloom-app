import { getDailyAffirmation } from "../../data/dailyAffirmations"

// EN: Shows one calm affirmation based on the current day.
// JP: 今日の日付に基づいて、落ち着いたメッセージを1つ表示します。
function DailyAffirmationCard({ variant = "panel" }) {
  const affirmation = getDailyAffirmation()

  // EN: Thin mobile reminder used directly underneath the Header.
  // JP: Header直下に表示するモバイル用の細いリマインダーです。
  if (variant === "mobile-strip") {
    return (
      <section className="w-full border-b border-bloom-sage/20 bg-white/40 px-4 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
        <div className="mx-auto flex max-w-7xl items-center gap-2">
          <p className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
            Today&apos;s reminder
          </p>

          <p className="truncate text-[11px] leading-5 text-bloom-forest/75 dark:text-gray-300">
            {affirmation}
          </p>
        </div>
      </section>
    )
  }

  // EN: Compact desktop sidebar reminder.
  // JP: デスクトップのサイドバー用のコンパクトなリマインダーです。
  if (variant === "sidebar") {
    return (
      <section className="rounded-2xl border border-bloom-sage/20 bg-white/55 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
          Today&apos;s reminder
        </p>

        <p className="text-sm leading-6 text-bloom-forest/80 dark:text-gray-300">
          {affirmation}
        </p>
      </section>
    )
  }

  // EN: Default full reminder card.
  // JP: 通常のリマインダーカードです。
  return (
    <section className="w-full rounded-2xl border border-bloom-sage/30 bg-white/70 px-4 py-4 shadow-sm backdrop-blur-sm dark:border-dark-border dark:bg-dark-surface/55">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
        Today&apos;s reminder
      </p>

      <p className="text-sm leading-relaxed text-bloom-forest dark:text-bloom-light">
        {affirmation}
      </p>
    </section>
  )
}

export default DailyAffirmationCard