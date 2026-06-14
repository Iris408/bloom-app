import { useApp } from '../../context/AppContext'

function ReduceMotionToggle() {
    const { reduceMotion, toggleReduceMotion } = useApp()

    return (
        <div className="flex w-full min-w-0 items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
                <p className="break-words text-sm font-medium text-bloom-forest dark:text-bloom-light">
                    Reduce motion
                </p>
                <p className="mt-1 break-words text-xs leading-relaxed text-gray-400">
                    Turns off animations and movement across the app
                </p>
            </div>

            {/* Toggle switch */}
            <button
                type="button"
                onClick={toggleReduceMotion}
                aria-label="Toggle reduce motion"
                className={`relative w-12 h-6 min-w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-300 cursor-pointer focus:outline-none
                    ${reduceMotion
                        ? "bg-bloom-forest dark:bg-bloom-mid"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
            >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300
                    ${reduceMotion ? "translate-x-6" : "translate-x-0"}`}
                />
            </button>

        </div>
    )
}

export default ReduceMotionToggle
