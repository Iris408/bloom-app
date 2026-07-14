import { useEffect, useMemo, useState } from "react"

const MEMORY_HERO_IMAGE = "/illustrations/bloom-memories-hero.png"
const MEMORY_QUOTE_IMAGE = "/illustrations/bloom-memories-quote.png"
const MEMORIES_STORAGE_KEY = "bloom-memories"

const MEMORY_FILTERS = [
  { value: "all", label: "All memories" },
  { value: "grateful", label: "Grateful" },
  { value: "reset", label: "Reset" },
  { value: "accomplished", label: "Accomplished" },
  { value: "reflective", label: "Reflective" },
]

const MEMORY_SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
]

const MEMORY_IMAGE_OPTIONS = [
  {
    id: "soft-morning",
    label: "Soft Morning",
    category: "Rest",
    src: "/images/memories/soft-morning.png",
    alt: "A cosy bedroom corner with books, plants, tea, and warm morning sunlight.",
  },
  {
    id: "coffee-pause",
    label: "Coffee Pause",
    category: "Pause",
    src: "/images/memories/coffee-pause.png",
    alt: "A quiet café table with coffee, a notebook, flowers, and golden light.",
  },
  {
    id: "together-outside",
    label: "Together Outside",
    category: "Friends",
    src: "/images/memories/together-outside.png",
    alt: "A group of friends having a peaceful picnic in a sunny park.",
  },
  {
    id: "gentle-ride",
    label: "Gentle Ride",
    category: "Movement",
    src: "/images/memories/gentle-ride.png",
    alt: "Two people cycling through a sunny park with flowers and soft greenery.",
  },
  {
    id: "gratitude-notes",
    label: "Gratitude Notes",
    category: "Gratitude",
    src: "/images/memories/gratitude-notes.png",
    alt: "An open gratitude journal with flowers, a candle, and a pen.",
  },
  {
    id: "quiet-work-moment",
    label: "Quiet Work Moment",
    category: "Work",
    src: "/images/memories/quiet-work-moment.png",
    alt: "A calm Bloom-style workspace with people working quietly at laptops.",
  },
  {
    id: "morning-gratitude",
    label: "Morning Gratitude",
    category: "Gratitude",
    src: "/images/memories/morning-gratitude.png",
    alt: "An open gratitude journal with coffee, flowers, and warm morning sunlight.",
  },
  {
    id: "park-pause",
    label: "Park Pause",
    category: "Outdoors",
    src: "/images/memories/park-pause.png",
    alt: "A peaceful park bench with a Bloom book, tea, flowers, and a soft lakeside view.",
  },
  {
    id: "gentle-walk",
    label: "Gentle Walk",
    category: "Outdoors",
    src: "/images/memories/gentle-walk.png",
    alt: "A sunlit garden path surrounded by flowers, trees, and soft greenery.",
  },
  {
    id: "small-reflection",
    label: "Small Reflection",
    category: "Reflection",
    src: "/images/memories/small-reflection.png",
    alt: "A warm desk scene with a journal, flowers, tea, and soft sunlight.",
  },
  {
    id: "memory-collection",
    label: "Memory Collection",
    category: "Memories",
    src: "/images/memories/memory-collection.png",
    alt: "A scrapbook-style collection of peaceful photos, notes, flowers, and keepsakes.",
  },
  {
    id: "reading-rest",
    label: "Reading Rest",
    category: "Rest",
    src: "/images/memories/reading-rest.png",
    alt: "A cosy Bloom-style scene of someone reading with a warm drink and soft flowers.",
  },
]


function getMemoryTagClass(tag) {
  const normalisedTag = tag.toLowerCase()

  if (normalisedTag === "grateful" || normalisedTag === "reflective") {
    return "bg-orange-100 text-orange-600 dark:bg-orange-300/15 dark:text-orange-200"
  }

  return "bg-bloom-light text-bloom-forest/70 dark:bg-white/10 dark:text-gray-300"
}


function getDefaultMemoryImage(tag) {
  const normalisedTag = tag.toLowerCase()

  if (normalisedTag === "grateful") {
    return "/images/memories/morning-gratitude.png"
  }

  if (normalisedTag === "reflective") {
    return "/images/memories/small-reflection.png"
  }

  if (normalisedTag === "accomplished") {
    return "/images/memories/quiet-work-moment.png"
  }

  if (normalisedTag === "reset") {
    return "/images/memories/park-pause.png"
  }

  return "/images/memories/coffee-pause.png"
}


function getDisplayDate(dateValue) {
  if (!dateValue) return "Today"

  const date = new Date(dateValue)
  const today = new Date()

  const isToday = date.toDateString() === today.toDateString()

  if (isToday) return "Today"

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  })
}


function loadStoredMemories() {
  try {
    const savedMemories = localStorage.getItem(MEMORIES_STORAGE_KEY)
    const parsedMemories = savedMemories ? JSON.parse(savedMemories) : []

    return Array.isArray(parsedMemories) ? parsedMemories : []
  } catch {
    return []
  }
}


function sortMemories(memories, sortOrder) {
  return [...memories].sort((firstMemory, secondMemory) => {
    const firstDate = new Date(firstMemory.createdAt ?? 0).getTime()
    const secondDate = new Date(secondMemory.createdAt ?? 0).getTime()

    if (sortOrder === "oldest") {
      return firstDate - secondDate
    }

    return secondDate - firstDate
  })
}


function SectionIcon() {
  return (
    <span className="text-lg text-bloom-forest/70 dark:text-bloom-sage">
      🌿
    </span>
  )
}


function MemoryHeroIllustration() {
  return (
    <div className="hidden h-[320px] overflow-hidden rounded-[1.75rem] border border-bloom-sage/20 bg-bloom-light/70 shadow-sm dark:border-white/10 dark:bg-white/10 lg:block">
      <img
        src={MEMORY_HERO_IMAGE}
        alt=""
        className="h-full w-full object-cover object-center"
      />
    </div>
  )
}


function HeroMemoryReminder() {
  return (
    <section className="hidden h-[120px] overflow-hidden rounded-[1.5rem] border border-orange-100 bg-orange-50/60 px-5 py-4 shadow-sm dark:border-white/10 dark:bg-white/5 lg:block">
      <div className="flex h-full items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-bloom-mid dark:text-bloom-sage">
            Bloom reminder
          </p>

          <h3 className="mt-2 text-lg font-bold leading-snug text-bloom-forest dark:text-bloom-light">
            You are allowed to remember the good.
          </h3>

          <p className="mt-1 text-xs leading-5 text-bloom-forest/60 dark:text-gray-300">
            Hold on to it. You deserve it.
          </p>
        </div>

        <div className="pointer-events-none shrink-0 text-3xl text-bloom-forest opacity-80">
          𖥸
        </div>
      </div>
    </section>
  )
}


function SmallWinsCard() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SectionIcon />

          <h3 className="text-xl font-bold text-bloom-forest dark:text-bloom-light">
            Small wins
          </h3>
        </div>

        <span className="text-xs font-bold text-bloom-forest/50 dark:text-gray-400">
          This week
        </span>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-5xl font-bold leading-none text-bloom-forest dark:text-bloom-light">
            5
          </p>

          <p className="mt-3 text-sm leading-relaxed text-bloom-forest/65 dark:text-gray-300">
            Small wins celebrated
          </p>
        </div>

        <div className="text-5xl opacity-80">🌿</div>
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-bloom-sage/25 bg-bloom-light/70 px-4 py-2 text-xs font-bold text-bloom-forest/70 dark:border-white/10 dark:bg-white/10 dark:text-gray-300">
        <span>View all wins</span>

        <span className="rounded-full bg-white/70 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-bloom-mid dark:bg-white/10 dark:text-bloom-sage">
          Coming soon
        </span>
      </div>
    </section>
  )
}


function FavoriteQuoteCard() {
  return (
    <section className="relative min-h-[260px] overflow-hidden rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 shadow-sm dark:border-white/10 dark:bg-white/5">
      <img
        src={MEMORY_QUOTE_IMAGE}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-35 dark:brightness-100"
      />
    </section>
  )
}


function MemoriesTimeline({
  memories,
  totalMemoryCount,
  memoryFilter,
  onFilterChange,
  onViewAll,
  openMemoryMenuId,
  onToggleMemoryMenu,
  onEditMemory,
  onDeleteMemory,
}) {
  const hasMemories = memories.length > 0

  return (
    <section className="flex min-h-[420px] flex-col rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <SectionIcon />

          <h3 className="text-xl font-bold text-bloom-forest dark:text-bloom-light">
            Your memories
          </h3>
        </div>

        <select
          value={memoryFilter}
          onChange={(event) => onFilterChange(event.target.value)}
          className="w-[150px] rounded-full border border-bloom-sage/25 bg-white/80 px-4 py-2 text-xs font-bold text-bloom-forest/70 outline-none transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-gray-300"
        >
          {MEMORY_FILTERS.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>

      {hasMemories ? (
        <div className="relative flex flex-1 flex-col gap-6">
          <div className="absolute bottom-8 left-[17px] top-5 w-px bg-bloom-sage/30" />

          {memories.map((memory) => (
            <article
              key={memory.id}
              className="relative grid grid-cols-[34px_minmax(0,1fr)] gap-4"
            >
              <div className="relative z-10 mt-10 h-4 w-4 rounded-full bg-bloom-forest" />

              <div className="grid min-w-0 gap-4 rounded-2xl bg-white/55 p-3 dark:bg-white/5 sm:grid-cols-[96px_minmax(0,1fr)]">
                <img
                  src={memory.image}
                  alt=""
                  className="h-24 w-full rounded-2xl object-cover sm:h-24 sm:w-24"
                />

                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-bloom-forest/45 dark:text-gray-400">
                        {memory.date}
                      </p>

                      <h4 className="mt-1 text-base font-bold leading-snug text-bloom-forest dark:text-bloom-light sm:text-lg">
                        {memory.title}
                      </h4>
                    </div>

                    <div className="relative">
                      <button
                        type="button"
                        aria-label="Memory options"
                        onClick={() => onToggleMemoryMenu(memory.id)}
                        className="text-xl font-bold text-bloom-forest/45 transition hover:text-bloom-forest dark:text-gray-400 dark:hover:text-bloom-light"
                      >
                        …
                      </button>

                      {openMemoryMenuId === memory.id && (
                        <div className="absolute right-0 top-8 z-30 w-32 overflow-hidden rounded-2xl border border-bloom-sage/25 bg-white shadow-lg dark:border-white/10 dark:bg-dark-surface">
                          <button
                            type="button"
                            onClick={() => onEditMemory(memory)}
                            className="block w-full px-4 py-3 text-left text-xs font-bold text-bloom-forest transition hover:bg-bloom-light dark:text-bloom-light dark:hover:bg-white/10"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => onDeleteMemory(memory.id)}
                            className="block w-full px-4 py-3 text-left text-xs font-bold text-red-500 transition hover:bg-red-50 dark:hover:bg-white/10"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-bloom-forest/60 dark:text-gray-300">
                    {memory.description}
                  </p>

                  <span
                    className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${memory.tagClass}`}
                  >
                    {memory.tag}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-[1.5rem] border border-dashed border-bloom-sage/35 bg-white/45 p-6 text-center dark:border-white/10 dark:bg-white/5">
          <div>
            <p className="text-4xl">🌿</p>

            <h4 className="mt-3 text-lg font-bold text-bloom-forest dark:text-bloom-light">
              No memories here yet
            </h4>

            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-bloom-forest/60 dark:text-gray-300">
              Add a small moment when you are ready.
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onViewAll}
        className="mt-7 text-sm font-bold text-bloom-forest/70 transition hover:text-bloom-forest dark:text-gray-300 dark:hover:text-bloom-light"
      >
        View all memories
        {totalMemoryCount > 3 ? ` (${totalMemoryCount})` : ""} →
      </button>
    </section>
  )
}


function FeaturedMemoryCard({ featuredMemory, onUseLatest, onRemove, hasMemories }) {
  return (
    <section className="rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SectionIcon />

          <h3 className="text-xl font-bold text-bloom-forest dark:text-bloom-light">
            Featured memory
          </h3>
        </div>

        {featuredMemory && (
          <button
            type="button"
            onClick={onRemove}
            className="rounded-full bg-bloom-light px-3 py-1.5 text-xs font-bold text-bloom-forest/65 transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-gray-300"
          >
            Remove
          </button>
        )}
      </div>

      {featuredMemory ? (
        <div className="h-full min-h-[220px] w-full rounded-[1.4rem] object-cover">
          <img
            src={featuredMemory.image}
            alt=""
            className="h-52 w-full rounded-[1.4rem] object-cover"
          />

          <div className="flex flex-col justify-center">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-2xl font-bold text-bloom-forest dark:text-bloom-light">
                  {featuredMemory.title}
                </h4>

                <p className="mt-2 text-sm text-bloom-forest/50 dark:text-gray-400">
                  {featuredMemory.date}
                </p>
              </div>

              <span className="text-2xl">🧡</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-bloom-forest/70 dark:text-gray-300">
              {featuredMemory.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onUseLatest}
                className="rounded-full bg-bloom-light px-4 py-2 text-xs font-bold text-bloom-forest transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light"
              >
                Change memory
              </button>

              <button
                type="button"
                onClick={onRemove}
                className="rounded-full border border-bloom-sage/25 bg-white/70 px-4 py-2 text-xs font-bold text-bloom-forest/65 transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-gray-300"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-bloom-sage/35 bg-white/50 p-6 text-center dark:border-white/10 dark:bg-white/5">
          <p className="text-4xl">🌿</p>

          <h4 className="mt-3 text-lg font-bold text-bloom-forest dark:text-bloom-light">
            No featured memory yet
          </h4>

          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-bloom-forest/60 dark:text-gray-300">
            Choose a memory to keep close. You can change or clear it anytime.
          </p>

          <button
            type="button"
            onClick={onUseLatest}
            disabled={!hasMemories}
            className="mt-5 rounded-full bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light shadow-sm transition hover:bg-bloom-mid disabled:cursor-not-allowed disabled:opacity-40 dark:bg-bloom-sage dark:text-bloom-forest"
          >
            Use latest memory
          </button>
        </div>
      )}
    </section>
  )
}

function ReflectionsCard() {
  return (
    <section className="relative min-h-[260px] overflow-hidden rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SectionIcon />

          <h3 className="text-xl font-bold text-bloom-forest dark:text-bloom-light">
            Reflections
          </h3>
        </div>

        <span className="rounded-full bg-bloom-light px-3 py-1 text-xs font-bold text-bloom-forest/55 dark:bg-white/10 dark:text-gray-300">
          Planned
        </span>
      </div>

      <div className="rounded-[1.4rem] border border-dashed border-bloom-sage/30 bg-white/45 p-5 text-center dark:border-white/10 dark:bg-white/5">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-bloom-light text-2xl dark:bg-white/10">
          🪞
        </div>

        <p className="text-base font-bold text-bloom-forest dark:text-bloom-light">
          Reflection space coming later
        </p>

        <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-bloom-forest/60 dark:text-gray-300">
          This can become a gentle place for notes, thoughts, or small end-of-day reflections.
        </p>
      </div>
    </section>
  )
}

function MoodSnapshotCard() {
  const [selectedMood, setSelectedMood] = useState(4)

  const moods = [
    { id: 1, label: "Overwhelmed", icon: "😫" },
    { id: 2, label: "Low energy", icon: "😔" },
    { id: 3, label: "Getting through", icon: "😐" },
    { id: 4, label: "Doing good", icon: "😌" },
    { id: 5, label: "Bright", icon: "😄" },
  ]

  const selectedMoodLabel =
    moods.find((mood) => mood.id === selectedMood)?.label ?? "Good"

  return (
    <section className="min-h-[260px] rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-bloom-mid dark:text-bloom-sage">
            Mood snapshot
          </p>

          <h3 className="mt-2 text-xl font-bold leading-tight text-bloom-forest dark:text-bloom-light">
            How are you feeling today?
          </h3>
        </div>

        <span className="w-[70px] shrink-0 rounded-full bg-bloom-light px-3 py-1 text-center text-xs font-bold text-bloom-forest/65 dark:bg-white/10 dark:text-gray-300">
          {selectedMoodLabel}
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label="Mood selector"
        className="grid grid-cols-5 gap-1 rounded-2xl bg-white/45 p-1 dark:bg-white/5"
      >
        {moods.map((mood) => {
          const isSelected = selectedMood === mood.id

          return (
            <button
              key={mood.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelectedMood(mood.id)}
              className={`flex h-[78px] min-w-0 flex-col items-center justify-center gap-2 rounded-xl px-1 py-2 text-center transition ${
                isSelected
                  ? "bg-bloom-light text-bloom-forest shadow-sm dark:bg-white/10 dark:text-bloom-light"
                  : "text-bloom-forest/55 hover:bg-bloom-light/55 dark:text-gray-400 dark:hover:bg-white/10"
              }`}
            >
              <span
                className="flex h-8 w-8 items-center justify-center text-[22px] leading-none"
                aria-hidden="true"
              >
                {mood.icon}
              </span>

              <span
                className={`block w-full truncate text-[11px] leading-none ${
                  isSelected ? "font-bold" : "font-semibold"
                }`}
              >
                {mood.label}
              </span>
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-xs leading-5 text-bloom-forest/55 dark:text-gray-400">
        This is just a gentle check-in, not a score.
      </p>
    </section>
  )
}

function TopThemesCard({ memories = [] }) {
  const themeCounts = useMemo(() => {
    const counts = {
      Grateful: 0,
      Reset: 0,
      Accomplished: 0,
      Reflective: 0,
    }

    memories.forEach((memory) => {
      if (counts[memory.tag] !== undefined) {
        counts[memory.tag] += 1
      }
    })

    return counts
  }, [memories])

  const themes = [
    {
      id: "grateful",
      icon: "♡",
      label: "Grateful",
      value: themeCounts.Grateful,
      width: `${Math.min(themeCounts.Grateful * 20, 100)}%`,
      color: "bg-bloom-forest",
    },
    {
      id: "reset",
      icon: "🌿",
      label: "Reset",
      value: themeCounts.Reset,
      width: `${Math.min(themeCounts.Reset * 20, 100)}%`,
      color: "bg-orange-300",
    },
    {
      id: "reflective",
      icon: "✿",
      label: "Reflective",
      value: themeCounts.Reflective,
      width: `${Math.min(themeCounts.Reflective * 20, 100)}%`,
      color: "bg-orange-300",
    },
  ]

  return (
    <section className="rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SectionIcon />

          <h3 className="text-xl font-bold text-bloom-forest dark:text-bloom-light">
            Top themes
          </h3>
        </div>

        <span className="text-xs font-bold text-bloom-forest/50 dark:text-gray-400">
          This month
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className="grid grid-cols-[36px_1fr_90px_24px] items-center gap-3"
          >
            <span className="text-xl text-bloom-forest/70">{theme.icon}</span>

            <span className="text-sm font-bold text-bloom-forest/75 dark:text-gray-200">
              {theme.label}
            </span>

            <div className="h-2 overflow-hidden rounded-full bg-bloom-light dark:bg-white/10">
              <div
                className={`h-full rounded-full ${theme.color}`}
                style={{ width: theme.width }}
              />
            </div>

            <span className="text-sm font-bold text-bloom-forest/70 dark:text-gray-300">
              {theme.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function AllMemoriesView({
  memories,
  memoryFilter,
  memorySortOrder,
  onFilterChange,
  onSortChange,
  onBack,
}) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 overflow-x-hidden pb-28 sm:gap-7 sm:pb-0">
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-7">
        <button
          type="button"
          onClick={onBack}
          className="mb-5 rounded-full border border-bloom-sage/25 bg-white/70 px-4 py-2 text-xs font-bold text-bloom-forest/70 transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-gray-300"
        >
          ← Back to Moments
        </button>

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
          All memories
        </p>

        <h2 className="mt-3 text-4xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-5xl">
          Every gentle moment you saved.
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bloom-forest/65 dark:text-gray-300 sm:text-base">
          Browse your saved reflections, small wins, resets, and grateful
          moments in one calm place.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <select
            value={memoryFilter}
            onChange={(event) => onFilterChange(event.target.value)}
            className="rounded-full border border-bloom-sage/25 bg-white/80 px-4 py-3 text-sm font-bold text-bloom-forest outline-none dark:border-white/10 dark:bg-white/10 dark:text-gray-100"
          >
            {MEMORY_FILTERS.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>

          <select
            value={memorySortOrder}
            onChange={(event) => onSortChange(event.target.value)}
            className="rounded-full border border-bloom-sage/25 bg-white/80 px-4 py-3 text-sm font-bold text-bloom-forest outline-none dark:border-white/10 dark:bg-white/10 dark:text-gray-100"
          >
            {MEMORY_SORT_OPTIONS.map((sortOption) => (
              <option key={sortOption.value} value={sortOption.value}>
                {sortOption.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {memories.length === 0 ? (
        <section className="rounded-[1.75rem] border border-dashed border-bloom-sage/35 bg-white/50 p-8 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-4xl">🌿</p>

          <h3 className="mt-3 text-xl font-bold text-bloom-forest dark:text-bloom-light">
            No memories yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-bloom-forest/60 dark:text-gray-300">
            There are no memories for this filter yet.
          </p>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {memories.map((memory) => (
            <article
              key={memory.id}
              className="overflow-hidden rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <img
                src={memory.image}
                alt=""
                className="h-44 w-full object-cover"
              />

              <div className="p-5">
                <p className="text-xs font-bold text-bloom-forest/45 dark:text-gray-400">
                  {memory.date}
                </p>

                <h3 className="mt-2 text-xl font-bold leading-snug text-bloom-forest dark:text-bloom-light">
                  {memory.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-bloom-forest/60 dark:text-gray-300">
                  {memory.description}
                </p>

                <span
                  className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${memory.tagClass}`}
                >
                  {memory.tag}
                </span>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  )
}

function MemoryFormOverlay({ mode, initialMemory, onSave, onCancel }) {
  const [title, setTitle] = useState(initialMemory?.title ?? "")
  const [description, setDescription] = useState(
    initialMemory?.description ?? ""
  )
  const [tag, setTag] = useState(initialMemory?.tag ?? "Grateful")
  const [image, setImage] = useState(
  initialMemory?.image ?? getDefaultMemoryImage(initialMemory?.tag ?? "Grateful")
)

  function handleTagChange(nextTag) {
    setTag(nextTag)

    if (!initialMemory?.image) {
      setImage(getDefaultMemoryImage(nextTag))
    }
  }

  function handleSave() {
    if (title.trim() === "") return

    const createdAt = initialMemory?.createdAt ?? new Date().toISOString()

    onSave({
      ...initialMemory,
      id: initialMemory?.id ?? Date.now(),
      title: title.trim(),
      description:
        description.trim() || "A small moment I want to remember.",
      tag,
      tagClass: getMemoryTagClass(tag),
      image,
      date: getDisplayDate(createdAt),
      createdAt,
    })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-bloom-forest/30 px-4 py-8 backdrop-blur-sm">
      <div className="mx-auto max-w-xl rounded-[1.75rem] border border-bloom-sage/25 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-dark-surface sm:p-5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
              {mode === "edit" ? "Edit memory" : "Add memory"}
            </p>

            <h3 className="mt-2 text-xl font-bold text-bloom-forest dark:text-bloom-light">
              {mode === "edit"
                ? "Update this gentle moment."
                : "Save one gentle moment."}
            </h3>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-full bg-bloom-light px-3 py-2 text-xs font-bold text-bloom-forest transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light"
          >
            Close
          </button>
        </div>

        <div className="max-h-[62vh] overflow-y-auto pr-1">
          <label className="block text-sm font-bold text-bloom-forest dark:text-bloom-light">
            Memory title
          </label>

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="A quiet cup of tea..."
            className="mt-2 w-full rounded-2xl border border-bloom-sage/25 bg-white/80 px-4 py-3 text-sm text-bloom-forest outline-none focus:border-bloom-mid dark:border-white/10 dark:bg-white/10 dark:text-gray-100"
          />

          <label className="mt-5 block text-sm font-bold text-bloom-forest dark:text-bloom-light">
            What happened?
          </label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Write a small note about this moment..."
            className="mt-2 min-h-[96px]] w-full resize-none rounded-2xl border border-bloom-sage/25 bg-white/80 px-4 py-3 text-sm text-bloom-forest outline-none focus:border-bloom-mid dark:border-white/10 dark:bg-white/10 dark:text-gray-100"
          />

          <label className="mt-5 block text-sm font-bold text-bloom-forest dark:text-bloom-light">
            Category
          </label>

          <select
            value={tag}
            onChange={(event) => handleTagChange(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-bloom-sage/25 bg-white/80 px-4 py-3 text-sm font-bold text-bloom-forest outline-none focus:border-bloom-mid dark:border-white/10 dark:bg-white/10 dark:text-gray-100"
          >
            <option value="Grateful">Grateful</option>
            <option value="Reset">Reset</option>
            <option value="Accomplished">Accomplished</option>
            <option value="Reflective">Reflective</option>
          </select>

          <div className="mt-5">
            <div className="flex items-center justify-between gap-3">
              <label className="block text-sm font-bold text-bloom-forest dark:text-bloom-light">
                Add image
              </label>

              <span className="text-xs font-semibold text-bloom-forest/45 dark:text-gray-400">
                Scroll to choose
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-bloom-forest/55 dark:text-gray-400">
              Choose a sample Bloom image for now. Upload support will be
              available later.
            </p>

            <div className="mt-3 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {MEMORY_IMAGE_OPTIONS.map((imageOption) => {
                const isSelected = image === imageOption.src

                return (
                  <button
                    key={imageOption.id}
                    type="button"
                    onClick={() => setImage(imageOption.src)}
                    className={`w-[135px] shrink-0 overflow-hidden rounded-2xl border text-left transition ${
                      isSelected
                        ? "border-bloom-forest bg-bloom-light shadow-sm dark:border-bloom-sage dark:bg-white/10"
                        : "border-bloom-sage/20 bg-white/70 hover:border-bloom-sage/50 dark:border-white/10 dark:bg-white/5"
                    }`}
                  >
                    <img
                      src={imageOption.src}
                      alt={imageOption.alt}
                      className="h-20 w-full object-cover"
                    />

                    <div className="p-3">
                      <p className="text-xs font-bold text-bloom-forest dark:text-bloom-light">
                        {imageOption.label}
                      </p>

                      <p className="mt-1 text-[11px] font-semibold text-bloom-forest/45 dark:text-gray-400">
                        {imageOption.category}
                      </p>

                      {isSelected && (
                        <p className="mt-1 text-xs font-semibold text-bloom-mid dark:text-bloom-sage">
                          Selected
                        </p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              disabled
              className="mt-3 w-full rounded-2xl border border-dashed border-bloom-sage/35 bg-white/50 px-4 py-3 text-sm font-bold text-bloom-forest/45 dark:border-white/10 dark:bg-white/5 dark:text-gray-500"
            >
              ꕤ Upload your own image later
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light shadow-sm transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest"
            >
              Save memory
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="rounded-full border border-bloom-sage/30 bg-white/70 px-5 py-3 text-sm font-bold text-bloom-forest/80 shadow-sm transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Moments() {
  const [memories, setMemories] = useState(() => loadStoredMemories())
  const [featuredMemory, setFeaturedMemory] = useState(null)
  const [activeMomentsView, setActiveMomentsView] = useState("dashboard")
  const [memoryFilter, setMemoryFilter] = useState("all")
  const [memorySortOrder, setMemorySortOrder] = useState("newest")
  const [editingMemory, setEditingMemory] = useState(null)
  const [isMemoryFormOpen, setIsMemoryFormOpen] = useState(false)
  const [openMemoryMenuId, setOpenMemoryMenuId] = useState(null)

  useEffect(() => {
    localStorage.setItem(MEMORIES_STORAGE_KEY, JSON.stringify(memories))
  }, [memories])

  const filteredMemories = useMemo(() => {
    const categoryFilteredMemories =
      memoryFilter === "all"
        ? memories
        : memories.filter((memory) => {
            return memory.tag.toLowerCase() === memoryFilter
          })

    return sortMemories(categoryFilteredMemories, memorySortOrder)
  }, [memories, memoryFilter, memorySortOrder])

  const dashboardMemories = useMemo(() => {
    return filteredMemories.slice(0, 3)
  }, [filteredMemories])

  function handleOpenAddMemory() {
    setEditingMemory(null)
    setIsMemoryFormOpen(true)
  }

  function handleEditMemory(memory) {
    setEditingMemory(memory)
    setIsMemoryFormOpen(true)
    setOpenMemoryMenuId(null)
  }

  function handleSaveMemory(memoryToSave) {
    setMemories((currentMemories) => {
      const memoryExists = currentMemories.some(
        (memory) => memory.id === memoryToSave.id
      )

      if (memoryExists) {
        return currentMemories.map((memory) =>
          memory.id === memoryToSave.id ? memoryToSave : memory
        )
      }

      return [memoryToSave, ...currentMemories]
    })

    setEditingMemory(null)
    setIsMemoryFormOpen(false)
  }

  function handleDeleteMemory(memoryId) {
    setMemories((currentMemories) =>
      currentMemories.filter((memory) => memory.id !== memoryId)
    )

    if (featuredMemory?.id === memoryId) {
      setFeaturedMemory(null)
    }

    setOpenMemoryMenuId(null)
  }

  function handleUseLatestMemory() {
    const latestMemory = sortMemories(memories, "newest")[0]

    if (!latestMemory) return

    setFeaturedMemory(latestMemory)
  }

  if (activeMomentsView === "all-memories") {
    return (
      <AllMemoriesView
        memories={filteredMemories}
        memoryFilter={memoryFilter}
        memorySortOrder={memorySortOrder}
        onFilterChange={setMemoryFilter}
        onSortChange={setMemorySortOrder}
        onBack={() => setActiveMomentsView("dashboard")}
      />
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 overflow-x-hidden pb-28 sm:gap-7 sm:pb-0">
      {/* Hero */}
      <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.95fr)]">
        <div className="relative overflow-hidden rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-7">
          <div className="relative z-10 flex h-full flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-bloom-sky/15 px-3 py-2 text-xs font-bold text-bloom-forest/70 dark:bg-white/10 dark:text-gray-300">
              <span>🌿</span>
              <span>Welcome back</span>
            </div>

            <h2 className="max-w-xl text-4xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-5xl">
              Keep the gentle moments that mattered.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-bloom-forest/65 dark:text-gray-300 sm:text-base">
              Remember, reflect, and hold on to the good.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleOpenAddMemory}
                className="rounded-full bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light shadow-sm transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest"
              >
                ꕤ Add a memory
              </button>

              <button
                type="button"
                onClick={() => setActiveMomentsView("all-memories")}
                className="rounded-full border border-bloom-sage/30 bg-white/70 px-5 py-3 text-sm font-bold text-bloom-forest/80 shadow-sm transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
              >
                Browse all memories
              </button>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-8 -right-4 text-8xl opacity-20">
            🌸
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <MemoryHeroIllustration />
          <HeroMemoryReminder />
        </div>
      </section>

      {/* Dashboard */}
      <section className="grid gap-6 xl:grid-cols-3">
        {/* Row 1: Your memories wide + Small wins */}
        <div className="xl:col-span-2">
          <MemoriesTimeline
            memories={dashboardMemories}
            totalMemoryCount={filteredMemories.length}
            memoryFilter={memoryFilter}
            onFilterChange={setMemoryFilter}
            onViewAll={() => setActiveMomentsView("all-memories")}
            openMemoryMenuId={openMemoryMenuId}
            onToggleMemoryMenu={(memoryId) =>
              setOpenMemoryMenuId((currentId) =>
                currentId === memoryId ? null : memoryId
              )
            }  
            onEditMemory={handleEditMemory}
            onDeleteMemory={handleDeleteMemory}  
          />
        </div>  

        <SmallWinsCard />

        {/* Row 2: Favorite quote + Reflections + Mood */}
        <FavoriteQuoteCard />
        <ReflectionsCard />
        <MoodSnapshotCard />

        {/* Row 3: Featured memory wide + Top themes */}
        <div className="xl:col-span-2">
          <FeaturedMemoryCard
            featuredMemory={featuredMemory}
            onUseLatest={handleUseLatestMemory}
            onRemove={() => setFeaturedMemory(null)}
            hasMemories={memories.length > 0}
          />
        </div>

        <TopThemesCard memories={memories} />
      </section>

      {isMemoryFormOpen && (
        <MemoryFormOverlay
          mode={editingMemory ? "edit" : "add"}
          initialMemory={editingMemory}
          onSave={handleSaveMemory}
          onCancel={() => {
            setEditingMemory(null)
            setIsMemoryFormOpen(false)
          }}
        />
      )}
    </div>
  )
}