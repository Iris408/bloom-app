import BloomReminder from "../components/ui/BloomReminder"

function Moments() {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-blue-500/80">
          Bloom Moments
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          Moments
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          A gentle place to notice small moments of progress.
        </p>
      </section>

      <section className="rounded-2xl border border-bloom-sage/30 bg-white/80 p-5 dark:border-dark-border dark:bg-dark-surface/55">
        <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
          Coming soon
        </p>

        <h3 className="mt-3 text-xl font-bold text-bloom-forest dark:text-bloom-light">
          Bloom Moments are on the way
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          Moments v1 will later help you notice small wins, completed routines,
          and gentle progress without pressure.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-bloom-light/60 p-4 dark:bg-dark-card">
            <p className="text-sm font-semibold text-bloom-forest dark:text-bloom-light">
              Small wins
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Notice progress without needing perfection.
            </p>
          </div>

          <div className="rounded-xl bg-bloom-light/60 p-4 dark:bg-dark-card">
            <p className="text-sm font-semibold text-bloom-forest dark:text-bloom-light">
              Completed routines
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Look back at routines you completed over time.
            </p>
          </div>

          <div className="rounded-xl bg-bloom-light/60 p-4 dark:bg-dark-card">
            <p className="text-sm font-semibold text-bloom-forest dark:text-bloom-light">
              Gentle reflections
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Review progress in a calm, low-pressure way.
            </p>
          </div>
        </div>
      </section>

      <BloomReminder
        reminder="Small moments count, even when the day feels unfinished."
        phaseTitle="Moments v1"
        phaseDescription="This page will later show small wins, completed routines, and gentle reflections on progress."
      />
    </div>
  )
}

export default Moments