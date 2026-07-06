import PageControlsDropdown from "./PageControlsDropdown"
import ProfileDropdown from "../auth/ProfileDropdown"
import Seedling from "../ui/Seedling"

function MoonIcon() {
  return (
    <span className="grid h-5 w-5 place-items-center" aria-hidden="true">
      <svg
        viewBox="0 0 20 20"
        className="h-[18px] w-[18px]"
        fill="currentColor"
      >
        <path d="M17.3 13.3A8 8 0 0 1 6.7 2.7a7 7 0 1 0 10.6 10.6z" />
      </svg>
    </span>
  )
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

function PublicHeader({
  activePage,
  setActivePage,
  isDarkMode,
  onToggleTheme,
  onLoginClick,
}) {
  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "about", label: "About" },
    { id: "privacy", label: "Privacy" },
    { id: "accessibility", label: "Accessibility" },
    { id: "faq", label: "FAQ" },
  ]

  return (
    <header className="absolute inset-x-0 top-0 z-40 px-4 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 bg-transparent">
        <button
          type="button"
          onClick={() => setActivePage("overview")}
          className="flex items-center gap-3 text-left text-3xl"
          aria-label="Go to Bloom overview"
        >
          <span className="text-bloom-forest dark:text-indigo-300">
            {isDarkMode ? <Seedling variant="indigo" /> : <Seedling />}
          </span>

          <div className="flex items-center gap-2">
            <p className="font-serif text-3xl font-bold leading-none text-bloom-forest dark:text-bloom-light">
              Bloom
            </p>

            <span className="hidden rounded-full border border-bloom-sage/20 bg-white/20 px-2 py-1 text-[11px] font-bold text-bloom-forest/65 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 sm:inline-flex">
              v2.0.0
            </span>
          </div>
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = activePage === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActivePage(item.id)}
                className={`text-sm font-bold transition ${
                  isActive
                    ? "text-bloom-forest dark:text-bloom-light"
                    : "text-bloom-forest/65 hover:text-bloom-forest dark:text-gray-300 dark:hover:text-bloom-light"
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bloom-sage/15 bg-white/20 text-bloom-forest transition hover:bg-bloom-mint/30 dark:border-white/10 dark:bg-white/5 dark:text-bloom-light dark:hover:bg-white/10"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          <PageControlsDropdown />

          <button
            type="button"
            onClick={onLoginClick}
            className="inline-flex items-center gap-2 rounded-2xl border border-bloom-sage/15 bg-white/20 px-3 py-2.5 text-sm font-bold text-bloom-forest transition hover:bg-white/35 dark:border-white/10 dark:bg-white/5 dark:text-bloom-light dark:hover:bg-white/10 sm:px-4"
          >
            <LockIcon />
            <span className="hidden sm:inline">Log in</span>
          </button>
        </div>
      </div>
    </header>
  )
}

function ProtectedHeader({
  activePage,
  setActivePage,
  isDarkMode,
  onToggleTheme,
  avatarDisplay,
  currentUser,
  onProfileClick,
  onLogout,
  reduceMotion = false,
  showPageControls = true,
}) {
  const pageLabels = {
    home: "Home",
    routines: "Routines",
    focus: "Focus",
    progress: "Progress",
    moments: "Moments",
    profile: "Profile",
    settings: "Settings",
  }

  const activePageLabel = pageLabels[activePage] ?? "Bloom"

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-bloom-sage/15 bg-transparent px-4 backdrop-blur-md dark:border-white/10 dark:bg-transparent md:h-16 md:justify-end md:px-6 md:h-16 lg:px-8">
      <button
        type="button"
        onClick={() => onProfileClick?.()}
        className="flex items-center gap-3 rounded-2xl px-2 py-2 text-left transition hover:bg-white/45 dark:hover:bg-white/10 md:hidden"
        aria-label="Open profile"
      >          
        <span className="text-2xl leading-none">
          <Seedling variant="indigo" />
        </span>

        <div>
          <p className="font-serif text-2xl font-bold leading-none text-bloom-forest dark:text-bloom-light">    
            Bloom
          </p>

          <p className="mt-1 text-[11px] font-semibold text-bloom-forest/50 dark:text-gray-400">
            {activePageLabel} v2.0.0
          </p>
        </div>
      </button>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onToggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-bloom-sage/25 bg-white/70 text-bloom-forest shadow-sm transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>

        {showPageControls && <PageControlsDropdown />}

        <ProfileDropdown
          avatarDisplay={avatarDisplay}
          currentUser={currentUser}
          setActivePage={setActivePage}
          onLogout={onLogout}
          reduceMotion={reduceMotion}
        />
      </div>
    </header>
  )
}

function Header({
  canUseApp = false,
  activePage,
  setActivePage,
  isDarkMode,
  onToggleTheme,
  avatarDisplay,
  currentUser,
  onProfileClick,
  onLoginClick,
  onLogout,
  reduceMotion = false,
  showPageControls = true,
}) {
  if (!canUseApp) {
    return (
      <PublicHeader
        activePage={activePage}
        setActivePage={setActivePage}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        onLoginClick={onLoginClick}
      />
    )
  }

  return (
    <ProtectedHeader
      activePage={activePage}
      setActivePage={setActivePage}
      isDarkMode={isDarkMode}
      onToggleTheme={onToggleTheme}
      avatarDisplay={avatarDisplay}
      currentUser={currentUser}
      onProfileClick={onProfileClick}
      onLogout={onLogout}
      reduceMotion={reduceMotion}
      showPageControls={showPageControls}
    />
  )
}

export default Header