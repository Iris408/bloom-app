import { useState } from "react"
import { getDailyAffirmation } from "../../data/dailyAffirmations"

// EN: Shows one calm affirmation based on the current day.
// JP: 今日の日付に基づいて、落ち着いたメッセージを1つ表示します。
function DailyAffirmationCard({ variant = "panel" }) {
  const [isOpen, setIsOpen] = useState(false)
  const affirmation = getDailyAffirmation()

  if (variant === "collapsible") {
    return (
      <div className="rounded-xl border border-bloom-sage/20 bg-white/60 dark:border-dark-border dark:bg-dark-surface/45">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between px-3 py-3 text-left"
        >
          <span className="text-[11px] font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
            Today&apos;s reminder
          </span>

          <span className="text-xs font-semibold text-bloom-forest dark:text-bloom-light">
            {isOpen ? "Hide" : "Show"}
          </span>
        </button>

        {isOpen && (
          <div className="border-t border-bloom-sage/20 px-3 py-3 dark:border-dark-border">
            <p className="text-xs leading-relaxed text-bloom-forest dark:text-bloom-light">
              {affirmation}
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-bloom-sage/30 bg-white/70 p-5 dark:border-dark-border dark:bg-dark-surface/55">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
        Today&apos;s reminder
      </p>

      <p className="text-sm leading-relaxed text-bloom-forest dark:text-bloom-light">
        {affirmation}
      </p>
    </div>
  )
}

export default DailyAffirmationCard