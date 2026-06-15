import BloomReminder from "../components/ui/BloomReminder"

function Rewards() {
  return (
    <div className="flex flex-col gap-8">
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-blue-500/80">
          Bloom Wins 
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          ⟡ Rewards
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          A quiet space for recognising progress, completed steps, and small wins.
        </p>
      </section>

      <section className="rounded-2xl border border-bloom-sage/30 bg-white/80 p-5 dark:border-dark-border dark:bg-dark-surface/55">
        <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
          Coming soon
        </p>

        <h3 className="mt-3 text-xl font-bold text-bloom-forest dark:text-bloom-light">
          Gentle rewards are on the way
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          Rewards v1 will later show badges, small wins and gentle reminders without pressure.
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
              Routine badges
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Celebrate routines completed over time.
            </p>
          </div>

          <div className="rounded-xl bg-bloom-light/60 p-4 dark:bg-dark-card">
            <p className="text-sm font-semibold text-bloom-forest dark:text-bloom-light">
              Gentle reminders
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Track consistency in a calm, low-pressure way.
            </p>
          </div>
        </div>
      </section>

      <BloomReminder
        reminder="You earned this. All wins deserve to be noticed."
        phaseTitle="Rewards v1"
        phaseDescription="This page will later show badges, streaks, completed routines, and gentle rewards for progress."
      />
    </div>
  )
}

export default Rewards