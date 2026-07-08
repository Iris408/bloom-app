import { useEffect, useMemo, useState } from "react"

import { bloomAvatars } from "../data/bloomAvatars"
import {
  getAvatarDisplay,
  saveBloomAvatarChoice,
} from "../utils/avatarStorage"

const defaultGoals = [
  "Build calmer daily routines",
  "Make focus feel less overwhelming",
  "Track progress without pressure",
]

const defaultOnboardingAnswers = {
  experienceMode: "adult",
  routinePreference: "calm",
  supportStyle: "gentle",
}

const onboardingOptions = {
  experienceMode: [
    {
      value: "adult",
      label: "Adult",
      description: "Adult mode with calm, mature language.",
    },
    {
      value: "teen",
      label: "Teen",
      description: "Supportive language for older students and teens.",
    },
    {
      value: "family",
      label: "Family",
      description: "A shared profile style for family-supported routines.",
    },
  ],
  routinePreference: [
    {
      value: "calm",
      label: "Calm",
      description: "Gentle routines, low pressure, and softer recovery wording.",
    },
    {
      value: "structured",
      label: "Structured",
      description: "Clear steps, stronger order, and predictable routine flow.",
    },
    {
      value: "flexible",
      label: "Flexible",
      description: "Loose guidance that can adapt around energy and time.",
    },
  ],
  supportStyle: [
    {
      value: "gentle",
      label: "Gentle",
      description: "Small steps, quiet prompts, and progress without punishment.",
    },
    {
      value: "direct",
      label: "Direct",
      description: "Shorter prompts with clearer action-focused wording.",
    },
    {
      value: "minimal",
      label: "Minimal",
      description: "Less guidance and fewer reminders on each page.",
    },
  ],
}

function getDisplayInitial(user, fallbackName = "", fallbackEmail = "") {
  return (
    user?.username?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    fallbackName?.charAt(0).toUpperCase() ||
    fallbackEmail?.charAt(0).toUpperCase() ||
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

function ProfileSection({ label, children, className = "", cardClassName = "" }) {
  return (
    <section className={`flex w-full flex-col gap-3 ${className}`}>
      <p className="px-1 text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
        {label}
      </p>

      <div
        className={`rounded-[1.75rem] border border-bloom-sage/25 bg-white/45 p-3 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-4 ${cardClassName}`}
      >
        <div className="flex h-full flex-col gap-3">{children}</div>
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

function SmallTextButton({ children, onClick, disabled = false, variant = "soft" }) {
  const variantClass =
    variant === "primary"
      ? "bg-bloom-mid text-white hover:bg-bloom-forest"
      : "bg-bloom-light text-bloom-forest hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full px-3 py-1.5 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${variantClass}`}
    >
      {children}
    </button>
  )
}

function ProfileAvatarSlider({
  selectedAvatarType,
  selectedAvatarId,
  selectedAvatarUrl,
  onSelectAvatar,
  currentInitial,
  isDemoMode,
}) {
  const shouldShowAvatarImage =
    selectedAvatarType === "bloom" && selectedAvatarUrl

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-4 rounded-2xl bg-white/70 px-4 py-4 shadow-sm dark:bg-white/5">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-bloom-forest text-2xl font-bold text-bloom-light">
          {shouldShowAvatarImage ? (
            <img
              src={selectedAvatarUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            currentInitial
          )}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
            Choose your profile image
          </p>

          <p className="mt-1 text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
            Use your initial, choose a Bloom avatar, or upload a photo later.
          </p>
        </div>
      </div>

      {isDemoMode ? (
        <div className="rounded-2xl bg-white/70 px-4 py-4 shadow-sm dark:bg-white/5">
          <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
            Avatar choices are for Bloom accounts
          </p>

          <p className="mt-1 text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
            Demo mode uses temporary sample data. Create an account to save your
            avatar choice.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white/70 px-4 py-4 shadow-sm dark:bg-white/5">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-bloom-mid dark:text-bloom-sage">
            Profile Avatar
          </p>

          <div className="flex gap-4 overflow-x-auto pb-3">
            <button
              type="button"
              onClick={() =>
                onSelectAvatar({
                  avatarType: "initial",
                  avatarId: null,
                  avatarUrl: null,
                })
              }
              className={`flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-[1.4rem] border text-center transition sm:h-32 sm:w-32 ${
                selectedAvatarType === "initial"
                  ? "border-bloom-forest bg-bloom-forest text-white"
                  : "border-bloom-sage/30 bg-bloom-light/70 text-bloom-forest hover:border-bloom-mid dark:border-bloom-light"
              }`}
            >
              <span className="text-2xl font-bold">{currentInitial}</span>
              <span className="mt-1 text-[10px] font-semibold">Initial</span>
            </button>

            {bloomAvatars.map((avatar) => {
              const isSelected =
                selectedAvatarType === "bloom" &&
                selectedAvatarId === avatar.id

              return (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() =>
                    onSelectAvatar({
                      avatarType: "bloom",
                      avatarId: avatar.id,
                      avatarUrl: avatar.image,
                    })
                  }
                  className={`h-28 w-28 shrink-0 overflow-hidden rounded-[1.4rem] border transition sm:h-32 sm:w-32 ${
                    isSelected
                      ? "border-bloom-forest ring-2 ring-bloom-forest/30"
                      : "border-bloom-sage/30 hover:border-bloom-mid"
                  }`}
                >
                  <img
                    src={avatar.image}
                    alt={avatar.label}
                    className="h-full w-full object-cover"
                  />
                </button>
              )
            })}

            <button
              type="button"
              disabled
              className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-[1.4rem] border border-dashed border-bloom-sage/40 bg-white/50 text-center text-bloom-forest/45 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 sm:h-32 sm:w-32"
            >
              <span className="text-xl">+</span>
              <span className="mt-1 px-2 text-[10px] font-semibold leading-4">
                Upload later
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function OnboardingSelect({
  icon,
  title,
  value,
  options,
  onChange,
  disabled = false,
}) {
  const selectedOption =
    options.find((option) => option.value === value) || options[0]

  return (
    <div className="rounded-2xl bg-white/70 px-4 py-4 shadow-sm dark:bg-white/5">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bloom-light text-sm font-bold text-bloom-forest dark:bg-white/10 dark:text-bloom-light">
          {icon}
        </span>

        <div className="min-w-0 flex-1">
          <label className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
            {title}
          </label>

          <select
            value={value}
            onChange={(event) => onChange(event.target.value)}
            disabled={disabled}
            className="mt-2 w-full rounded-2xl border border-bloom-sage/30 bg-white px-3 py-1.5 text-sm font-semibold text-bloom-forest outline-none transition focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/10 dark:text-bloom-light"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <p className="mt-2 break-words text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
            {selectedOption.description}
          </p>
        </div>
      </div>
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
  const [nicknameDraft, setNicknameDraft] = useState("")
  const [isEditingNickname, setIsEditingNickname] = useState(false)

  const [goals, setGoals] = useState(defaultGoals)
  const [newGoal, setNewGoal] = useState("")
  const [onboardingAnswers, setOnboardingAnswers] = useState(
    defaultOnboardingAnswers
  )

  const [selectedAvatarType, setSelectedAvatarType] = useState("initial")
  const [selectedAvatarId, setSelectedAvatarId] = useState(null)
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(null)

  const username =
    currentUser?.username || (isDemoMode ? "Demo user" : "Bloom user")
  const email =
    currentUser?.email || (isDemoMode ? "demo@bloom.local" : "Not connected")
  const initial = getDisplayInitial(currentUser, username, email)

  const displayName = nickname.trim() || username

  const demoLabel = useMemo(() => {
    if (demoType === "gentle-start") return "Gentle Start Demo Mode"
    if (demoType === "neurodivergent-friendly") {
      return "No pressure, no clutter Demo Mode"
    }
    if (demoType === "full-bloom") return "Full Bloom Demo Mode"

    return "Demo Mode"
  }, [demoType])

  useEffect(() => {
    if (!currentUser?.id) {
      setNickname("")
      setNicknameDraft("")
      setIsEditingNickname(false)
      setGoals(defaultGoals)
      setOnboardingAnswers(defaultOnboardingAnswers)
      setSelectedAvatarType("initial")
      setSelectedAvatarId(null)
      setSelectedAvatarUrl(null)
      return
    }

    const savedNickname = getStoredValue(currentUser, "nickname", "")

    setNickname(savedNickname)
    setNicknameDraft(savedNickname)
    setIsEditingNickname(false)
    setGoals(getStoredJson(currentUser, "goals", defaultGoals))
    setOnboardingAnswers(
      getStoredJson(currentUser, "onboarding", defaultOnboardingAnswers)
    )

    const avatarDisplay = getAvatarDisplay(currentUser)

    setSelectedAvatarType(avatarDisplay.avatarType || "initial")
    setSelectedAvatarId(avatarDisplay.avatarId || null)
    setSelectedAvatarUrl(avatarDisplay.avatarUrl || null)
  }, [currentUser])

  useEffect(() => {
    if (!currentUser?.id) return

    saveStoredJson(currentUser, "goals", goals)
  }, [currentUser, goals])

  useEffect(() => {
    if (!currentUser?.id) return

    saveStoredJson(currentUser, "onboarding", onboardingAnswers)
  }, [currentUser, onboardingAnswers])

  function handleEditNickname() {
    if (isDemoMode) return

    setNicknameDraft(nickname)
    setIsEditingNickname(true)
  }

  function handleSaveNickname() {
    if (!currentUser?.id || isDemoMode) return

    const cleanNickname = nicknameDraft.trim()

    setNickname(cleanNickname)
    saveStoredValue(currentUser, "nickname", cleanNickname)
    setIsEditingNickname(false)
  }

  function handleRemoveNickname() {
    if (!currentUser?.id || isDemoMode) return

    setNickname("")
    setNicknameDraft("")
    saveStoredValue(currentUser, "nickname", "")
    setIsEditingNickname(false)
  }

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

  function handleAvatarChange(nextAvatar) {
    if (isDemoMode) {
      setPreviewAvatar(nextAvatar)
      return
    }

    saveAvatar(nextAvatar)
  }

  function handleUpdateOnboarding(key, value) {
    if (isDemoMode) return

    setOnboardingAnswers((currentAnswers) => ({
      ...currentAnswers,
      [key]: value,
    }))
  }

  function handleAddGoal(event) {
    event.preventDefault()

    if (isDemoMode) return

    const cleanGoal = newGoal.trim()

    if (!cleanGoal) return

    setGoals((currentGoals) => [...currentGoals, cleanGoal])
    setNewGoal("")
  }

  function handleRemoveGoal(goalToRemove) {
    if (isDemoMode) return

    setGoals((currentGoals) =>
      currentGoals.filter((goal) => goal !== goalToRemove)
    )
  }

  const shouldShowAvatarImage =
    selectedAvatarType === "bloom" && selectedAvatarUrl

  const [previewAvatar, setPreviewAvatar] = useState(null)

  const visibleAvatar = isDemoMode && previewAvatar
    ? previewAvatar
    : selectedAvatarType === "bloom" && selectedAvatarUrl  

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-6xl flex-col gap-6 overflow-x-hidden pb-28 sm:gap-7 sm:pb-0">
      <section className="mx-auto w-full max-w-3xl rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 text-center shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-7">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          ꕤ Your Space
        </p>

        <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-bloom-forest text-4xl font-bold text-bloom-light shadow-md dark:border-white/10 sm:h-32 sm:w-32">
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

      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
        <ProfileSection
          label="Account"
          cardClassName="h-full min-h-[360px]"
        >
          <ProfileRow icon="@" title="Username" description={username} />

          <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm dark:bg-white/5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
                  Nickname
                </p>

                <p className="mt-1 text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
                  Optional. This is how Bloom can greet you later.
                </p>
              </div>

              {!isDemoMode && (
                <div className="flex shrink-0 gap-2">
                  {isEditingNickname ? (
                    <SmallTextButton
                      onClick={handleSaveNickname}
                      variant="primary"
                    >
                      Save
                    </SmallTextButton>
                  ) : (
                    <SmallTextButton onClick={handleEditNickname}>
                      Edit
                    </SmallTextButton>
                  )}

                  <SmallTextButton
                    onClick={handleRemoveNickname}
                    disabled={!nickname && !nicknameDraft}
                  >
                    Remove
                  </SmallTextButton>
                </div>
              )}
            </div>

            {isEditingNickname ? (
              <input
                id="nickname"
                type="text"
                value={nicknameDraft}
                onChange={(event) => setNicknameDraft(event.target.value)}
                placeholder="Add a nickname"
                disabled={isDemoMode}
                className="mt-3 w-full rounded-2xl border border-bloom-sage/30 bg-white px-4 py-3 text-sm text-bloom-forest outline-none transition placeholder:text-bloom-forest/40 focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:placeholder:text-gray-500"
              />
            ) : (
              <p className="mt-3 rounded-2xl bg-bloom-light/70 px-4 py-3 text-sm font-semibold text-bloom-forest/75 dark:bg-white/10 dark:text-gray-300">
                {nickname || "No nickname added"}
              </p>
            )}
          </div>

          <ProfileRow
            icon="✓"
            title="Joined date"
            description={
              isDemoMode
                ? "Demo sessions are temporary."
                : "Joined date will be shown after backend profile timestamps are added."
            }
            rightText={isDemoMode ? "Demo" : "v2.0.0"}
          />
        </ProfileSection>

        <ProfileSection
          label="Profile image"
          cardClassName="h-full min-h-[360px]"
        >
          <ProfileAvatarSlider
            selectedAvatarType={selectedAvatarType}
            selectedAvatarId={selectedAvatarId}
            selectedAvatarUrl={selectedAvatarUrl}
            onSelectAvatar={handleSelectAvatar}
            currentInitial={initial}
            isDemoMode={isDemoMode}
          />
        </ProfileSection>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
        <ProfileSection label="Onboarding answers" cardClassName="h-full lg:h-[450px]">
          <OnboardingSelect
            icon="1"
            title="Experience mode"
            value={onboardingAnswers.experienceMode}
            options={onboardingOptions.experienceMode}
            onChange={(value) => handleUpdateOnboarding("experienceMode", value)}
            disabled={isDemoMode}
          />

          <OnboardingSelect
            icon="2"
            title="Routine preference"
            value={onboardingAnswers.routinePreference}
            options={onboardingOptions.routinePreference}
            onChange={(value) =>
              handleUpdateOnboarding("routinePreference", value)
            }
            disabled={isDemoMode}
          />

          <OnboardingSelect
            icon="3"
            title="Support style"
            value={onboardingAnswers.supportStyle}
            options={onboardingOptions.supportStyle}
            onChange={(value) => handleUpdateOnboarding("supportStyle", value)}
            disabled={isDemoMode}
          />
        </ProfileSection>

        <ProfileSection label="Personalised goals" cardClassName="h-full lg:h-[450px]">
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
            {goals.length > 0 ? (
              goals.map((goal) => (
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
              ))
            ) : (
              <div className="rounded-2xl bg-white/70 px-4 py-4 text-sm font-semibold text-bloom-forest/65 shadow-sm dark:bg-white/5 dark:text-gray-300">
                No personal goals added yet.
              </div>
            )}
          </div>

          {!isDemoMode && (
            <form
              onSubmit={handleAddGoal}
              className="flex flex-col gap-3 sm:flex-row"
            >
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
        </ProfileSection>
      </div>

      {onLogout && (
        <button
          type="button"
          onClick={onLogout}
          className="rounded-2xl bg-bloom-forest px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-bloom-mid sm:hidden"
        >
          Log out
        </button>
      )}

      <section className="mx-auto w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
              Bloom reminder
            </p>

            <blockquote className="break-words text-base font-semibold leading-relaxed text-bloom-forest dark:text-bloom-light">
              “Your profile isn't a scorecard. It's a space that adapts to you —
              not the other way around.”
            </blockquote>
          </div>

          <div className="rounded-2xl bg-bloom-forest px-5 py-4 text-bloom-light dark:bg-dark-surface lg:w-[360px]">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-bloom-mint dark:text-bloom-mid">
              Current phase
            </p>

            <h3 className="break-words text-base font-bold text-bloom-light">
              Profile v1.1.0
            </h3>

            <p className="mt-1 break-words text-xs leading-5 text-bloom-light/90">
              Account-only avatars, editable profile preferences, and a calmer
              two-column layout.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile