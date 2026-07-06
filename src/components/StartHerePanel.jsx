// EN: First-time guidance panel for Bloom demo users
// JP: Bloomデモユーザー向けの初回ガイドパネル

export default function StartHerePanel({
  onStartRoutine,
  onAddTask,
  onStartFocus,
}) {
  return (
    <section className="rounded-[1.75rem] border border-bloom-sage/25 bg-white/65 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-6">
      <div className="mb-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
          Start here
        </p>

        <h2 className="text-2xl font-bold text-bloom-forest dark:text-bloom-light">
          Welcome to Bloom
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-bloom-forest/65 dark:text-gray-300">
          Start with one routine, one focus task, or one small task for today.
          You can explore the rest later.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <button
          type="button"
          onClick={onStartRoutine}
          className="rounded-2xl border border-bloom-sage/25 bg-bloom-light/70 px-4 py-4 text-left transition hover:bg-bloom-mint/60 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
        >
          <span className="block text-sm font-bold text-bloom-forest dark:text-bloom-light">
            Start a routine
          </span>

          <span className="mt-1 block text-xs leading-5 text-bloom-forest/60 dark:text-gray-300">
            Try one gentle routine step by step.
          </span>
        </button>

        <button
          type="button"
          onClick={onAddTask}
          className="rounded-2xl border border-bloom-sage/25 bg-bloom-light/70 px-4 py-4 text-left transition hover:bg-bloom-mint/60 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
        >
          <span className="block text-sm font-bold text-bloom-forest dark:text-bloom-light">
            Add one small task
          </span>

          <span className="mt-1 block text-xs leading-5 text-bloom-forest/60 dark:text-gray-300">
            Choose one simple task for today.
          </span>
        </button>

        <button
          type="button"
          onClick={onStartFocus}
          className="rounded-2xl border border-bloom-sage/25 bg-bloom-light/70 px-4 py-4 text-left transition hover:bg-bloom-mint/60 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
        >
          <span className="block text-sm font-bold text-bloom-forest dark:text-bloom-light">
            Begin a focus session
          </span>

          <span className="mt-1 block text-xs leading-5 text-bloom-forest/60 dark:text-gray-300">
            Pick one focus task and begin gently.
          </span>
        </button>
      </div>

      <p className="mt-5 text-xs leading-5 text-bloom-forest/55 dark:text-gray-400">
        Demo mode is for exploring Bloom without an account.
      </p>
    </section>
  )
}