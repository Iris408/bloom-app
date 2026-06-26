import Seedling from "../ui/Seedling"

function Footer({
  setActivePage,
  onLoginClick,
  onTryDemoClick,
  onCreateAccountClick,
}) {
  return (
    <footer className="relative z-10 border-t border-bloom-sage/20 bg-white/35 px-6 py-10 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 text-bloom-forest dark:text-bloom-light md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-2xl">
              <Seedling variant="indigo" />
            </span>

            <p className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
              Bloom
            </p>
          </div>

          <p className="max-w-sm text-sm leading-6 text-bloom-forest/70 dark:text-gray-300">
            Gentle tools for calm days, focus sessions, and steady progress.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-bloom-forest dark:text-bloom-light">
            Product
          </p>

          <div className="flex flex-col gap-2 text-sm text-bloom-forest/65 dark:text-gray-300">
            <button
              type="button"
              onClick={() => setActivePage("overview")}
              className="text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              Overview
            </button>

            <button
              type="button"
              onClick={onTryDemoClick}
              className="text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              Try our Demo
            </button>

            <button
              type="button"
              onClick={onCreateAccountClick}
              className="text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              Create account
            </button>

            <button
              type="button"
              onClick={onLoginClick}
              className="text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              Log in
            </button>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-bloom-forest dark:text-bloom-light">
            Company
          </p>

          <div className="flex flex-col gap-2 text-sm text-bloom-forest/65 dark:text-gray-300">
            <button
              type="button"
              onClick={() => setActivePage("about")}
              className="text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              About Us
            </button>

            <button
              type="button"
              onClick={() => setActivePage("accessibility")}
              className="text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              Accessibility
            </button>

            <button
              type="button"
              onClick={() => setActivePage("overview")}
              className="text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              Feedback
            </button>

            <button
              type="button"
              onClick={() => setActivePage("overview")}
              className="text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              Roadmap
            </button>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold text-bloom-forest dark:text-bloom-light">
            Trust
          </p>

          <div className="flex flex-col gap-2 text-sm text-bloom-forest/65 dark:text-gray-300">
            <button
              type="button"
              onClick={() => setActivePage("privacy")}
              className="text-left transition hover:text-bloom-forest dark:hover:text-bloom-light"
            >
              Privacy
            </button>

            <span>No real data in demo</span>
            <span>No tracking or ads</span>
            <span>You’re in control</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer