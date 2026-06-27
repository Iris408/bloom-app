import { useEffect, useMemo, useState } from "react"

import AvatarChoiceGrid from "../components/profile/AvatarChoiceGrid"
import {
  getAvatarDisplay,
  saveBloomAvatarChoice,
} from "../utils/avatarStorage"

const defaultGoals = [
  "Build calmer daily routines",
  "Make focus feel less overwhelming",
  "Track progress without pressure",
]

function getUserInitial(user) {
  return (
    user?.username?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "?"
  )
}

function getProfileStorageKey(user, key) {
  if (!user?.id) return null

  return `bloom-profile-${key}-${user.id}`
}

function getStoredValue(user, key, fallback) {
  const storageKey = getProfileStorageKey(user, key)

  if (!storageKey) return fallback

  try {
    return localStorage.getItem(storageKey) || fallback
  } catch {
    return fallback
  }
}

function getStoredJson(user, key, fallback) {
  const storageKey = getProfileStorageKey(user, key)

  if (!storageKey) return fallback

  try {
    const value = localStorage.getItem(storageKey)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function saveStoredValue(user, key, value) {
  const storageKey = getProfileStorageKey(user, key)

  if (!storageKey) return

  localStorage.setItem(storageKey, value)
}

function saveStoredJson(user, key, value) {
  const storageKey = getProfileStorageKey(user, key)

  if (!storageKey) return

  localStorage.setItem(storageKey, JSON.stringify(value))
}

function ProfileSection({ label, children }) {
  return (
    <section className="flex w-full flex-col gap-3">
      <p className="px-1 text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
        {label}
      </p>

      <div className="rounded-[1.75rem] border border-bloom-sage/25 bg-white/45 p-3 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-4">
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </section>
  )
}

function ProfileRow({ icon, title, description, rightText }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white/70 px-4 py-4 shadow-sm dark:bg-white/5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bloom-light text-sm font-bold text-bloom-forest dark:bg-white/10 dark:text-bloom-light">
        {icon}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
          {title}
        </p>

        {description && (
          <p className="mt-1 break-words text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
            {description}
          </p>
        )}
      </div>

      {rightText && (
        <p className="shrink-0 rounded-full bg-bloom-light px-3 py-1 text-xs font-semibold text-bloom-forest/70 dark:bg-white/10 dark:text-gray-300">
          {rightText}
        </p>
      )}
    </div>
  )
}

function Profile({
  currentUser = null,
  isDemoMode = false,
  demoType = null,
  onLogout,
}) {
  const [nickname, setNickname] = useState("")
  const [goals, setGoals] = useState(defaultGoals)
  const [newGoal, setNewGoal] = useState("")

  const [selectedAvatarType, setSelectedAvatarType] = useState("initial")
  const [selectedAvatarId, setSelectedAvatarId] = useState(null)
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(null)

  const username = currentUser?.username || (isDemoMode ? "Demo user" : "Bloom user")
  const email = currentUser?.email || (isDemoMode ? "demo@bloom.local" : "Not connected")
  const initial = getUserInitial(currentUser) || "?"

  const displayName = nickname.trim() || username

  const demoLabel = useMemo(() => {
    if (demoType === "gentle-start") return "Gentle Start Demo Mode"
    if (demoType === "neurodivergent-friendly") {
      return "Neurodivergent-friendly Demo Mode"
    }
    if (demoType === "full-bloom") return "Full Bloom Demo Mode"

    return "Demo Mode"
  }, [demoType])

  useEffect(() => {
    if (!currentUser?.id) return

    setNickname(getStoredValue(currentUser, "nickname", ""))
    setGoals(getStoredJson(currentUser, "goals", defaultGoals))

    const avatarDisplay = getAvatarDisplay(currentUser)

    setSelectedAvatarType(avatarDisplay.avatarType || "initial")
    setSelectedAvatarId(avatarDisplay.avatarId || null)
    setSelectedAvatarUrl(avatarDisplay.avatarUrl || null)
  }, [currentUser])

  useEffect(() => {
    if (!currentUser?.id) return

    saveStoredValue(currentUser, "nickname", nickname)
  }, [currentUser, nickname])

  useEffect(() => {
    if (!currentUser?.id) return

    saveStoredJson(currentUser, "goals", goals)
  }, [currentUser, goals])

  function handleSelectAvatar({ avatarType, avatarId, avatarUrl }) {
    if (!currentUser?.id) return

    setSelectedAvatarType(avatarType)
    setSelectedAvatarId(avatarId)
    setSelectedAvatarUrl(avatarUrl)

    saveBloomAvatarChoice(currentUser, {
      avatarType,
      avatarId,
      avatarUrl,
    })
  }

  function handleAddGoal(event) {
    event.preventDefault()

    const cleanGoal = newGoal.trim()

    if (!cleanGoal) return

    setGoals((currentGoals) => [...currentGoals, cleanGoal])
    setNewGoal("")
  }

  function handleRemoveGoal(goalToRemove) {
    setGoals((currentGoals) =>
      currentGoals.filter((goal) => goal !== goalToRemove)
    )
  }

  const shouldShowAvatarImage =
    selectedAvatarType === "bloom" && selectedAvatarUrl

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-6 overflow-x-hidden pb-28 sm:gap-8 sm:pb-0">
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 text-center shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-7">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          ꕤ Your Space
        </p>

        <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-bloom-forest text-4xl font-bold text-bloom-light shadow-md dark:border-white/10">
          {shouldShowAvatarImage ? (
            <img
              src={selectedAvatarUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            initial
          )}
        </div>

        <h2 className="mt-5 break-words text-3xl font-bold text-bloom-forest dark:text-bloom-light sm:text-4xl">
          {displayName}
        </h2>

        <p className="mt-1 break-words text-sm text-bloom-forest/65 dark:text-gray-300">
          {email}
        </p>

        <div className="mx-auto mt-4 flex w-fit rounded-full bg-bloom-light px-4 py-2 text-xs font-bold text-bloom-forest dark:bg-white/10 dark:text-bloom-light">
          {isDemoMode ? demoLabel : "Bloom account"}
        </div>
      </section>

      <ProfileSection label="Account">
        <ProfileRow
          icon="@"
          title="Username"
          description={username}
        />

        <div className="rounded-2xl bg-white/70 px-4 py-4 shadow-sm dark:bg-white/5">
          <label
            htmlFor="nickname"
            className="text-sm font-bold text-bloom-forest dark:text-bloom-light"
          >
            Nickname
          </label>

          <p className="mt-1 text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
            Optional. This is how Bloom can greet you later.
          </p>

          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            placeholder="Add a nickname"
            disabled={isDemoMode}
            className="mt-3 w-full rounded-2xl border border-bloom-sage/30 bg-white px-4 py-3 text-sm text-bloom-forest outline-none transition placeholder:text-bloom-forest/40 focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:placeholder:text-gray-500"
          />
        </div>

        <ProfileRow
          icon="✓"
          title="Joined date"
          description={
            isDemoMode
              ? "Demo sessions are temporary."
              : "Joined date will be shown after backend profile timestamps are added."
          }
          rightText={isDemoMode ? "Demo" : "v1.1"}
        />
      </ProfileSection>

      <ProfileSection label="Profile image">
        {isDemoMode ? (
          <div className="rounded-2xl bg-white/70 px-4 py-4 shadow-sm dark:bg-white/5">
            <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
              Avatar choices are for Bloom accounts
            </p>

            <p className="mt-1 text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
              Demo mode uses temporary sample data. Create an account to choose
              an initial, Bloom avatar, or later upload your own photo.
            </p>
          </div>
        ) : (
          <AvatarChoiceGrid
            selectedAvatarType={selectedAvatarType}
            selectedAvatarId={selectedAvatarId}
            onSelectAvatar={handleSelectAvatar}
            currentInitial={initial}
            showUploadOption={true}
          />
        )}
      </ProfileSection>

      <ProfileSection label="Onboarding answers">
        <ProfileRow
          icon="1"
          title="Experience mode"
          description="Adult mode with calm, mature language."
          rightText="Adult"
        />

        <ProfileRow
          icon="2"
          title="Routine preference"
          description="Gentle routines, low pressure, and softer recovery wording."
          rightText="Calm"
        />

        <ProfileRow
          icon="3"
          title="Support style"
          description="Small steps, quiet prompts, and progress without punishment."
          rightText="Gentle"
        />
      </ProfileSection>

      <ProfileSection label="Personalised goals">
        <div className="flex flex-col gap-3">
          {goals.map((goal) => (
            <div
              key={goal}
              className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-4 shadow-sm dark:bg-white/5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bloom-light text-sm font-bold text-bloom-forest dark:bg-white/10 dark:text-bloom-light">
                ꕤ
              </span>

              <p className="min-w-0 flex-1 break-words text-sm font-semibold text-bloom-forest dark:text-bloom-light">
                {goal}
              </p>

              {!isDemoMode && (
                <button
                  type="button"
                  onClick={() => handleRemoveGoal(goal)}
                  className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-bloom-forest/55 transition hover:bg-bloom-mint/30 hover:text-bloom-forest dark:text-gray-300 dark:hover:bg-white/10"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {!isDemoMode && (
            <form onSubmit={handleAddGoal} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={newGoal}
                onChange={(event) => setNewGoal(event.target.value)}
                placeholder="Add a personal Bloom goal"
                className="min-w-0 flex-1 rounded-2xl border border-bloom-sage/30 bg-white px-4 py-3 text-sm text-bloom-forest outline-none transition placeholder:text-bloom-forest/40 focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:placeholder:text-gray-500"
              />

              <button
                type="submit"
                className="rounded-2xl bg-bloom-mid px-5 py-3 text-sm font-semibold text-white transition hover:bg-bloom-forest"
              >
                Add goal
              </button>
            </form>
          )}
        </div>
      </ProfileSection>

      {onLogout && (
        <button
          type="button"
          onClick={onLogout}
          className="rounded-2xl bg-bloom-forest px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-bloom-mid sm:hidden"
        >
          Log out
        </button>
      )}

      <section className="w-full max-w-full overflow-hidden rounded-2xl border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
          Bloom reminder
        </p>

        <blockquote className="break-words text-base font-semibold leading-relaxed text-bloom-forest dark:text-bloom-light">
          “Your profile isn't a scorecard. It's a space that adapts to you — not
          the other way around.”
        </blockquote>

        <div className="mt-5 rounded-2xl bg-bloom-forest p-5 text-bloom-light dark:bg-dark-surface">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-bloom-mint dark:text-bloom-mid">
            Current phase
          </p>

          <h3 className="mb-2 break-words text-lg font-bold text-bloom-light">
            Profile v1.1.0
          </h3>

          <p className="break-words text-sm leading-relaxed text-bloom-light/90">
            Profile now supports account-only avatar choices, including initials,
            selectable Bloom avatars, and a planned upload option.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Profile