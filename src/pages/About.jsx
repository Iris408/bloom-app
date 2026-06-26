import Seedling from "../components/ui/Seedling"

function ValueCard({ title, text }) {
  return (
    <article className="rounded-3xl border border-bloom-sage/25 bg-white/65 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
      <h3 className="text-lg font-bold text-bloom-forest dark:text-bloom-light">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-bloom-forest/75 dark:text-gray-300">
        {text}
      </p>
    </article>
  )
}

function About() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 pt-8 text-bloom-forest dark:text-bloom-light sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 md:p-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl">
            <Seedling variant="indigo" />
          </span>

          <p className="text-sm font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
            About Bloom
          </p>
        </div>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-bloom-forest dark:text-bloom-light md:text-5xl">
          Bloom is being built as a calmer way to support routines, focus, and
          daily progress.
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-bloom-forest/75 dark:text-gray-300">
          Bloom is a gentle routine and focus app designed for people who want
          structure without pressure. It is built around small steps, supportive
          language, accessibility, and the idea that progress should feel kind,
          not punishing.
        </p>
      </section>

      {/* Why Bloom exists */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
            Why Bloom exists
          </p>

          <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
            Many productivity tools are built around pressure. Bloom is being
            built around support.
          </h2>
        </div>

        <div className="space-y-4 text-sm leading-7 text-bloom-forest/75 dark:text-gray-300">
          <p>
            Traditional productivity apps often focus on streaks, urgency,
            packed schedules, and constant completion. For many people, that can
            make daily life feel heavier instead of easier.
          </p>

          <p>
            Bloom takes a softer approach. It helps users build routines, focus
            sessions, and small daily steps while leaving room for rest,
            recovery, missed days, and real life.
          </p>

          <p>
            The goal is not to make people do more at all costs. The goal is to
            help people feel more supported, more organised, and able to
            begin or continue gently, without any pressure.
          </p>
        </div>
      </section>

      {/* Personal journey / company note */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Founder / Developer note
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          Bloom is also part of a learning journey.
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-7 text-bloom-forest/75 dark:text-gray-300">
          <p>
            Bloom is being designed and built as a personal, portfolio-ready app
            while developing stronger full-stack engineering skills. The project
            combines frontend design, accessibility thinking, product planning,
            and future backend work into one focused product.
          </p>

          <p>
            The app is intentionally being built in stages. The current focus is
            creating a clear, calm, and useful frontend experience that can be
            tested by real users before adding heavier account, data, and
            education-focused features.
          </p>

          <p>
            This means Bloom is both a product idea and an engineering project:
            a place to practise building carefully, documenting decisions, and
            turning feedback into better user experience.
          </p>
        </div>
      </section>

      {/* Values */}
      <section>
        <div className="mb-6 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
            Design values
          </p>

          <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
            What Bloom is designed to protect
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ValueCard
            title="Calm before complexity"
            text="Bloom should feel easy to enter, easy to understand, and gentle to use. Features should support the user without making the app feel crowded or overwhelming."
          />

          <ValueCard
            title="Progress without punishment"
            text="Missed days, unfinished tasks, and low-energy moments should not feel like failure. Bloom's future recovery features will focus on restarting gently."
          />

          <ValueCard
            title="Accessibility as a foundation"
            text="Text size, font choices, reduced motion, dark mode, calm colours, and clear layouts are part of the product identity, not optional extras."
          />

          <ValueCard
            title="Built carefully with trust"
            text="Demo mode uses sample data, and future account features should be built with privacy, consent, security, and user control in mind."
          />
        </div>
      </section>

      {/* Current beta status */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-bloom-light/60 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Current status
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          Bloom is currently in beta/frontend polish.
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-4 text-sm leading-7 text-bloom-forest/75 dark:text-gray-300 md:grid-cols-2">
          <p>
            The current version focuses on the public landing page, demo mode,
            daily routines, focus support, progress/moments, accessibility
            controls, and a calm app layout.
          </p>

          <p>
            Full account creation, saved user data, deeper onboarding, and
            education-focused features are planned for later versions after the
            core experience has been tested and refined.
          </p>
        </div>
      </section>

      {/* Future direction */}
      <section>
        <div className="mb-6 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
            Future direction
          </p>

          <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
            Bloom will grow carefully.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ValueCard
            title="v2.0.0"
            text="Authentication, protected pages, account-based structure, improved onboarding, and stronger demo-to-account flow."
          />

          <ValueCard
            title="v2.1+"
            text="Deeper preferences, profile/settings polish, colour packages, accessibility improvements, and feedback-driven UX updates."
          />

          <ValueCard
            title="v3.0+"
            text="Gentle restart, missed-day recovery, low-demand mode, and future education/demo concepts built with privacy and safeguarding in mind."
          />
        </div>
      </section>
    </div>
  )
}

export default About