export default function DemoBanner({
  demoType,
  onExitDemoClick,
}) {
  const demoLabels = {
    "simple": "A Quiet Start",
    "neurodivergent-day": "No pressure, no clutter",
    "full-app-preview": "Full Bloom",
  }

  const demoLabel = demoLabels[demoType] || "Demo Labels"

  return (
    <aside
      className="rounded-2xl border border-bloom-sage/30 bg-white/85 p-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-dark-surface/90"
      aria-label="Demo mode controls"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
        Welcome to {demoLabel}!
      </p>

      <p className="text-xs leading-relaxed text-bloom-forest/75 dark:text-gray-300">
        ꕤ Look around at whatever pace feels right.
      </p>

      <p className="text-xs leading-relaxed text-bloom-forest/75 dark:text-gray-300">
        ꕤ You're looking through sample data.
      </p>

      <div className="mt-4 flex flex-col items-start gap-3">
        <button
          type="button"
          onClick={onExitDemoClick}
          className="text-xs font-semibold text-bloom-forest underline-offset-4 transition hover:underline dark:text-bloom-light"
        >
          Finished Exploring?
        </button>
      </div>
    </aside>
  )
}