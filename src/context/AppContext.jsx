import { useEffect, useState } from "react"

import AppContext from "./appContextObject"
import {
  markDailyResetComplete,
  resetCompletedItems,
  shouldRunDailyReset,
} from "../utils/dailyResetUtils"

const FOCUS_TASK_STORAGE_KEY = "bloom_focus_tasks"
const FOCUS_DAILY_RESET_KEY = "bloom-focus-tasks-last-reset"

function AppProvider({ children }) {
  const [activeMode, setActiveMode] = useState("standard")
  const [activeTheme, setActiveTheme] = useState("system")
  const [activeProfile, setActiveProfile] = useState(null)

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [darkStyle, setDarkStyle] = useState("green")
  const [fontSize, setFontSize] = useState("medium")
  const [dyslexicFont, setDyslexicFont] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const [focusTasks, setFocusTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(FOCUS_TASK_STORAGE_KEY)

      if (!saved) {
        return []
      }

      const parsedFocusTasks = JSON.parse(saved)

      if (shouldRunDailyReset(FOCUS_DAILY_RESET_KEY)) {
        const resetFocusTasks = resetCompletedItems(parsedFocusTasks)

        localStorage.setItem(
          FOCUS_TASK_STORAGE_KEY,
          JSON.stringify(resetFocusTasks)
        )

        markDailyResetComplete(FOCUS_DAILY_RESET_KEY)

        return resetFocusTasks
      }

      return parsedFocusTasks
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(
        FOCUS_TASK_STORAGE_KEY,
        JSON.stringify(focusTasks)
      )
    } catch {
      // Continue if localStorage is unavailable.
    }
  }, [focusTasks])

  function toggleDarkStyle() {
    setDarkStyle((currentStyle) =>
      currentStyle === "grey" ? "green" : "grey"
    )
  }

  function addFocusTask(title, dateKey) {
    setFocusTasks((currentTasks) => [
      ...currentTasks,
      {
        id: crypto.randomUUID(),
        title,
        scheduledFor: dateKey,
        completedOn: null,
      },
    ])
  }

  function toggleFocusTaskComplete(id, dateKey) {
    setFocusTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completedOn:
                task.completedOn === dateKey ? null : dateKey,
            }
          : task
      )
    )
  }

  function deleteFocusTask(id) {
    setFocusTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    )
  }

  function toggleDarkMode() {
    setIsDarkMode((currentValue) => {
      const nextValue = !currentValue

      document.documentElement.classList.toggle("dark", nextValue)

      return nextValue
    })
  }

  function applyFontSize(size) {
    document.documentElement.classList.remove(
      "font-small",
      "font-medium",
      "font-large",
      "font-xl"
    )

    document.documentElement.classList.add(`font-${size}`)
    setFontSize(size)
  }

  function toggleDyslexicFont() {
    setDyslexicFont((currentValue) => {
      const nextValue = !currentValue

      document.documentElement.classList.toggle(
        "dyslexic",
        nextValue
      )

      return nextValue
    })
  }

  function toggleReduceMotion() {
    setReduceMotion((currentValue) => {
      const nextValue = !currentValue

      document.documentElement.classList.toggle(
        "reduce-motion",
        nextValue
      )

      return nextValue
    })
  }

  const contextValue = {
    activeMode,
    setActiveMode,

    activeTheme,
    setActiveTheme,

    activeProfile,
    setActiveProfile,

    isDarkMode,
    toggleDarkMode,

    darkStyle,
    toggleDarkStyle,

    fontSize,
    applyFontSize,

    dyslexicFont,
    toggleDyslexicFont,

    reduceMotion,
    toggleReduceMotion,

    focusTasks,
    setFocusTasks,
    addFocusTask,
    toggleFocusTaskComplete,
    deleteFocusTask,
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider }