function Footer() {
  return (
    <footer className="w-full border-t border-bloom-sage/25 dark:border-[#343442] px-6 py-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left — branding */}
        <div className="flex items-center gap-2">
          <span className="text-lg">🌱</span>
          <p className="text-sm font-semibold text-bloom-forest dark:text-bloom-light">
            Bloom
          </p>
          <span className="text-gray-400 text-sm">·</span>
          <p className="text-sm text-gray-400">
            Calm routines for every brain
          </p>
        </div>

        {/* Centre — links */}
        <div className="flex items-center gap-6">
          <button className="text-sm text-gray-400 hover:text-bloom-forest dark:hover:text-bloom-light transition cursor-pointer">
            Privacy
          </button>
          <button className="text-sm text-gray-400 hover:text-bloom-forest dark:hover:text-bloom-light transition cursor-pointer">
            Accessibility
          </button>
          <button className="text-sm text-gray-400 hover:text-bloom-forest dark:hover:text-bloom-light transition cursor-pointer">
            About
          </button>
        </div>

        {/* Right — copyright */}
        <p className="text-sm text-gray-400">
          © 2026 Bloom · Built with 🌱
        </p>

      </div>
    </footer>
  )
}

export default Footer
