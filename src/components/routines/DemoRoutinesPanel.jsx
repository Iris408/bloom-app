import { demoRoutines } from "../../data/demoData"

// EN: Displays demo routine preview and demo data actions.
// JP: デモ用ルーティンのプレビューと操作ボタンを表示します。
function DemoRoutinesPanel({
  showDemoRoutines,
  setShowDemoRoutines,
  handleLoadDemoRoutines,
  handleClearDemoRoutines,
}) {
  return (
    <>
      <div className="relative rounded-2xl border border-bloom-sage/30 bg-white/80 p-4 pr-40 pb-8 dark:border-dark-border dark:bg-dark-surface/55">
        {/* Header Text Area */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
            Demo routines
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-bloom-light/70">
            New to Bloom? Explore demo routines to see how Bloom can support you.
          </p>
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-4 right-4 flex shrink-0 items-start gap-2">
          <button
            onClick={() => setShowDemoRoutines((prev) => !prev)}
            className="rounded-lg border border-bloom-sage px-3 py-1 text-[11px] font-semibold text-bloom-forest hover:bg-bloom-mid/10 dark:border-bloom-sage/60 dark:text-bloom-light dark:hover:bg-bloom-mint/20 transition"
          >
            {showDemoRoutines ? "Hide Preview" : "View Preview"}
          </button>

          <button
            onClick={handleLoadDemoRoutines}
            className="rounded-lg bg-bloom-forest px-3 py-1 text-[11px] font-semibold text-white hover:opacity-90 dark:hover:bg-bloom-mint/50 dark:bg-bloom-sage dark:text-dark-bg transition"
          >
            Load Demo
          </button>
        </div>

        {/* Bottom Right Actions */}
        <div className="absolute bottom-2 right-4">
          <button
            onClick={handleClearDemoRoutines}
            className="text-[12px] font-semibold text-red-400 hover:text-red-500 dark:text-red-400 dark:hover:text-red-500 transition"
          >
            Clear Demo
          </button>
        </div>
      </div>

      {showDemoRoutines && (
        <div className="mt-5 grid gap-3">
          {demoRoutines.map((routine) => (
            <div
              key={routine.id}
              className="rounded-xl border border-bloom-sage/20 bg-bloom-light/40 p-4 dark:border-dark-border dark:bg-bloom-mid/25"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-bloom-forest dark:text-bloom-light">
                    {routine.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-bloom-light/75">
                    {routine.description}
                  </p>
                </div>

                <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-bloom-forest dark:bg-bloom-forest dark:text-bloom-light">
                  {routine.label}
                </span>
              </div>

              <p className="mt-3 text-xs text-gray-500 dark:text-gray-300">
                {routine.steps.length} steps · {routine.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default DemoRoutinesPanel