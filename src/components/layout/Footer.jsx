import Seedling from "../ui/Seedling"

function Footer({
  setActivePage,
  onLoginClick,
  onTryDemoClick,
  onCreateAccountClick,
}) {
  return (
    <footer className="relative z-10 w-full overflow-x-hidden border-t border-bloom-sage/20 bg-white/35 px-4 py-8 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:px-6 sm:py-10">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 text-bloom-forest dark:text-bloom-light sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="min-w-0 sm:col-span-2 lg:col-span-1">
          <div className="mb-3 flex min-w-0 items-center gap-2">
            <span className="shrink-0 text-2xl">
              <Seedling variant="indigo" />
            </span>

            <p className="min-w-0 text-2xl font-bold text-bloom-forest dark:text-bloom-light sm:text-3xl">
              Bloom
            </p>
          </div>

          <p className="max-w-sm text-sm leading-6 text-bloom-forest/70 dark:text-gray-300">
            Gentle tools for calm days, focus sessions, and steady progress.
          </p>

          <div className="mt-5 max-w-sm rounded-2xl border border-bloom-sage/20 bg-white/45 px-4 py-3 text-sm text-bloom-forest/75 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
            Made with care for all minds.
          </div>
        </div>

        <div className="min-w-0">
          <p className="mb-3 text-sm font-bold text-bloom-forest dark:text-bloom-light">
            Product
          </p>

          <div className="flex min-w-0 flex-col gap-2 text-sm text-bloom-forest/65 dark:text-gray-300">
            <button
              type="button"
              onClick={() => setActivePage("overview")}
              className="w-fit max-w-full text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              Overview
            </button>

            <button
              type="button"
              onClick={onTryDemoClick}
              className="w-fit max-w-full text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              Demo
            </button>

            <button
              type="button"
              onClick={onCreateAccountClick}
              className="w-fit max-w-full text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              Create account
            </button>

            <button
              type="button"
              onClick={onLoginClick}
              className="w-fit max-w-full text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              Log in
            </button>
          </div>
        </div>

        <div className="min-w-0">
          <p className="mb-3 text-sm font-bold text-bloom-forest dark:text-bloom-light">
            Company
          </p>

          <div className="flex min-w-0 flex-col gap-2 text-sm text-bloom-forest/65 dark:text-gray-300">
            <button
              type="button"
              onClick={() => setActivePage("about")}
              className="w-fit max-w-full text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              About
            </button>

            <button
              type="button"
              onClick={() => setActivePage("accessibility")}
              className="w-fit max-w-full text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              Accessibility
            </button>

            <button
              type="button"
              onClick={() => setActivePage("overview")}
              className="w-fit max-w-full text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              Roadmap
            </button>
          </div>
        </div>

        <div className="min-w-0">
          <p className="mb-3 text-sm font-bold text-bloom-forest dark:text-bloom-light">
            Trust
          </p>

          <div className="flex min-w-0 flex-col gap-2 text-sm text-bloom-forest/65 dark:text-gray-300">
            <button
              type="button"
              onClick={() => setActivePage("privacy")}
              className="w-fit max-w-full text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              Privacy
            </button>

            <span className="break-words">No real data in demo</span>
            <span className="break-words">No tracking or ads</span>
            <span className="break-words">You’re in control</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer