import { useApp } from "../../context/AppContext"

function Header() {
  const { isDarkMode, toggleDarkMode } = useApp()

  return (
    <header className="sticky top-0 z-40 bg-white/55 dark:bg-bloom-forest/45 backdrop-blur-xl border-b border-bloom-sage/25 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo - left side */}
        <div className="flex items-center gap-3">
          <span className="text-3xl cursor-pointer text-bloom-forest dark:text-bloom-light">
            ❀
          </span>

          <div>
            <h1 className="text-2xl font-bold tracking-wide cursor-pointer text-bloom-forest dark:text-bloom-light">
              Bloom
            </h1>

            <p className="text-xs uppercase tracking-[0.18em] text-bloom-mid dark:text-bloom-mint font-lg">
              Calm routines
            </p>
          </div>
        </div>

        {/* Right side — dark mode toggle + profile avatar */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="text-lg w-9 h-9 rounded-full flex items-center justify-center bg-bloom-light/70 dark:bg-white/10 text-bloom-forest dark:text-bloom-light border border-bloom-sage/30 hover:bg-bloom-mint/30 dark:hover:bg-white/20 transition"
          >
            {isDarkMode ? "☀︎" : "⏾"}
          </button>

          {/* Profile avatar - right side */}
          <div className="w-10 h-10 bg-bloom-light/80 dark:bg-white/10 border border-bloom-sage/30 rounded-full flex items-center justify-center text-bloom-forest dark:text-bloom-light font-bold cursor-pointer hover:bg-bloom-mint/30 dark:hover:bg-white/20 transition">
            P
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header