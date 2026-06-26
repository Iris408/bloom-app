export default function DemoBanner({
  demoType,
  onCreateAccount,
  onExitDemoClick,
}) {
  const demoLabels = {
    "gentle-start": "A Quiet Start",
    "neurodivergent-friendly": "Neurodivergent-friendly",
    "full-bloom": "Full Bloom",
  }

  const demoLabel = demoLabels[demoType] || "Demo Labels"

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

      <p className="text-xs leading-relaxed text-bloom-forest/75 dark:text-gray-300">
        ꕤ You're currently exploring Bloom with sample data.
      </p>

      <p className="text-xs leading-relaxed text-bloom-forest/75 dark:text-gray-300">
        ꕤ Your changes aren't saved to an account just yet.
      </p>

      <div className="mt-4 flex flex-col items-start gap-3">
        <button
          type="button"
          onClick={onExitDemoClick}
          className="text-xs font-semibold text-bloom-forest underline-offset-4 transition hover:underline dark:text-bloom-light"
        >
          Finish Exploring
        </button>
      </div>
    </aside>
  )
}