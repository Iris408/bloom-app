function BloomReminder({
  reminder = "A routine does not have to be perfect to be helpful.",
  phaseTitle = "Bloom v1",
  phaseDescription = "Build calm, accessible routines with simple step-by-step structure.",
}) {
  return (
    <aside className="flex flex-col gap-5 border-t border-bloom-sage/20 dark:border-[#343442] pt-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage/80 mb-3">
          Bloom reminder
        </p>

        <blockquote className="text-base font-semibold leading-relaxed text-bloom-forest dark:text-bloom-light/90">
          "{reminder}"
        </blockquote>
      </div>

      <div className="rounded-2xl bg-bloom-forest dark:bg-dark-surface text-bloom-light p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mint dark:text-bloom-mid mb-2">
          Current phase
        </p>

        <h3 className="text-lg dark:text-bloom-light font-bold mb-2">
          {phaseTitle}
        </h3>

        <p className="text-sm leading-relaxed text-bloom-light/90">
          {phaseDescription}
        </p>
      </div>
    </aside>
  )
}

export default BloomReminder