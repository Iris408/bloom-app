const roadmapSections = [
  {
    title: "Current beta",
    items: [
      "Calm public landing page",
      "Demo mode for trying Bloom without an account",
      "Routines, focus, progress, moments, and profile areas",
      "Accessibility controls including text size and OpenDyslexic support",
      "Gentle support wording and recovery-friendly design",
    ],
  },
  {
    title: "Next patch",
    items: [
      "Move FAQ, Roadmap, and Feedback into separate public pages",
      "Improve landing page readability",
      "Polish footer navigation",
      "Refine beta feedback collection",
      "Continue mobile, dark mode, and accessibility checks",
    ],
  },
  {
    title: "v2.0.0 focus",
    items: [
      "Public landing page",
      "Login, create account, and demo paths",
      "Protected app pages",
      "Backend authentication connection",
      "Saved user profile and preferences",
      "Clear demo versus real account separation",
    ],
  },
  {
    title: "Planned features",
    items: [
      "Improved onboarding flow",
      "Saved accessibility preferences",
      "More demo setup options",
      "Progress and routine improvements",
      "Feedback review workflow",
      "Theme system foundation",
    ],
  },
  {
    title: "Long-term ideas",
    items: [
      "Calm optional themes such as Chamomile & Oat, Twilight Slate, and Terracotta Dust",
      "Data export options",
      "More personalisation controls",
      "Gentle reminders",
      "Education or carer-focused versions only after careful privacy and safeguarding review",
    ],
  },
]

function RoadmapPage() {
  return (
    <div className="relative min-h-screen w-full bg-transparent px-4 pb-16 pt-28 text-bloom-forest dark:text-bloom-light sm:px-6 sm:pt-32 lg:px-8">
      <main className="mx-auto w-full max-w-5xl">
        <section className="mb-8 rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-bloom-mid dark:text-bloom-sage">
            Roadmap
          </p>

          <h1 className="text-3xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-4xl">
            What is growing next in Bloom.
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-bloom-forest/65 dark:text-gray-300 sm:text-base">
            Bloom is being developed carefully in small, tested steps. The goal
            is to keep the app calm, accessible, and useful without rushing too
            many features at once.
          </p>
        </section>

        <section className="grid gap-5">
          {roadmapSections.map((section) => (
            <article
              key={section.title}
              className="rounded-[1.5rem] border border-bloom-sage/25 bg-white/65 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-6"
            >
              <h2 className="text-xl font-bold text-bloom-forest dark:text-bloom-light">
                {section.title}
              </h2>

              <ul className="mt-4 grid gap-3">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-7 text-bloom-forest/65 dark:text-gray-300"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-bloom-mid dark:bg-bloom-sage" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default RoadmapPage