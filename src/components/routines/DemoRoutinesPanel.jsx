import { demoRoutines } from "../../data/demoData"

// EN: Displays demo routine preview and demo data actions.
// JP: デモ用ルーティンのプレビューと操作ボタンを表示します。
function DemoRoutinesPanel({
  showDemoRoutines,
  setShowDemoRoutines,
  selectedDemoRoutineIds = [],
  setSelectedDemoRoutineIds,
  handleLoadDemoRoutines,
  handleClearDemoRoutines,
}) {

  // EN: Select or unselect one demo routine.
// JP: 1つのデモルーティンを選択・解除します。
function handleToggleDemoRoutine(id) {
  setSelectedDemoRoutineIds((prevIds) => {
    const safePrevIds = Array.isArray(prevIds) ? prevIds : []

    return safePrevIds.includes(id)
      ? safePrevIds.filter((routineId) => routineId !== id)
      : [...safePrevIds, id]
  })
}

// EN: Select every demo routine.
// JP: すべてのデモルーティンを選択します。
function handleSelectAllDemoRoutines() {
  const allDemoRoutineIds = demoRoutines.map((routine) => routine.id)

  setSelectedDemoRoutineIds(allDemoRoutineIds)
}

// EN: Clear only the selected checkbox state.
// JP: チェックされた選択状態だけを解除します。
function handleClearSelectedDemoRoutines() {
  setSelectedDemoRoutineIds([])
}

const safeSelectedDemoRoutineIds = Array.isArray(selectedDemoRoutineIds)
  ? selectedDemoRoutineIds
  : []

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-bloom-sage/30 bg-white/80 p-4 dark:border-dark-border dark:bg-dark-surface/55 sm:relative sm:pr-44 sm:pb-10">
        {/* EN: Demo panel text */}
        {/* JP: デモパネルの説明テキスト */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
            Demo routines
          </p>

          <div className="mt-4 space-y-2">
            <p className="text-sm font-semibold text-bloom-forest dark:text-bloom-light">
              New to Bloom?
            </p>

            <p className="max-w-xl text-xs leading-relaxed text-gray-500 dark:text-bloom-light/70">
              Explore demo routines to see how Bloom can support you.
            </p>
          </div>
        </div>

        {/* EN: Main actions stay top-right on desktop */}
        {/* JP: メイン操作はデスクトップでは右上に配置します */}
        <div className="mt-4 flex flex-wrap gap-2 sm:absolute sm:right-4 sm:top-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setShowDemoRoutines((prev) => !prev)}
            className="rounded-lg border border-bloom-sage px-3 py-1 text-[11px] font-semibold text-bloom-forest transition hover:bg-bloom-mid/10 dark:border-bloom-sage/60 dark:text-bloom-light dark:hover:bg-bloom-mint/20"
          >
            {showDemoRoutines ? "Hide preview" : "View preview"}
          </button>

          <button
            type="button"
            onClick={handleLoadDemoRoutines}
            className="rounded-lg bg-bloom-forest px-3 py-1 text-[11px] font-semibold text-white transition hover:opacity-90 dark:bg-bloom-sage dark:text-dark-bg dark:hover:bg-bloom-mint/50"
          >
            Load demo
          </button>
        </div>

        {/* EN: Selection actions are bottom-left actions */}
        {/* JP: 選択操作は控えめな左下アクションにします */}
        <div className="mt-4 flex flex-wrap items-center gap-2 sm:absolute sm:bottom-3 sm:left-4 sm:mt-0">
          <button
            type="button"
            onClick={handleSelectAllDemoRoutines}
            className="text-[11px] font-semibold text-bloom-forest transition hover:text-bloom-mid dark:text-bloom-light dark:hover:text-bloom-sage"
          >
            Select all
          </button>

          <span className="text-[14px] text-gray-300 dark:text-gray-600">
            ·
          </span>

          <button
            type="button"
            onClick={handleClearSelectedDemoRoutines}
            className="text-[11px] font-semibold text-gray-500 transition hover:text-bloom-mid dark:text-bloom-light/70 dark:hover:text-bloom-sage"
          >
            Clear selection
          </button>
        </div>

        {/* EN: Clear loaded demo routines only */}
        {/* JP: 読み込まれたデモルーティンだけを削除します */}
        <div className="mt-3 flex justify-end sm:absolute sm:bottom-3 sm:right-4 sm:mt-0">
          <button
            type="button"
            onClick={handleClearDemoRoutines}
            className="text-[10px] font-semibold text-red-400 transition hover:text-red-500 dark:text-red-400 dark:hover:text-red-500"
          >
            Clear demo
          </button>
        </div>
      </div>

      {showDemoRoutines && (
        <div className="grid gap-3">
          {demoRoutines.map((routine) => (
            <div
              key={routine.id}
              className="rounded-xl border border-bloom-sage/20 bg-bloom-light/40 p-4 dark:border-dark-border dark:bg-bloom-mid/25"
            >
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleDemoRoutine(routine.id)}
                  aria-pressed={selectedDemoRoutineIds.includes(routine.id)}
                  aria-label={
                    selectedDemoRoutineIds.includes(routine.id)
                      ? "Unselect"
                      : "Select"
                  }
                  className={`mt-1 flex h-5 w-5 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border-2 text-xs font-bold transition ${
                    selectedDemoRoutineIds.includes(routine.id)
                    ? "border-bloom-forest bg-bloom-forest text-white dark:border-bloom-sage dark:bg-bloom-sage dark:text-dark-bg"
                    : "border-bloom-sage text-transparent hover:border-bloom-forest dark:border-bloom-sage/60 dark:hover:border-bloom-light"
                  }`}
                >
                  ✓
                </button>  

                <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-bloom-forest dark:text-bloom-light">
                      {routine.title}
                    </h3>

                    <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-bloom-light/75">
                      {routine.description}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-bloom-forest dark:bg-bloom-forest dark:text-bloom-light">
                    {routine.label}
                  </span>
                </div>
              </div>

              <p className="mt-3 pl-7 text-xs text-gray-500 dark:text-gray-300">
                {routine.steps.length} steps · {routine.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DemoRoutinesPanel