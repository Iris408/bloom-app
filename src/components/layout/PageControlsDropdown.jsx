import { useState } from "react"
import { useApp } from "../../context/AppContext"

const fontSizeOptions = [
  { id: "small", label: "S" },
  { id: "medium", label: "M" },
  { id: "large", label: "L" },
  { id: "xl", label: "XL" },
]

function SlidersIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h10" />
      <path d="M18 7h2" />
      <circle cx="16" cy="7" r="2" />
      <path d="M4 17h2" />
      <path d="M10 17h10" />
      <circle cx="8" cy="17" r="2" />
    </svg>
  )
}

function PageControlsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { fontSize, applyFontSize, dyslexicFont, toggleDyslexicFont } = useApp()

  return (
    <div className="relative">
      {/* EN: Opens page display/accessibility controls */}
      {/* JP: ページ表示・アクセシビリティ設定を開きます */}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Open page controls"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bloom-sage/30 bg-bloom-light/70 text-bloom-forest transition hover:bg-bloom-mint/30 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/20"
      >
        <SlidersIcon />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-12 z-50 w-72 rounded-3xl border border-bloom-sage/30 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-dark-surface"
        >
          <div className="mb-4">
            <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
              Page controls
            </p>

            <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-300">
              Adjust how Bloom looks and feels.
            </p>
          </div>

          {/* EN: OpenDyslexic toggle */}
          {/* JP: OpenDyslexicフォント切り替え */}
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-bloom-forest dark:text-bloom-light">
                OpenDyslexic
              </p>

              <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                Use a dyslexia-friendly font across Bloom.
              </p>
            </div>

            <button
              type="button"
              onClick={toggleDyslexicFont}
              aria-label="Toggle OpenDyslexic font"
              className={`relative h-6 w-12 min-w-12 shrink-0 rounded-full transition-colors duration-300 focus:outline-none ${
                dyslexicFont
                  ? "bg-bloom-forest dark:bg-bloom-mid"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            >
              <span
                className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 ${
                  dyslexicFont ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* EN: Text size controls */}
          {/* JP: 文字サイズ設定 */}
          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-bloom-forest dark:text-bloom-light">
                Text size
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {fontSize === "xl"
                  ? "XL"
                  : fontSize.charAt(0).toUpperCase() + fontSize.slice(1)}
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {fontSizeOptions.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => applyFontSize(size.id)}
                  className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                    fontSize === size.id
                      ? "border-bloom-forest bg-bloom-forest text-white dark:border-bloom-mid dark:bg-bloom-mid"
                      : "border-bloom-sage/40 bg-white text-bloom-forest hover:bg-bloom-light dark:bg-dark-surface dark:text-bloom-light dark:hover:bg-dark-card"
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PageControlsDropdown