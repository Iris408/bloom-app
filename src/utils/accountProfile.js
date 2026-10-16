// EN: Bridges backend profile settings with the per-user profile caches used
// by the Profile page and avatar display. The backend is authoritative for
// signed-in accounts; these caches are refreshed from it on sign-in.
// JP: バックエンドのプロフィール設定と、Profileページやアバター表示が使う
// ユーザー別キャッシュをつなぎます。ログイン時にバックエンドの値で更新します。

import { bloomAvatars } from "../data/bloomAvatars"
import { saveBloomAvatarChoice } from "./avatarStorage"

export function getProfileStorageKey(user, key) {
  if (!user?.id) return null

  return `bloom-profile-${key}-${user.id}`
}

// EN: The backend defaults display_name to the username; only a different
// value is a nickname the person chose.
// JP: display_name の既定値はユーザー名なので、異なる値だけをニックネームとして扱います。
export function getNicknameFromProfile(user, profile) {
  const displayName = profile?.displayName?.trim() || ""

  return displayName && displayName !== user?.username ? displayName : ""
}

export function getAvatarUrl(avatarId) {
  return bloomAvatars.find((avatar) => avatar.id === avatarId)?.image || null
}

export function cacheAccountProfile(user, profile) {
  if (!user?.id || !profile) return

  try {
    localStorage.setItem(
      getProfileStorageKey(user, "nickname"),
      getNicknameFromProfile(user, profile)
    )

    const avatarUrl =
      profile.avatarType === "bloom" ? getAvatarUrl(profile.avatarId) : null

    saveBloomAvatarChoice(user, {
      avatarType: avatarUrl ? "bloom" : "initial",
      avatarId: avatarUrl ? profile.avatarId : null,
      avatarUrl,
    })
  } catch {
    // Profile caching is optional; the backend remains the source of truth.
  }
}
