import DailyAffirmationCard from "../home/DailyAffirmationCard"

function SidebarIcon({ type }) {
  const icons = {
    home: (
      <>
        <path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3V10.5z" />
      </>
    ),
    routines: (
      <>
        <path d="M7 3v3" />
        <path d="M17 3v3" />
        <path d="M4 8h16" />
        <path d="M5 5h14v16H5z" />
      </>
    ),
    focus: (
      <>
        <path d="M9 18h6" />
        <path d="M10 21h4" />
        <path d="M8 14c-1.3-1.2-2-2.8-2-4.5A6 6 0 0 1 18 9.5c0 1.7-.7 3.3-2 4.5-.7.6-1 1.3-1 2H9c0-.7-.3-1.4-1-2z" />
      </>
    ),
    progress: (
      <>
        <path d="M6 19V14" />
        <path d="M12 19V10" />
        <path d="M18 19V6" />
      </>
    ),
    moments: (
      <>
        <path d="M12 21s-6.5-4.35-9-8.15C1.05 9.95 2.7 6 6.6 6c2.14 0 3.3 1.1 4.1 2.3.8-1.2 1.96-2.3 4.1-2.3C18.7 6 20.35 9.95 21 12.85 18.5 16.65 12 21 12 21z" />
      </>
    ),
    profile: (
      <>
        <path d="M20 21a8 8 0 0 0-16 0" />
        <path d="M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
      </>
    ),
    settings: (
      <>
        <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5z" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.4 1.05V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8.6 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1.05-.4H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 0 1 7.04 3.9l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6A1.65 1.65 0 0 0 10.4 3V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 15.4 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.16.36.37.7.6 1 .28.37.66.6 1.05.6H21a2 2 0 0 1 0 4h-.09A1.65 1.65 0 0 0 19.4 15z" />
      </>
    ),
    help: (
      <>
        <path d="M9.1 9a3 3 0 1 1 5.8 1c-.45 1.1-1.35 1.55-2.05 2.25-.48.48-.85 1.05-.85 1.75" />
        <path d="M12 17h.01" />
        <circle cx="12" cy="12" r="10" />
      </>
    ),
  }

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
      {icons[type]}
    </svg>
  )
}

function Sidebar({ activePage, setActivePage }) {
  const navItems = [
    { id: "home", label: "Home", icon: "home" },
    { id: "routines", label: "Routines", icon: "routines" },
    { id: "focus", label: "Focus", icon: "focus" },
    { id: "progress", label: "Progress", icon: "progress" },
    { id: "moments", label: "Moments", icon: "moments" },
    { id: "profile", label: "Profile", icon: "profile" },
  ]

  const activePageLabel =
    navItems.find((item) => item.id === activePage)?.label ?? "Home"

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-bloom-sage/20 bg-white/25 p-4 dark:border-white/10 dark:bg-white/5 md:block">
      <div className="flex h-full flex-col rounded-[2rem] border border-bloom-sage/25 bg-white/55 px-4 py-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <button
          type="button"
          onClick={() => setActivePage("home")}
          className="mb-10 text-left"
          aria-label="Go to Bloom home"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl leading-none text-bloom-forest dark:text-bloom-mid lg:rotate-[180deg]">
              𖥸
            </span>

            <div>
              <h1 className="font-serif text-3xl font-bold leading-none tracking-wide text-bloom-forest dark:text-bloom-light">
                Bloom
              </h1>

              <p className="mt-1 text-xs font-semibold text-bloom-forest/50 dark:text-gray-400">
                {activePageLabel} v2.0.0
              </p>
            </div>
          </div>
        </button>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = activePage === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActivePage(item.id)}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-bloom-mid/50 text-bloom-light shadow-sm dark:bg-bloom-sky/60 dark:text-bloom-forest"
                    : "text-bloom-forest/70 hover:bg-bloom-light/70 hover:text-bloom-forest dark:text-bloom-light/60 dark:hover:bg-white/10 dark:hover:text-bloom-light"
                }`}
              >
                <span
                  className={
                    isActive
                      ? "text-bloom-light dark:text-bloom-forest"
                      : "text-bloom-forest/55 dark:text-bloom-light/45"
                  }
                >
                  <SidebarIcon type={item.icon} />
                </span>

                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-5 pt-8">
          <DailyAffirmationCard variant="sidebar" />

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setActivePage("settings")}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-bloom-sage/20 bg-white/70 text-bloom-forest/65 transition hover:bg-bloom-light hover:text-bloom-forest dark:border-white/10 dark:bg-white/10 dark:text-bloom-light/60 dark:hover:bg-white/15"
              aria-label="Open settings"
            >
              <SidebarIcon type="settings" />
            </button>

            <button
              type="button"
              onClick={() => setActivePage("help")}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-bloom-sage/20 bg-white/70 text-bloom-forest/65 transition hover:bg-bloom-light hover:text-bloom-forest dark:border-white/10 dark:bg-white/10 dark:text-bloom-light/60 dark:hover:bg-white/15"
              aria-label="Open help"
            >
              <SidebarIcon type="help" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar