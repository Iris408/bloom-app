// EN: Focus page for small daily focus tasks.
// JP: その日の小さな集中タスクを管理する Focus ページ。

import { useMemo, useState } from "react"
import BloomReminder from "../components/ui/BloomReminder"
import { useApp } from "../context/AppContext"
import { todayKey } from "../utils/progressUtils"

function Focus() {
  const {
    focusTasks,
    addFocusTask,
    toggleFocusTaskComplete,
    deleteFocusTask,
  } = useApp()

  const [taskTitle, setTaskTitle] = useState("")
  const today = todayKey()

  // EN: Show only focus tasks scheduled for today.
  // JP: 今日に予定されたフォーカスタスクだけを表示します。
  const todayFocusTasks = useMemo(() => {
    return (focusTasks ?? []).filter((task) => task.scheduledFor === today)
  }, [focusTasks, today])

  const completedCount = todayFocusTasks.filter(
    (task) => task.completedOn === today
  ).length

  const totalCount = todayFocusTasks.length

  const focusMessage =
    totalCount === 0
      ? "Add one small focus task when you're ready."
      : completedCount === totalCount
        ? "All focus tasks are complete. That is enough for today."
        : completedCount > 0
          ? "You have already started. Keep it gentle."
          : "Choose one task and begin with the first step."

  // EN: Add a new focus task for today.
  // JP: 今日のフォーカスタスクを追加します。
  function handleAddFocusTask() {
    if (taskTitle.trim() === "") return

        addFocusTask(taskTitle.trim(), today)
    setTaskTitle("")
  } 

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      {/* Page heading */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-blue-500/80 mb-2">
          Focus Mode
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          𖣠 Focus
        </h2>

        <p className="text-sm text-bloom-forest/80 dark:text-gray-300 mt-3 leading-relaxed">
          Choose a small number of focus tasks for today.
        </p>
        <p className="text-sm text-bloom-forest/80 dark:text-gray-300 mt-3 leading-relaxed">
          This page is for calm, one-step-at-a-time progress.
        </p>
      </div>

      {/* Focus summary */}
      <section className="rounded-2xl border border-bloom-sage/30 dark:border-white/10 bg-white dark:bg-dark-surface/80 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-bloom-light/80 mb-3">
          Today
        </p>

        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-bloom-forest dark:text-bloom-light">
              {completedCount}/{totalCount} focus tasks complete
            </h3>

            <p className="text-sm text-gray-600 dark:text-bloom-light/70 mt-2 leading-relaxed">
              {focusMessage}
            </p>
          </div>

          <div className="text-2xl">
            {totalCount === 0
              ? "🌙"
              : completedCount === totalCount
                ? "🌸"
                : "🌱"}
          </div>
        </div>
      </section>

      {/* Add focus task */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-bloom-light/80 mb-3">
          Add focus task
        </p>

        <div className="flex items-center gap-2 border border-bloom-sage/30 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-dark-surface/70 transition">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddFocusTask()
            }}
            placeholder="Add one focus task..."
            className="flex-1 bg-transparent text-bloom-forest dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-bloom-light/80 caret-bloom-forest dark:caret-white outline-none focus:outline-none focus:ring-0"
          />

          <button
            type="button"
            onClick={handleAddFocusTask}
            className="text-sm font-semibold text-bloom-mid dark:text-bloom-sage hover:text-bloom-forest dark:hover:text-bloom-light transition"
          >
            Add
          </button>
        </div>
      </section>

      {/* Focus task list */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
          Today's focus list
        </p>

        {todayFocusTasks.length === 0 ? (
          <div className="rounded-2xl border border-bloom-sage/30 bg-white/60 dark:bg-dark-surface/70 p-6 text-center">
            <p className="text-3xl mb-3">🌿</p>

            <h3 className="text-lg font-bold text-bloom-forest dark:text-bloom-light mb-2">
              No focus tasks yet
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add one small task to begin.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {todayFocusTasks.map((task) => {
              const isComplete = task.completedOn === today

              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-bloom-sage/30 dark:border-white/10 bg-white dark:bg-dark-surface/80 px-4 py-3"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      type="button"
                      onClick={() => toggleFocusTaskComplete(task.id, today)}
                      aria-label={
                        isComplete
                          ? "Mark focus task as incomplete"
                          : "Mark focus task as complete"
                      }
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold transition ${
                        isComplete
                          ? "bg-bloom-forest border-bloom-forest text-white"
                          : "border-bloom-sage text-transparent hover:border-bloom-forest"
                      }`}
                    >
                      ✓
                    </button>

                    <p
                      className={`text-sm ${
                        isComplete
                          ? "text-gray-400 line-through"
                          : "text-bloom-forest dark:text-gray-200"
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteFocusTask(task.id)}
                    className="text-xs font-semibold text-bloom-mid dark:text-red-400 hover:text-red-500 transition"
                  >
                    Remove
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <BloomReminder
        reminder="You only need to focus on the next small step."
        phaseTitle="Focus Mode v1"
        phaseDescription="Add focus tasks for today, mark them complete, and keep them saved with localStorage."
      />
    </div>
  )
}

export default Focus