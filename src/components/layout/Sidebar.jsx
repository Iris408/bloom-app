import DailyAffirmationCard from "../home/DailyAffirmationCard"

function Sidebar({ activePage, setActivePage }) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "routines", label: "Routines" },
    { id: "focus", label: "Focus" },
    { id: "progress", label: "Progress" },
    { id: "moments", label: "Moments" },
    { id: "profile", label: "Profile" },
  ]

  return (
    <aside className="hidden min-h-screen w-56 flex-col border-r border-bloom-light bg-transparent px-5 py-6 dark:border-[#343442] dark:bg-transparent md:flex">
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = activePage === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActivePage(item.id)}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-bloom-light text-bloom-forest dark:bg-[#70708F]/35 dark:text-bloom-light"
                  : "text-bloom-forest/65 hover:bg-bloom-light/50 hover:text-bloom-forest dark:text-bloom-light/55 dark:hover:bg-[#70708F]/75 dark:hover:text-bloom-light"
              }`}
            >
              <span className="flex-1">{item.label}</span>

              {isActive && (
                <span className="h-2 w-2 rounded-full bg-bloom-mint dark:bg-bloom-light" />
              )}
            </button>
          )
        })}
      </nav>

      <div className="mt-8">
        <DailyAffirmationCard variant="sidebar" />
      </div>
    </aside>
  )
}

export default Sidebar