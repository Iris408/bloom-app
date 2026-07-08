import { useEffect, useRef, useState } from "react"

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

  return "Good evening"
}

function getProgressIcon(progressPercent) {
  if (progressPercent < 25) return "🌱"
  if (progressPercent < 50) return "🌿"
  if (progressPercent < 75) return "🌸"

  return "🌳"
}

function formatFocusTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}:${String(seconds).padStart(2, "0")}`
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
  const [focusRemainingSeconds, setFocusRemainingSeconds] = useState(10 * 60)
  const [isFocusRunning, setIsFocusRunning] = useState(false)

  const [taskStats, setTaskStats] = useState(() => getTaskStats())
  const [routines, setRoutines] = useState(() => getStoredRoutines())

  const taskPanelRef = useRef(null)
  const focusPanelRef = useRef(null)
  const routinePanelRef = useRef(null)

  const { focusTasks } = useApp()
  const today = todayKey()

  const avatarDisplay = getAvatarDisplay(currentUser)

  const username =
    currentUser?.username || (isDemoMode ? "Demo user" : "Bloom user")

  const displayName = username
  const greeting = getTimeGreeting()

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

  const isNeurodivergentDemo =
    isDemoMode &&
    (demoType === "neurodivergent" ||
      demoType === "neurodivergent-day" ||
      demoType === "neurodivergentFriendly")

  const focusTimerLabel = formatFocusTime(focusRemainingSeconds)

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

  useEffect(() => {
    if (!isFocusRunning) return undefined

    const intervalId = window.setInterval(() => {
      setFocusRemainingSeconds((currentSeconds) => {
        if (currentSeconds <= 1) {
          window.clearInterval(intervalId)
          setIsFocusRunning(false)
          return 0
        }

        return currentSeconds - 1
      })
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isFocusRunning])

  function goToPage(page) {
    if (!setActivePage) return

    setActivePage(page)
  }

  function scrollToPanel(panelRef) {
    panelRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }

  function handleSelectFocusMinutes(minutes) {
    setSelectedFocusMinutes(minutes)
    setFocusRemainingSeconds(minutes * 60)
    setIsFocusRunning(false)
  }

  function handleStartFocus() {
    if (focusRemainingSeconds <= 0) {
      setFocusRemainingSeconds(selectedFocusMinutes * 60)
    }

    setIsFocusRunning(true)

    requestAnimationFrame(() => {
      scrollToPanel(focusPanelRef)
    })
  }

  function handlePauseFocus() {
    setIsFocusRunning(false)
  }

  function handleResetFocus() {
    setIsFocusRunning(false)
    setFocusRemainingSeconds(selectedFocusMinutes * 60)
  }

  function handleToggleRoutineStep(routineId, stepId) {
    const updatedRoutines = routines.map((routine) => {
      if (routine.id !== routineId) return routine

      return {
        ...routine,
        steps: (routine.steps || []).map((step) =>
          step.id === stepId
            ? {
                ...step,
                completed: !step.completed,
              }
            : step
        ),
      }
    })

    setRoutines(updatedRoutines)
    localStorage.setItem(ROUTINE_STORAGE_KEY, JSON.stringify(updatedRoutines))
    window.dispatchEvent(new Event("bloom-routines-updated"))
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 overflow-x-hidden pb-28 sm:gap-6 sm:pb-0">
      {isDemoMode && (
        <DemoBanner
          demoType={demoType}
          onCreateAccount={onCreateAccount}
          onExitDemoClick={onExitDemoClick}
        />
      )}

      <div
        className={
          isDemoMode
            ? "grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2"
            : "grid grid-cols-1"
        }
      >
        {/* GOOD MORNING / HOME PANEL */}
        <section className="flex h-full rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-4 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-5">
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
                Home
              </p>

              <h2 className="break-words text-2xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-3xl">
                {greeting}, {displayName} ꕤ
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-bloom-forest/65 dark:text-gray-300">
                Choose one gentle step, pause when needed, and come back when
                you're ready.
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[1.2rem] bg-bloom-forest text-xl font-bold text-bloom-light shadow-sm">
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

        {/* DEMO FOCUS PANEL */}
        {isDemoMode && (
          <section
            ref={focusPanelRef}
            className="flex h-full rounded-[1.75rem] border border-bloom-sage/25 bg-gradient-to-br from-bloom-light/80 via-white/70 to-bloom-mint/35 p-4 shadow-sm dark:border-white/10 dark:from-white/10 dark:via-bloom-mid/15 dark:to-bloom-forest/35 sm:p-5"
          >
            <div className="flex w-full flex-col justify-between gap-4">
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
                  Focus mode
                </p>

                <h2 className="break-words text-2xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-3xl">
                  {isNeurodivergentDemo
                    ? "Try one calm pause ꕤ"
                    : "Try one calm focus block ꕤ"}
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-bloom-forest/65 dark:text-gray-300">
                  {isNeurodivergentDemo
                    ? "Start with a short, quiet timer from Home. You can stop whenever you need."
                    : "Start with a short timer directly from Home. Demo mode has been designed so you can experience Bloom without needing to open another page."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-2xl bg-white/70 px-4 py-3 text-sm font-bold text-bloom-forest dark:bg-white/10 dark:text-bloom-light">
                  {focusTimerLabel}
                </div>

                {isFocusRunning ? (
                  <button
                    type="button"
                    onClick={handlePauseFocus}
                    className="rounded-2xl bg-bloom-forest px-4 py-2.5 text-sm font-bold text-bloom-light transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest dark:hover:bg-bloom-light"
                  >
                    Pause focus
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStartFocus}
                    className="rounded-2xl bg-bloom-forest px-4 py-2.5 text-sm font-bold text-bloom-light transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest dark:hover:bg-bloom-light"
                  >
                    Start focus
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleResetFocus}
                  className="rounded-2xl border border-bloom-sage/25 bg-white/70 px-4 py-2.5 text-sm font-bold text-bloom-forest transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
                >
                  Reset
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      <section
        className={
          isDemoMode
            ? "grid gap-4 xl:grid-cols-[minmax(0,0.75fr)_minmax(0,1.55fr)]"
            : "grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)_minmax(240px,0.7fr)]"
        }
      >
        <div
          ref={taskPanelRef}
          className="rounded-[1.5rem] border border-bloom-sage/25 bg-white/55 p-4 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-5 lg:p-6"
        >
          <div className="mb-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
              Today
            </p>

            <h3 className="mt-1 text-lg font-bold text-bloom-forest dark:text-bloom-light">
              Today's tasks
            </h3>
          </div>

          <TaskList />
        </div>

        {!isDemoMode && (
          <div
            ref={focusPanelRef}
            className="flex flex-col justify-between rounded-[1.5rem] border border-bloom-sage/25 bg-white/55 p-4 text-center shadow-sm dark:border-white/10 dark:bg-white/5"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
                Focus
              </p>

              <div className="mx-auto mt-4 flex h-32 w-32 flex-col items-center justify-center rounded-full border-[8px] border-bloom-sage/35 bg-bloom-light/50 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold text-bloom-forest/60 dark:text-gray-300">
                  Deep Focus
                </p>

                <p className="mt-1 text-3xl font-bold text-bloom-forest dark:text-bloom-light">
                  {focusTimerLabel}
                </p>
              </div>

              <p className="mt-3 text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
                Start with one quiet block. You can stop, pause, or restart
                whenever you need.
              </p>

              <div className="mt-3 rounded-2xl bg-white/70 px-4 py-3 shadow-sm dark:bg-white/5">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-bloom-mid dark:text-bloom-sage">
                  Today's focus
                </p>

                <p className="mt-2 text-sm font-bold text-bloom-forest dark:text-bloom-light">
                  {focusStats.completedFocusTasks}/{focusStats.totalFocusTasks}{" "}
                  focus tasks
                </p>

                <p className="mt-1 text-xs leading-4 text-bloom-forest/60 dark:text-gray-300">
                  {focusStats.totalFocusTasks === 0
                    ? "No focus tasks yet. Add one when you're ready."
                    : focusStats.completedFocusTasks ===
                        focusStats.totalFocusTasks
                      ? "All focus tasks complete for today."
                      : "Keep going at your own pace."}
                </p>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {FOCUS_OPTIONS.map((minutes) => (
                  <button
                    key={minutes}
                    type="button"
                    onClick={() => handleSelectFocusMinutes(minutes)}
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

            <div className="mt-3 flex justify-center gap-2">
              {isFocusRunning ? (
                <button
                  type="button"
                  onClick={handlePauseFocus}
                  className="rounded-full bg-bloom-mid px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-bloom-forest dark:bg-bloom-forest/80 dark:hover:bg-bloom-mid/80"
                >
                  Pause focus
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStartFocus}
                  className="rounded-full bg-bloom-mid px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-bloom-forest dark:bg-bloom-forest/80 dark:hover:bg-bloom-mid/80"
                >
                  Start focus
                </button>
              )}

              <button
                type="button"
                onClick={handleResetFocus}
                className="rounded-full bg-bloom-light px-5 py-2.5 text-sm font-bold text-bloom-forest transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        <div
          ref={routinePanelRef}
          className={`rounded-[1.5rem] border border-bloom-sage/25 bg-white/55 shadow-sm dark:border-white/10 dark:bg-white/5 ${
            isDemoMode ? "p-5 sm:p-6" : "p-4"
          }`}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
                Routine
              </p>

              <h3 className="mt-1 text-lg font-bold text-bloom-forest dark:text-bloom-light">
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

            <span className="rounded-full bg-bloom-light px-2.5 py-2 text-sm dark:bg-white/10">
              ➤
            </span>
          </div>

          {routines.length === 0 ? (
            <div className="rounded-2xl bg-white/70 px-4 py-5 text-center shadow-sm dark:bg-white/5">
              <p className="text-2xl">🌿</p>

              <p className="mt-1 text-sm font-bold text-bloom-forest dark:text-bloom-light">
                No routines yet
              </p>

              <p className="mt-1 text-xs leading-4 text-bloom-forest/60 dark:text-gray-300">
                Create your first routine when you're ready.
              </p>
            </div>
          ) : (
            <div
              className={
                isDemoMode
                  ? "max-h-[360px] overflow-y-auto pr-1"
                  : "max-h-[200px] overflow-y-auto pr-1"
              }
            >
              <div className="flex flex-col gap-3">
                {routines.map((routine) => {
                  const steps = routine.steps || []
                  const completedSteps = steps.filter(
                    (step) => step.completed
                  ).length
                  const totalSteps = steps.length
                  const previewSteps = steps.slice(0, isDemoMode ? 5 : 3)

                  return (
                    <div
                      key={routine.id}
                      className="rounded-2xl bg-white/70 px-4 py-4 shadow-sm dark:bg-white/5"
                    >
                      <div className="mb-2 flex items-start justify-between gap-3">
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
                        <div className="mb-2 h-2 overflow-hidden rounded-full bg-bloom-light dark:bg-white/10">
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
                        <p className="rounded-xl bg-bloom-light/60 px-2 py-2 text-xs font-semibold text-bloom-forest/60 dark:bg-white/10 dark:text-gray-300">
                          No steps added yet.
                        </p>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {previewSteps.map((step) => (
                            <button
                              key={step.id}
                              type="button"
                              onClick={() => handleToggleRoutineStep(routine.id, step.id)}
                              className="flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left text-xs font-semibold text-bloom-forest/75 transition hover:bg-bloom-light/60 dark:text-gray-300 dark:hover:bg-white/10"
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

                              <span className={step.completed ? "line-through opacity-60" : ""}>
                                {step.text}
                              </span>
                            </button>
                          ))}
                          {steps.length > previewSteps.length && (
                            <p className="text-xs font-semibold text-bloom-forest/45 dark:text-gray-400">
                              +{steps.length - previewSteps.length} more step
                              {steps.length - previewSteps.length === 1
                                ? ""
                                : "s"}
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

          {!isDemoMode && (
            <button
              type="button"
              onClick={() => goToPage("routines")}
              className="mt-3 w-full rounded-2xl bg-bloom-light px-5 py-3 text-sm font-bold text-bloom-forest transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-bloom-mid/80"
            >
              View routines
            </button>
          )}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.65fr)]">
        <div className="rounded-[1.5rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
                Progress snapshot
              </p>

              <h3 className="mt-1 text-lg font-bold text-bloom-forest dark:text-bloom-light">
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
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-4 border-bloom-sage/40 text-lg font-bold text-bloom-forest dark:border-white/10 dark:text-bloom-light">
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
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-4 border-bloom-sage/40 text-lg dark:border-white/10">
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
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-4 border-bloom-sage/40 text-lg dark:border-white/10">
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
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-4 border-bloom-sage/40 text-lg dark:border-white/10">
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

        <div className="relative overflow-hidden rounded-[1.5rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
            ꕤ Gentle note
          </p>

          <h3 className="mt-6 text-xl font-bold leading-snug text-bloom-forest dark:text-bloom-light">
            You are enough, exactly as you are.
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-bloom-forest/65 dark:text-gray-300">
            Small steps are still real progress. You do not need to earn rest.
          </p>

          <div className="pointer-events-none absolute -bottom-4 -right-4 text-8xl opacity-20">
            🌸
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home