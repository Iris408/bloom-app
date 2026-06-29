// EN: Progress page for Bloom routine tracking.
// JP: Bloom のルーティン進捗を表示するページ。

import { useEffect, useMemo, useState } from "react"

import BloomReminder from "../components/ui/BloomReminder"
import { useProgressStore } from "../hooks/useProgressStore"
import {
  dayLabel,
  getProgressState,
  getWeekKeys,
  todayKey,
} from "../utils/progressUtils"

const ROUTINE_STORAGE_KEY = "bloom-routines"
const FOCUS_HISTORY_STORAGE_KEY = "bloom-focus-history"

function ProgressIcon() {
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
      <path d="M6 19V14" />
      <path d="M12 19V10" />
      <path d="M18 19V6" />
    </svg>
  )
}

function ProgressHeroImage() {
  return (
    <div className="hidden h-[320px] overflow-hidden rounded-[1.75rem] border border-bloom-sage/20 bg-bloom-light/70 shadow-sm dark:border-white/10 dark:bg-white/10 lg:block lg:w-full">
      <img
        src="/illustrations/bloom-progress.png"
        alt=""
        className="h-full w-full object-cover"
      />
    </div>
  )
}

function loadStoredRoutines() {
  try {
    const savedRoutines = localStorage.getItem(ROUTINE_STORAGE_KEY)
    const parsedRoutines = savedRoutines ? JSON.parse(savedRoutines) : []

    return Array.isArray(parsedRoutines) ? parsedRoutines : []
  } catch {
    return []
  }
}

function loadFocusHistory() {
  try {
    const savedHistory = localStorage.getItem(FOCUS_HISTORY_STORAGE_KEY)
    const parsedHistory = savedHistory ? JSON.parse(savedHistory) : []

    return Array.isArray(parsedHistory) ? parsedHistory : []
  } catch {
    return []
  }
}

function MetricCard({ icon, value, label, helper }) {
  return (
    <article className="relative overflow-hidden rounded-[1.5rem] border border-bloom-sage/20 bg-white/65 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-bloom-light text-2xl dark:bg-white/10">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-3xl font-bold leading-none text-bloom-forest dark:text-bloom-light">
            {value}
          </p>

          <p className="mt-2 text-sm font-bold text-bloom-forest/80 dark:text-gray-200">
            {label}
          </p>

          <p className="mt-1 text-xs leading-5 text-bloom-forest/55 dark:text-gray-400">
            {helper}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-4 -right-3 text-5xl opacity-20">
        🌿
      </div>
    </article>
  )
}

function RoutineBar({ name, completedSteps, totalSteps }) {
  const pct =
    totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100)

  const state = getProgressState(pct)
  const isDone = completedSteps === totalSteps && totalSteps > 0

  return (
    <div className="border-b border-bloom-sage/15 py-4 last:border-b-0">
      <div className="mb-2 flex min-w-0 items-center justify-between gap-3">
        <p className="min-w-0 truncate text-sm font-bold text-bloom-forest dark:text-bloom-light">
          {name}
        </p>

        <p className="shrink-0 text-xs font-semibold text-bloom-forest/55 dark:text-gray-400">
          {completedSteps}/{totalSteps}
          {isDone ? " ✓" : ""}
        </p>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-bloom-light dark:bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            backgroundColor: state.barColor,
          }}
        />
      </div>
    </div>
  )
}

function WeekDay({ dateKey, snapshot, isSelected, isToday, onClick }) {
  const completedSteps = snapshot?.completedSteps ?? 0
  const totalSteps = snapshot?.totalSteps ?? 0

  const pct =
    totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100)

  const hasProgress = completedSteps > 0
  const isComplete = totalSteps > 0 && completedSteps === totalSteps

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View progress for ${dateKey}`}
      aria-pressed={isSelected}
      className={`flex min-w-[68px] shrink-0 flex-col items-center gap-2 rounded-2xl border px-3 py-3 transition hover:-translate-y-0.5 ${
        isSelected
          ? "border-bloom-mid bg-bloom-light shadow-sm dark:border-bloom-sage dark:bg-white/10"
          : "border-bloom-sage/20 bg-white/65 dark:border-white/10 dark:bg-white/5"
      }`}
    >
      <span className="text-xs font-bold text-bloom-forest/60 dark:text-gray-400">
        {dayLabel(dateKey)}
      </span>

      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold ${
          isComplete
            ? "border-bloom-forest bg-bloom-forest text-white dark:border-bloom-sage dark:bg-bloom-sage dark:text-bloom-forest"
            : hasProgress
              ? "border-bloom-mid bg-bloom-light text-bloom-forest dark:border-bloom-sage dark:bg-white/10 dark:text-bloom-light"
              : "border-bloom-sage/30 bg-white/70 text-bloom-forest/35 dark:border-white/10 dark:bg-white/5"
        }`}
      >
        {isComplete ? "✓" : hasProgress ? "•" : ""}
      </span>

      {isToday && (
        <span className="text-[10px] font-bold uppercase tracking-wide text-bloom-mid dark:text-bloom-sage">
          Today
        </span>
      )}

      {!isToday && <span className="h-3" />}
    </button>
  )
}

function ProgressHeroReminder() {
  return (
    <div className="hidden h-[110px] overflow-hidden rounded-[1.5rem] border border-orange-100 bg-orange-50/60 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 lg:block">
      <div className="flex h-full items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-bloom-mid dark:text-bloom-sage">
            Bloom reminder
          </p>

          <h3 className="mt-2 text-xl font-bold text-bloom-forest dark:text-bloom-light">
            Progress, not perfection.
          </h3>

          <p className="mt-3 text-xs leading-relaxed text-bloom-forest/60 dark:text-gray-300">
            Be kind to your mind today.
          </p>
        </div>
      </div>

      <div className="mt-1 flex items-center justify-between gap-4">
        <div className="text-lg text-peach-400">🧡</div>

        <div className="pointer-events-none text-6xl opacity-80">
          🌸
        </div>
      </div>
    </div>
  )
}

export default function Progress() {
  const { loadDay, syncToday } = useProgressStore()

  const today = todayKey()
  const weekKeys = useMemo(() => getWeekKeys(7), [])

  const [routines, setRoutines] = useState(() => loadStoredRoutines())
  const [focusHistory, setFocusHistory] = useState(() => loadFocusHistory())
  const [selectedDate, setSelectedDate] = useState(today)
  const [weekSnapshots, setWeekSnapshots] = useState({})
  const [daySnapshot, setDaySnapshot] = useState(null)

  const safeRoutines = useMemo(
    () => (Array.isArray(routines) ? routines : []),
    [routines]
  )

  const safeFocusTasks = useMemo(() => [], [])

  useEffect(() => {
    function refreshProgressData() {
      setRoutines(loadStoredRoutines())
      setFocusHistory(loadFocusHistory())
    }

    window.addEventListener("bloom-routines-updated", refreshProgressData)
    window.addEventListener("storage", refreshProgressData)

    return () => {
      window.removeEventListener("bloom-routines-updated", refreshProgressData)
      window.removeEventListener("storage", refreshProgressData)
    }
  }, [])

  useEffect(() => {
    syncToday(today, safeRoutines, safeFocusTasks)
  }, [today, safeRoutines, safeFocusTasks, syncToday])

  useEffect(() => {
    const snapshots = {}

    weekKeys.forEach((key) => {
      snapshots[key] = loadDay(key)
    })

    setWeekSnapshots(snapshots)
  }, [weekKeys, loadDay, safeRoutines, safeFocusTasks])

  useEffect(() => {
    if (selectedDate === today) {
      const liveSnapshot = syncToday(today, safeRoutines, safeFocusTasks)
      setDaySnapshot(liveSnapshot)
    } else {
      setDaySnapshot(loadDay(selectedDate))
    }
  }, [
    selectedDate,
    today,
    safeRoutines,
    safeFocusTasks,
    syncToday,
    loadDay,
  ])

  const completed = daySnapshot?.completedSteps ?? 0
  const total = daySnapshot?.totalSteps ?? 0
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)
  const progressState = getProgressState(pct)
  const isSelectedToday = selectedDate === today

  const weeklySnapshots = Object.values(weekSnapshots)

  const consistentDays = weeklySnapshots.filter(
    (snapshot) => (snapshot?.completedSteps ?? 0) > 0
  ).length

  const weeklyCompletedSteps = weeklySnapshots.reduce(
    (totalSteps, snapshot) => totalSteps + (snapshot?.completedSteps ?? 0),
    0
  )

  const completedRoutines =
    daySnapshot?.routineSnapshots?.filter(
      (routine) =>
        routine.totalSteps > 0 && routine.completedSteps === routine.totalSteps
    ).length ?? 0

  const weeklyFocusHistory = focusHistory.filter((session) =>
    weekKeys.includes(session.date)
  )

  const weeklyFocusMinutes = weeklyFocusHistory.reduce((totalMinutes, session) => {
    return totalMinutes + (session.minutes ?? 0)
  }, 0)

  const weeklyReflections = weeklyFocusHistory.filter(
    (session) => session.reflection
  ).length

  const selectedDayTitle = isSelectedToday ? "Today" : selectedDate

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 overflow-x-hidden pb-28 sm:gap-7 sm:pb-0">
      {/* Hero */}
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(340px,500px)]">
        <div className="relative overflow-hidden rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-6">
          <div className="relative z-10 flex h-full flex-col justify-start">
            <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-bloom-light/80 px-2 py-1.5 text-sm font-bold text-bloom-forest/70 dark:bg-white/10 dark:text-gray-300">
              <span>🌿</span>
              <span>Welcome back</span>
            </div>

            <h2 className="max-w-2xl text-4xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-5xl">
              Progress gently, one small step at a time.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-bloom-forest/65 dark:text-gray-300 sm:text-base">
              Every effort matters. Keep going at your own pace.
            </p>

            <p className="mt-1 max-w-xl text-sm leading-relaxed text-bloom-forest/65 dark:text-gray-300 sm:text-base">
              You are building a rhythm, not chasing perfection.
            </p>

            <button
              type="button"
              onClick={() => {
                const weeklySection = document.getElementById("weekly-overview")

                weeklySection?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                })
              }}
              className="mt-24 w-fit rounded-full bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light shadow-sm transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest"
            >
              View weekly overview
            </button>
          </div>

          <div className="pointer-events-none absolute -bottom-8 -right-4 text-8xl opacity-20">
            🌸
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <ProgressHeroImage />
          <ProgressHeroReminder />
        </div>  
      </section>

      {/* Metric cards */}
      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          icon="✓"
          value={completedRoutines}
          label="Completed routines"
          helper="Routines finished for the selected day."
        />

        <MetricCard
          icon="⏱"
          value={weeklyFocusMinutes}
          label="Focus minutes"
          helper="Gentle focus time saved this week."
        />

        <MetricCard
          icon="♡"
          value={weeklyReflections}
          label="Gentle reflections"
          helper="Small notes from recent focus sessions."
        />
      </section>

      {/* Main progress + selected day */}
      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div
          id="weekly-overview"
          className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-6"
        >
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
                Your week at a glance
              </p>

              <h3 className="mt-2 text-xl font-bold text-bloom-forest dark:text-bloom-light">
                Gentle progress, no pressure
              </h3>
            </div>

            <div className="rounded-full bg-bloom-light px-4 py-2 text-xs font-bold text-bloom-forest/65 dark:bg-white/10 dark:text-gray-300">
              {consistentDays} intentional day
              {consistentDays === 1 ? "" : "s"}
            </div>
          </div>

          <div className="mb-6 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-7 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
            {weekKeys.map((key) => (
              <WeekDay
                key={key}
                dateKey={key}
                snapshot={weekSnapshots[key]}
                isSelected={key === selectedDate}
                isToday={key === today}
                onClick={() => setSelectedDate(key)}
              />
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-bloom-light/65 p-4 dark:bg-white/5">
              <p className="text-2xl font-bold text-bloom-forest dark:text-bloom-light">
                {consistentDays}
              </p>

              <p className="mt-1 text-xs font-semibold text-bloom-forest/60 dark:text-gray-300">
                Consistent days this week
              </p>

              <p className="mt-2 text-xs leading-5 text-bloom-forest/50 dark:text-gray-400">
                You are building a gentle rhythm.
              </p>
            </div>

            <div className="rounded-2xl bg-bloom-light/65 p-4 dark:bg-white/5">
              <p className="text-2xl font-bold text-bloom-forest dark:text-bloom-light">
                {weeklyCompletedSteps}
              </p>

              <p className="mt-1 text-xs font-semibold text-bloom-forest/60 dark:text-gray-300">
                Small steps this week
              </p>

              <p className="mt-2 text-xs leading-5 text-bloom-forest/50 dark:text-gray-400">
                Partial days count too.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
            {selectedDayTitle}
          </p>

          <h3 className="mt-2 text-xl font-bold text-bloom-forest dark:text-bloom-light">
            {progressState.label}
          </h3>

          <div
            className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold"
            style={{
              backgroundColor: progressState.bgColor,
              color: progressState.textColor,
            }}
          >
            <span>{progressState.icon}</span>
            <span>
              {completed}/{total} small steps
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-bloom-light dark:bg-white/10">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${pct}%`,
                backgroundColor: progressState.barColor,
              }}
            />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-bloom-forest/60 dark:text-gray-300">
            {progressState.message}
          </p>

          {daySnapshot?.routineSnapshots?.length > 0 && (
            <div className="mt-5 rounded-2xl border border-bloom-sage/20 bg-white/65 px-4 dark:border-white/10 dark:bg-white/5">
              {daySnapshot.routineSnapshots.map((routine) => (
                <RoutineBar key={routine.id} {...routine} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recovery + reflection style cards */}
      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
            Recovery & support
          </p>

          <h3 className="mt-2 text-xl font-bold text-bloom-forest dark:text-bloom-light">
            Rest is part of progress.
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-bloom-forest/60 dark:text-gray-300">
            Some days are quieter. Some days are full. Bloom keeps the door open
            so you can return gently whenever you are ready.
          </p>

          <div className="mt-5 rounded-2xl bg-bloom-light/65 p-4 dark:bg-white/5">
            <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
              A soft reminder
            </p>

            <p className="mt-2 text-sm leading-relaxed text-bloom-forest/60 dark:text-gray-300">
              You do not need to make up for yesterday. One small step today is
              enough.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-orange-100 bg-orange-50/60 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
            Milestones & reflections
          </p>

          <h3 className="mt-2 text-xl font-bold text-bloom-forest dark:text-bloom-light">
            Gentle wins
          </h3>

          <div className="mt-5 flex flex-col gap-3">
            <div className="rounded-2xl bg-white/70 p-4 dark:bg-white/5">
              <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
                You returned this week
              </p>

              <p className="mt-1 text-xs leading-5 text-bloom-forest/55 dark:text-gray-400">
                {consistentDays} day{consistentDays === 1 ? "" : "s"} with
                intentional moments.
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 p-4 dark:bg-white/5">
              <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
                Focus support
              </p>

              <p className="mt-1 text-xs leading-5 text-bloom-forest/55 dark:text-gray-400">
                {weeklyFocusMinutes} calm focus minute
                {weeklyFocusMinutes === 1 ? "" : "s"} saved this week.
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 p-4 dark:bg-white/5">
              <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
                Small reflections
              </p>

              <p className="mt-1 text-xs leading-5 text-bloom-forest/55 dark:text-gray-400">
                {weeklyReflections} saved note
                {weeklyReflections === 1 ? "" : "s"} from focus sessions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}