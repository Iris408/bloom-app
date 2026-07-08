import { useEffect, useState } from "react"

import EmptyState from "../components/ui/EmptyState"
import { quietStartRoutines } from "../data/demoData"
import {
  markDailyResetComplete,
  resetRoutineStepCompletion,
  shouldRunDailyReset,
} from "../utils/dailyResetUtils"
import { triggerDemoCompletionEvent } from "../utils/demoCompletionEvent"

const ROUTINE_STORAGE_KEY = "bloom-routines"
const ROUTINE_DAILY_RESET_KEY = "bloom-routines-last-reset"

function ArrowUpIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  )
}

function ArrowDownIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="M19 12l-7 7-7-7" />
    </svg>
  )
}

function RoutinesIcon() {
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
      <path d="M8 6h12" />
      <path d="M8 12h12" />
      <path d="M8 18h12" />
      <path d="M4 6h.01" />
      <path d="M4 12h.01" />
      <path d="M4 18h.01" />
    </svg>
  )
}

function BloomRoutineHeroImage() {
  return (
    <div className="hidden h-[320px] overflow-hidden rounded-[1.75rem] border border-bloom-sage/20 bg-bloom-light/70 shadow-sm dark:border-white/10 dark:bg-white/10 lg:block lg:w-full">
      <img
        src="/illustrations/bloom-routines.png"
        alt=""
        className="h-full w-full object-cover object-contain"
      />
    </div>
  )
}

function getRoutineStats(routine) {
  const steps = routine.steps || []
  const totalSteps = steps.length
  const completedSteps = steps.filter((step) => step.completed).length

  const progressPercent =
    totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100)

  return {
    totalSteps,
    completedSteps,
    progressPercent,
  }
}

function getStarterRoutineIcon(routine, index) {
  if (routine.icon) return routine.icon
  if (routine.emoji) return routine.emoji

  const fallbackIcons = ["☀️", "📖", "💻", "🌙", "🌱"]
  return fallbackIcons[index % fallbackIcons.length]
}

function getStarterRoutineTitle(routine) {
  return routine.title || routine.name || "Starter routine"
}

function normaliseStarterRoutine(routine) {
  return {
    ...routine,
    name: routine.title || routine.name || "Starter routine",
    steps: (routine.steps || []).map((step, index) => {
      if (typeof step === "string") {
        return {
          id: `${routine.id}-step-${index}`,
          text: step,
          completed: false,
        }
      }

      return {
        ...step,
        id: step.id || `${routine.id}-step-${index}`,
        text: step.text || step.title || "Routine step",
        completed: false,
      }
    }),
  }
}

function Routines() {
  const [routines, setRoutines] = useState(() => {
    try {
      const savedRoutines = localStorage.getItem(ROUTINE_STORAGE_KEY)

      if (savedRoutines) {
        const parsedRoutines = JSON.parse(savedRoutines)

        if (shouldRunDailyReset(ROUTINE_DAILY_RESET_KEY)) {
          const resetRoutines = resetRoutineStepCompletion(parsedRoutines)

          localStorage.setItem(
            ROUTINE_STORAGE_KEY,
            JSON.stringify(resetRoutines)
          )
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
  const [expandedRoutineId, setExpandedRoutineId] = useState(null)
  const [exploredStarterRoutineId, setExploredStarterRoutineId] = useState(null)
  const [expandedWideId, setExpandedWideId] = useState(null)

  const starterRoutines = quietStartRoutines

  const visibleStarterRoutines = showDemoRoutines
    ? starterRoutines
    : starterRoutines.slice(0, 4)

  const selectedStarterCount = selectedDemoRoutineIds.length

  function handleLoadDemoRoutines() {
    setRoutines((prevRoutines) => {
      const existingIds = new Set(prevRoutines.map((routine) => routine.id))

      const routinesToAdd = starterRoutines
        .filter((routine) => selectedDemoRoutineIds.includes(routine.id))
        .filter((routine) => !existingIds.has(routine.id))
        .map((routine) => normaliseStarterRoutine(routine))

      return [...prevRoutines, ...routinesToAdd]
    })

    setSelectedDemoRoutineIds([])
    setShowDemoRoutines(false)
  }

  useEffect(() => {
    localStorage.setItem(ROUTINE_STORAGE_KEY, JSON.stringify(routines))

    window.dispatchEvent(new Event("bloom-routines-updated"))
  }, [routines])

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

  function handleEditRoutineStart(routine) {
    setEditingRoutineId(routine.id)
    setEditRoutineName(routine.name || routine.title || "")
  }

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

  function handleEditRoutineCancel() {
    setEditingRoutineId(null)
    setEditRoutineName("")
  }

  function handleAddStep(routineId) {
    const text = stepText[routineId]

    if (!text || text.trim() === "") return

    setRoutines(
      routines.map((routine) =>
        routine.id === routineId
          ? {
              ...routine,
              steps: [
                ...(routine.steps || []),
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

  function handleDeleteRoutine(routineId) {
    setRoutines(routines.filter((routine) => routine.id !== routineId))
  }

  function handleDeleteStep(routineId, stepId) {
    setRoutines(
      routines.map((routine) =>
        routine.id === routineId
          ? {
              ...routine,
              steps: (routine.steps || []).filter((step) => step.id !== stepId),
            }
          : routine
      )
    )
  }

  function handleToggleStep(routineId, stepId) {
    setRoutines((currentRoutines) =>
      currentRoutines.map((routine) => {
        if (routine.id !== routineId) return routine

        const currentSteps = routine.steps || []

        const updatedSteps = currentSteps.map((step) =>
          step.id === stepId
            ? {
                ...step,
                completed: !step.completed,
              }
            : step
        )

        const wasIncomplete = currentSteps.some((step) => !step.completed)

        const isNowComplete =
          updatedSteps.length > 0 &&
          updatedSteps.every((step) => step.completed)

        if (wasIncomplete && isNowComplete) {
          triggerDemoCompletionEvent("routine")
        }

        return {
          ...routine,
          steps: updatedSteps,
        }
      })
    )
  }

  function handleCompleteRoutine(routineId) {
    setRoutines((currentRoutines) =>
      currentRoutines.map((routine) => {
        if (routine.id !== routineId) return routine

        const currentSteps = routine.steps || []

        return {
          ...routine,
          steps: currentSteps.map((step) => ({
            ...step,
            completed: true,
          })),
        }
      })
    )

    triggerDemoCompletionEvent("routine")
  }

  function handleEditStepStart(step) {
    setEditingStepId(step.id)
    setEditStepText(step.text || step.title || "")
  }

  function handleEditStepSave(routineId, stepId) {
    if (editStepText.trim() === "") return

    setRoutines(
      routines.map((routine) =>
        routine.id === routineId
          ? {
              ...routine,
              steps: (routine.steps || []).map((step) =>
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

  function handleEditStepCancel() {
    setEditingStepId(null)
    setEditStepText("")
  }

  function handleMoveStep(routineId, stepIndex, direction) {
    setRoutines(
      routines.map((routine) => {
        if (routine.id !== routineId) {
          return routine
        }

        const updatedSteps = [...(routine.steps || [])]
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
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 overflow-x-hidden pb-28 sm:gap-7 sm:pb-0">
      {/* Hero */}
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,430px)]">
        <div className="min-w-0 rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-7">
          <div className="flex h-full flex-col justify-center">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-bloom-light text-bloom-forest shadow-sm dark:bg-white/10 dark:text-bloom-light">
                <RoutinesIcon />
              </span>

              <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
                Routines
              </p>
            </div>

            <h2 className="max-w-xl text-4xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-5xl">
              Nurture your daily rhythms, step by step
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-bloom-forest/65 dark:text-gray-300 sm:text-base">
              Create supportive rhythms that fit your brain, your life, and
              your energy.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setShowDemoRoutines(true)

                  const starterSection = document.getElementById("starter-routines-card")
                  
                  starterSection?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                }}
                className="rounded-full bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light shadow-sm transition hover:bg-bloom-mid dark:bg-bloom-mid/90 dark:text-bloom-light/90 dark:hover:bg-bloom-mint/50"
              >
                🌱 Browse starter routines
              </button>

              <button
                type="button"
                onClick={() => {
                  const addRoutineSection =
                    document.getElementById("add-routine-card")

                  addRoutineSection?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                }}
                className="rounded-full border border-bloom-sage/30 bg-white/70 px-5 py-3 text-sm font-bold text-bloom-forest/80 shadow-sm transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
              >
                ꕤ Add a new routine
              </button>
            </div>
          </div>
        </div>

        <BloomRoutineHeroImage />
      </section>

      {/* Starter routines + add routine */}
      <section className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,1.05fr)]">
        <div 
          id="starter-routines-card"
          className="min-w-0 rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="text-xl font-bold text-bloom-forest dark:text-bloom-light">
                🌱 Starter routines
              </p>

              <p className="mt-2 text-sm text-bloom-forest/65 dark:text-gray-300">
                Simple routines to help you get started.
              </p>
            </div>

            {starterRoutines.length > 2 && (
              <button
                type="button"
                onClick={() => setShowDemoRoutines(!showDemoRoutines)}
                className="rounded-full bg-bloom-light px-3 py-1.5 text-xs font-bold text-bloom-forest/70 transition hover:bg-bloom-mint/50 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/15"
              >
                {showDemoRoutines ? "Show less" : "See all"}
              </button>
            )}
          </div>

          <div className="-mx-1 flex min-w-0 snap-x gap-3 overflow-x-auto px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0">
            {visibleStarterRoutines.map((routine, index) => {
              const isSelected = selectedDemoRoutineIds.includes(routine.id)
              const isExplored = exploredStarterRoutineId === routine.id
              const routineSteps = routine.steps || []

              return (
                <article
                  key={routine.id}
                  className={`relative flex min-h-[185px] min-w-[235px] max-w-[235px] snap-start flex-col rounded-2xl border p-4 shadow-sm transition sm:min-w-[255px] sm:max-w-[255px] lg:min-w-0 lg:max-w-none ${
                    isSelected
                      ? "border-bloom-mid bg-bloom-light/80 dark:border-bloom-sage dark:bg-white/10"
                      : "border-bloom-sage/20 bg-white/65 dark:border-white/10 dark:bg-white/5"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bloom-light text-lg dark:bg-white/10">
                      {getStarterRoutineIcon(routine, index)}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold leading-snug text-bloom-forest dark:text-bloom-light">
                        {getStarterRoutineTitle(routine)}
                      </h4>

                      <p className="mt-1 text-xs text-bloom-forest/55 dark:text-gray-400">
                        {routineSteps.length} step
                        {routineSteps.length === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>

                  {isExplored && (
                    <div className="absolute inset-3 z-20 overflow-y-auto rounded-2xl border border-bloom-sage/25 bg-white/95 p-3 text-left shadow-lg backdrop-blur dark:border-white/10 dark:bg-dark-surface/95">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-bloom-mid dark:text-bloom-sage">
                          Preview
                        </p>

                        <button
                          type="button"
                          onClick={() => setExploredStarterRoutineId(null)}
                          className="rounded-full bg-bloom-light px-2 py-1 text-xs font-bold text-bloom-forest transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light"
                        >
                          Close
                        </button>
                      </div>

                      {routine.description && (
                        <p className="mb-3 text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
                          {routine.description}
                        </p>
                      )}

                      <div className="space-y-2">
                        {routineSteps.slice(0, 4).map((step, stepIndex) => (
                          <p
                            key={step.id || `${routine.id}-preview-${stepIndex}`}
                            className="text-xs leading-5 text-bloom-forest/70 dark:text-gray-300"
                          >
                            <span className="font-bold">{stepIndex + 1}.</span>{" "}
                            {typeof step === "string"
                              ? step
                              : step.text || step.title || "Routine step"}
                          </p>
                        ))}
                      </div>

                      {routineSteps.length > 4 && (
                        <p className="mt-2 text-xs font-semibold text-bloom-forest/45 dark:text-gray-400">
                          +{routineSteps.length - 4} more steps
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setExploredStarterRoutineId(
                          isExplored ? null : routine.id
                        )
                      }
                      className="flex-1 rounded-full border border-bloom-sage/25 bg-white/70 px-4 py-2 text-xs font-bold text-bloom-forest/70 transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-bloom-mid/50"
                    >
                      {isExplored ? "Close routine" : "View routine"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDemoRoutineIds((prevIds) =>
                          prevIds.includes(routine.id)
                            ? prevIds.filter((id) => id !== routine.id)
                            : [...prevIds, routine.id]
                        )
                      }}
                      className={`flex-1 rounded-full px-3 py-2 text-xs font-bold transition ${
                        isSelected
                          ? "bg-bloom-forest text-bloom-light dark:bg-bloom-sage dark:text-bloom-forest"
                          : "bg-bloom-light text-bloom-forest hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light"
                      }`}
                    >
                      {isSelected ? "Selected" : "Select"}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>

          <button
            type="button"
            onClick={handleLoadDemoRoutines}
            disabled={selectedStarterCount === 0}
            className="mt-5 w-full rounded-full bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light shadow-sm transition hover:bg-bloom-mid disabled:cursor-not-allowed disabled:opacity-40 dark:bg-bloom-mint dark:text-bloom-forest"
          >
            {selectedStarterCount === 0
              ? "Select starter routines"
              : `Add ${selectedStarterCount} starter routine${
                  selectedStarterCount === 1 ? "" : "s"
                }`}
          </button>
        </div>

        <div
          id="add-routine-card"
          className="relative min-w-0 overflow-hidden rounded-[2rem] border border-bloom-sage/25 bg-bloom-light/55 p-5 text-center shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-bloom-forest/40 bg-bloom-forest text-4xl text-bloom-light shadow-sm dark:bg-bloom-sage dark:text-bloom-forest">
            +
          </div>

          <h3 className="mt-6 text-2xl font-bold text-bloom-forest dark:text-bloom-light sm:mt-6 sm:text-3xl">
            Add a new routine
          </h3>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-bloom-forest/65 dark:text-gray-300">
            Create a routine that works for you. You're in control.
          </p>

          <div className="mx-auto mt-6 flex w-full max-w-md flex-col gap-2 rounded-2xl border border-bloom-sage/30 bg-white/80 px-3 py-3 shadow-sm transition focus-within:border-bloom-mid focus-within:ring-2 focus-within:ring-bloom-mint/35 dark:border-white/10 dark:bg-dark-surface/70 sm:flex-row sm:items-center sm:py-2">
            <input
              type="text"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddRoutine()
              }}
              placeholder="Add one gentle routine..."
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-bloom-forest outline-none placeholder:text-bloom-forest/40 dark:text-gray-100 dark:placeholder:text-bloom-light/60"
            />

            <button
              type="button"
              onClick={handleAddRoutine}
              className="w-full rounded-full bg-bloom-forest px-4 py-2 text-xs font-bold text-bloom-light transition hover:bg-bloom-mid dark:bg-bloom-mint/50 dark:text-bloom-forest sm:w-auto"
            >
              Create
            </button>
          </div>

          <div className="pointer-events-none absolute -right-6 bottom-6 text-7xl opacity-20">
            🌿
          </div>

          <div className="pointer-events-none absolute right-14 top-16 text-4xl opacity-30">
            🌸
          </div>
        </div>
      </section>

      {/* All routines + reminder */}
      <section className="grid gap-5 overflow-x-hidden lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-w-0 rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xl font-bold text-bloom-forest dark:text-bloom-light">
                🌿 All routines
              </p>

              <p className="mt-2 text-sm text-bloom-forest/65 dark:text-gray-300">
                Your routines, all in one place.
              </p>
            </div>

            <div className="rounded-full border border-bloom-sage/25 bg-white/70 px-4 py-2 text-xs font-semibold text-bloom-forest/60 dark:border-white/10 dark:bg-white/10 dark:text-gray-300">
              {routines.length === 0
                ? "No routines yet"
                : `${routines.length} saved`}
            </div>
          </div>

          {routines.length === 0 ? (
            <EmptyState
              icon="🌿"
              title="No routines yet"
              message="Add your first routine when you're ready, or choose a starter routine above."
            />
          ) : (
            <div className="w-full min-w-0 -mx-1 flex gap-4 overflow-x-auto px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {routines.map((routine, index) => {
                const progress = getRoutineStats(routine)
                const isExpanded = expandedRoutineId === routine.id
                const routineSteps = routine.steps || []

                return (
                  <div
                    key={routine.id}
                    className={`relative shrink-0 rounded-[1.5rem] border border-bloom-sage/20 bg-white/70 p-4 shadow-sm transition-all duration-300 dark:border-white/10 dark:bg-white/5 ${
                      expandedWideId === routine.id
                        ? "w-[560px] sm:w-[600px] lg:w-[620px]"
                        : "w-[260px] sm:w-[285px] lg:w-[310px]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-bloom-light text-2xl dark:bg-white/10">
                          {getStarterRoutineIcon(routine, index)}
                        </div>

                        {editingRoutineId === routine.id ? (
                          <input
                            type="text"
                            value={editRoutineName}
                            onChange={(e) =>
                              setEditRoutineName(e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleEditRoutineSave(routine.id)
                              }
                            }}
                            className="w-full rounded-xl border border-bloom-sage/30 bg-white/80 px-3 py-2 text-bloom-forest outline-none dark:border-white/10 dark:bg-white/10 dark:text-gray-100"
                          />
                        ) : (
                          <h3 className="min-h-[3rem] break-words text-lg font-bold leading-snug text-bloom-forest dark:text-bloom-light">
                            {routine.name || routine.title || "Untitled routine"}
                          </h3>
                        )}

                        <p className="mt-1 text-xs text-bloom-forest/55 dark:text-gray-400">
                          {progress.totalSteps} step
                          {progress.totalSteps === 1 ? "" : "s"}
                        </p>
                      </div>

                      {editingRoutineId === routine.id ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditRoutineSave(routine.id)}
                            className="rounded-full bg-bloom-light px-3 py-1.5 text-xs font-bold text-bloom-forest transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light"
                          >
                            Save
                          </button>

                          <button
                            type="button"
                            onClick={handleEditRoutineCancel}
                            className="rounded-full px-3 py-1.5 text-xs font-bold text-bloom-forest/50 transition hover:text-bloom-forest dark:text-gray-400 dark:hover:text-bloom-light"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex shrink-0 gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditRoutineStart(routine)}
                            aria-label="Edit routine"
                            title="Edit routine"
                            className="rounded-full px-2 py-1 text-xl font-bold text-bloom-forest/50 transition hover:text-bloom-forest dark:text-gray-400 dark:hover:text-bloom-light"
                          >
                            ✎
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteRoutine(routine.id)}
                            aria-label="Delete routine"
                            title="Delete routine"
                            className="rounded-full px-2 py-1 text-sm font-bold text-red-400 transition hover:text-red-600"
                          >
                            🗑
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-bloom-light dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-bloom-mid transition-all dark:bg-bloom-sage"
                        style={{ width: `${progress.progressPercent}%` }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (isExpanded) {
                          setExpandedRoutineId(null)
                          setExpandedWideId(null)
                        } else {
                          setExpandedRoutineId(routine.id)
                          setExpandedWideId(routine.id)
                        }
                      }}    
                      className="mt-4 w-full rounded-full border border-bloom-sage/25 bg-white/70 px-4 py-2 text-xs font-bold text-bloom-forest/75 transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
                    >
                      {isExpanded ? "Close routine" : "View routine"}
                    </button>

                    {isExpanded && (
                      <div className="absolute inset-0 z-20 overflow-y-auto rounded-[1.5rem] border border-bloom-sage/25 bg-white/97 p-5 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-dark-surface/97">
                        <div className="mb-4 flex items-center gap-3">
                          <p className="text-xs font-bold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
                            {routine.name || routine.title}
                          </p>

                          <div className="ml-auto flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setExpandedWideId(
                                expandedWideId === routine.id ? null : routine.id
                              )}
                              aria-label={expandedWideId === routine.id ? "Collapse card" : "Expand card"}
                              title={expandedWideId === routine.id ? "Collapse" : "Expand"}
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-bloom-sage/25 bg-white/70 text-bloom-forest/60 transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light"
                            >
                              {expandedWideId === routine.id ? (
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                                  <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                                  <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                                  <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                                </svg>
                              ) : (
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M15 3h6v6" />
                                  <path d="M9 21H3v-6" />
                                  <path d="M21 3l-7 7" />
                                  <path d="M3 21l7-7" />
                                </svg>
                              )}
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setExpandedRoutineId(null)
                              setExpandedWideId(null)
                            }}
                            className="rounded-full bg-bloom-light px-3 py-1 text-xs font-bold text-bloom-forest transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light">
                              Close
                          </button>
                        </div>

                        {routineSteps.length === 0 ? (
                          <p className="text-sm text-bloom-forest/55 dark:text-gray-300">
                            No steps added yet.
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {routineSteps.map((step, stepIndex) => (
                              <div
                                key={step.id}
                                className="rounded-2xl bg-bloom-light/60 px-3 py-2 dark:bg-dark-deep/60"
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="min-w-0 flex-1">
                                    {editingStepId === step.id ? (
                                      <input
                                        type="text"
                                        value={editStepText}
                                        onChange={(e) =>
                                          setEditStepText(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter") {
                                            handleEditStepSave(
                                              routine.id,
                                              step.id
                                            )
                                          }
                                        }}
                                        className="w-full bg-transparent text-sm text-bloom-forest outline-none dark:text-bloom-light"
                                      />
                                    ) : (
                                      <div className="flex items-center gap-3">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleToggleStep(
                                              routine.id,
                                              step.id
                                            )
                                          }
                                          aria-label={
                                            step.completed
                                              ? "Mark step as incomplete"
                                              : "Mark step as complete"
                                          }
                                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition ${
                                            step.completed
                                              ? "border-bloom-forest bg-bloom-forest text-white dark:border-bloom-sage dark:bg-bloom-sage dark:text-bloom-forest"
                                              : "border-bloom-sage text-transparent hover:border-bloom-forest dark:hover:border-bloom-light"
                                          }`}
                                        >
                                          ✓
                                        </button>

                                        <p
                                          className={`truncate text-sm ${
                                            step.completed
                                              ? "text-gray-400 line-through"
                                              : "text-bloom-forest dark:text-gray-200"
                                          }`}
                                        >
                                          <span className="mr-2 font-semibold">
                                            {stepIndex + 1}.
                                          </span>
                                          {step.text || step.title || "Routine step"}
                                        </p>
                                      </div>
                                    )}
                                  </div>

                                  {editingStepId === step.id ? (
                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleEditStepSave(
                                            routine.id,
                                            step.id
                                          )
                                        }
                                        className="text-xs font-bold text-bloom-mid dark:text-bloom-sage"
                                      >
                                        Save
                                      </button>

                                      <button
                                        type="button"
                                        onClick={handleEditStepCancel}
                                        className="text-xs font-bold text-gray-500 dark:text-red-400"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex shrink-0 items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleMoveStep(
                                            routine.id,
                                            stepIndex,
                                            -1
                                          )
                                        }
                                        disabled={stepIndex === 0}
                                        aria-label="Move step up"
                                        title="Move up"
                                        className="flex h-6 w-6 items-center justify-center rounded-full text-bloom-mid transition hover:text-bloom-forest disabled:cursor-not-allowed disabled:opacity-30 dark:text-bloom-sage dark:hover:text-bloom-light"
                                      >
                                        <ArrowUpIcon />
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleMoveStep(
                                            routine.id,
                                            stepIndex,
                                            1
                                          )
                                        }
                                        disabled={
                                          stepIndex === routineSteps.length - 1
                                        }
                                        aria-label="Move step down"
                                        title="Move down"
                                        className="flex h-6 w-6 items-center justify-center rounded-full text-bloom-mid transition hover:text-bloom-forest disabled:cursor-not-allowed disabled:opacity-30 dark:text-bloom-sage dark:hover:text-bloom-light"
                                      >
                                        <ArrowDownIcon />
                                      </button>

                                      {/* Divider */ }
                                      <div className="mx-1.5 h-4 w-px bg-bloom-sage/30 dark:bg-white/20" />

                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleEditStepStart(step)
                                        }
                                        aria-label="Edit step"
                                        title="Edit step"
                                        className="text-lg font-bold text-bloom-mid transition hover:text-bloom-forest dark:text-bloom-sage dark:hover:text-bloom-light"
                                      >
                                        ✎
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleDeleteStep(routine.id, step.id)
                                        }
                                        aria-label="Remove step"
                                        title="Remove step"
                                        className="text-sm font-bold text-red-400 transition hover:text-red-600"
                                      >
                                        🗑
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-bloom-sage/30 bg-white/80 px-3 py-2 dark:border-white/10 dark:bg-white/10">
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
                            className="min-w-0 flex-1 bg-transparent text-sm text-bloom-forest outline-none placeholder:text-bloom-forest/40 dark:text-gray-100 dark:placeholder:text-gray-400"
                          />

                          <button
                            type="button"
                            onClick={() => handleAddStep(routine.id)}
                            className="rounded-full bg-bloom-light px-3 py-2 text-xs font-bold text-bloom-forest transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="hidden lg:block relative overflow-hidden rounded-[2rem] border border-orange-100 bg-orange-50/60 p-4 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
            🔔 Bloom reminder
          </p>

          <div className="mx-auto mt-5 text-4xl opacity-80">🌸</div>

          <h3 className="mt-4 text-lg font-bold leading-snug text-bloom-forest dark:text-bloom-light">
            You're doing enough.
          </h3>

          <p className="mx-auto mt-3 max-w-[180px] text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
            Small steps still count. Be kind to your pace.
          </p>

          <button
            type="button"
            className="mt-5 rounded-full border border-orange-200 bg-white/70 px-4 py-2 text-xs font-bold text-bloom-forest/75 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-bloom-light"
          >
            ♡ Breathe
          </button>
        </div>
      </section>
    </div>
  )
}

export default Routines