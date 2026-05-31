{/* Receiving props */}
function Sidebar({ activePage, setActivePage }) {
    const navItems = [
        { id: "home",     icon: "🏠", label: "Home" },
        { id: "routines", icon: "📋", label: "Routines" },
        { id: "focus",    icon: "🎯", label: "Focus" },
        { id: "progress", icon: "📊", label: "Progress" },
        { id: "rewards",  icon: "⭐", label: "Rewards" },
        { id: "profile",  icon: "👤", label: "Profile" },
    ]

    return (
        <aside className="hidden md:flex flex-col w-56 min-h-screen bg-white border-r border-green-100 px-4 py-6 gap-2">

            {navItems.map((item) => (
                <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition font-medium
                    ${activePage === item.id
                        ? "bg-green-800 text-white"
                        : "text-green-900 hover:bg-green-50"
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