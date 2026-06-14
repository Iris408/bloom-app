import { useApp } from '../../context/AppContext'

function DyslexicFontToggle() {
    const { dyslexicFont, toggleDyslexicFont } = useApp()

    return (
        <div className="flex w-full min-w-0 items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
                <p className="break-words text-sm font-medium text-bloom-forest dark:text-bloom-light">
                    Dyslexia-friendly font
                </p>
                <p className="mt-1 break-words text-xs text-gray-400">
                    Switches to OpenDyslexic across the whole app
                </p>
            </div>

            {/* Toggle switch */}
            <button
                type="button"
                onClick={toggleDyslexicFont}
                aria-label="Toggle dyslexia-friendly font"
                className={`relative w-12 h-6 min-w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-300 cursor-pointer focus:outline-none
                    ${dyslexicFont
                        ? "bg-bloom-forest dark:bg-bloom-mid"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
            >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300
                    ${dyslexicFont ? "translate-x-6" : "translate-x-0"}`}
                />
            </button>

        </div>
    )
}

export default DyslexicFontToggle
