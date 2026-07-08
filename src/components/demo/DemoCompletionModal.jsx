function DemoCompletionModal({
  isOpen,
  onClose,
  onCreateAccount,
  onFinishDemo,
}) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-bloom-forest/20 px-4 pb-4 backdrop-blur-sm sm:items-center sm:pb-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-completion-title"
    >
      <div className="bloom-soft-rise relative w-full max-w-md rounded-[2rem] border border-bloom-sage/25 bg-white/95 p-5 text-bloom-forest shadow-2xl dark:border-white/10 dark:bg-[#252532] dark:text-bloom-light sm:p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-bloom-light/70 text-sm font-bold text-bloom-forest transition hover:bg-bloom-mint/70 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
          aria-label="Close demo completion message"
        >
          𝒙
        </button>

        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-bloom-light text-4xl shadow-sm dark:bg-white/10">
          🌿
        </div>

        <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Demo step complete
        </p>

        <h2
          id="demo-completion-title"
          className="mt-3 text-center text-3xl font-bold leading-tight text-bloom-forest dark:text-bloom-light"
        >
          You did it 🌿
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-7 text-bloom-forest/65 dark:text-gray-300">
          You completed a small Bloom step. Small progress counts here.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onCreateAccount}
            className="w-full rounded-2xl bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light shadow-sm transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest dark:hover:bg-bloom-light"
          >
            Create your space
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl border border-bloom-sage/25 bg-white/70 px-5 py-3 text-sm font-bold text-bloom-forest transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
          >
            Continue exploring
          </button>

          <button
            type="button"
            onClick={onFinishDemo}
            className="w-full rounded-2xl px-5 py-2.5 text-sm font-bold text-bloom-forest/60 transition hover:bg-bloom-light/70 dark:text-gray-300 dark:hover:bg-white/10"
          >
            Finish demo
          </button>
        </div>
      </div>
    </div>
  )
}

export default DemoCompletionModal