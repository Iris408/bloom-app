import { useMemo, useState } from "react"

const HERO_IMAGE = "/illustrations/bloom-memories-ii.png"
const QUOTE_IMAGE = "/illustrations/bloom-memories-quote.png"
const JOURNAL_IMAGE = "/illustrations/bloom-memories-journal.png"

function MomentsIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s-6.5-4.35-9-8.15C1.05 9.95 2.7 6 6.6 6c2.14 0 3.3 1.1 4.1 2.3.8-1.2 1.96-2.3 4.1-2.3C18.7 6 20.35 9.95 21 12.85 18.5 16.65 12 21 12 21z" />
    </svg>
  )
}

function SectionIcon() {
  return <span className="text-lg text-bloom-forest/70 dark:text-bloom-sage">🌿</span>
}

function MemoryHeroIllustration() {
  return (
    <div className="hidden h-[320px] overflow-hidden rounded-[1.75rem] border border-bloom-sage/20 bg-bloom-light/70 shadow-sm dark:border-white/10 dark:bg-white/10 lg:block">
      <img
        src={HERO_IMAGE}
        alt="A calm Bloom memories illustration with a coffee cup, journal, flowers, and a reflective quote."
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
          <div className="flex items-center gap-2">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-bloom-mid dark:text-bloom-sage">
              Bloom reminder
            </p>
          </div>

          <h3 className="mt-2 text-lg font-bold leading-snug text-bloom-forest dark:text-bloom-light">
            You are allowed to remember the good.
          </h3>

          <p className="mt-1 text-xs leading-5 text-bloom-forest/60 dark:text-gray-300">
            Hold on to it. You deserve it.
          </p>
        </div>

        <div className="mt-1 flex items-center justify-between gap-4">
          <div className="pointer-events-none text-3xl text-bloom-forest opacity-80">
            𖥸
          </div>
        </div>  
      </div>
    </section>
  )
}

function MemoryStatCard({ title, value, label, image, action }) {
  return (
    <article className="rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SectionIcon />

          <h3 className="text-lg font-bold text-bloom-forest dark:text-bloom-light">
            {title}
          </h3>
        </div>

        <span className="text-xs font-bold text-bloom-forest/50 dark:text-gray-400">
          This week
        </span>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-5xl font-bold leading-none text-bloom-forest dark:text-bloom-light">
            {value}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-bloom-forest/65 dark:text-gray-300">
            {label}
          </p>
        </div>

        {image ? (
          <img
            src={image}
            alt=""
            className="h-24 w-24 rounded-2xl object-cover opacity-90"
          />
        ) : (
          <div className="text-5xl opacity-80">🌿</div>
        )}
      </div>

      <button
        type="button"
        className="mt-6 text-sm font-bold text-bloom-forest/70 transition hover:text-bloom-forest dark:text-gray-300 dark:hover:text-bloom-light"
      >
        {action} →
      </button>
    </article>
  )
}

function MemoriesTimeline({
  memories,
  totalMemoryCount,
  memoryFilter,
  onFilterChange,
  onViewAll,
}) {
  const hasMemories = memories.length > 0

  return (
    <section className="flex min-h-[720px] flex-col rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-6">
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
          <option value="all">All memories</option>
          <option value="grateful">Grateful</option>
          <option value="reset">Reset</option>
          <option value="accomplished">Accomplished</option>
          <option value="reflective">Reflective</option>
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

                    <button
                      type="button"
                      aria-label="Memory options"
                      className="text-xl font-bold text-bloom-forest/45 transition hover:text-bloom-forest dark:text-gray-400 dark:hover:text-bloom-light"
                    >
                      …
                    </button>
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
              Try another filter, or add a small moment when you are ready.
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

function FavoriteQuoteCard() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-2xl text-bloom-forest/70">❞</span>

          <h3 className="text-xl font-bold text-bloom-forest dark:text-bloom-light">
            Favorite quote
          </h3>
        </div>

        <p className="max-w-md text-lg leading-relaxed text-bloom-forest/75 dark:text-gray-200">
          “The little things? The little things are everything.”
        </p>

        <p className="mt-2 text-sm font-semibold text-bloom-forest/50 dark:text-gray-400">
          — Jon Kabat-Zinn
        </p>
      </div>

      <img
        src={QUOTE_IMAGE}
        alt=""
        className="pointer-events-none absolute bottom-2 right-3 h-28 w-32 rounded-2xl object-cover opacity-75"
      />
    </section>
  )
}

function FeaturedMemoryCard({ featuredMemory, onUseLatest, onRemove }) {
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
        <div className="grid gap-4 lg:grid-cols-[minmax(220px,0.9fr)_minmax(0,1fr)]">
          <img
            src={featuredMemory.image}
            alt=""
            className="h-full min-h-[190px] w-full rounded-[1.4rem] object-cover"
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
            className="mt-5 rounded-full bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light shadow-sm transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest"
          >
            Use latest memory
          </button>
        </div>
      )}
    </section>
  )
}

function BloomMemoryReminder() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-orange-100 bg-orange-50/60 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">

            <h3 className="text-lg font-bold text-bloom-forest dark:text-bloom-light">
              Bloom reminder
            </h3>
          </div>

          <span className="text-xl font-bold text-bloom-forest/50">…</span>
        </div>

        <h4 className="max-w-[220px] text-2xl font-bold leading-snug text-bloom-forest dark:text-bloom-light">
          You are allowed to remember the good.
        </h4>

        <p className="mt-4 text-sm leading-relaxed text-bloom-forest/60 dark:text-gray-300">
          Hold on to it. You deserve it.
        </p>
      </div>
    </section>
  )
}

function MoodSnapshotCard() {
  const [selectedMood, setSelectedMood] = useState(4)

  const moods = [
    { id: 1, label: "Hard", icon: "☹" },
    { id: 2, label: "Low", icon: "☹" },
    { id: 3, label: "Okay", icon: "😐" },
    { id: 4, label: "Good", icon: "🙂" },
    { id: 5, label: "Bright", icon: "☺" },
  ]

  return (
    <section className="rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="mb-5 flex items-center justify-between gap-3 text-left">
        <h3 className="text-xl font-bold text-bloom-forest dark:text-bloom-light">
          Mood snapshot
        </h3>

        <span className="text-xs font-bold text-bloom-forest/50 dark:text-gray-400">
          This week
        </span>
      </div>

      <p className="text-sm font-bold text-bloom-forest/70 dark:text-gray-300">
        How have you been feeling?
      </p>

      <div className="mt-5 flex justify-center gap-3">
        {moods.map((mood) => {
          const isSelected = selectedMood === mood.id

          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => setSelectedMood(mood.id)}
              aria-label={mood.label}
              className={`flex h-11 w-11 items-center justify-center rounded-full text-xl transition ${
                isSelected
                  ? "bg-bloom-forest text-white shadow-sm dark:bg-bloom-sage dark:text-bloom-forest"
                  : "bg-bloom-light/70 text-bloom-forest/35 hover:text-bloom-forest dark:bg-white/10 dark:text-gray-400"
              }`}
            >
              {mood.icon}
            </button>
          )
        })}
      </div>

      <p className="mt-6 text-sm font-semibold text-bloom-forest/60 dark:text-gray-300">
        More good days. Keep going.
      </p>

      <p className="mt-3 text-xl">🌿</p>
    </section>
  )
}

function TopThemesCard() {
  const themes = [
    { id: "peace", icon: "◷", label: "Peace", value: 6, width: "86%", color: "bg-bloom-forest" },
    { id: "growth", icon: "🌿", label: "Growth", value: 4, width: "62%", color: "bg-orange-300" },
    { id: "connection", icon: "✿", label: "Connection", value: 3, width: "48%", color: "bg-orange-300" },
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
          <div key={theme.id} className="grid grid-cols-[36px_1fr_90px_24px] items-center gap-3">
            <span className="text-xl text-bloom-forest/70">{theme.icon}</span>

            <span className="text-sm font-bold text-bloom-forest/75 dark:text-gray-200">
              {theme.label}
            </span>

            <div className="h-2 overflow-hidden rounded-full bg-bloom-light dark:bg-white/10">
              <div className={`h-full rounded-full ${theme.color}`} style={{ width: theme.width }} />
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

function AllMemoriesView({ memories, onBack }) {
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
      </section>

      {memories.length === 0 ? (
        <section className="rounded-[1.75rem] border border-dashed border-bloom-sage/35 bg-white/50 p-8 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-4xl">🌿</p>

          <h3 className="mt-3 text-xl font-bold text-bloom-forest dark:text-bloom-light">
            No memories yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-bloom-forest/60 dark:text-gray-300">
            There are no memories for this filter yet. Go back to Moments and choose
            another filter, or add a new memory later.
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

export default function Moments() {
  const memories = useMemo(
    () => [
      {
        id: 1,
        date: "Today",
        title: "Morning sunlight and a quiet cup of tea",
        description: "A soft start before the day became busy.",
        image: HERO_IMAGE,
        tag: "Grateful",
        tagClass: "bg-orange-100 text-orange-600 dark:bg-orange-300/15 dark:text-orange-200",
      },
      {
        id: 2,
        date: "Yesterday",
        title: "A slow walk that cleared my head",
        description: "Fresh air helped me come back to myself.",
        image: JOURNAL_IMAGE,
        tag: "Reset",
        tagClass: "bg-bloom-light text-bloom-forest/70 dark:bg-white/10 dark:text-gray-300",
      },
      {
        id: 3,
        date: "May 10",
        title: "Completed a task I’d been putting off",
        description: "A small win that felt bigger than expected.",
        image: QUOTE_IMAGE,
        tag: "Accomplished",
        tagClass: "bg-bloom-light text-bloom-forest/70 dark:bg-white/10 dark:text-gray-300",
      },
      {
        id: 4,
        date: "May 8",
        title: "Wrote down what I’m proud of",
        description: "A quiet moment of reflection.",
        image: JOURNAL_IMAGE,
        tag: "Reflective",
        tagClass: "bg-orange-100 text-orange-600 dark:bg-orange-300/15 dark:text-orange-200",
      },
    ],
    []
  )

  const [featuredMemory, setFeaturedMemory] = useState({
    title: "A page just for me",
    date: "May 6, 2025",
    description:
      "Took time to write, breathe, and be present with my thoughts. It felt like coming home.",
    image: JOURNAL_IMAGE,
  })

  const [activeMomentsView, setActiveMomentsView] = useState("dashboard")
  const [memoryFilter, setMemoryFilter] = useState("all")

  const filteredMemories = useMemo(() => {
    if (memoryFilter === "all") return memories

    return memories.filter((memory) => {
      return memory.tag.toLowerCase() === memoryFilter
    })
  }, [memories, memoryFilter])

  const dashboardMemories = useMemo(() => {
    return filteredMemories.slice(0, 3)
  }, [filteredMemories])

  function handleUseLatestMemory() {
    const latestMemory = memories[0]

    setFeaturedMemory({
      title: latestMemory.title,
      date: latestMemory.date,
      description: latestMemory.description,
      image: latestMemory.image,
    })
  }

  if (activeMomentsView === "all-memories") {
    return (
      <AllMemoriesView
        memories={filteredMemories}
        onBack={() => setActiveMomentsView("dashboard")}
      />
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 overflow-x-hidden pb-28 sm:gap-7 sm:pb-0">
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
                className="rounded-full bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light shadow-sm transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest"
              >
                ꕤ Add a memory
              </button>

              <button
                type="button"
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
      <section className="grid gap-6 xl:grid-cols-[minmax(420px,1fr)_minmax(0,1fr)_300px]">
        {/* Left column */}
        <div className="flex min-w-0 flex-col gap-6">
          <MemoriesTimeline
            memories={dashboardMemories}
            totalMemoryCount={filteredMemories.length}
            memoryFilter={memoryFilter}
            onFilterChange={setMemoryFilter}
            onViewAll={() => setActiveMomentsView("all-memories")}
          />
          <FavoriteQuoteCard />
        </div>

        {/* Middle column */}
        <div className="flex min-w-0 flex-col gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <MemoryStatCard
              title="Reflections"
              value="4"
              label="Moments reflected on"
              action="See all reflections"
            />

            <MemoryStatCard
              title="Small wins"
              value="5"
              label="Small wins celebrated"
              action="View all wins"
            />
          </div>

          <FeaturedMemoryCard
            featuredMemory={featuredMemory}
            onUseLatest={handleUseLatestMemory}
            onRemove={() => setFeaturedMemory(null)}
          />

          <FavoriteQuoteCard />
        </div>

        {/* Right column */}
        <div className="flex min-w-0 flex-col gap-6">
          <MoodSnapshotCard />
          <TopThemesCard />
        </div>
      </section>
    </div>
  )
}