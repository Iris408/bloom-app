import { useEffect, useMemo, useState } from "react"
import { getCurrentUser, loginUser, registerUser } from "../../api/bloomApi";

const avatarOptions = ["🌱", "🌿", "ꕤ", "☾", "✦", "♡"]

const defaultGoals = [
  "Build calmer daily routines",
  "Make focus feel less overwhelming",
  "Track progress without pressure",
]

function getStoredValue(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback
  } catch {
    return fallback
  }
}

function getStoredJson(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function IconCircle({ children }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bloom-light text-base text-bloom-forest dark:bg-white/10 dark:text-bloom-light">
      {children}
    </span>
  )
}

function ProfileRow({ icon, title, description, rightText }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white/70 px-4 py-4 shadow-sm dark:bg-white/5">
      <IconCircle>{icon}</IconCircle>

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
        <p className="shrink-0 text-xs font-semibold text-bloom-forest/60 dark:text-gray-300">
          {rightText}
        </p>
      )}
    </div>
  )
}

function ProfileSection({ label, children }) {
  return (
    <section className="flex flex-col gap-3">
      <p className="px-1 text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
        {label}
      </p>

      <div className="rounded-[1.75rem] border border-bloom-sage/25 bg-white/45 p-3 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-4">
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </section>
  )
}

function Profile({
  currentUser = null,
  isDemoMode = false,
  demoType = null,
  onLogout,
}) {
  const [nickname, setNickname] = useState(() =>
    getStoredValue("bloom-profile-nickname", "")
  )
  const [selectedAvatar, setSelectedAvatar] = useState(() =>
    getStoredValue("bloom-profile-avatar", "🌱")
  )
  const [goals, setGoals] = useState(() =>
    getStoredJson("bloom-profile-goals", defaultGoals)
  )
  const [newGoal, setNewGoal] = useState("")

  const username = currentUser?.username || (isDemoMode ? "Demo user" : "Bloom user")
  const email = currentUser?.email || (isDemoMode ? "demo@bloom.local" : "Not connected")
  const displayName = nickname.trim() || username

  const demoLabel = useMemo(() => {
    if (demoType === "simple-day") return "Simple Day"
    if (demoType === "neurodivergent-friendly") return "Neurodivergent-friendly Day"
    if (demoType === "full-preview") return "Full App Preview"
    return "Demo mode"
  }, [demoType])

  useEffect(() => {
    localStorage.setItem("bloom-profile-nickname", nickname)
  }, [nickname])

  useEffect(() => {
    localStorage.setItem("bloom-profile-avatar", selectedAvatar)
  }, [selectedAvatar])

  useEffect(() => {
    localStorage.setItem("bloom-profile-goals", JSON.stringify(goals))
  }, [goals])

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

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-6 overflow-x-hidden pb-28 sm:gap-8 sm:pb-0">
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 text-center shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-7">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Profile
        </p>

        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-bloom-forest text-5xl text-bloom-light shadow-md dark:border-white/10">
          {selectedAvatar}
        </div>

        <h2 className="mt-5 break-words text-3xl font-bold text-bloom-forest dark:text-bloom-light">
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
            className="mt-3 w-full rounded-2xl border border-bloom-sage/30 bg-white px-4 py-3 text-sm text-bloom-forest outline-none transition placeholder:text-bloom-forest/40 focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:placeholder:text-gray-500"
          />
        </div>

        <ProfileRow
          icon="✓"
          title="Joined date"
          description={
            isDemoMode
              ? "Demo sessions are temporary."
              : "Joined date will be shown after the profile timestamp migration."
          }
          rightText={isDemoMode ? "Demo" : "v2.1"}
        />
      </ProfileSection>

      <ProfileSection label="Bloom avatar">
        <div className="rounded-2xl bg-white/70 px-4 py-4 shadow-sm dark:bg-white/5">
          <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
            Choose a Bloom avatar
          </p>

          <p className="mt-1 text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
            Photo upload can come later. For now, choose a simple Bloom symbol.
          </p>

          <div className="mt-4 grid grid-cols-6 gap-2">
            {avatarOptions.map((avatar) => (
              <button
                key={avatar}
                type="button"
                onClick={() => setSelectedAvatar(avatar)}
                aria-label={`Choose avatar ${avatar}`}
                className={`flex h-11 w-full items-center justify-center rounded-2xl border text-xl transition ${
                  selectedAvatar === avatar
                    ? "border-bloom-forest bg-bloom-forest text-white dark:border-bloom-sage dark:bg-bloom-sage dark:text-dark-bg"
                    : "border-bloom-sage/30 bg-bloom-light/60 hover:border-bloom-mid dark:border-white/10 dark:bg-white/10"
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>
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
              <IconCircle>ꕤ</IconCircle>

              <p className="min-w-0 flex-1 break-words text-sm font-semibold text-bloom-forest dark:text-bloom-light">
                {goal}
              </p>

              <button
                type="button"
                onClick={() => handleRemoveGoal(goal)}
                className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-bloom-forest/55 transition hover:bg-bloom-mint/30 hover:text-bloom-forest dark:text-gray-300 dark:hover:bg-white/10"
              >
                Remove
              </button>
            </div>
          ))}

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
    </div>
  )
}

export default Profile