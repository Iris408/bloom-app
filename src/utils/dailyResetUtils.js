import { getTodayKey } from "./dateUtils";

// EN: Check if this area has already been reset today.
// JP: このエリアが今日すでにリセットされたかを確認します。
export function shouldRunDailyReset(lastResetStorageKey) {
    const today = getTodayKey()
    const lastResetDate = localStorage.getItem(lastResetStorageKey)

    return lastResetDate !== today
}

// EN: Save today's date after a daily reset has completed.
// JP: デイリーリセット完了後に今日の日付を保存します。
export function markDailyResetComplete(lastResetStorageKey) {
    localStorage.setItem(lastResetStorageKey, getTodayKey())
}

// EN: Reset completed state for normal task arrays.
// JP: 通常のタスク配列の completed 状態をリセットします。
export function resetCompletedItems(items = []) {
    return items.map((item) => ({
        ...item,
        completed: false,
    }))
}

// EN: Reset completed state for routine steps only.
// JP: ルーティンのステップ完了状態だけをリセットします。
export function resetRoutineStepCompletion(routines = []) {
    return routines.map((routine) => ({
        ...routine,
        steps: routine.steps.map((step) => ({
            ...step,
            completed:false
        }))
    }))
}

