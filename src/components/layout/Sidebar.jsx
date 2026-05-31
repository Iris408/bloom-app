{/* Receiving props */}
function Sidebar({ activePage, setActivePage }) {
    const navItems = [
        { id: "home",     icon: "⌂", label: "Home" },
        { id: "routines", icon: "◴", label: "Routines" },
        { id: "focus",    icon: "𖣠", label: "Focus" },
        { id: "progress", icon: "√", label: "Progress" },
        { id: "rewards",  icon: "⟡", label: "Rewards" },
        { id: "profile",  icon: "⌖", label: "Profile" },
    ]

    return (
        <aside className="hidden md:flex flex-col w-56 min-h-screen bg-white border-r border-bloom-light px-4 py-6 gap-2">

            {navItems.map((item) => (
                <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition font-medium
                    ${activePage === item.id
                        ? "bg-bloom-forest text-white"
                        : "text-bloom-forest hover:bg-bloom-light"
                    }`}
                >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                </button>    
            ))}

        </aside>
    )
}

export default Sidebar