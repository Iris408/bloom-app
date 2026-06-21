import Button from "../components/ui/Button"
import BloomReminder from "../components/ui/BloomReminder"
import bloomIllustration from "../assets/bloom-illustration.png"

function Overview({ setActivePage }) {
  const googleFeedbackUrl = "https://forms.gle/b87yyFLq1BEA1yEV9"

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)

    if (!section) return

    section.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }

  return (
    <main className="min-h-screen p-6 lg:p-10">
      <section className="mx-auto max-w-6xl space-y-32">
        {/* Hero */}
        <div className="grid gap-8 rounded-3xl bg-bloom-light p-8 shadow-lg dark:bg-bloom-mid/35 dark:shadow-xl lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-12">
          {/* EN: Main public introduction for Bloom */}
          {/* JP: Bloomの公開ページ用メイン紹介エリア */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-bloom-forest dark:text-white/40">
              Bloom Personal · Early Beta
            </p>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-bloom-mint lg:text-6xl">
              Calm routines for every brain 🌱
            </h1>

            <p className="mb-6 max-w-3xl text-lg leading-relaxed text-bloom-forest dark:text-white/60 lg:text-xl">
              Bloom is a calm routine, focus, and task app designed to help make
              daily structure feel softer, clearer, and less overwhelming.
            </p>

            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-bloom-forest dark:text-white/60">
              It is currently in early beta, so the main goal is to gather
              honest feedback on the layout, accessibility, wording, and overall experience.
            </p>

            <div className="space-y-3">
              {/* EN: Primary actions */}
              {/* JP: メインアクション */}
              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={() => setActivePage("home")}>
                  Get started
                </Button>

                <button
                  type="button"
                  onClick={() => scrollToSection("roadmap")}
                  className="rounded-xl border border-bloom-sage/70 bg-white/40 px-4 py-2 text-sm font-semibold text-bloom-forest transition hover:bg-bloom-sage/20 dark:border-bloom-light/30 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/20"
                >
                  View roadmap
                </button>
              </div>

              {/* EN: Secondary feedback link sits lower than the main buttons */}
              {/* JP: フィードバックリンクはメインボタンより少し下に配置します */}
              <button
                type="button"
                onClick={() => scrollToSection("feedback")}
                className="text-sm font-semibold text-bloom-forest underline-offset-4 transition hover:text-bloom-mid hover:underline dark:text-bloom-light dark:hover:text-white"
              >
                Give feedback →
              </button>
            </div>

            <p className="mt-5 max-w-2xl text-xs leading-relaxed text-bloom-forest/70 dark:text-bloom-light/80">
              Built with accessibility, calm design and neurodivergent-friendly feedback in mind.
            </p>  
          </div>

          {/* EN: Bloom visual identity illustration */}
          {/* JP: Bloomのビジュアルイメージ画像 */}
          <div className="mx-auto w-full max-w-sm rounded-[2rem] bg-white/40 p-2 shadow-md ring-1 ring-bloom-sage/20 dark:bg-white/10 dark:ring-white/10 lg:max-w-md xl:max-w-lg">
            <img
              src={bloomIllustration}
              alt="Calm Bloom illustration showing routines, focus time, and daily tasks"
              className="w-full rounded-[1.5rem]"
            />
          </div>
        </div>

        {/* Quick summary cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-bloom-sage bg-white p-6 shadow dark:border-bloom-mint dark:bg-dark-surface">
            <p className="mb-2 text-sm font-semibold text-bloom-mid">
              Current Build
            </p>

            <h2 className="mb-3 text-2xl font-bold text-bloom-forest dark:text-bloom-light">
              v1.6.1 Beta Polish
            </h2>

            <p className="leading-relaxed text-gray-600 dark:text-gray-300">
              Bloom is moving from a protected prototype layout toward a clearer
              public beta experience with an Overview page, login modal, public
              information pages, and stronger visual identity.
            </p>
          </div>

          <div className="rounded-3xl border border-bloom-sage bg-white p-6 shadow dark:border-bloom-mint dark:bg-dark-surface">
            <p className="mb-2 text-sm font-semibold text-bloom-mid">
              Personal Modes
            </p>

            <h2 className="mb-3 text-2xl font-bold text-bloom-forest dark:text-bloom-light">
              5 Modes
            </h2>

            <p className="leading-relaxed text-gray-600 dark:text-gray-300">
              Standard, Kid, Focus, Review, and Calm Mode are planned to support
              different routine and accessibility needs.
            </p>
          </div>

          <div className="rounded-3xl border border-bloom-sage bg-white p-6 shadow dark:border-bloom-mint dark:bg-dark-surface">
            <p className="mb-2 text-sm font-semibold text-bloom-mid">
              Design Goal
            </p>

            <h2 className="mb-3 text-2xl font-bold text-bloom-forest dark:text-bloom-light">
              Calm by design
            </h2>

            <p className="leading-relaxed text-gray-600 dark:text-gray-300">
              Bloom focuses on predictable layouts, gentle colours, clear
              language, and one-step-at-a-time task support.
            </p>
          </div>
        </div>

        {/* Purpose section */}
        <div className="rounded-3xl border border-bloom-sage bg-bloom-light p-8 dark:border-bloom-mint dark:bg-bloom-mid/35">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-bloom-mint dark:text-bloom-mid/90">
            Why Bloom exists
          </p>

          <h2 className="mb-4 text-3xl font-bold text-bloom-forest dark:text-white/80">
            One step at a time
          </h2>

          <p className="max-w-4xl leading-relaxed text-bloom-navy dark:text-gray-300">
            Many productivity apps are designed around speed, pressure, and
            constant reminders. Bloom is designed to feel slower, softer, and
            more supportive. The goal is to help users reduce overwhelm, follow
            visual steps, and build confidence through small progress.
          </p>
        </div>

        {/* Feedback section */}
        <div
          id="feedback"
          className="rounded-3xl border border-bloom-sage bg-white p-6 shadow dark:border-bloom-mint dark:bg-dark-surface"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            {/* EN: Feedback explanation text */}
            {/* JP: フィードバック説明テキスト */}
            <div className="max-w-3xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-bloom-mid">
                Beta feedback
              </p>

              <h2 className="mb-3 text-2xl font-bold text-bloom-forest dark:text-bloom-light">
                Help improve Bloom
              </h2>

              <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                Bloom is currently being tested with early feedback. I’m especially
                looking for thoughts on layout clarity, accessibility, wording, and
                whether anything feels confusing, overwhelming, useful, or missing.
              </p>
            </div>

            {/* EN: Feedback form button sits on the right side on desktop */}
            {/* JP: デスクトップではフィードバックボタンを右側に配置します */}
            <a
              href={googleFeedbackUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-bloom-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-bloom-mid dark:bg-bloom-light dark:text-bloom-forest dark:hover:bg-white"
            >
              Open feedback form
            </a>
          </div>
        </div>

        {/* Roadmap */}
        <div
          id="roadmap"
          className="rounded-3xl border border-bloom-sage bg-white p-8 shadow dark:border-bloom-mint dark:bg-dark-surface/60"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-bloom-mid">
            Roadmap
          </p>

          <h2 className="mb-6 text-3xl font-bold text-bloom-forest dark:text-bloom-light/80">
            Build order
          </h2>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-bloom-light p-4 dark:bg-bloom-mint/65">
              <p className="font-bold text-bloom-forest">v1.4</p>
              <p className="text-sm text-bloom-navy dark:text-bloom-light/70">
                Empty States
              </p>
            </div>

            <div className="rounded-2xl bg-bloom-light p-4 dark:bg-bloom-mint/65">
              <p className="font-bold text-bloom-forest">v1.5</p>
              <p className="text-sm text-bloom-navy dark:text-bloom-light/70">
                Portfolio Polish
              </p>
            </div>

            <div className="rounded-2xl bg-bloom-light p-4 dark:bg-bloom-mint/65">
              <p className="font-bold text-bloom-forest">v1.6</p>
              <p className="text-sm text-bloom-navy dark:text-bloom-light/70">
                Beta Prep
              </p>
            </div>

            <div className="rounded-2xl bg-bloom-light p-4 dark:bg-bloom-mint/65">
              <p className="font-bold text-bloom-forest">v1.6.1</p>
              <p className="text-sm text-bloom-navy dark:text-bloom-light/70">
                Visual Identity
              </p>
            </div>
          </div>

          {/* EN: Short explanations for the current roadmap versions */}
          {/* JP: 現在のロードマップバージョンの短い説明 */}
          <div className="mt-6 space-y-3 rounded-2xl bg-bloom-light/70 p-5 text-sm leading-relaxed text-bloom-navy dark:bg-bloom-mid/30 dark:text-gray-300">
            <p>
              <span className="font-semibold text-bloom-forest dark:text-bloom-light">
                v1.4 — Empty States:
              </span>{" "}
              Gentle first-use messages for empty tasks, routines, and progress
              areas.
            </p>

            <p>
              <span className="font-semibold text-bloom-forest dark:text-bloom-light">
                v1.5 — Portfolio Polish:
              </span>{" "}
              README updates, screenshots, mobile checks, and portfolio-ready
              presentation.
            </p>

            <p>
              <span className="font-semibold text-bloom-forest dark:text-bloom-light">
                v1.6 — Beta Prep:
              </span>{" "}
              Final frontend polish, tester feedback preparation, and small
              usability fixes.
            </p>

            <p>
              <span className="font-semibold text-bloom-forest dark:text-bloom-light">
                v1.6.1 — Visual Identity:
              </span>{" "}
              Public Overview, login modal, About/Privacy/Accessibility pages,
              and Bloom illustration direction.
            </p>
          </div>
        </div>

        <BloomReminder
          reminder="Bloom is being prepared for calm public beta feedback."
          phaseTitle="Bloom v1.6.1 — Visual Identity & Public Beta Polish"
          phaseDescription="Public Overview, login modal overlay, About/Privacy/Accessibility pages, Bloom illustration direction, and beta-ready UI polish."
        />
      </section>
    </main>
  )
}

export default Overview