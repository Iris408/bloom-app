import PageControlsDropdown from "./PageControlsDropdown"

function MoonIcon() {
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
      <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5z" />
    </svg>
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
  ]

  return (
    <header className="sticky top-0 z-40 px-4 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[2rem] border border-bloom-sage/25 bg-white/55 px-4 py-3 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:px-5">
        <button
          type="button"
          onClick={() => setActivePage("overview")}
          className="flex items-center gap-3 text-left"
          aria-label="Go to Bloom overview"
        >
          <span className="text-3xl leading-none text-bloom-forest dark:text-bloom-light">
            𖥸
          </span>

          <div className="flex items-center gap-2">
            <p className="font-serif text-3xl font-bold leading-none text-bloom-forest dark:text-bloom-light">
              Bloom
            </p>

            <span className="hidden rounded-full border border-bloom-sage/25 bg-bloom-light px-2 py-1 text-[11px] font-bold text-bloom-forest/65 dark:border-white/10 dark:bg-white/10 dark:text-gray-300 sm:inline-flex">
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-bloom-sage/25 bg-white/70 text-bloom-forest shadow-sm transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
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
            className="hidden items-center gap-2 rounded-2xl border border-bloom-sage/25 bg-white/70 px-4 py-2.5 text-sm font-bold text-bloom-forest shadow-sm transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15 sm:inline-flex"
          >
            <LockIcon />
            Log in
          </button>
        </div>
      </div>
    </header>
  )
}

function ProtectedHeader({
  activePage,
  isDarkMode,
  onToggleTheme,
  avatarDisplay,
  currentUser,
  onProfileClick,
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
  const shouldShowAvatar = Boolean(avatarDisplay?.avatarUrl)

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-bloom-sage/15 bg-bloom-cream/65 px-4 backdrop-blur-md dark:border-white/10 dark:bg-bloom-light/5 md:h-16 md:justify-end md:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => onProfileClick?.()}
        className="flex items-center gap-3 rounded-2xl px-2 py-2 text-left transition hover:bg-white/45 dark:hover:bg-white/10 md:hidden"
        aria-label="Open profile"
      >
        <span className="text-2xl leading-none text-bloom-forest dark:text-bloom-light">
          𖥸
        </span>

        <div>
          <p className="font-serif text-2xl font-bold leading-none text-bloom-forest dark:text-bloom-light">
            Bloom
          </p>

          <p className="mt-1 text-[11px] font-semibold text-bloom-forest/50 dark:text-gray-400">
            {activePageLabel} v1.1.0
          </p>
        </div>
      </button>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onToggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-bloom-sage/25 bg-white/70 text-bloom-forest shadow-sm transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>

        {showPageControls && <PageControlsDropdown />}

        <button
          type="button"
          onClick={() => onProfileClick?.()}
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-bloom-forest text-sm font-bold text-bloom-light shadow-sm transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest"
          aria-label="Open profile"
        >
          {shouldShowAvatar ? (
            <img
              src={avatarDisplay.avatarUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            avatarDisplay?.initial ??
            currentUser?.username?.[0]?.toUpperCase() ??
            "A"
          )}
        </button>
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
      isDarkMode={isDarkMode}
      onToggleTheme={onToggleTheme}
      avatarDisplay={avatarDisplay}
      currentUser={currentUser}
      onProfileClick={onProfileClick}
      showPageControls={showPageControls}
    />
  )
}

export default Header