{/* Receiving props */}
function Sidebar({ activePage, setActivePage }) {
    const navItems = [
        { id: "overview", label: "Overview" },
        { id: "home",     label: "Home" },
        { id: "routines", label: "Routines" },
        { id: "focus",    label: "Focus" },
        { id: "progress", label: "Progress" },
        { id: "rewards",  label: "Rewards" },
        { id: "profile",  label: "Profile" },
    ]

    return (
    <aside className="hidden md:flex flex-col w-56 min-h-screen bg-gradient-to-t from-[#f3f7ed] via-[#e8f0dd] to-[#dde9ce] dark:bg-[#0D1A0A]/90 border-r border-bloom-light dark:border-dark-border px-5 py-6"
    >
    
      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = activePage === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActivePage(item.id)}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 
                ${activePage === item.id
                  ? "bg-bloom-light dark:bg-dark-card text-bloom-forest dark:text-bloom-light shadow-sm"
                  : "text-bloom-forest/65 dark:text-bloom-light/65 hover:bg-bloom-light/50 dark:hover:bg-dark-card hover:text-bloom-forest dark:hover:text-bloom-light"
              }`}
              >

              <span className="flex-1">
                {item.label}
              </span>

              {isActive && (
                <span className="h-2 w-2 rounded-full bg-bloom-mint" />
              )}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar