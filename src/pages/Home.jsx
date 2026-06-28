import { useEffect, useState } from "react"

import TaskList from "../components/tasks/TaskList"
import DemoBanner from "../components/demo/DemoBanner"
import { getAvatarDisplay } from "../utils/avatarStorage"
import { useApp } from "../context/AppContext"
import { todayKey } from "../utils/progressUtils"

const TASK_STORAGE_KEY = "bloom-tasks"
const ROUTINE_STORAGE_KEY = "bloom-routines"
const FOCUS_OPTIONS = [5, 10, 15, 20]

function getTimeGreeting() {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) return "Good morning"
  if (hour >= 12 && hour < 18) return "Good afternoon"

  return "Good night"
}

function getProgressIcon(progressPercent) {
  if (progressPercent < 25) return "🌱"
  if (progressPercent < 50) return "🌿"
  if (progressPercent < 75) return "🌸"

  return "🌳"
}

function getStoredTasks() {
  try {
    const storedTasks = localStorage.getItem(TASK_STORAGE_KEY)
    const parsedTasks = storedTasks ? JSON.parse(storedTasks) : []

    return Array.isArray(parsedTasks) ? parsedTasks : []
  } catch {
    return []
  }
}

function getStoredRoutines() {
  try {
    const storedRoutines = localStorage.getItem(ROUTINE_STORAGE_KEY)
    const parsedRoutines = storedRoutines ? JSON.parse(storedRoutines) : []

    return Array.isArray(parsedRoutines) ? parsedRoutines : []
  } catch {
    return []
  }
}

function getTaskStats() {
  const tasks = getStoredTasks()
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const progressPercent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

  return {
    totalTasks,
    completedTasks,
    progressPercent,
  }
}

function getRoutineStats(routines) {
  const totalRoutines = routines.length

  const totalSteps = routines.reduce((total, routine) => {
    return total + (routine.steps?.length || 0)
  }, 0)

  const completedSteps = routines.reduce((total, routine) => {
    const routineCompletedSteps =
      routine.steps?.filter((step) => step.completed).length || 0

    return total + routineCompletedSteps
  }, 0)

  const completedRoutines = routines.filter((routine) => {
    const steps = routine.steps || []

    return steps.length > 0 && steps.every((step) => step.completed)
  }).length

  return {
    totalRoutines,
    completedRoutines,
    totalSteps,
    completedSteps,
  }
}

function getFocusStats(focusTasks, today) {
  const todayFocusTasks = (focusTasks ?? []).filter(
    (task) => task.scheduledFor === today
  )

  const totalFocusTasks = todayFocusTasks.length
  const completedFocusTasks = todayFocusTasks.filter(
    (task) => task.completedOn === today
  ).length

  return {
    todayFocusTasks,
    totalFocusTasks,
    completedFocusTasks,
  }
}

function getCombinedProgressPercent(taskStats, routineStats, focusStats) {
  const totalItems =
    taskStats.totalTasks +
    routineStats.totalSteps +
    focusStats.totalFocusTasks

  const completedItems =
    taskStats.completedTasks +
    routineStats.completedSteps +
    focusStats.completedFocusTasks

  if (totalItems === 0) return 0

  return Math.round((completedItems / totalItems) * 100)
}

function Home({
  currentUser = null,
  isDemoMode,
  demoType,
  onCreateAccount,
  onExitDemoClick,
  setActivePage,
}) {
  const [selectedFocusMinutes, setSelectedFocusMinutes] = useState(10)
  const [taskStats, setTaskStats] = useState(() => getTaskStats())
  const [routines, setRoutines] = useState(() => getStoredRoutines())
  const { focusTasks } = useApp()
  const today = todayKey()

  const avatarDisplay = getAvatarDisplay(currentUser)

  const username =
    currentUser?.username || (isDemoMode ? "Demo user" : "Bloom user")

  const displayName = username
  const greeting = getTimeGreeting()

  // Routine

  const routineStats = getRoutineStats(routines)
  const focusStats = getFocusStats(focusTasks, today)

  const combinedProgressPercent = getCombinedProgressPercent(
    taskStats,
    routineStats,
    focusStats
  )

  const progressIcon = getProgressIcon(combinedProgressPercent)

  const shouldShowAvatar =
    avatarDisplay.avatarType === "bloom" && avatarDisplay.avatarUrl

  useEffect(() => {
    function syncHomeData() {
      setTaskStats(getTaskStats())
      setRoutines(getStoredRoutines())
    }

    window.addEventListener("bloom-tasks-updated", syncHomeData)
    window.addEventListener("bloom-routines-updated", syncHomeData)
    window.addEventListener("storage", syncHomeData)

    return () => {
      window.removeEventListener("bloom-tasks-updated", syncHomeData)
      window.removeEventListener("bloom-routines-updated", syncHomeData)
      window.removeEventListener("storage", syncHomeData)
    }
  }, [])

  function goToPage(page) {
    if (!setActivePage) return

    setActivePage(page)
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 overflow-x-hidden pb-28 sm:gap-7 sm:pb-0">
      {isDemoMode && (
        <DemoBanner
          demoType={demoType}
          onCreateAccount={onCreateAccount}
          onExitDemoClick={onExitDemoClick}
        />
      )}

      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
              Home
            </p>

            <h2 className="break-words text-3xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-4xl">
              {greeting}, {displayName} ꕤ
            </h2>

            <p className="mt-3 max-w-5xl text-sm leading-relaxed text-bloom-forest/65 dark:text-gray-300 lg:whitespace-nowrap">
              Choose one gentle step, pause when needed, and come back when
              you're ready.
            </p>
          </div>

          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[1.4rem] bg-bloom-forest text-2xl font-bold text-bloom-light shadow-sm">
            {shouldShowAvatar ? (
              <img
                src={avatarDisplay.avatarUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              avatarDisplay.initial
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.85fr)_minmax(260px,0.75fr)]">
        <div className="rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-4 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-5">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
              Today
            </p>

            <h3 className="mt-2 text-lg font-bold text-bloom-forest dark:text-bloom-light">
              Today's tasks
            </h3>
          </div>

          <TaskList />
        </div>

        <div className="flex flex-col justify-between rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
              Focus
            </p>

            <div className="mx-auto mt-6 flex h-40 w-40 flex-col items-center justify-center rounded-full border-[10px] border-bloom-sage/35 bg-bloom-light/50 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold text-bloom-forest/60 dark:text-gray-300">
                Deep Focus
              </p>

              <p className="mt-1 text-4xl font-bold text-bloom-forest dark:text-bloom-light">
                {selectedFocusMinutes}:00
              </p>
            </div>

            <p className="mt-4 text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
              Start with one quiet block. You can stop, pause, or restart
              whenever you need.
            </p>

            <div className="mt-4 rounded-2xl bg-white/70 px-4 py-3 shadow-sm dark:bg-white/5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-bloom-mid dark:text-bloom-sage">
                Today's focus
              </p>

              <p className="mt-2 text-sm font-bold text-bloom-forest dark:text-bloom-light">
                {focusStats.completedFocusTasks}/{focusStats.totalFocusTasks} focus tasks
              </p>

              <p className="mt-1 text-xs leading-5 text-bloom-forest/60 dark:text-gray-300">
                {focusStats.totalFocusTasks === 0
                  ? "No focus tasks yet. Add one when you're ready."
                  : focusStats.completedFocusTasks === focusStats.totalFocusTasks
                    ? "All focus tasks complete for today."
                    : "Keep going at your own pace."}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2">
              {FOCUS_OPTIONS.map((minutes) => (
                <button
                  key={minutes}
                  type="button"
                  onClick={() => setSelectedFocusMinutes(minutes)}
                  className={`rounded-full px-3 py-2 text-xs font-bold transition ${
                    selectedFocusMinutes === minutes
                      ? "bg-bloom-mid text-white dark:bg-bloom-forest"
                      : "bg-bloom-light text-bloom-forest hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
                  }`}
                >
                  {minutes}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => goToPage("focus")}
            className="mx-auto mt-5 rounded-full bg-bloom-mid px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-bloom-forest dark:bg-bloom-forest/80 dark:hover:bg-bloom-mid/80"
          >
            Start focus
          </button>
        </div>

        <div className="rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
                Routine
              </p>

              <h3 className="mt-2 text-lg font-bold text-bloom-forest dark:text-bloom-light">
                Active routines
              </h3>

              <p className="mt-1 text-xs text-bloom-forest/60 dark:text-gray-300">
                {routineStats.totalRoutines === 0
                  ? "No routines yet"
                  : `${routineStats.totalRoutines} routine${
                      routineStats.totalRoutines === 1 ? "" : "s"
                    } saved`}
              </p>
            </div>

            <span className="rounded-full bg-bloom-light px-3 py-2 text-sm dark:bg-white/10">
              ➤
            </span>
          </div>

          {routines.length === 0 ? (
            <div className="rounded-2xl bg-white/70 px-4 py-5 text-center shadow-sm dark:bg-white/5">
              <p className="text-3xl">🌿</p>

              <p className="mt-3 text-sm font-bold text-bloom-forest dark:text-bloom-light">
                No routines yet
              </p>

              <p className="mt-1 text-xs leading-5 text-bloom-forest/60 dark:text-gray-300">
                Create your first routine when you're ready.
              </p>
            </div>
          ) : (
            <div className="max-h-[240px] overflow-y-auto pr-1">
              <div className="flex flex-col gap-3">
                {routines.map((routine) => {
                  const steps = routine.steps || []
                  const completedSteps = steps.filter(
                    (step) => step.completed
                  ).length
                  const totalSteps = steps.length
                  const previewSteps = steps.slice(0, 3)

                  return (
                    <div
                      key={routine.id}
                      className="rounded-2xl bg-white/70 px-4 py-4 shadow-sm dark:bg-white/5"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-bloom-forest dark:text-bloom-light">
                            {routine.name}
                          </p>

                          <p className="mt-1 text-xs text-bloom-forest/60 dark:text-gray-300">
                            {completedSteps}/{totalSteps} steps complete
                          </p>
                        </div>

                        <span className="rounded-full bg-bloom-light px-2.5 py-1 text-xs font-bold text-bloom-forest/70 dark:bg-white/10 dark:text-gray-300">
                          {totalSteps === 0
                            ? "New"
                            : completedSteps === totalSteps
                              ? "Done"
                              : "Active"}
                        </span>
                      </div>

                      {totalSteps > 0 && (
                        <div className="mb-3 h-2 overflow-hidden rounded-full bg-bloom-light dark:bg-white/10">
                          <div
                            className="h-full rounded-full bg-bloom-mid transition-all dark:bg-bloom-sage"
                            style={{
                              width: `${Math.round(
                                (completedSteps / totalSteps) * 100
                              )}%`,
                            }}
                          />
                        </div>
                      )}

                      {previewSteps.length === 0 ? (
                        <p className="rounded-xl bg-bloom-light/60 px-3 py-2 text-xs font-semibold text-bloom-forest/60 dark:bg-white/10 dark:text-gray-300">
                          No steps added yet.
                        </p>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {previewSteps.map((step) => (
                            <div
                              key={step.id}
                              className="flex items-center gap-2 text-xs font-semibold text-bloom-forest/75 dark:text-gray-300"
                            >
                              <span
                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
                                  step.completed
                                    ? "bg-bloom-mid text-white"
                                    : "bg-bloom-light text-transparent ring-1 ring-bloom-sage/40 dark:bg-white/10"
                                }`}
                              >
                                ✓
                              </span>

                              <span
                                className={
                                  step.completed
                                    ? "line-through opacity-60"
                                    : ""
                                }
                              >
                                {step.text}
                              </span>
                            </div>
                          ))}

                          {steps.length > 3 && (
                            <p className="text-xs font-semibold text-bloom-forest/45 dark:text-gray-400">
                              +{steps.length - 3} more step
                              {steps.length - 3 === 1 ? "" : "s"}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => goToPage("routines")}
            className="mt-5 w-full rounded-2xl bg-bloom-light px-5 py-3 text-sm font-bold text-bloom-forest transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-bloom-mid/80"
          >
            View routines
          </button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.65fr)]">
        <div className="rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
                Progress snapshot
              </p>

              <h3 className="mt-2 text-lg font-bold text-bloom-forest dark:text-bloom-light">
                Today
              </h3>
            </div>

            <button
              type="button"
              onClick={() => goToPage("progress")}
              className="rounded-full bg-bloom-light px-3 py-1.5 text-xs font-bold text-bloom-forest/70 transition hover:bg-bloom-mint/50 dark:bg-bloom-forest/85 dark:text-gray-300 dark:hover:bg-bloom-mid/80"
            >
              Open progress
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm dark:bg-white/5">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-bloom-sage/40 text-lg font-bold text-bloom-forest dark:border-white/10 dark:text-bloom-light">
                ✓
              </div>

              <p className="mt-3 text-xl font-bold text-bloom-forest dark:text-bloom-light">
                {taskStats.completedTasks}/{taskStats.totalTasks}
              </p>

              <p className="text-xs font-semibold text-bloom-forest/60 dark:text-gray-300">
                Tasks
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm dark:bg-white/5">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-bloom-sage/40 text-lg dark:border-white/10">
                🌿
              </div>

              <p className="mt-3 text-xl font-bold text-bloom-forest dark:text-bloom-light">
                {routineStats.completedSteps}/{routineStats.totalSteps}
              </p>

              <p className="text-xs font-semibold text-bloom-forest/60 dark:text-gray-300">
                Routine steps
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm dark:bg-white/5">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-bloom-sage/40 text-lg dark:border-white/10">
                ꕤ
              </div>

              <p className="mt-3 text-xl font-bold text-bloom-forest dark:text-bloom-light">
                {focusStats.completedFocusTasks}/{focusStats.totalFocusTasks}
              </p>

              <p className="text-xs font-semibold text-bloom-forest/60 dark:text-gray-300">
                Focus tasks
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm dark:bg-white/5">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-bloom-sage/40 text-lg dark:border-white/10">
                {progressIcon}
              </div>

              <p className="mt-3 text-sm font-bold text-bloom-forest dark:text-bloom-light">
                Gentle progress
              </p>

              <div className="mx-auto mt-3 h-2 w-full max-w-[120px] overflow-hidden rounded-full bg-bloom-light dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-bloom-mid transition-all dark:bg-bloom-sage"
                  style={{
                    width: `${combinedProgressPercent}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-xs font-semibold text-bloom-forest/60 dark:text-gray-300">
                Small steps count
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
            ꕤ Gentle note
          </p>

          <h3 className="mt-3 text-xl font-bold leading-snug text-bloom-forest dark:text-bloom-light">
            You are enough, exactly as you are.
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-bloom-forest/65 dark:text-gray-300">
            Small steps are still real progress. You do not need to earn rest.
          </p>

          <div className="pointer-events-none absolute -bottom-8 -right-4 text-8xl opacity-20">
            🌸
          </div>
        </div>  
      </section>
    </div>
  )
}

export default Home