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

function PrincipleCard({ title, text }) {
  return (
    <div className="rounded-2xl bg-bloom-light/70 p-4 dark:bg-white/5">
      <p className="font-bold text-bloom-forest dark:text-bloom-light">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-bloom-forest/70 dark:text-gray-300">
        {text}
      </p>
    </div>
  )
}

function Accessibility({ setActivePage }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 pt-28 text-bloom-forest dark:text-bloom-light sm:px-6 sm:pt-32 lg:px-8">
      {/* EN: Accessibility page introduction */}
      {/* JP: アクセシビリティページの紹介 */}
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
          Bloom is designed to be calm, readable, and easy to adjust.
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-bloom-forest/75 dark:text-gray-300">
          Accessibility is built into Bloom from the beginning, with support
          for different needs, preferences, and ways of working.
        </p>
      </section>

      {/* EN: Current accessibility features */}
      {/* JP: 現在利用できるアクセシビリティ機能 */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-bloom-light/60 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Available now
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          Current accessibility features
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
          Bloom is actively improving accessibility throughout beta.
        </p>
      </section>

      {/* EN: Main accessibility areas */}
      {/* JP: 主なアクセシビリティ領域 */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <AccessibilityCard title="Readable text and display controls">
          <p>
            Adjust text size and display settings to make Bloom more
            comfortable to use.
          </p>

          <p className="mt-3">
            OpenDyslexic is available for users who prefer a
            dyslexia-friendly reading style.
          </p>
        </AccessibilityCard>

        <AccessibilityCard title="Dark mode and visual comfort">
          <p>
            Use dark mode for a softer, lower-brightness experience.
          </p>

          <p className="mt-3">
            Calm greens, creams, and gentle contrast help reduce visual noise.
          </p>
        </AccessibilityCard>

        <AccessibilityCard title="Neurodivergent-friendly design">
          <p>
            Bloom is designed to reduce overwhelm, support restarts, and
            encourage small steps without pressure.
          </p>

          <p className="mt-3">
            This includes support for executive dysfunction, task paralysis,
            sensory sensitivity, and difficult days.
          </p>
        </AccessibilityCard>

        <AccessibilityCard title="Low-pressure progress">
          <p>
            Unfinished tasks are not treated as failure.
          </p>

          <p className="mt-3">
            Bloom focuses on recovery, returning gently, and choosing the next
            manageable step.
          </p>
        </AccessibilityCard>
      </section>

      {/* EN: Design principles */}
      {/* JP: デザイン原則 */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Design principles
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          Built around calm, clarity, and choice.
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <PrincipleCard
            title="Calm"
            text="Soft colours, gentle cards, simple layouts, and less visual noise."
          />

          <PrincipleCard
            title="Clarity"
            text="Clear headings, readable spacing, obvious actions, and simple navigation."
          />

          <PrincipleCard
            title="Choice"
            text="Display controls and preferences that help users shape Bloom around their needs."
          />
        </div>
      </section>

      {/* EN: Current and planned accessibility features */}
      {/* JP: 現在と今後のアクセシビリティ機能 */}
      <section>
        <div className="mb-6 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
            Accessibility roadmap
          </p>

          <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
            What is available now and what is coming next.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AccessibilityCard title="Available or in progress">
            <ul className="space-y-2">
              <li>• Text size controls</li>
              <li>• OpenDyslexic font option</li>
              <li>• Dark mode</li>
              <li>• Calm colour palette</li>
              <li>• Mobile-friendly layouts</li>
              <li>• Gentle task and progress wording</li>
            </ul>
          </AccessibilityCard>

          <AccessibilityCard title="Coming later">
            <ul className="space-y-2">
              <li>• High contrast mode</li>
              <li>• Reduced motion setting</li>
              <li>• Low-demand mode</li>
              <li>• Larger tap targets</li>
              <li>• More keyboard navigation testing</li>
              <li>• Screen reader improvements</li>
            </ul>
          </AccessibilityCard>
        </div>
      </section>

      {/* EN: Accessibility feedback link */}
      {/* JP: アクセシビリティフィードバックへの案内 */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Accessibility feedback
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          Help make Bloom easier to use.
        </h2>

        <div className="mt-5 max-w-3xl space-y-2 text-sm leading-7 text-bloom-forest/75 dark:text-gray-300">
          <p>Something difficult to read?</p>
          <p>Too much visual clutter?</p>
          <p>A control that felt confusing?</p>
        </div>

        <button
          type="button"
          onClick={() => setActivePage?.("feedback")}
          className="mt-6 inline-flex rounded-2xl bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light transition hover:bg-bloom-mid"
        >
          Give feedback
        </button>
      </section>

      {/* EN: Page update note */}
      {/* JP: ページ更新情報 */}
      <section className="rounded-3xl border border-bloom-sage/25 bg-white/45 p-5 text-sm leading-7 text-bloom-forest/70 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
        <p>
          <span className="font-bold text-bloom-forest dark:text-bloom-light">
            Last updated:
          </span>{" "}
          July 2026
        </p>

        <p className="mt-2">
          Bloom is currently in beta and accessibility features will continue
          to evolve.
        </p>
      </section>
    </div>
  )
}

export default Accessibility