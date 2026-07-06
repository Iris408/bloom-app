import Seedling from "../ui/Seedling"

function Footer({
  setActivePage,
  onLoginClick,
  onTryDemoClick,
  onCreateAccountClick,
}) {
  return (
    <footer className="relative z-10 w-full overflow-x-hidden border-t border-bloom-sage/20 bg-white/35 px-4 py-8 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:px-6 sm:py-10">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-7 text-bloom-forest dark:text-bloom-light lg:grid-cols-[1.35fr_2.65fr] lg:gap-12">
        {/* Brand */}
        <div className="min-w-0">
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
        </div>

        {/* Footer links */}
        <div className="grid min-w-0 grid-cols-3 gap-4 sm:gap-8">
          <div className="min-w-0">
            <p className="mb-3 text-sm font-bold text-bloom-forest dark:text-bloom-light">
              Product
            </p>

            <div className="flex min-w-0 flex-col gap-2 text-[13px] leading-5 text-bloom-forest/65 dark:text-gray-300 sm:text-sm">
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
                Try Bloom Demo
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

            <div className="flex min-w-0 flex-col gap-2 text-[13px] leading-5 text-bloom-forest/65 dark:text-gray-300 sm:text-sm">
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
                className="w-fit max-w-full break-words text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
              >
                Accessibility
              </button>

              <button
                type="button"
                onClick={() => setActivePage("faq")}
                className="w-fit max-w-full text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
              >
                FAQ
              </button>


              <button
                type="button"
                onClick={() => setActivePage("feedback")}
                className="w-fit max-w-full text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
              >
                Feedback
              </button>

              <button
                type="button"
                onClick={() => setActivePage("roadmap")}
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

            <div className="flex min-w-0 flex-col gap-2 text-[13px] leading-5 text-bloom-forest/65 dark:text-gray-300 sm:text-sm">
              <button
                type="button"
                onClick={() => setActivePage("privacy")}
                className="w-fit max-w-full text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
              >
                Privacy
              </button>

              <span className="break-words">No real data in demo</span>
              <span className="break-words">No tracking or ads</span>
              <span className="break-words">You're in control</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-7xl flex-col gap-2 border-t border-bloom-sage/15 pt-5 text-xs text-bloom-forest/55 dark:border-white/10 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">

        <p>© 2026 Bloom. All rights reserved.</p>
        <p>Made with care for all minds.</p>

      </div>
    </footer>
  )
}

export default Footer