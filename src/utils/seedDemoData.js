import {
  getDemoRoutinesByType,
  getDemoTasksByType,
} from "../data/demoData"

const TASK_STORAGE_KEY = "bloom-tasks"
const ROUTINE_STORAGE_KEY = "bloom-routines"

export function seedDemoData(demoType) {
  const demoTasks = getDemoTasksByType(demoType)
  const demoRoutines = getDemoRoutinesByType(demoType)

  localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(demoTasks))
  localStorage.setItem(ROUTINE_STORAGE_KEY, JSON.stringify(demoRoutines))

  window.dispatchEvent(new Event("bloom-tasks-updated"))
  window.dispatchEvent(new Event("bloom-routines-updated"))
}