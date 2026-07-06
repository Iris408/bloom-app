import { useMemo, useState } from "react"
import FeedbackForm from "../components/feedback/FeedbackForm"

function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  )
}


const faqGroups = [
  {
    label: "Getting started",
    items: [
      {
        question: "What is Bloom?",
        answer:
          "Bloom is a calm routines, focus, and progress app designed to help people build gentle structure without pressure, streaks, or shame.",
        mostAsked: true,
      },
      {
        question: "Do I need an account?",
        answer:
          "No. You can try Bloom using demo mode first. An account is only needed when you want to save your own routines, preferences, progress, and settings.",
        mostAsked: true,
      },
      {
        question: "What is demo mode?",
        answer:
          "Demo mode lets you explore Bloom with sample data. It is designed for testers, recruiters, and anyone who wants to look around before creating an account.",
        mostAsked: true,
      },
    ],
  },
  {
    label: "Privacy & data",
    items: [
      {
        question: "What data is saved?",
        answer:
          "In demo mode, Bloom uses sample data only. With an account, Bloom may save your routines, tasks, focus sessions, progress, accessibility settings, and theme choices.",
        mostAsked: true,
      },
      {
        question: "Is demo mode private?",
        answer:
          "Demo mode is for exploring Bloom with sample data only. Please do not enter private or personal information while using demo mode.",
        mostAsked: false,
      },
    ],
  },
  {
    label: "Accessibility & support",
    items: [
      {
        question: "What accessibility features does Bloom include?",
        answer:
          "Bloom includes text size options, dark mode, OpenDyslexic font support, reduced motion, calm colours, simple layouts, and low-pressure wording.",
        mostAsked: true,
      },
      {
        question: "What should I do if I need more support?",
        answer:
          "If you are struggling, please reach out to someone you trust, a professional, a local support service, or a crisis line. Emergency help is available if you are in immediate danger.",
        mostAsked: false,
      },
    ],
  },
  {
    label: "About Bloom",
    items: [
      {
        question: "How is Bloom different from a normal productivity app?",
        answer:
          "Bloom is designed around gentle structure instead of productivity pressure. It avoids streaks, shame-based progress, overwhelming dashboards, and harsh missed-day messaging.",
        mostAsked: false,
      },
      {
        question: "Is Bloom a mental health app?",
        answer:
          "No. Bloom supports gentle structure and reflection, but it is not a therapy app, crisis service, diagnostic tool, or medical product. It should sit alongside real support, not replace it.",
        mostAsked: true,
      },
      {
        question: "What features are coming soon?",
        answer:
          "Planned additions include full account persistence, improved onboarding, saved preferences, future calm themes, and a carefully designed education-focused demo later.",
        mostAsked: false,
      },
    ],
  },
]

function FAQPage({ setActivePage, onTryDemoClick }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showAllMobileFaq, setShowAllMobileFaq] = useState(false)
  const [openQuestion, setOpenQuestion] = useState("What is Bloom?")

  const allFaqItems = useMemo(
    () =>
      faqGroups.flatMap((group) =>
        group.items.map((item) => ({
          ...item,
          groupLabel: group.label,
          id: createSlug(item.question),
        })),
      ),
    [],
  )

  const filteredItems = useMemo(() => {
    const normalisedSearch = searchTerm.trim().toLowerCase()

    if (!normalisedSearch) {
      return allFaqItems
    }

    return allFaqItems.filter((item) => {
      const searchableText =
        `${item.groupLabel} ${item.question} ${item.answer}`.toLowerCase()

      return searchableText.includes(normalisedSearch)
    })
  }, [allFaqItems, searchTerm])

  const filteredGroups = useMemo(() => {
    const normalisedSearch = searchTerm.trim().toLowerCase()

    if (!normalisedSearch) {
      return faqGroups
    }

    return faqGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const searchableText =
            `${group.label} ${item.question} ${item.answer}`.toLowerCase()

          return searchableText.includes(normalisedSearch)
        }),
      }))
      .filter((group) => group.items.length > 0)
  }, [searchTerm])

  const hasNoMatches = searchTerm.trim() && filteredGroups.length === 0

  const demoModeQuestion = allFaqItems.find(
    (item) => item.question === "What is Bloom?",
  )

  const mobileVisibleItems =
    showAllMobileFaq || searchTerm.trim()
      ? filteredItems
      : demoModeQuestion
        ? [demoModeQuestion]
        : []

  function toggleQuestion(question) {
    setOpenQuestion((currentQuestion) =>
      currentQuestion === question ? null : question,
    )
  }

  return (
    <div className="relative min-h-screen w-full bg-transparent px-4 pb-16 pt-28 text-bloom-forest dark:text-bloom-light sm:px-6 sm:pt-32 lg:px-8">
      <main className="mx-auto w-full max-w-7xl">
        {/* FAQ HERO */}
        <section className="mb-8 overflow-hidden rounded-[2rem] border border-bloom-sage/25 bg-white/60 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-bloom-mid dark:text-bloom-sage">
                FAQ
              </p>

              <h1 className="max-w-3xl text-3xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-4xl lg:text-5xl">
                Common questions about Bloom.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-bloom-forest/65 dark:text-gray-300 sm:text-base">
                What Bloom is, how demo mode works, what accounts are for,
                what data may be saved, and what Bloom is not designed to
                replace.
              </p>

              {/* Desktop category links */}
              <div className="mt-6 hidden flex-wrap gap-2 md:flex">
                {faqGroups.map((group) => (
                  <a
                    key={group.label}
                    href={`#faq-${createSlug(group.label)}`}
                    className="rounded-full border border-bloom-sage/30 bg-bloom-light/60 px-3 py-1.5 text-xs font-semibold text-bloom-forest/75 transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
                  >
                    {group.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden justify-center lg:flex">
              <div className="flex h-44 w-44 items-center justify-center rounded-full border border-bloom-sage/20 bg-bloom-light/60 text-6xl shadow-sm dark:border-white/10 dark:bg-white/5">
                ᭄᭡
              </div>
            </div>
          </div>
        </section>

        {/* MOBILE SEARCH + COMPACT FAQ */}
        <section className="mb-10 md:hidden">
          <div className="rounded-[1.5rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
                  Most asked
                </p>

                <p className="mt-1 text-sm text-bloom-forest/60 dark:text-gray-300">
                  Start with the most common question.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsSearchOpen((current) => !current)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bloom-sage/25 bg-white/70 text-bloom-forest shadow-sm transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
                aria-label={isSearchOpen ? "Close FAQ search" : "Search FAQ"}
              >
                <span
                  aria-hidden="true"
                  className={`grid h-5 w-5 place-items-center leading-none ${
                    isSearchOpen ? "text-[18px] font-bold" : "text-3xl"
                  }`}
                >
                  {isSearchOpen ? "𝒙" : <SearchIcon />}
                </span>
              </button>
            </div>

            {isSearchOpen && (
              <div className="mt-4">
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder='Try searching "demo mode" or "account"'
                  className="w-full rounded-2xl border border-bloom-sage/25 bg-white/80 px-4 py-3 text-sm text-bloom-forest outline-none transition placeholder:text-bloom-forest/40 focus:border-bloom-mid focus:ring-4 focus:ring-bloom-mid/15 dark:border-white/10 dark:bg-white/5 dark:text-bloom-light dark:placeholder:text-gray-400"
                />
              </div>
            )}

            <div className="mt-5 grid gap-3">
              {mobileVisibleItems.length > 0 ? (
                mobileVisibleItems.map((item) => {
                  const isOpen = openQuestion === item.question

                  return (
                    <article
                      key={item.question}
                      className="rounded-2xl border border-bloom-sage/20 bg-white/65 dark:border-white/10 dark:bg-white/5"
                    >
                      <button
                        type="button"
                        onClick={() => toggleQuestion(item.question)}
                        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                      >
                        <span className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
                          {item.question}
                        </span>

                        <span className="text-lg text-bloom-forest/60 dark:text-gray-300">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <p className="border-t border-bloom-sage/15 px-4 py-4 text-sm leading-7 text-bloom-forest/65 dark:border-white/10 dark:text-gray-300">
                          {item.answer}
                        </p>
                      )}
                    </article>
                  )
                })
              ) : null}
            </div>

            {!searchTerm.trim() && (
              <button
                type="button"
                onClick={() => setShowAllMobileFaq((current) => !current)}
                className="mt-5 text-sm font-bold text-bloom-mid underline-offset-4 hover:underline dark:text-bloom-sage"
              >
                {showAllMobileFaq ? "Show less" : "View all FAQ"}
              </button>
            )}
          </div>
        </section>

        {/* DESKTOP SEARCH */}
        <section className="mb-10 hidden rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 md:block">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
              Search questions
            </span>

            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-3xl text-bloom-forest/45 dark:text-gray-400"
              >
                ⌕
              </span>

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder='Not sure what to type? Try "demo", "account", or "support"'
                className="w-full rounded-2xl border border-bloom-sage/25 bg-white/75 px-4 py-3 pl-11 text-sm text-bloom-forest outline-none transition placeholder:text-bloom-forest/40 focus:border-bloom-mid focus:ring-4 focus:ring-bloom-mid/15 dark:border-white/10 dark:bg-white/5 dark:text-bloom-light dark:placeholder:text-gray-400"
              />
            </div>
          </label>

          {hasNoMatches && (
            <div className="mx-auto mt-6 max-w-md rounded-[1.5rem] border border-bloom-sage/25 bg-white/70 p-6 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-bloom-light/70 text-3xl dark:bg-white/10">
                🌱
              </div>

              <p className="text-base font-bold text-bloom-forest dark:text-bloom-light">
                No matches for “{searchTerm.trim()}”
              </p>

              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-bloom-forest/60 dark:text-gray-300">
                Try a simpler word, or send us your question directly.
              </p>

              <button
                type="button"
                onClick={() => setActivePage?.("feedback")}
                className="mt-5 rounded-full bg-bloom-forest px-5 py-2.5 text-sm font-bold text-bloom-light shadow-sm transition hover:bg-bloom-mid dark:bg-bloom-mint dark:text-bloom-forest dark:hover:bg-bloom-light"
              >
                Send feedback
              </button>
            </div>
          )}
        </section>

        {/* CLOSING CTA */}
        <section className="mt-12 rounded-[2rem] border border-bloom-sage/25 bg-white/60 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-bloom-mid dark:text-bloom-sage">
                Still have a question?
              </p>

              <p className="max-w-md text-sm leading-6 text-bloom-forest/65 dark:text-gray-300">
                Use the feedback form and we will get back to you. You can also
                explore Bloom in demo mode without creating an account.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setActivePage?.("feedback")}
                className="rounded-full bg-bloom-forest px-5 py-2.5 text-sm font-bold text-bloom-light shadow-sm transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest dark:hover:bg-bloom-mint/50"
              >
                Send feedback
              </button>

              <button
                type="button"
                onClick={onTryDemoClick}
                className="rounded-full border border-bloom-sage/30 bg-white/70 px-5 py-2.5 text-sm font-bold text-bloom-forest/80 shadow-sm transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/25"
              >
                Try demo
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default FAQPage