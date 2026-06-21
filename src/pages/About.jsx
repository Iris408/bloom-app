function About() {
  return (
    <main className="min-h-screen p-6 lg:p-10">
      <section className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-3xl bg-bloom-light p-8 shadow-lg dark:bg-bloom-mid/35">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-bloom-mid">
            About Bloom
          </p>

          <h1 className="mb-4 text-4xl font-bold text-bloom-forest dark:text-bloom-light">
            Built for calm routines, small steps, and less overwhelm.
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-bloom-navy dark:text-gray-300">
            Bloom is a calm routine, focus, and task support app designed to help
            people organise their day in a softer, more supportive way.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-3xl border border-bloom-sage bg-white p-6 shadow dark:border-bloom-mint dark:bg-dark-surface">
            <h2 className="mb-3 text-2xl font-bold text-bloom-forest dark:text-bloom-light">
              Why Bloom exists
            </h2>

            <p className="leading-relaxed text-gray-600 dark:text-gray-300">
              Many productivity tools can feel fast, strict, or overwhelming.
              Bloom is being designed around gentle structure, clear routines,
              and progress without pressure.
            </p>
          </section>

          <section className="rounded-3xl border border-bloom-sage bg-white p-6 shadow dark:border-bloom-mint dark:bg-dark-surface">
            <h2 className="mb-3 text-2xl font-bold text-bloom-forest dark:text-bloom-light">
              Who it is for
            </h2>

            <p className="leading-relaxed text-gray-600 dark:text-gray-300">
              Bloom is especially inspired by neurodivergent-friendly design,
              but it can support anyone who wants calmer task planning, focus
              time, and step-by-step routines.
            </p>
          </section>
        </div>

        <section className="rounded-3xl border border-bloom-sage bg-white p-6 shadow dark:border-bloom-mint dark:bg-dark-surface">
          <h2 className="mb-3 text-2xl font-bold text-bloom-forest dark:text-bloom-light">
            Current beta focus
          </h2>

          <p className="leading-relaxed text-gray-600 dark:text-gray-300">
            Bloom is currently in an early beta stage. The main focus is testing
            the core experience: layout clarity, accessibility, calm wording,
            routines, focus support, and small task management.
          </p>
        </section>
      </section>
    </main>
  );
}

export default About;