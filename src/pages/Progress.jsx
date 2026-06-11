// EN: Progress page for Bloom routine tracking.
// JP: Bloom のルーティン進捗を表示するページ。

import { useState, useEffect, useMemo } from "react"
import BloomReminder from "../components/ui/BloomReminder"
import { useProgressStore } from "../hooks/useProgressStore"
import {
  getProgressState,
  todayKey,
  getWeekKeys,
  dayLabel,
} from "../utils/progressUtils"

// ========================================
// EN: Per-routine progress bar
// JP: ルーティンごとの進捗バー
// ========================================

function RoutineBar({ name, completedSteps, totalSteps }) {
  const pct =
    totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100)

  const state = getProgressState(pct)
  const isDone = completedSteps === totalSteps && totalSteps > 0

  return (
    <div className="flex items-center gap-3 py-3 border-b border-black/5 last:border-b-0">
      <span className="text-sm flex-1 text-bloom-forest dark:text-gray-100 truncate">
        {name}
      </span>

      <div className="flex-1 h-2 bg-[#F1EFE8] dark:bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            backgroundColor: state.barColor,
          }}
        />
      </div>

      <span
        className={`text-xs min-w-12 text-right ${
          isDone
            ? "text-bloom-forest dark:text-bloom-sage font-semibold"
            : "text-gray-500 dark:text-gray-300"
        }`}
      >
        {completedSteps}/{totalSteps}
        {isDone ? " ✓" : ""}
      </span>
    </div>
  )
}

// ========================================
// EN: One day in the weekly streak row
// JP: 週間ストリークの1日分
// ========================================

function StreakDay({ dateKey, snapshot, isSelected, isToday, onClick }) {
  let status = "empty"

  if (snapshot) {
    const pct =
      snapshot.totalSteps === 0
        ? 0
        : Math.round((snapshot.completedSteps / snapshot.totalSteps) * 100)

    if (pct === 100) status = "done"
    else if (pct >= 40) status = "partial"
    else if (pct > 0) status = "started"
  }

  const styles = {
    done: {
      bg: "#E1F5EE",
      color: "#0F6E56",
      icon: "✓",
    },
    partial: {
      bg: "#FAEEDA",
      color: "#854F0B",
      icon: "–",
    },
    started: {
      bg: "#EEEDFE",
      color: "#534AB7",
      icon: "·",
    },
    empty: {
      bg: "#F1EFE8",
      color: "#B4B2A9",
      icon: "·",
    },
  }

  const dayStyle = styles[status]

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View progress for ${dateKey}`}
      aria-pressed={isSelected}
      className="min-w-[88px] sm:min-w-0 rounded-lg flex flex-col items-center justify-center px-2 py-2 gap-1 transition-transform hover:scale-105 active:scale-95"
      style={{
        backgroundColor: dayStyle.bg,
        color: dayStyle.color,
        outline: isSelected
          ? `2px solid ${dayStyle.color}`
          : isToday
            ? "2px solid #1D9E75"
            : "none",
        outlineOffset: 2,
      }}
    >
      <span className="text-sm font-semibold">{dayStyle.icon}</span>
      <span className="text-xs font-medium">{dayLabel(dateKey)}</span>
    </button>
  )
}

// ========================================
// EN: Main Progress page
// JP: メインの Progress ページ
// ========================================

export default function Progress() {
  const { loadDay, syncToday } = useProgressStore()

  const ROUTINE_STORAGE_KEY = "bloom-routines"

  const [routines] = useState(() => {
    try {
      const savedRoutines = localStorage.getItem(ROUTINE_STORAGE_KEY)

      if (savedRoutines) {
        return JSON.parse(savedRoutines)
      }

      return []
    } catch {
      return []
    }
  })

  // EN: Focus tasks are not connected yet, so keep this empty for now.
  // JP: Focus タスクはまだ接続していないため、今は空の配列にします。
  const safeFocusTasks = useMemo(() => [], [])

  const safeRoutines = useMemo(() => routines ?? [], [routines])

  const today = todayKey()
  const weekKeys = useMemo(() => getWeekKeys(7), [])

  const [selectedDate, setSelectedDate] = useState(today)
  const [weekSnapshots, setWeekSnapshots] = useState({})
  const [daySnapshot, setDaySnapshot] = useState(null)

  // EN: Sync today's progress whenever routines change.
  // JP: ルーティンが変わるたびに今日の進捗を同期します。
  useEffect(() => {
    syncToday(today, safeRoutines, safeFocusTasks)
  }, [today, safeRoutines, safeFocusTasks, syncToday])

  // EN: Load progress snapshots for the current week.
  // JP: 今週分の進捗スナップショットを読み込みます。
  useEffect(() => {
    const snapshots = {}

    weekKeys.forEach((key) => {
      snapshots[key] = loadDay(key)
    })

    setWeekSnapshots(snapshots)
  }, [weekKeys, loadDay, safeRoutines, safeFocusTasks])

  // EN: Load selected day. Today always uses live data.
  // JP: 選択日の進捗を読み込みます。今日だけは常に最新データを使います。
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
  const isToday = selectedDate === today

  const streakCount = (() => {
    let count = 0

    for (let i = weekKeys.length - 1; i >= 0; i--) {
      const snapshot = weekSnapshots[weekKeys[i]]

      if (snapshot && snapshot.completedSteps > 0) {
        count += 1
      } else {
        break
      }
    }

    return count
  })()

  const weeklyCompletedSteps = Object.values(weekSnapshots).reduce(
    (totalSteps, snapshot) => totalSteps + (snapshot?.completedSteps ?? 0),
    0
  )

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      {/* Page heading */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage mb-2">
          Progress
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          Progress
        </h2>

        <p className="text-sm text-bloom-forest/80 dark:text-gray-300 mt-3 leading-relaxed">
          A calm overview of today’s routines, completed steps, and gentle
          weekly progress.
        </p>
      </div>

      {/* Today / selected day banner */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
          {isToday ? "Today" : selectedDate}
        </p>

        <div className="bg-white dark:bg-dark-surface border border-black/10 dark:border-white/10 rounded-2xl p-5 flex items-center gap-5">
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold mb-3"
              style={{
                backgroundColor: progressState.bgColor,
                color: progressState.textColor,
              }}
            >
              <span>{progressState.icon}</span>
              <span>{progressState.label}</span>
            </div>

            <div className="h-2 bg-[#F1EFE8] dark:bg-white/10 rounded-full overflow-hidden mb-3">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  backgroundColor: progressState.barColor,
                }}
              />
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {progressState.message}
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-3xl font-bold text-bloom-forest dark:text-bloom-light leading-none">
              {completed}
              <span className="text-base text-gray-500 dark:text-gray-300 font-normal">
                /{total}
              </span>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              steps {isToday ? "today" : "that day"}
            </div>
          </div>
        </div>
      </section>

      {/* Per-routine progress */}
      {daySnapshot?.routineSnapshots?.length > 0 && (
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
            Your routines
          </p>

          <div className="bg-white dark:bg-dark-surface border border-black/10 dark:border-white/10 rounded-2xl px-4">
            {daySnapshot.routineSnapshots.map((routine) => (
              <RoutineBar key={routine.id} {...routine} />
            ))}
          </div>
        </section>
      )}

      {/* Weekly flow */}
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          This week
        </p>

        <div className="rounded-2xl border border-black/10 bg-white p-4 dark:bg-dark-surface dark:border-white/10">
          <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-7 sm:overflow-visible sm:pb-0">
            {weekKeys.map((key) => (
              <StreakDay
                key={key}
                dateKey={key}
                snapshot={weekSnapshots[key]}
                isSelected={key === selectedDate}
                isToday={key === today}
                onClick={() => setSelectedDate(key)}
              />
            ))}
          </div>

          <p className="mt-3 text-xs text-gray-500 dark:text-bloom-light/70">
            {streakCount > 0
              ? `${streakCount} day streak going. Partial days count too.`
              : "Tap any day to see your progress."}
          </p>
        </div>
      </section>

      {/* Overall metrics */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
          Overall
        </p>

        <div className="grid grid-cols-3 gap-3">
          {[
            { val: streakCount, label: "day streak" },
            { val: safeRoutines.length, label: "routines active" },
            { val: weeklyCompletedSteps, label: "steps this week" },
          ].map(({ val, label }) => (
            <div
              key={label}
              className="bg-bloom-mid/20 dark:bg-white/10 rounded-xl p-4"
            >
              <div className="text-2xl font-bold text-bloom-forest dark:text-bloom-light mb-1">
                {val}
              </div>

              <div className="text-xs text-gray-600 dark:text-gray-300">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <BloomReminder
        reminder="Progress is built through small repeated actions."
        phaseTitle="Progress v1"
        phaseDescription="This page shows a calm visual progress flow for routines, weekly activity, and overall step completion."
      />
    </div>
  )
}