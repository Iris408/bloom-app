function BottomNav({ activePage, setActivePage }) {
    const navItems = [
        { id: "home",     icon: "⌂", label: "Home" },
        { id: "routines", icon: "◴", label: "Routines" },
        { id: "focus",    icon: "𖣠", label: "Focus" },
        { id: "progress", icon: "√", label: "Progress" },
        { id: "rewards",  icon: "⟡", label: "Rewards" },
        { id: "profile",  icon: "⌖", label: "Profile" },
    ]

    return (
        <nav className="flex md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-bloom-forest px-2 py-2 justify-around z-50">

            {navItems.map((item) => (
                <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition
                    ${activePage === item.id
                        ? "text-bloom-forest"
                        : "text-gray-400 hover:text-bloom-mid"
                    }`}
                >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-medium">{item.label}</span>
                </button>        
            ))}

        </nav>
    )
}

export default BottomNav