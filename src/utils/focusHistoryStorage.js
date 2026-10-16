// EN: Scoped localStorage access for Focus session history.
// Demo history uses the shared demo key (cleared by resetDemoSessionData).
// Authenticated history uses a per-user key so accounts and demo never mix.
// JP: フォーカス履歴の localStorage 保存先をモード・ユーザーごとに分けます。
// デモはデモ用キー（resetDemoSessionData で削除）、ログイン中はユーザー別キーを使います。

const DEMO_FOCUS_HISTORY_STORAGE_KEY = "bloom-focus-history"
const USER_FOCUS_HISTORY_STORAGE_PREFIX = "bloom-focus-history-user-"

export function getFocusHistoryStorageKey({ currentUser = null, isDemoMode = false } = {}) {
  if (!isDemoMode && currentUser?.id) {
    return `${USER_FOCUS_HISTORY_STORAGE_PREFIX}${currentUser.id}`
  }

  return DEMO_FOCUS_HISTORY_STORAGE_KEY
}

export function loadFocusHistory(storageKey) {
  try {
    const savedHistory = localStorage.getItem(storageKey)
    const parsedHistory = savedHistory ? JSON.parse(savedHistory) : []

    return Array.isArray(parsedHistory) ? parsedHistory : []
  } catch {
    return []
  }
}

export function saveFocusHistory(storageKey, history) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(history))
  } catch {
    // Focus history persistence is optional.
  }
}
