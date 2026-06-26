export default function ExitDemoConfirmModal({
  onClose,
  onCreateAccount,
  onConfirmExit,
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-bloom-forest/40 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-demo-title"
    >
      <section className="w-full max-w-md rounded-3xl border border-bloom-sage/30 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-dark-surface">
        <div className="mb-5">
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-bloom-mid">
            Demo mode
          </p>

          <h2
            id="exit-demo-title"
            className="text-2xl font-bold text-bloom-forest dark:text-bloom-light"
          >
            Exit demo mode?
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
            You're currently exploring Bloom with sample data. If you exit now,
            you'll return to the Home page.
          </p>

          <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
            You can keep exploring, create an account, or exit the demo.
          </p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-bloom-mid px-4 py-3 text-sm font-semibold text-white transition hover:bg-bloom-forest"
          >
            ꕤ Keep exploring
          </button>

          <button
            type="button"
            onClick={onCreateAccount}
            className="w-full rounded-full border border-bloom-sage/40 px-4 py-3 text-sm font-semibold text-bloom-forest transition hover:bg-bloom-mint/30 dark:text-bloom-light dark:hover:bg-white/10"
          >
            Create account
          </button>

          <button
            type="button"
            onClick={onConfirmExit}
            className="w-full px-4 py-2 text-sm font-semibold text-gray-500 underline-offset-4 transition hover:text-bloom-forest hover:underline dark:text-gray-300 dark:hover:text-bloom-light"
          >
            Exit demo
          </button>
        </div>
      </section>
    </div>
  );
}