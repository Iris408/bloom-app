import { useEffect, useMemo, useState } from "react"

import EmptyState from "../components/ui/EmptyState"
import { useApp } from "../context/AppContext"
import { todayKey } from "../utils/progressUtils"

const FOCUS_HISTORY_STORAGE_KEY = "bloom-focus-history"

const FOCUS_TYPES = [
  {
    id: "reset",
    label: "Reset Session",
    shortLabel: "Reset",
    minutes: 5,
    icon: "🌱",
    description: "A tiny pause to return gently.",
  },
  {
    id: "gentle",
    label: "Gentle Start",
    shortLabel: "Gentle",
    minutes: 10,
    icon: "☕",
    description: "A short session for getting started.",
  },
  {
    id: "deep",
    label: "Deep Focus",
    shortLabel: "Deep",
    minutes: 25,
    icon: "🌿",
    description: "A calm focused block.",
  },
  {
    id: "study",
    label: "Study Flow",
    shortLabel: "Study",
    minutes: 30,
    icon: "📖",
    description: "A longer flow for notes, study, or project work.",
  },
]

const ENVIRONMENTS = [
  {
    id: "forest",
    label: "Forest birds",
    icon: "🌿",
  },
  {
    id: "rain",
    label: "Soft rain",
    icon: "🌧",
  },
  {
    id: "quiet",
    label: "Quiet room",
    icon: "☕",
  },
  {
    id: "none",
    label: "No sound",
    icon: "○",
  },
]

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

function FocusHeroImage() {
  return (
    <div className="hidden h-[320px] overflow-hidden rounded-[1.75rem] border border-bloom-sage/20 bg-bloom-light/70 shadow-sm dark:border-white/10 dark:bg-white/10 lg:block lg:w-full">
      <img
        src="/illustrations/bloom-focus.png"
        alt=""
        className="h-full w-full object-cover object-contain"
      />
    </div>
  )
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`
}

function getStoredFocusHistory() {
  try {
    const storedHistory = localStorage.getItem(FOCUS_HISTORY_STORAGE_KEY)
    const parsedHistory = storedHistory ? JSON.parse(storedHistory) : []

    return Array.isArray(parsedHistory) ? parsedHistory : []
  } catch {
    return []
  }
}

function isWithinLastSevenDays(dateValue) {
  const sessionDate = new Date(`${dateValue}T00:00:00`)
  const today = new Date()
  const difference = today.getTime() - sessionDate.getTime()
  const sevenDays = 7 * 24 * 60 * 60 * 1000

  return difference >= 0 && difference <= sevenDays
}

function Focus() {
  const {
    focusTasks,
    addFocusTask,
    toggleFocusTaskComplete,
    deleteFocusTask,
  } = useApp()

  const today = todayKey()

  const [taskTitle, setTaskTitle] = useState("")
  const [selectedTaskId, setSelectedTaskId] = useState(null)

  const [selectedFocusTypeId, setSelectedFocusTypeId] = useState("deep")
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isSessionComplete, setIsSessionComplete] = useState(false)

  const [selectedEnvironmentId, setSelectedEnvironmentId] = useState("forest")
  const [reflectionText, setReflectionText] = useState("")
  const [focusHistory, setFocusHistory] = useState(() => getStoredFocusHistory())

  const selectedFocusType =
    FOCUS_TYPES.find((type) => type.id === selectedFocusTypeId) ||
    FOCUS_TYPES[2]

  const selectedEnvironment =
    ENVIRONMENTS.find((environment) => environment.id === selectedEnvironmentId) ||
    ENVIRONMENTS[0]

  const totalSeconds = selectedFocusType.minutes * 60
  const timerProgressDegrees = Math.round(
    ((totalSeconds - secondsRemaining) / totalSeconds) * 360
  )

  const todayFocusTasks = useMemo(() => {
    return (focusTasks ?? []).filter((task) => task.scheduledFor === today)
  }, [focusTasks, today])

  const completedCount = todayFocusTasks.filter(
    (task) => task.completedOn === today
  ).length

  const totalCount = todayFocusTasks.length

  const selectedFocusTask =
    todayFocusTasks.find((task) => task.id === selectedTaskId) ||
    todayFocusTasks.find((task) => task.completedOn !== today) ||
    todayFocusTasks[0] ||
    null

  const weeklyFocusHistory = focusHistory.filter((session) =>
    isWithinLastSevenDays(session.date)
  )

  const weeklyMinutes = weeklyFocusHistory.reduce((total, session) => {
    return total + session.minutes
  }, 0)

  const focusMessage =
    totalCount === 0
      ? "Pick one small thing, or start with a gentle 10-minute session."
      : completedCount === totalCount
        ? "You did everything you set out to do today. Well done."
        : completedCount > 0
          ? "You are making gentle progress."
          : "There is no rush. Start when it feels right."

  useEffect(() => {
    localStorage.setItem(
      FOCUS_HISTORY_STORAGE_KEY,
      JSON.stringify(focusHistory)
    )
  }, [focusHistory])

  useEffect(() => {
    if (!isTimerRunning) return undefined

    const timerId = window.setInterval(() => {
      setSecondsRemaining((currentSeconds) => {
        if (currentSeconds <= 1) {
          setIsTimerRunning(false)
          setIsSessionComplete(true)
          return 0
        }

        return currentSeconds - 1
      })
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [isTimerRunning])

  function handleSelectFocusType(focusType) {
    setSelectedFocusTypeId(focusType.id)
    setSecondsRemaining(focusType.minutes * 60)
    setIsTimerRunning(false)
    setIsSessionComplete(false)
  }

  function handleStartTimer() {
    if (secondsRemaining === 0) {
      setSecondsRemaining(totalSeconds)
      setIsSessionComplete(false)
    }

    setIsTimerRunning(true)
  }

  function handlePauseTimer() {
    setIsTimerRunning(false)
  }

  function handleResetTimer() {
    setIsTimerRunning(false)
    setIsSessionComplete(false)
    setSecondsRemaining(totalSeconds)
  }

  function handleStartBreak() {
    const resetSession = FOCUS_TYPES.find((type) => type.id === "reset")

    if (!resetSession) return

    setSelectedFocusTypeId(resetSession.id)
    setSecondsRemaining(resetSession.minutes * 60)
    setIsSessionComplete(false)
    setIsTimerRunning(true)
  }

  function handleSaveReflection() {
    if (!isSessionComplete && reflectionText.trim() === "") return

    const newSession = {
      id: Date.now(),
      date: today,
      minutes: selectedFocusType.minutes,
      type: selectedFocusType.label,
      environment: selectedEnvironment.label,
      reflection:
        reflectionText.trim() || "I showed up for one small focus session.",
    }

    setFocusHistory((previousHistory) => [newSession, ...previousHistory].slice(0, 20))
    setReflectionText("")
    setIsSessionComplete(false)
    setSecondsRemaining(totalSeconds)
  }

  function handleAddFocusTask() {
    if (taskTitle.trim() === "") return

    addFocusTask(taskTitle.trim(), today)
    setTaskTitle("")
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 overflow-x-hidden pb-28 sm:gap-7 sm:pb-0">
      {/* Focus hero */}
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(340px,500px)]">
        <div className="min-w-0 rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-7">
          <div className="flex h-full flex-col justify-center">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-bloom-light text-bloom-forest shadow-sm dark:bg-white/10 dark:text-bloom-light">
                <FocusIcon />
              </span>

              <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
                Focus
              </p>
            </div>

            <h2 className="max-w-2xl text-4xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-5xl">
              Focus gently, one small session at a time.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-bloom-forest/65 dark:text-gray-300 sm:text-base">
              Choose one task, start a calm timer, and give yourself space to
              begin.
            </p>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-bloom-forest/65 dark:text-gray-300 sm:text-base">
              Pick one small thing. Start gently. Stop when you need to.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  const timerSection = document.getElementById("focus-timer")

                  timerSection?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                }}
                className="rounded-full bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light shadow-sm transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest"
              >
                Start focus
              </button>

              <button
                type="button"
                onClick={() => {
                  const focusTypeSection =
                    document.getElementById("focus-types")

                  focusTypeSection?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                }}
                className="rounded-full border border-bloom-sage/30 bg-white/70 px-5 py-3 text-sm font-bold text-bloom-forest/80 shadow-sm transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
              >
                Choose focus type
              </button>
            </div>
          </div>
        </div>

        <FocusHeroImage />
      </section>

      {/* Timer + today's focus */}
      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div
          id="focus-timer"
          className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-7"
        >
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
                Focus timer
              </p>

              <h3 className="mt-2 text-2xl font-bold text-bloom-forest dark:text-bloom-light">
                {selectedFocusType.label}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-bloom-forest/60 dark:text-gray-300">
                {selectedFocusType.description}
              </p>
            </div>

            <div className="rounded-full bg-bloom-light px-4 py-2 text-xs font-bold text-bloom-forest/70 dark:bg-white/10 dark:text-gray-300">
              {selectedEnvironment.icon} {selectedEnvironment.label}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div
              className="flex h-64 w-64 items-center justify-center rounded-full p-3 shadow-sm sm:h-72 sm:w-72"
              style={{
                background: `conic-gradient(rgb(83 119 91) ${timerProgressDegrees}deg, rgba(215, 227, 207, 0.75) 0deg)`,
              }}
            >
              <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white/90 text-center dark:bg-dark-surface/95">
                <p className="text-5xl font-bold tracking-tight text-bloom-forest dark:text-bloom-light sm:text-6xl">
                  {formatTime(secondsRemaining)}
                </p>

                <p className="mt-3 text-sm font-bold text-bloom-forest/60 dark:text-gray-300">
                  {selectedFocusType.shortLabel} Focus
                </p>

                {selectedFocusTask && (
                  <p className="mt-2 max-w-[180px] truncate text-xs text-bloom-forest/45 dark:text-gray-400">
                    {selectedFocusTask.title}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
              {!isTimerRunning ? (
                <button
                  type="button"
                  onClick={handleStartTimer}
                  className="flex-1 rounded-full bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light shadow-sm transition hover:bg-bloom-mid dark:bg-dark-surface dark:text-bloom-light/75 dark:hover:bg-bloom-forest"
                >
                  {secondsRemaining === 0 ? "Start again" : "Start focus"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePauseTimer}
                  className="flex-1 rounded-full bg-bloom-light px-5 py-3 text-sm font-bold text-bloom-forest shadow-sm transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light"
                >
                  Pause
                </button>
              )}

              <button
                type="button"
                onClick={handleResetTimer}
                className="rounded-full border border-bloom-sage/30 bg-white/70 px-5 py-3 text-sm font-bold text-bloom-forest/75 shadow-sm transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/30"
              >
                Reset
              </button>
            </div>

            {isSessionComplete && (
              <p className="mt-4 rounded-2xl bg-bloom-light/60 px-4 py-3 text-sm font-semibold text-bloom-forest/70 dark:bg-white/5 dark:text-gray-300">
                You completed a focus session. Take a small pause before
                starting again.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
              Today&apos;s focus
            </p>

            <h3 className="mt-2 text-xl font-bold text-bloom-forest dark:text-bloom-light">
              One small task
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-bloom-forest/60 dark:text-gray-300">
              {focusMessage}
            </p>
          </div>

          <div className="mb-5 flex flex-col gap-2 rounded-2xl border border-bloom-sage/30 bg-white/80 px-3 py-3 shadow-sm dark:border-white/10 dark:bg-white/10">
            <input
              type="text"
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleAddFocusTask()
              }}
              placeholder="Add one small focus task..."
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-bloom-forest outline-none placeholder:text-bloom-forest/40 dark:text-gray-100 dark:placeholder:text-gray-400"
            />

            <button
              type="button"
              onClick={handleAddFocusTask}
              className="rounded-full bg-bloom-light px-4 py-2 text-xs font-bold text-bloom-forest transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light"
            >
              Add task
            </button>
          </div>

          {todayFocusTasks.length === 0 ? (
            <EmptyState
              icon="🎧"
              title="No focus task chosen yet"
              message="Pick one small thing, or start with a gentle 10-minute session."
            />
          ) : (
            <div className="flex max-h-[320px] flex-col gap-3 overflow-y-auto pr-1">
              {todayFocusTasks.map((task) => {
                const isComplete = task.completedOn === today
                const isSelected = selectedFocusTask?.id === task.id

                return (
                  <div
                    key={task.id}
                    className={`rounded-2xl border px-4 py-3 transition ${
                      isSelected
                        ? "border-bloom-mid bg-bloom-light/65 dark:border-bloom-sage dark:bg-white/10"
                        : "border-bloom-sage/25 bg-white/70 dark:border-white/10 dark:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleFocusTaskComplete(task.id, today)}
                        aria-label={
                          isComplete
                            ? "Mark focus task as incomplete"
                            : "Mark focus task as complete"
                        }
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition ${
                          isComplete
                            ? "border-bloom-forest bg-bloom-forest text-white dark:border-bloom-sage dark:bg-bloom-sage dark:text-bloom-forest"
                            : "border-bloom-sage text-transparent hover:border-bloom-forest"
                        }`}
                      >
                        ✓
                      </button>

                      <p
                        className={`min-w-0 flex-1 truncate text-sm ${
                          isComplete
                            ? "text-gray-400 line-through"
                            : "text-bloom-forest dark:text-gray-200"
                        }`}
                      >
                        {task.title}
                      </p>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedTaskId(task.id)}
                        className="flex-1 rounded-full bg-bloom-light px-3 py-2 text-xs font-bold text-bloom-forest transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light"
                      >
                        {isSelected ? "Using this" : "Use this task"}
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteFocusTask(task.id)}
                        className="rounded-full px-3 py-2 text-xs font-bold text-red-400 transition hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Focus type + environment */}
      <section className="grid gap-5 lg:grid-cols-2">
        <div
          id="focus-types"
          className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-6"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
            Focus type
          </p>

          <h3 className="mt-2 text-xl font-bold text-bloom-forest dark:text-bloom-light">
            Choose what feels manageable
          </h3>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {FOCUS_TYPES.map((focusType) => {
              const isSelected = focusType.id === selectedFocusTypeId

              return (
                <button
                  key={focusType.id}
                  type="button"
                  onClick={() => handleSelectFocusType(focusType)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    isSelected
                      ? "border-bloom-mid bg-bloom-light/75 shadow-sm dark:border-bloom-sage dark:bg-white/10"
                      : "border-bloom-sage/20 bg-white/70 hover:bg-bloom-light/55 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                  }`}
                >
                  <span className="text-2xl">{focusType.icon}</span>

                  <span className="mt-3 block text-sm font-bold text-bloom-forest dark:text-bloom-light">
                    {focusType.label}
                  </span>

                  <span className="mt-1 block text-xs font-semibold text-bloom-forest/55 dark:text-gray-400">
                    {focusType.minutes} minutes
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
            Focus environment
          </p>

          <h3 className="mt-2 text-xl font-bold text-bloom-forest dark:text-bloom-light">
            Set the room
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-bloom-forest/60 dark:text-gray-300">
            This is a visual setting for now. Sounds can be added later.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {ENVIRONMENTS.map((environment) => {
              const isSelected = environment.id === selectedEnvironmentId

              return (
                <button
                  key={environment.id}
                  type="button"
                  onClick={() => setSelectedEnvironmentId(environment.id)}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${
                    isSelected
                      ? "border-bloom-mid bg-bloom-light/75 shadow-sm dark:border-bloom-sage dark:bg-white/10"
                      : "border-bloom-sage/20 bg-white/70 hover:bg-bloom-light/55 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                  }`}
                >
                  <span className="mr-2 text-lg">{environment.icon}</span>

                  <span className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
                    {environment.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Break + history */}
      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
            Break & reset
          </p>

          <h3 className="mt-2 text-xl font-bold text-bloom-forest dark:text-bloom-light">
            Pause before the next thing
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-bloom-forest/60 dark:text-gray-300">
            After a session, take a small pause. You do not need to rush into
            another task.
          </p>

          <div className="mt-5 grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
            <div className="rounded-2xl bg-bloom-light/65 p-4 dark:bg-white/5">
              <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
                Suggested reset
              </p>

              <p className="mt-2 text-3xl font-bold text-bloom-forest dark:text-bloom-light">
                5:00
              </p>

              <button
                type="button"
                onClick={handleStartBreak}
                className="mt-4 w-full rounded-full bg-bloom-forest px-4 py-2 text-xs font-bold text-bloom-light transition hover:bg-bloom-mid/80 dark:bg-bloom-mint/70 dark:text-bloom-forest"
              >
                Start 5 min break
              </button>
            </div>

            <div className="rounded-2xl border border-bloom-sage/25 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
              <label
                htmlFor="focus-reflection"
                className="text-sm font-bold text-bloom-forest dark:text-bloom-light"
              >
                Small reflection
              </label>

              <textarea
                id="focus-reflection"
                value={reflectionText}
                onChange={(event) => setReflectionText(event.target.value)}
                placeholder="What helped you begin?"
                className="mt-3 min-h-[110px] w-full resize-none rounded-2xl border border-bloom-sage/25 bg-white/80 px-4 py-3 text-sm text-bloom-forest outline-none placeholder:text-bloom-forest/40 focus:border-bloom-mid dark:border-white/10 dark:bg-white/10 dark:text-gray-100 dark:placeholder:text-gray-400"
              />

              <button
                type="button"
                onClick={handleSaveReflection}
                className="mt-3 rounded-full bg-bloom-light px-4 py-2 text-xs font-bold text-bloom-forest transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light"
              >
                Save reflection
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-orange-100 bg-orange-50/60 p-4 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
            ꕤ Bloom reminder
          </p>

          <div className="mx-auto mt-5 text-4xl opacity-80">🌸</div>

          <h3 className="mt-4 text-lg font-bold leading-snug text-bloom-forest dark:text-bloom-light">
            You showed up.
          </h3>

          <p className="mx-auto mt-3 max-w-[190px] text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
            That counts. You only need to focus on the next small step.
          </p>
        </div>
      </section>

      {/* Gentle history */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
              Gentle focus history
            </p>

            <h3 className="mt-2 text-xl font-bold text-bloom-forest dark:text-bloom-light">
              Progress without pressure
            </h3>
          </div>

          <div className="rounded-full border border-bloom-sage/25 bg-white/70 px-4 py-2 text-xs font-semibold text-bloom-forest/60 dark:border-white/10 dark:bg-white/10 dark:text-gray-300">
            {weeklyFocusHistory.length} session
            {weeklyFocusHistory.length === 1 ? "" : "s"} this week
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-bloom-light/65 p-4 dark:bg-white/5">
            <p className="text-2xl font-bold text-bloom-forest dark:text-bloom-light">
              {weeklyFocusHistory.length}
            </p>

            <p className="mt-1 text-xs font-semibold text-bloom-forest/60 dark:text-gray-300">
              Focus sessions
            </p>
          </div>

          <div className="rounded-2xl bg-bloom-light/65 p-4 dark:bg-white/5">
            <p className="text-2xl font-bold text-bloom-forest dark:text-bloom-light">
              {weeklyMinutes}
            </p>

            <p className="mt-1 text-xs font-semibold text-bloom-forest/60 dark:text-gray-300">
              Gentle minutes
            </p>
          </div>

          <div className="rounded-2xl bg-bloom-light/65 p-4 dark:bg-white/5">
            <p className="text-2xl font-bold text-bloom-forest dark:text-bloom-light">
              {completedCount}/{totalCount}
            </p>

            <p className="mt-1 text-xs font-semibold text-bloom-forest/60 dark:text-gray-300">
              Today&apos;s tasks
            </p>
          </div>
        </div>

        {focusHistory.length > 0 && (
          <div className="mt-5 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {focusHistory.slice(0, 6).map((session) => (
              <article
                key={session.id}
                className="w-[240px] shrink-0 rounded-2xl border border-bloom-sage/20 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
                  {session.type}
                </p>

                <p className="mt-1 text-xs font-semibold text-bloom-forest/50 dark:text-gray-400">
                  {session.minutes} minutes · {session.environment}
                </p>

                <p className="mt-3 line-clamp-3 text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
                  {session.reflection}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Focus