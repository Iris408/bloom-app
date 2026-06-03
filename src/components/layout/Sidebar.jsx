{/* Receiving props */}
function Sidebar({ activePage, setActivePage }) {
    const navItems = [
        { id: "overview", icon: "⎘", label: "Overview" },
        { id: "home",     icon: "⌂", label: "Home" },
        { id: "routines", icon: "◴", label: "Routines" },
        { id: "focus",    icon: "𖣠", label: "Focus" },
        { id: "progress", icon: "√", label: "Progress" },
        { id: "rewards",  icon: "⟡", label: "Rewards" },
        { id: "profile",  icon: "⌖", label: "Profile" },
    ]

    return (
        <aside className="hidden md:flex flex-col w-56 min-h-screen bg-white dark:bg-gray-800 border-r border-bloom-light dark:border-gray-700 px-4 py-6 gap-2">

            {navItems.map((item) => (
                <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`px-4 py-3 rounded-xl text-left transition font-medium
                    ${activePage === item.id
                        ? "bg-bloom-forest text-white dark:bg-bloom-mid"
                        : "text-bloom-forest dark:text-bloom-light hover:bg-bloom-light dark:hover:bg-gray-700"
                    }`}
                >
                    {item.label}
                </button>    
            ))}

        </aside>
    )
}

export default Sidebar