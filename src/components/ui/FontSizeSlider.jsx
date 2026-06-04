import { useApp } from '../../context/AppContext'

// EN: Font size options available to the user
// JP: ユーザーが選択できるフォントサイズのオプション
const sizes = [
    { id: "small",  label: "S" },
    { id: "medium", label: "M" },
    { id: "large",  label: "L" },
    { id: "xl",     label: "XL" },
]

function FontSizeSlider() {
    const { fontSize, applyFontSize } = useApp()

    return (
        <div className="flex flex-col gap-3">

            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-bloom-forest dark:text-bloom-light">
                    Text size
                </p>
                <p className="text-sm text-gray-400">
                    {fontSize === "xl" ? "XL" : fontSize.charAt(0).toUpperCase() + fontSize.slice(1)}
                </p>
            </div>

            {/* Size buttons */}
            <div className="flex gap-2">
                {sizes.map((size) => (
                    <button
                        key={size.id}
                        type="button"
                        onClick={() => applyFontSize(size.id)}
                        className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition cursor-pointer
                            ${fontSize === size.id
                                ? "bg-bloom-forest text-white border-bloom-forest dark:bg-bloom-mid dark:border-bloom-mid"
                                : "bg-white dark:bg-dark-surface text-bloom-forest dark:text-bloom-light border-bloom-sage/40 hover:bg-bloom-light dark:hover:bg-dark-card"
                            }`}
                    >
                        {size.label}
                    </button>
                ))}
            </div>

            {/* Visual preview */}
            <p className="text-gray-400 dark:text-gray-500 leading-relaxed">
                The quick brown fox jumps over the lazy dog
            </p>

        </div>
    )
}

export default FontSizeSlider
