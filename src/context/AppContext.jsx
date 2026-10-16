import { useCallback, useEffect, useRef, useState } from "react"

import AppContext from "./appContextObject"
import {
  markDailyResetComplete,
  resetCompletedItems,
  shouldRunDailyReset,
} from "../utils/dailyResetUtils"

const FOCUS_TASK_STORAGE_KEY = "bloom_focus_tasks"
const FOCUS_DAILY_RESET_KEY = "bloom-focus-tasks-last-reset"

const FONT_SIZE_CLASSES = ["font-small", "font-medium", "font-large", "font-xl"]

// EN: Apply accessibility/display preferences to the <html> element.
// JP: アクセシビリティ・表示設定を <html> 要素に反映します。
function applyDarkModeClass(isDark) {
  document.documentElement.classList.toggle("dark", isDark)
}

function applyFontSizeClass(size) {
  document.documentElement.classList.remove(...FONT_SIZE_CLASSES)

  if (size) {
    document.documentElement.classList.add(`font-${size}`)
  }
}

function applyDyslexicFontClass(enabled) {
  document.documentElement.classList.toggle("dyslexic", enabled)
}

function applyReduceMotionClass(enabled) {
  document.documentElement.classList.toggle("reduce-motion", enabled)
}

function AppProvider({ children }) {
  const [activeMode, setActiveMode] = useState("standard")
  const [activeTheme, setActiveTheme] = useState("system")
  const [activeProfile, setActiveProfile] = useState(null)

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [darkStyle, setDarkStyle] = useState("green")
  const [fontSize, setFontSize] = useState("medium")
  const [dyslexicFont, setDyslexicFont] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  // EN: Set by App while a real account is signed in, so preference changes
  // are saved to that account. It is null for demo and signed-out use.
  // JP: 実際のアカウントでログイン中のみ App が設定し、変更をアカウントに保存します。
  const preferenceSaverRef = useRef(null)

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

  const setPreferenceSaver = useCallback((saver) => {
    preferenceSaverRef.current = saver
  }, [])

  function savePreference(updates) {
    preferenceSaverRef.current?.(updates)
  }

  function toggleDarkMode() {
    const nextValue = !isDarkMode

    applyDarkModeClass(nextValue)
    setIsDarkMode(nextValue)
    savePreference({ isDarkMode: nextValue })
  }

  function applyFontSize(size) {
    applyFontSizeClass(size)
    setFontSize(size)
    savePreference({ fontSize: size })
  }

  function toggleDyslexicFont() {
    const nextValue = !dyslexicFont

    applyDyslexicFontClass(nextValue)
    setDyslexicFont(nextValue)
    savePreference({ dyslexicFont: nextValue })
  }

  function toggleReduceMotion() {
    const nextValue = !reduceMotion

    applyReduceMotionClass(nextValue)
    setReduceMotion(nextValue)
    savePreference({ reduceMotion: nextValue })
  }

  // EN: Apply preferences loaded from an account without saving them back.
  // JP: アカウントから読み込んだ設定を、保存し直さずに反映します。
  const applyPreferences = useCallback((preferences) => {
    applyDarkModeClass(preferences.isDarkMode)
    applyFontSizeClass(preferences.fontSize)
    applyDyslexicFontClass(preferences.dyslexicFont)
    applyReduceMotionClass(preferences.reduceMotion)

    setIsDarkMode(preferences.isDarkMode)
    setFontSize(preferences.fontSize)
    setDyslexicFont(preferences.dyslexicFont)
    setReduceMotion(preferences.reduceMotion)
  }, [])

  // EN: Return to signed-out defaults so the next person does not inherit them.
  // JP: 次の利用者に引き継がれないよう、ログアウト時の既定値に戻します。
  function resetPreferences() {
    applyDarkModeClass(false)
    applyFontSizeClass(null)
    applyDyslexicFontClass(false)
    applyReduceMotionClass(false)

    setIsDarkMode(false)
    setFontSize("medium")
    setDyslexicFont(false)
    setReduceMotion(false)
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

    applyPreferences,
    resetPreferences,
    setPreferenceSaver,

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