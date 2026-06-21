function Accessibility() {
  return (
    <main className="min-h-screen p-6 lg:p-10">
      <section className="mx-auto max-w-4xl rounded-3xl border border-bloom-sage bg-white p-8 shadow dark:border-bloom-mint dark:bg-dark-surface">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-bloom-mid">
          Accessibility
        </p>

        <h1 className="mb-4 text-4xl font-bold text-bloom-forest dark:text-bloom-light">
          Designed to feel calm and readable
        </h1>

        <div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-300">
          <p>
            Bloom is being designed with accessibility and neurodivergent-friendly
            usability in mind. The goal is to make routines, focus, and small
            tasks feel easier to follow.
          </p>

          <p>
            Current accessibility features include calm colours, simple layouts,
            dark mode, text-size options, OpenDyslexic font support, mobile-safe
            layouts, and gentle low-pressure wording.
          </p>

          <p>
            Accessibility will continue improving as Bloom receives more feedback
            from real users and beta testers.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Accessibility;