// EN: Clears temporary demo-session data without touching account data.
// JP: アカウントデータに影響を与えず、一時的なデモデータを削除します。

const EXACT_DEMO_KEYS = [
  "bloom-tasks",
  "bloom-routines",
  "bloom_focus_tasks",
  "bloom-focus-history",
  "bloom-tasks-last-reset",
  "bloom-focus-tasks-last-reset",
]

const DEMO_KEY_PREFIXES = [
  "bloom_progress_",
  "bloom-selected-focus-task",
]

export function resetDemoSessionData() {
  try {
    EXACT_DEMO_KEYS.forEach((key) => {
      localStorage.removeItem(key)
    })

    Object.keys(localStorage).forEach((key) => {
      const shouldRemove = DEMO_KEY_PREFIXES.some((prefix) =>
        key.startsWith(prefix)
      )

      if (shouldRemove) {
        localStorage.removeItem(key)
      }
    })

    sessionStorage.removeItem("bloom-demo-completion-shown")
  } catch (error) {
    console.warn("Bloom: could not reset demo session data", error)
  }
}