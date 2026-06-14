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
        <div className="flex w-full min-w-0 flex-col gap-4">
            <div className="flex min-w-0 items-start justify-between gap-4">
                <p className="min-w-0 break-words text-sm font-medium text-bloom-forest dark:text-bloom-light">
                    Text size
                </p>
                <p className="shrink-0 text-sm text-gray-400">
                    {fontSize === "xl" ? "XL" : fontSize.charAt(0).toUpperCase() + fontSize.slice(1)}
                </p>
            </div>

            {/* EN: Two-column mobile grid prevents button squeezing */}
            {/* JP: モバイルでは2列グリッドにしてボタンの圧迫を防ぎます */}
            <div className="grid w-full min-w-0 grid-cols-2 gap-3 sm:grid-cols-4">
                {sizes.map((size) => (
                    <button
                        key={size.id}
                        type="button"
                        onClick={() => applyFontSize(size.id)}
                        className={`min-w-0 rounded-xl border px-3 py-2 text-sm font-semibold transition cursor-pointer
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
            <p className="min-w-0 break-words text-sm text-gray-400 dark:text-gray-500 leading-relaxed">
                The quick brown fox jumps over the lazy dog
            </p>
        </div>
    )
}

export default FontSizeSlider
