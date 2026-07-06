const faqItems = [
  {
    question: "What is Bloom?",
    answer:
      "Bloom is a calm routines, focus, and progress app designed to help people build gentle structure without pressure, streaks, or shame.",
  },
  {
    question: "How is Bloom different from a normal productivity app?",
    answer:
      "Bloom is designed around gentle structure instead of productivity pressure. It avoids streaks, shame-based progress, and overwhelming dashboards. The focus is on small steps, calm routines, accessible controls, and returning kindly after missed days.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. You can try Bloom using demo mode first. An account is only needed when you want to save your own routines, preferences, progress, and settings.",
  },
  {
    question: "What is demo mode?",
    answer:
      "Demo mode lets you explore Bloom with sample data. It is designed for testers, recruiters, and anyone who wants to look around before creating an account.",
  },
  {
    question: "Is Bloom a mental health app?",
    answer:
      "Bloom is not a therapy app, crisis service, diagnostic tool, or medical product. It can support gentle structure and reflection, but it should not replace professional, crisis, or emergency support.",
  },
  {
    question: "What should I do if I need more support?",
    answer:
      "If you are struggling, it is okay to reach out to someone you trust, a professional, a local support service, a crisis line, or emergency help if you are in immediate danger. Bloom is designed to sit alongside real support, not replace it.",
  },
  {
    question: "What data is saved?",
    answer:
      "In demo mode, Bloom uses sample data. With an account, Bloom may save your routines, tasks, focus sessions, progress, profile preferences, accessibility settings, and theme choices.",
  },
  {
    question: "Is demo mode private?",
    answer:
      "Demo mode is designed for exploring Bloom with sample data only. It should not be used for private personal information. Personal Bloom data is only intended to be saved when you create and use an account.",
  },
  {
    question: "What accessibility features does Bloom include?",
    answer:
      "Bloom includes comfort-focused controls such as text size options, dark mode, OpenDyslexic font support, calm colours, simple layouts, and low-pressure wording.",
  },
  {
    question: "What features are coming soon?",
    answer:
      "Planned features include stronger account support, saved preferences, more onboarding choices, improved demo flows, feedback review, and future calm themes.",
  },
]

function FAQPage() {
  return (
    <div className="relative min-h-screen w-full bg-transparent px-4 pb-16 pt-28 text-bloom-forest dark:text-bloom-light sm:px-6 sm:pt-32 lg:px-8">
      <main className="mx-auto w-full max-w-5xl">
        <section className="mb-8 rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-bloom-mid dark:text-bloom-sage">
            FAQ
          </p>

          <h1 className="text-3xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-4xl">
            Common questions about Bloom.
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-bloom-forest/65 dark:text-gray-300 sm:text-base">
            A simple place to explain what Bloom is, how demo mode works, what
            accounts are for, and what Bloom is not designed to replace.
          </p>
        </section>

        <section className="grid gap-4">
          {faqItems.map((item) => (
            <article
              key={item.question}
              className="rounded-[1.5rem] border border-bloom-sage/25 bg-white/65 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-6"
            >
              <h2 className="text-lg font-bold text-bloom-forest dark:text-bloom-light">
                {item.question}
              </h2>

              <p className="mt-3 text-sm leading-7 text-bloom-forest/65 dark:text-gray-300">
                {item.answer}
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default FAQPage