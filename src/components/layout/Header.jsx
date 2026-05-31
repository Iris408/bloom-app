function Header() {
    return (
        <header className="w-full bg-green-800 text-white px-6 py-4 flex items-center justify-between">

            {/* Logo - left side */}
            <div className="flex items-center gap-2">
                <span className="text-2xl cursor-pointer">🌱</span>
                <h1 className="text-2xl font-bold tracking-wide cursor-pointer">Bloom</h1>
            </div>

            {/* Profile avatar - right side */}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-800 font-bold cursor-pointer hover:bg-green-100 transition">
                P
            </div>

        </header>
    )
}

export default Header