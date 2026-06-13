import { useEffect, useState } from "react"
import BloomReminder from "../components/ui/BloomReminder"
import { demoRoutines } from "../data/demoData"
import DemoRoutinesPanel from "../components/routines/DemoRoutinesPanel"
import { shouldRunDailyReset, markDailyResetComplete, resetRoutineStepCompletion } from "../utils/dailyResetUtils"

const ROUTINE_STORAGE_KEY = "bloom-routines"
const ROUTINE_DAILY_RESET_KEY = "bloom-routines-last-reset"

function Routines() {
  const [routines, setRoutines] = useState(() => {
    try {
      const savedRoutines = localStorage.getItem(ROUTINE_STORAGE_KEY)

      if (savedRoutines) {
        const parsedRoutines = JSON.parse(savedRoutines)

        if (shouldRunDailyReset(ROUTINE_DAILY_RESET_KEY)) {
          const resetRoutines = resetRoutineStepCompletion(parsedRoutines)

          localStorage.setItem(ROUTINE_STORAGE_KEY, JSON.stringify(resetRoutines))
          markDailyResetComplete(ROUTINE_DAILY_RESET_KEY)

          return resetRoutines
        }

        return parsedRoutines
      }

      return []
    } catch (error) {
      console.error("Failed to load routines:", error)
      return []
    }
  })


  const [routineName, setRoutineName] = useState("")
  const [stepText, setStepText] = useState({})

  const [editingRoutineId, setEditingRoutineId] = useState(null)
  const [editRoutineName, setEditRoutineName] = useState("")

  const [editingStepId, setEditingStepId] = useState(null)
  const [editStepText, setEditStepText] = useState("")

  const [showDemoRoutines, setShowDemoRoutines] = useState(false)
  const [selectedDemoRoutineIds, setSelectedDemoRoutineIds] = useState([])

// EN: Load selected demo routines, reset selected ticks, and close the preview panel.
// JP: 選択されたデモルーティンを読み込み、チェック状態をリセットして、プレビューパネルを閉じます。
  function handleLoadDemoRoutines() {
    setRoutines((prevRoutines) => {
      const existingIds = new Set(prevRoutines.map((routine) => routine.id))

      const routinesToAdd = demoRoutines
        .filter((routine) => selectedDemoRoutineIds.includes(routine.id))
        .filter((routine) => !existingIds.has(routine.id))
        .map((routine) => ({
          ...routine,
          name: routine.title,
          steps: routine.steps.map((step) => ({
            ...step,
            completed: false,
          })),
        }))

      return [...prevRoutines, ...routinesToAdd]
    })
    setSelectedDemoRoutineIds([])
    setShowDemoRoutines(false)
  }

  // EN: Save routines whenever the routine list changes
  // JP: ルーティン一覧が変更されるたびに localStorage に保存します
  useEffect(() => {
    localStorage.setItem(ROUTINE_STORAGE_KEY, JSON.stringify(routines))
  }, [routines])

  // EN: Add a new routine
  // JP: 新しいルーティンを追加します
  function handleAddRoutine() {
    if (routineName.trim() === "") return

    const newRoutine = {
      id: Date.now(),
      name: routineName.trim(),
      steps: [],
    }

    setRoutines([...routines, newRoutine])
    setRoutineName("")
  }

  // EN: Start editing a routine name
  // JP: ルーティン名の編集を開始します
  function handleEditRoutineStart(routine) {
    setEditingRoutineId(routine.id)
    setEditRoutineName(routine.name)
  }

  // EN: Save edited routine name
  // JP: 編集したルーティン名を保存します
  function handleEditRoutineSave(routineId) {
    if (editRoutineName.trim() === "") return

    setRoutines(
      routines.map((routine) =>
        routine.id === routineId
          ? {
              ...routine,
              name: editRoutineName.trim(),
            }
          : routine
      )
    )

    setEditingRoutineId(null)
    setEditRoutineName("")
  }

  // EN: Cancel routine name editing
  // JP: ルーティン名の編集をキャンセルします
  function handleEditRoutineCancel() {
    setEditingRoutineId(null)
    setEditRoutineName("")
  }

  // EN: Add a new step to a specific routine
  // JP: 指定したルーティンに新しいステップを追加します
  function handleAddStep(routineId) {
    const text = stepText[routineId]

    if (!text || text.trim() === "") return

    setRoutines(
      routines.map((routine) =>
        routine.id === routineId
          ? {
              ...routine,
              steps: [
                ...routine.steps,
                {
                  id: Date.now(),
                  text: text.trim(),
                  completed: false,
                },
              ],
            }
          : routine
      )
    )

    setStepText({
      ...stepText,
      [routineId]: "",
    })
  }

  // EN: Delete a routine
  // JP: ルーティンを削除します
  function handleDeleteRoutine(routineId) {
    setRoutines(routines.filter((routine) => routine.id !== routineId))
  }

  // EN: Delete one step from a routine
  // JP: ルーティン内のステップを1つ削除します
  function handleDeleteStep(routineId, stepId) {
    setRoutines(
      routines.map((routine) =>
        routine.id === routineId
          ? {
              ...routine,
              steps: routine.steps.filter((step) => step.id !== stepId),
            }
          : routine
      )
    )
  }

  // EN: Toggle a routine step between complete and incomplete
  // JP:ルーティン内のステップを完了・未完了に切り替えます
  function handleToggleStepComplete(routineId, stepId) {
    setRoutines(
      routines.map((routine) =>
      routine.id === routineId
        ? {
            ...routine,
            steps: routine.steps.map((step) =>
            step.id === stepId
              ? {
                  ...step,
                  completed: !step.completed,
                }
              : step  
            ),
          }
        : routine    
      )
    )  
  }

  // EN: Start editing one routine step
  // JP: ルーティン内の1つのステップ編集を開始します
  function handleEditStepStart(step) {
    setEditingStepId(step.id)
    setEditStepText(step.text)
  }

  // EN: Save edited routine step
  // JP: 編集したステップを保存します
  function handleEditStepSave(routineId, stepId) {
    if (editStepText.trim() === "") return

    setRoutines(
      routines.map((routine) =>
        routine.id === routineId
          ? {
              ...routine,
              steps: routine.steps.map((step) =>
                step.id === stepId
                  ? {
                      ...step,
                      text: editStepText.trim(),
                    }
                  : step
              ),
            }
          : routine
      )
    )

    setEditingStepId(null)
    setEditStepText("")
  }

  // EN: Cancel step editing
  // JP: ステップ編集をキャンセルします
  function handleEditStepCancel () {
    setEditingStepId(null)
    setEditStepText("")
  }

  // EN: Move a routine step up or down
  // JP: ルーティン内のステップを上または下に移動します
  function handleMoveStep(routineId, stepIndex, direction) {
    setRoutines(
      routines.map((routine) => {
        if (routine.id !== routineId) {
          return routine
        }

        const updatedSteps = [...routine.steps]
        const newIndex = stepIndex + direction

        if (newIndex < 0 || newIndex >= updatedSteps.length) {
          return routine
        }

        const movedStep = updatedSteps[stepIndex]
        updatedSteps[stepIndex] = updatedSteps[newIndex]
        updatedSteps[newIndex] = movedStep

        return {
          ...routine,
          steps: updatedSteps,
        }
      })
    )
  }
  

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      {/* Page heading */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-blue-500/80 mb-2">
          Routine Builder
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          ◴ Routines
        </h2>

        <p className="text-sm text-bloom-forest/80 dark:text-gray-300 mt-3 leading-relaxed">
          Create simple step-by-step routines and build calm structure for your
          day.
        </p>
      </div>

      <DemoRoutinesPanel
        showDemoRoutines={showDemoRoutines}
        setShowDemoRoutines={setShowDemoRoutines}
        selectedDemoRoutineIds={selectedDemoRoutineIds}
        setSelectedDemoRoutineIds={setSelectedDemoRoutineIds}
        handleLoadDemoRoutines={handleLoadDemoRoutines}
      />

      {/* Add routine input */}
      <div className="flex items-center gap-2 border border-bloom-sage/30 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-dark-surface/70 transition">
        <input
          type="text"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddRoutine()
          }}
          placeholder="Add a new routine..."
          className="flex-1 bg-transparent text-bloom-forest dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-bloom-light/80 caret-bloom-forest dark:caret-white outline-none focus:outline-none focus:ring-0"
        />

        <button
          type="button"
          onClick={handleAddRoutine}
          className="text-sm font-semibold text-bloom-mid dark:text-bloom-sage hover:text-bloom-forest dark:hover:text-bloom-light transition"
        >
          Add
        </button>
      </div>

      {/* Empty state OR routine list */}
      {routines.length === 0 ? (
        <div className="rounded-2xl border border-bloom-sage/30 bg-white/60 dark:border-dark-border dark:bg-dark-surface/70 p-6 text-center">
          <p className="text-3xl mb-3">🌿</p>

          <h3 className="text-lg font-bold text-bloom-forest dark:text-bloom-light mb-2">
            No routines yet
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add your first routine when you're ready.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-5">
            {routines.map((routine) => (
              <div
                key={routine.id}
                className="rounded-2xl border border-bloom-sage/30 bg-white dark:bg-dark-surface/80 p-5 flex flex-col gap-4"
              >
                {/* Routine card header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {editingRoutineId === routine.id ? (
                      <input
                        type="text"
                        value={editRoutineName}
                        onChange={(e) => setEditRoutineName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleEditRoutineSave(routine.id)
                          }
                        }}
                        className="w-full bg-white/10 dark:bg-bloom-mint/20 border border-white/10 rounded-xl px-3 py-2 text-bloom-forest dark:text-gray-100 caret-bloom-forest dark:caret-white outline-none focus:outline-none focus:ring-0"
                      />
                    ) : (
                      <h3 className="text-lg font-bold text-bloom-forest dark:text-bloom-light">
                        {routine.name}
                      </h3>
                    )}

                    <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                      {routine.steps.length} step
                      {routine.steps.length === 1 ? "" : "s"}
                    </p>
                  </div>

                  {editingRoutineId === routine.id ? (
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleEditRoutineSave(routine.id)}
                        className="text-sm font-semibold text-bloom-mid dark:text-bloom-sage hover:text-bloom-forest dark:hover:text-bloom-light transition"
                      >
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={handleEditRoutineCancel}
                        className="text-sm font-semibold text-gray-500 dark:text-red-500/90 hover:text-bloom-forest dark:hover:dark:text-red-300 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleEditRoutineStart(routine)}
                        className="text-sm font-semibold text-bloom-mid dark:text-bloom-sage hover:text-bloom-forest dark:hover:text-bloom-light transition"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteRoutine(routine.id)}
                        className="text-sm font-semibold text-red-400 hover:text-red-700 dark:hover:text-red-500 transition"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* Steps */}
                {routine.steps.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-bloom-light/80">
                    No steps added yet.
                  </p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {routine.steps.map((step, index) => (
                      <div
                        key={step.id}
                        className="flex items-center justify-between gap-3 rounded-xl bg-bloom-light/60 dark:bg-dark-deep/60 px-3 py-2"
                      >
                        <div className="flex-1">
                          {editingStepId === step.id ? (
                            <input
                            type="text"
                            value={editStepText}
                            onChange={(e) => setEditStepText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleEditStepSave(routine.id, step.id)
                              }
                            }}
                            className="w-full bg-transparent text-bloom-forest dark:text-bloom-light/60 caret-bloom-forest dark:caret-white outline-none focus:outline-none focus:ring-0"
                            />
                          ) : (
                            <div className="flex items-center gap-3">
                              <button
                              type="button"
                              onClick={() => handleToggleStepComplete(routine.id, step.id)}
                              aria-label={
                                step.completed
                                  ? "Mark step as incomplete"
                                  : "Mark as complete"
                              }
                              className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold transition ${
                                step.completed
                                  ? "bg-bloom-forest border-bloom-forest text-white"
                                  : "border-bloom-sage text-transparent hover:border-bloom-forest"
                              }`}
                              >
                                ✓
                              </button>

                              <p 
                                className={`text-sm ${
                                  step.completed
                                  ? "text-gray-400 line-through"
                                  : "text-bloom-forest dark:text-gray-200"
                              }`}
                              >
                                <span className="font-semibold mr-2">
                                  {index + 1}.
                                </span>
                                {step.text}
                              </p>
                            </div>
                          )}    
                        </div>

                        {editingStepId === step.id ? (
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => handleEditStepSave(routine.id, step.id)}
                              className="text-xs font-semibold text-bloom-mid dark:text-bloom-sage hover:text-bloom-forest dark:hover:text-bloom-light transition"
                            >
                              Save
                            </button>

                            <button
                            type="button"
                            onClick={handleEditStepCancel}
                            className="text-xs font-semibold text-gray-500 dark:text-red-400 hover:text-bloom-forest dark:hover:text-red-500 transition"
                          >
                            Cancel 
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-1">
                            <button
                            type="button"
                            onClick={() => handleMoveStep(routine.id, index, -1)}
                            disabled={index === 0}
                            aria-label="Move step up"
                            title="Move up"
                            className="p-2 text-xl font-semibold text-bloom-mid dark:text-bloom-sage disabled:opacity-30 disabled:cursor-not-allowed hover:text-bloom-forest dark:hover:text-bloom-light transition"
                            >
                            <i className="ti ti-arrow-up" aria-hidden="true"></i>
                            </button>

                            <button
                            type="button"
                            onClick={() => handleMoveStep(routine.id, index, 1)}
                            disabled={index === routine.steps.length - 1}
                            aria-label="Move step down"
                            title="Move down"
                            className="p-2 text-xl font-semibold text-bloom-mid dark:text-bloom-sage disabled:opacity-30 disabled:cursor-not-allowed hover:text-bloom-forest dark:hover:text-bloom-light transition"
                            >
                            <i className="ti ti-arrow-down" aria-hidden="true"></i>
                            </button>

                            <button
                            type="button"
                            onClick={() => handleEditStepStart(step)}
                            className="text-xs font-semibold text-bloom-mid dark:text-bloom-sage hover:text-bloom-forest dark:hover:text-bloom-light transition"
                            >
                              Edit
                            </button>

                            <button
                            type="button"
                            onClick={() => handleDeleteStep(routine.id, step.id)}
                            className="text-xs font-semibold text-bloom-mid dark:text-red-400 hover:text-red-500 transition"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                        ))}   
                  </div>     
                )}     


                {/* Add step input */}
                <div className="flex items-center gap-2 border border-bloom-sage/30 dark:border-white/10 rounded-xl px-3 py-2 bg-white/80 dark:bg-white/10 dark:hover:bg-white/15 transition">
                  <input
                    type="text"
                    value={stepText[routine.id] || ""}
                    onChange={(e) =>
                      setStepText({
                        ...stepText,
                        [routine.id]: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddStep(routine.id)
                    }}
                    placeholder="Add a step..."
                    className="flex-1 bg-transparent text-bloom-forest dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-400 caret-bloom-forest dark:caret-white outline-none focus:outline-none focus:ring-0"
                  />

                  <button
                    type="button"
                    onClick={() => handleAddStep(routine.id)}
                    className="text-sm font-semibold text-bloom-mid dark:text-bloom-sage hover:text-bloom-forest dark:hover:text-bloom-light transition"
                  >
                    Add step
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <BloomReminder
        reminder="A routine does not have to be perfect to be helpful."
        phaseTitle="Routine Builder v1"
        phaseDescription="Create routines, edit routine names, add steps, remove steps, and keep everything saved with localStorage."
      />
    </div>
  )
}



export default Routines