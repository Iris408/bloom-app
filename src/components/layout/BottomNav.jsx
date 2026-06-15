function HomeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5.5 10v10h13V10" />
      <path d="M9.5 20v-6h5v6" />
    </svg>
  )
}

function RoutinesIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 6h12" />
      <path d="M8 12h12" />
      <path d="M8 18h12" />
      <path d="M4 6h.01" />
      <path d="M4 12h.01" />
      <path d="M4 18h.01" />
    </svg>
  )
}

function FocusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M8 14c-1.3-1.2-2-2.8-2-4.5A6 6 0 0 1 18 9.5c0 1.7-.7 3.3-2 4.5-.7.6-1 1.3-1 2H9c0-.7-.3-1.4-1-2z" />
    </svg>
  )
}

function ProgressIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 19V14" />
      <path d="M12 19V10" />
      <path d="M18 19V6" />
    </svg>
  )
}

function MomentsIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
      <path d="M18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8L18 16z" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.4-4 4-6 7-6s5.6 2 7 6" />
    </svg>
  )
}

function BottomNav({ activePage, setActivePage }) {
  const navItems = [
    { id: "home", icon: <HomeIcon />, label: "Home" },
    { id: "routines", icon: <RoutinesIcon />, label: "Routines" },
    { id: "focus", icon: <FocusIcon />, label: "Focus" },
    { id: "progress", icon: <ProgressIcon />, label: "Progress" },
    { id: "moments", icon: <MomentsIcon />, label: "Moments" },
    { id: "profile", icon: <ProfileIcon />, label: "Profile" },
  ]

  return (
    <nav className="no-dyslexic fixed bottom-0 left-0 right-0 z-50 flex border-t border-bloom-forest bg-white px-2 py-2 md:hidden">
      <div className="flex w-full items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActivePage(item.id)}
            aria-label={`Go to ${item.label}`}
            className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-1 transition ${
              activePage === item.id
                ? "text-bloom-forest"
                : "text-gray-400 hover:text-bloom-mid"
            }`}
          >
            <span className="flex h-7 w-7 items-center justify-center">
              {item.icon}
            </span>

            <span className="text-[11px] font-medium leading-none">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav