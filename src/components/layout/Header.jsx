import { useApp } from "../../context/AppContext"
import ProfileDropdown from "../auth/ProfileDropdown"
import Seedling from "../ui/Seedling"

function Header({ setActivePage, activePage, currentUser, onLogout, onLoginClick, reduceMotion=false }) {
  const { isDarkMode, toggleDarkMode } = useApp()

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
    <header className="w-full bg-transparent dark:bg-transparent border-b border-bloom-sage/25 dark:border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo - left side */}
        <div 
          onClick={() => setActivePage(currentUser ? "home" : "overview")}
          className="flex items-center gap-3 cursor-pointer">
          <span className="text-3xl cursor-pointer text-bloom-forest dark:text-bloom-light">
            <Seedling variant="indigo" />
          </span>

          <div>
            <h1 className="text-2xl font-bold tracking-wide cursor-pointer text-bloom-forest dark:text-bloom-light">
              Bloom
            </h1>

            <p className="text-xs uppercase tracking-[0.18em] text-bloom-mid dark:text-blue-500/80 font-lg">
              Calm routines
            </p>
          </div>
        </div>

        {/* Right side — dark mode toggle + login/profile menu */}
        <div className="no-dyslexic flex shrink-0 items-center gap-3">
          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bloom-sage/30 bg-bloom-light/70 text-bloom-forest transition hover:bg-bloom-mint/30 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/20"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Login button or logged-in profile profile dropdown */}
          {currentUser ?  (
            <ProfileDropdown
              currentUser={currentUser}
              setActivePage={setActivePage}
              onLogout={onLogout}
              reduceMotion={reduceMotion}
            />
          ) : (
            <button
              type="button"
              onClick={onLoginClick}
              className="rounded-full border border-bloom-sage/30 bg-bloom-light/80 px-4 py-2 text-sm font-semibold text-bloom-forest transition hover:bg-bloom-mint/30 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/20"
            >
              Log in
            </button>  
          )}
        </div>
      </div>
    </header>
  )
}

export default Header