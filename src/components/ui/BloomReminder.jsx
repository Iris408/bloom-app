function BloomReminder({
  reminder = "A routine does not have to be perfect to be helpful.",
  phaseTitle = "Bloom v1",
  phaseDescription = "Build calm, accessible routines with simple step-by-step structure.",
}) {
  return (
    <section className="w-full max-w-full overflow-hidden rounded-2xl border-t border-bloom-sage/20 p-5 pt-6 dark:border-[#343442]">
      <div className="flex w-full min-w-0 flex-col gap-5">
        {/* EN: Gentle reminder text */}
        {/* JP: やさしいリマインダーテキスト */}
        <div className="min-w-0">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage/80">
            Bloom reminder
          </p>

          <blockquote className="break-words text-base font-semibold leading-relaxed text-bloom-forest dark:text-bloom-light/90">
            “{reminder}”
          </blockquote>
        </div>

        {/* EN: Current project phase card */}
        {/* JP: 現在のプロジェクトフェーズカード */}
        <div className="min-w-0 rounded-2xl bg-bloom-forest p-5 text-bloom-light dark:bg-dark-surface">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-bloom-mint dark:text-bloom-mid">
            Current phase
          </p>

          <h3 className="mb-2 break-words text-lg font-bold text-bloom-light">
            {phaseTitle}
          </h3>

          <p className="break-words text-sm leading-relaxed text-bloom-light/90">
            {phaseDescription}
          </p>
        </div>
      </div>
    </section>
  )
}

export default BloomReminder