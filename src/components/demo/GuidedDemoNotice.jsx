function GuidedDemoNotice({
  pageName = "this page",
  demoType = "simple",
  onGoHome,
  onCreateAccount,
}) {
  const isNeurodivergentDemo = demoType === "neurodivergent"

  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center justify-center px-4 py-10">
      <div className="w-full rounded-[2rem] border border-bloom-sage/25 bg-white/65 p-6 text-center shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-bloom-light text-3xl dark:bg-white/10">
          🌿
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Guided demo
        </p>

        <h2 className="mt-3 text-2xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-3xl">
          {isNeurodivergentDemo
            ? "This calm demo keeps everything in one place."
            : "This simple demo keeps everything on Home."}
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-bloom-forest/65 dark:text-gray-300">
          {isNeurodivergentDemo
            ? `To keep the experience lighter, ${pageName} is included on the Home page in this demo. You can explore the full app preview when you are ready.`
            : `In Simple Day, ${pageName} is included on the Home page so you can try Bloom without switching between lots of pages.`}
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onGoHome}
            className="rounded-2xl bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest dark:hover:bg-bloom-light"
          >
            Go to Home
          </button>

          <button
            type="button"
            onClick={onCreateAccount}
            className="rounded-2xl border border-bloom-sage/25 bg-white/70 px-5 py-3 text-sm font-bold text-bloom-forest transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
          >
            Create your space
          </button>
        </div>

        <p className="mt-5 text-xs leading-5 text-bloom-forest/45 dark:text-gray-400">
          Full App Preview lets you explore routines, focus, progress, moments,
          and settings together.
        </p>
      </div>
    </section>
  )
}

export default GuidedDemoNotice