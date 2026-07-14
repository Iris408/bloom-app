const roadmapSections = [
  {
    title: "Current beta",
    status: "Available now",
    tone: "current",
    description: "Features available in the current public beta.",
    items: [
      "Calm public landing page",
      "Demo mode without an account",
      "Routines, focus, progress, moments, and profile areas",
      "Text size, OpenDyslexic, and dark mode controls",
      "Gentle support and recovery-friendly wording",
      "Separate FAQ, Roadmap, and Feedback pages",
    ],
  },
  {
    title: "Next patch",
    status: "Up next",
    tone: "next",
    description: "Small improvements based on early beta feedback.",
    items: [
      "Reduce landing-page text",
      "Add clearer demo onboarding",
      "Improve first-time navigation",
      "Label unfinished settings as preview or coming soon",
      "Continue mobile and accessibility testing",
    ],
  },
  {
    title: "v2.0.0 focus",
    status: "In development",
    tone: "development",
    description: "The next major technical stage for Bloom.",
    items: [
      "Backend authentication connection",
      "Protected account pages",
      "Saved profiles and preferences",
      "Persistent routines, tasks, and progress",
      "Clear separation between demo and account data",
    ],
  },
  {
    title: "Planned features",
    status: "Planned",
    tone: "planned",
    description: "Features planned after the main account system is stable.",
    items: [
      "Improved onboarding flow",
      "Saved accessibility preferences",
      "More demo setup options",
      "Routine and progress improvements",
      "Feedback review workflow",
      "Theme system foundation",
    ],
  },
  {
    title: "Long-term ideas",
    status: "Exploring",
    tone: "future",
    description: "Ideas that need more research, testing, or safeguarding work.",
    items: [
      "Optional calm themes",
      "Data export",
      "More personalisation controls",
      "Gentle reminders",
      "Education or carer-focused versions",
    ],
  },
]

const toneClasses = {
  current:
    "bg-bloom-forest text-bloom-light dark:bg-bloom-light dark:text-bloom-forest",
  next:
    "bg-[#f7df9e]/80 text-[#725410] dark:bg-[#f7df9e]/20 dark:text-[#f7df9e]",
  development:
    "bg-bloom-mint/50 text-bloom-forest dark:bg-white/10 dark:text-bloom-light",
  planned:
    "bg-bloom-light text-bloom-forest dark:bg-white/10 dark:text-bloom-light",
  future:
    "bg-white/70 text-bloom-forest/70 dark:bg-white/10 dark:text-gray-300",
}

function RoadmapPage() {
  return (
    <div className="relative min-h-screen w-full bg-transparent px-4 pb-16 pt-28 text-bloom-forest dark:text-bloom-light sm:px-6 sm:pt-32 lg:px-8">
      <main className="mx-auto w-full max-w-5xl">
        {/* EN: Roadmap introduction */}
        {/* JP: ロードマップ紹介 */}
        <section className="mb-8 rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-bloom-mid dark:text-bloom-sage">
            Roadmap
          </p>

          <h1 className="text-3xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-4xl">
            What is growing next in Bloom.
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-bloom-forest/65 dark:text-gray-300 sm:text-base">
            Bloom is developed in small, tested stages. Priorities may change
            as beta feedback is reviewed.
          </p>
        </section>

        {/* EN: Roadmap stages */}
        {/* JP: ロードマップの段階 */}
        <section className="grid gap-5">
          {roadmapSections.map((section, index) => (
            <article
              key={section.title}
              className="rounded-[1.5rem] border border-bloom-sage/25 bg-white/65 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
                    Phase {index + 1}
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-bloom-forest dark:text-bloom-light">
                    {section.title}
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-bloom-forest/60 dark:text-gray-300">
                    {section.description}
                  </p>
                </div>

                <span
                  className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-bold ${toneClasses[section.tone]}`}
                >
                  {section.status}
                </span>
              </div>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-2xl bg-bloom-light/55 px-4 py-3 text-sm leading-6 text-bloom-forest/70 dark:bg-white/5 dark:text-gray-300"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-bloom-mid dark:bg-bloom-sage" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-bloom-sage/25 bg-white/45 p-5 text-sm leading-7 text-bloom-forest/70 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
          <p>
            The roadmap is flexible. Features may move as testing, accessibility
            feedback, and technical requirements change.
          </p>
        </section>
      </main>
    </div>
  )
}

export default RoadmapPage