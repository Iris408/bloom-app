// EN: Focus page for small daily focus tasks.
// JP: その日の小さな集中タスクを管理する Focus ページ。

import { useMemo, useState } from "react"
import BloomReminder from "../components/ui/BloomReminder"
import { useApp } from "../context/AppContext"
import { todayKey } from "../utils/progressUtils"
import EmptyState from "../components/ui/EmptyState"

function FocusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M8 14c-1.3-1.2-2-2.8-2-4.5A6 6 0 0 1 18 9.5c0 1.7-.7 3.3-2 4.5-.7.6-1 1.3-1 2H9c0-.7-.3-1.4-1-2z" />
    </svg>
  )
}

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
        ? "You did everything you set out to do today. Well done!"
        : completedCount > 0
          ? "You're doing really well. Keep going at your own pace."
          : "There's no rush. Start when it feels right."

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

        <h2 className="flex items-center gap-3 text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center">
            <FocusIcon />
          </span>
          <span>Focus</span>
        </h2>

        <p className="text-sm text-bloom-forest/80 dark:text-gray-300 mt-3 leading-relaxed">
          Focus is yours to shape. There's no right or wrong task, and no task is too small.
        </p>
        <p className="text-sm text-bloom-forest/80 dark:text-gray-300 mt-3 leading-relaxed">
          Use this space to help you focus gently, without any pressure.
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
              {completedCount}/{totalCount} focus tasks
            </h3>

            <p className="text-sm text-gray-600 dark:text-bloom-light/70 mt-2 leading-relaxed">
              {focusMessage}
            </p>
          </div>

          <div className="text-2xl">
            {totalCount === 0
              ? "💡"
              : completedCount === totalCount
                ? "🌳"
                : "🌸"}
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
            placeholder="Add a focus task..."
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
          <EmptyState
            icon="🎧"
            title="Focus on what feels manageable"
            message="You can always come back later."
          />
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