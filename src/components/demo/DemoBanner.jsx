export default function DemoBanner({
  demoType,
  onCreateAccount,
  onExitDemoClick,
}) {
  const demoLabels = {
    "simple-day": "Simple Day",
    "neurodivergent-friendly": "Neurodivergent-friendly Day",
    "full-preview": "Full App Preview",
  }

  const demoLabel = demoLabels[demoType] || "Demo"

  return (
    <aside
      className="rounded-2xl border border-bloom-sage/30 bg-white/85 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-dark-surface/90"
      aria-label="Demo mode controls"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
        Demo mode
      </p>

      <h3 className="mb-2 text-2xl font-bold text-bloom-forest dark:text-bloom-light">
        {demoLabel}
      </h3>

      <p className="text-sm leading-relaxed text-bloom-forest/75 dark:text-gray-300">
        You're exploring Bloom with sample data. Nothing here is connected to a
        real account yet.
      </p>

      <div className="mt-4 flex flex-col items-start gap-3">
        <button
          type="button"
          onClick={onCreateAccount}
          className="rounded-full bg-bloom-mid px-1.5 py-1.75 text-xs font-semibold text-white transition hover:bg-bloom-forest"
        >
          Create account
        </button>

        <button
          type="button"
          onClick={onExitDemoClick}
          className="text-xs font-semibold text-bloom-forest underline-offset-4 transition hover:underline dark:text-bloom-light"
        >
          Exit demo
        </button>
      </div>
    </aside>
  )
}