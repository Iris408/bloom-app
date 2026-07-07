function DemoInfoCard({ title, text, icon }) {
  return (
    <article className="rounded-[1.5rem] border border-bloom-sage/25 bg-white/65 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-bloom-light text-xl dark:bg-white/10">
        {icon}
      </div>

      <h3 className="text-base font-bold text-bloom-forest dark:text-bloom-light">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-bloom-forest/65 dark:text-gray-300">
        {text}
      </p>
    </article>
  )
}

function DemoStartHerePanel({
  onStartRoutine,
  onCreateAccount,
}) {
  return (
    <section className="mb-6 rounded-[2rem] border border-bloom-sage/25 bg-white/50 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-5 lg:p-6">      {/* Bottom row */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
        <article className="rounded-[1.5rem] border border-bloom-sage/25 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="text-base font-bold text-bloom-forest dark:text-bloom-light">
            𑁍 Try a routine first
          </h3>

          <p className="mt-2 text-sm leading-6 text-bloom-forest/65 dark:text-gray-300">
            Routines are the easiest way to understand how Bloom supports small,
            calm steps.
          </p>

          <button
            type="button"
            onClick={onStartRoutine}
            className="mt-4 rounded-2xl bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest dark:hover:bg-bloom-light"
          >
            Start with routines
          </button>
        </article>

        <article className="rounded-[1.5rem] border border-bloom-sage/25 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="text-base font-bold text-bloom-forest dark:text-bloom-light">
            𑁍 Want to save your progress?
          </h3>

          <p className="mt-2 text-sm leading-6 text-bloom-forest/65 dark:text-gray-300">
            Create your space when you are ready to keep routines, tasks, and
            preferences.
          </p>

          <button
            type="button"
            onClick={onCreateAccount}
            className="mt-4 rounded-2xl border border-bloom-sage/25 bg-white/75 px-5 py-3 text-sm font-bold text-bloom-forest transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
          >
            Create your space
          </button>
        </article>

        <article className="rounded-[1.5rem] border border-dashed border-bloom-sage/35 bg-bloom-light/45 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="text-base font-bold text-bloom-forest dark:text-bloom-light">
            𑁍 Sample data only
          </h3>

          <p className="mt-2 text-sm leading-6 text-bloom-forest/65 dark:text-gray-300">
            Demo mode is safe to explore, but avoid entering private personal
            information here.
          </p>
        </article>
      </div>
    </section>
  )
}

export default DemoStartHerePanel