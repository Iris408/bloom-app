export function getUserInitial(user) {
  return (
    user?.username?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "?"
  )
}

export function getAvatarStorageKey(user) {
  if (!user?.id) return null

  return `bloom-avatar-choice-${user.id}`
}

export function saveBloomAvatarChoice(user, avatarChoice) {
  const storageKey = getAvatarStorageKey(user)

  if (!storageKey) return

  localStorage.setItem(storageKey, JSON.stringify(avatarChoice))

  // EN: Tell other components that the avatar changed.
  // JP: 他のコンポーネントにアバター変更を知らせます。
  window.dispatchEvent(new Event("bloom-avatar-updated"))
}

export function getBloomAvatarChoice(user) {
  const storageKey = getAvatarStorageKey(user)

  if (!storageKey) {
    return {
      avatarType: "initial",
      avatarId: null,
      avatarUrl: null,
    }
  }

  try {
    const storedValue = localStorage.getItem(storageKey)

    if (!storedValue) {
      return {
        avatarType: "initial",
        avatarId: null,
        avatarUrl: null,
      }
    }

    return JSON.parse(storedValue)
  } catch {
    return {
      avatarType: "initial",
      avatarId: null,
      avatarUrl: null,
    }
  }
}

export function getAvatarDisplay(user) {
  const avatarChoice = getBloomAvatarChoice(user)

  return {
    initial: getUserInitial(user),
    avatarType: avatarChoice.avatarType,
    avatarId: avatarChoice.avatarId,
    avatarUrl: avatarChoice.avatarUrl,
  }
}