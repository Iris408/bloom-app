import Seedling from "../components/ui/Seedling"

function AccessibilityCard({ title, children }) {
  return (
    <article className="rounded-3xl border border-bloom-sage/25 bg-white/65 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
      <h3 className="text-lg font-bold text-bloom-forest dark:text-bloom-light">
        {title}
      </h3>

      <div className="mt-3 text-sm leading-7 text-bloom-forest/75 dark:text-gray-300">
        {children}
      </div>
    </article>
  )
}

function StatusBadge({ children }) {
  return (
    <span className="rounded-full bg-bloom-mint/35 px-3 py-1 text-xs font-bold text-bloom-forest dark:bg-white/10 dark:text-bloom-light">
      {children}
    </span>
  )
}

function Accessibility() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 pt-8 text-bloom-forest dark:text-bloom-light sm:px-6 lg:px-8 pt-28 sm:pt-32">
      {/* Hero */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl">
            <Seedling variant="indigo" />
          </span>

          <p className="text-sm font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
            Accessibility
          </p>
        </div>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-bloom-forest dark:text-bloom-light md:text-5xl">
          Bloom is designed to feel calm, readable, and supportive for different
          minds and different days.
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-bloom-forest/75 dark:text-gray-300">
          Accessibility is part of Bloom’s product identity. The app is being
          built with clear layouts, gentle colours, readable text, calm motion,
          and neurodivergent-friendly design choices in mind.
        </p>
      </section>

      {/* Current accessibility status */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-bloom-light/60 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Current accessibility status
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          Bloom already includes several accessibility-focused controls.
        </h2>

        <div className="mt-5 flex flex-wrap gap-2">
          <StatusBadge>Text size controls</StatusBadge>
          <StatusBadge>OpenDyslexic option</StatusBadge>
          <StatusBadge>Dark mode</StatusBadge>
          <StatusBadge>Calm colour palette</StatusBadge>
          <StatusBadge>Mobile-friendly layout</StatusBadge>
          <StatusBadge>Low-pressure language</StatusBadge>
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-7 text-bloom-forest/75 dark:text-gray-300">
          These features are still being tested and improved. Bloom’s current
          beta focuses on making the experience easier to read, easier to
          navigate, and less overwhelming.
        </p>
      </section>

      {/* Main accessibility cards */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <AccessibilityCard title="Readable text and display controls">
          <p>
            Bloom includes display controls so users can adjust the app to feel
            more comfortable. Text size and font options are part of the current
            accessibility direction.
          </p>

          <p className="mt-3">
            OpenDyslexic support is included to help users who prefer a more
            dyslexia-friendly reading style.
          </p>
        </AccessibilityCard>

        <AccessibilityCard title="Dark mode and visual comfort">
          <p>
            Bloom supports dark mode for users who prefer lower brightness or a
            softer visual experience.
          </p>

          <p className="mt-3">
            The colour palette uses calm greens, creams, and soft contrast so
            the app feels gentle rather than harsh or overstimulating.
          </p>
        </AccessibilityCard>

        <AccessibilityCard title="Neurodivergent-friendly design">
          <p>
            Bloom is designed with neurodivergent users in mind, including users
            who may experience overwhelm, executive dysfunction, task paralysis,
            sensory sensitivity, or difficulty restarting after missed days.
          </p>

          <p className="mt-3">
            The goal is to support small steps without shame, pressure, or
            punishment.
          </p>
        </AccessibilityCard>

        <AccessibilityCard title="Calm wording and low-pressure progress">
          <p>
            Bloom avoids language that makes unfinished tasks feel like failure.
            The app focuses on gentle progress, recovery, and returning to the
            next small step.
          </p>

          <p className="mt-3">
            Future features will continue this direction with missed-day
            recovery and low-demand mode.
          </p>
        </AccessibilityCard>
      </section>

      {/* Design principles */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Design principles
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          Bloom’s accessibility approach is based on calm, clarity, and choice.
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-bloom-light/70 p-4 dark:bg-white/5">
            <p className="font-bold text-bloom-forest dark:text-bloom-light">
              Calm
            </p>

            <p className="mt-2 text-sm leading-6 text-bloom-forest/70 dark:text-gray-300">
              Soft colours, gentle cards, simple layouts, and less visual noise.
            </p>
          </div>

          <div className="rounded-2xl bg-bloom-light/70 p-4 dark:bg-white/5">
            <p className="font-bold text-bloom-forest dark:text-bloom-light">
              Clarity
            </p>

            <p className="mt-2 text-sm leading-6 text-bloom-forest/70 dark:text-gray-300">
              Clear headings, obvious actions, readable spacing, and simple
              navigation.
            </p>
          </div>

          <div className="rounded-2xl bg-bloom-light/70 p-4 dark:bg-white/5">
            <p className="font-bold text-bloom-forest dark:text-bloom-light">
              Choice
            </p>

            <p className="mt-2 text-sm leading-6 text-bloom-forest/70 dark:text-gray-300">
              Display controls and future preferences so users can shape the app
              around their needs.
            </p>
          </div>
        </div>
      </section>

      {/* Current and planned features */}
      <section>
        <div className="mb-6 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
            Feature roadmap
          </p>

          <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
            Accessibility will keep growing with Bloom.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AccessibilityCard title="Available or in progress">
            <ul className="space-y-2">
              <li>• Text size controls</li>
              <li>• OpenDyslexic font option</li>
              <li>• Dark mode</li>
              <li>• Calm colour palette</li>
              <li>• Mobile-friendly public landing page</li>
              <li>• Gentle task and progress wording</li>
            </ul>
          </AccessibilityCard>

          <AccessibilityCard title="Planned future improvements">
            <ul className="space-y-2">
              <li>• High contrast mode</li>
              <li>• Reduced motion setting</li>
              <li>• Low-demand mode</li>
              <li>• Larger tap targets across all app areas</li>
              <li>• More keyboard navigation checks</li>
              <li>• Screen reader testing and improvements</li>
            </ul>
          </AccessibilityCard>
        </div>
      </section>

      {/* Feedback guidance */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Accessibility feedback
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          Feedback is especially helpful during beta.
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-7 text-bloom-forest/75 dark:text-gray-300">
          <p>
            Bloom is still early, so accessibility feedback is important.
            Helpful feedback includes anything that felt difficult to read,
            confusing to navigate, too visually busy, too small to tap, or
            uncomfortable to use.
          </p>

          <p>
            The goal is to improve Bloom carefully through real feedback rather
            than assuming one design works for everyone.
          </p>
        </div>
      </section>

      {/* Last updated */}
      <section className="rounded-3xl border border-bloom-sage/25 bg-white/45 p-5 text-sm leading-7 text-bloom-forest/70 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
        <p>
          <span className="font-bold text-bloom-forest dark:text-bloom-light">
            Last updated:
          </span>{" "}
          June 2026
        </p>

        <p className="mt-2">
          This page reflects Bloom’s current beta/frontend version. It should be
          reviewed again as account features, backend data, education features,
          and deeper accessibility support are added.
        </p>
      </section>
    </div>
  )
}

export default Accessibility