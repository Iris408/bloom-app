import { useApp } from "../../context/AppContext"
import ProfileDropdown from "../auth/ProfileDropdown"
import Seedling from "../ui/Seedling"
import PageControlsDropdown from "./PageControlsDropdown"

function Header({
  setActivePage,
  activePage,
  currentUser,
  isDemoMode = false,
  onLogout,
  onLoginClick,
  reduceMotion = false,
}) {
  const { isDarkMode, toggleDarkMode } = useApp()

  // EN: Demo mode users can enter the app, even without a real account.
  // JP: デモモードのユーザーは、実際のアカウントなしでもアプリに入れます。
  const canUseApp = Boolean(currentUser) || isDemoMode

  function SunIcon() {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="M4.93 4.93l1.41 1.41" />
        <path d="M17.66 17.66l1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="M4.93 19.07l1.41-1.41" />
        <path d="M17.66 6.34l1.41-1.41" />
      </svg>
    )
  }

  function MoonIcon() {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
      </svg>
    )
  }

  return (
    <header className="w-full border-b border-bloom-sage/25 bg-transparent px-6 py-4 dark:border-white/10 dark:bg-transparent">
      <div className="flex items-center justify-between gap-4">
        {/* Logo - left side */}
        <div
          onClick={() => setActivePage(canUseApp ? "home" : "overview")}
          className="flex cursor-pointer items-center gap-3"
        >
          <span className="cursor-pointer text-3xl text-bloom-forest dark:text-bloom-light">
            <Seedling variant="indigo" />
          </span>

          <div>
            <h1 className="cursor-pointer text-2xl font-bold tracking-wide text-bloom-forest dark:text-bloom-light">
              Bloom
            </h1>

            <p className="text-xs font-lg uppercase tracking-[0.18em] text-bloom-mid dark:text-blue-500/80">
              Calm routines
            </p>
          </div>
        </div>

        {/* EN: Public navigation links for logged-out users only */}
        {/* JP: 未ログインユーザーだけに表示する公開ナビゲーションリンク */}
        {!canUseApp && (
          <nav className="hidden flex-1 items-center justify-center gap-7 md:flex">
            <button
              type="button"
              onClick={() => setActivePage("overview")}
              className={`text-base font-semibold transition ${
                activePage === "overview"
                  ? "text-bloom-forest dark:text-bloom-light"
                  : "text-bloom-forest/70 hover:text-bloom-forest dark:text-bloom-light/70 dark:hover:text-bloom-light"
              }`}
            >
              Overview
            </button>

            <button
              type="button"
              onClick={() => setActivePage("about")}
              className={`text-base font-semibold transition ${
                activePage === "about"
                  ? "text-bloom-forest dark:text-bloom-light"
                  : "text-bloom-forest/70 hover:text-bloom-forest dark:text-bloom-light/70 dark:hover:text-bloom-light"
              }`}
            >
              About
            </button>

            <button
              type="button"
              onClick={() => {
                setActivePage("overview")

                setTimeout(() => {
                  const section = document.getElementById("feedback")

                  if (!section) return

                  section.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                }, 100)
              }}
              className="text-base font-semibold text-bloom-forest/70 transition hover:text-bloom-forest dark:text-bloom-light/70 dark:hover:text-bloom-light"
            >
              Feedback
            </button>
          </nav>
        )}

        {/* Right side — dark mode toggle + page controls + login/profile */}
        <div className="no-dyslexic flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bloom-sage/30 bg-bloom-light/70 text-bloom-forest transition hover:bg-bloom-mint/30 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/20"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          <PageControlsDropdown />

          {currentUser ? (
            <ProfileDropdown
              currentUser={currentUser}
              setActivePage={setActivePage}
              onLogout={onLogout}
              reduceMotion={reduceMotion}
            />
          ) : !isDemoMode ? (
            <button
              type="button"
              onClick={onLoginClick}
              className="rounded-full border border-bloom-sage/30 bg-bloom-light/80 px-5 py-2.5 text-sm font-semibold text-bloom-forest transition hover:bg-bloom-mint/30 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/20"
            >
              Log in
            </button>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default Header