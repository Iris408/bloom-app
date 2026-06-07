import Button from "../components/ui/Button"

function Overview({ setActivePage }) {
  return (
    <main className="min-h-screen p-6 lg:p-10">
      <section className="max-w-6xl mx-auto space-y-32">

        {/* Hero */}
        <div className="rounded-3xl bg-bloom-light text-white/80 p-8 lg:p-12 shadow-lg dark:bg-bloom-mid/35 dark:shadow-xl">
          <p className="text-bloom-forest font-semibold tracking-wide uppercase text-sm mb-4 dark:text-white/40">
            Bloom Personal · Capstone Project
          </p>

          <h1 className="text-4xl text-bloom-mint lg:text-6xl font-bold leading-tight mb-6">
            Calm routines for every brain 🌱
          </h1>

          <p className="text-bloom-forest text-lg lg:text-xl max-w-3xl leading-relaxed mb-8 dark:text-white/60">
            Bloom is a visual routine and task sequencing app designed to help
            users create, organise, and follow step-by-step routines in a calm,
            supportive, and neurodivergent-friendly way.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setActivePage("home")}>
              Start with Tasks
            </Button>

            <a
              href="#roadmap"
              className="px-4 py-2 rounded-xl font-semibold text-sm border border-bloom-mint text-bloom-mint hover:bg-bloom-mint hover:text-bloom-forest transition"
            >
              View roadmap
            </a>
          </div>
        </div>

        {/* Quick summary cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-3xl bg-white dark:bg-dark-surface border border-bloom-sage dark:border-bloom-mint p-6 shadow">
            <p className="text-sm font-semibold text-bloom-mid mb-2">
              Current Build
            </p>
            <h2 className="text-2xl font-bold text-bloom-forest dark:text-bloom-light mb-3">
              P1 Foundation
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              App shell, navigation, task cards, add/edit/delete actions,
              emoji picker, and reusable Bloom UI components.
            </p>
          </div>

          <div className="rounded-3xl bg-white dark:bg-dark-surface border border-bloom-sage dark:border-bloom-mint p-6 shadow">
            <p className="text-sm font-semibold text-bloom-mid mb-2">
              Personal Modes
            </p>
            <h2 className="text-2xl font-bold text-bloom-forest dark:text-bloom-light mb-3">
              5 Modes
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Standard, Kid, Focus, Review, and Calm Mode are planned to support
              different routine and accessibility needs.
            </p>
          </div>

          <div className="rounded-3xl bg-white dark:bg-dark-surface border border-bloom-sage dark:border-bloom-mint p-6 shadow">
            <p className="text-sm font-semibold text-bloom-mid mb-2">
              Design Goal
            </p>
            <h2 className="text-2xl font-bold text-bloom-forest dark:text-bloom-light mb-3">
              Calm by design
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Bloom focuses on predictable layouts, gentle colours, clear
              language, and one-step-at-a-time task support.
            </p>
          </div>
        </div>

        {/* Purpose section */}
        <div className="rounded-3xl bg-bloom-light p-8 border border-bloom-sage dark:bg-bloom-mid/35 dark:border-bloom-mint">
          <p className="text-sm font-semibold text-bloom-mint dark:text-white/40 uppercase tracking-wide mb-3">
            Why Bloom exists
          </p>

          <h2 className="text-3xl font-bold text-bloom-forest dark:text-white/80 mb-4">
            One step at a time
          </h2>

          <p className="text-bloom-navy leading-relaxed dark:text-gray-300 max-w-4xl">
            Many productivity apps are designed around speed, pressure, and
            constant reminders. Bloom is designed to feel slower, softer, and
            more supportive. The goal is to help users reduce overwhelm, follow
            visual steps, and build confidence through small progress.
          </p>
        </div>

        {/* Roadmap */}
        <div id="roadmap" className="rounded-3xl bg-white dark:bg-dark-surface/40 border border-bloom-sage dark:border-bloom-mint p-8 shadow">
          <p className="text-sm font-semibold text-bloom-mid uppercase tracking-wide mb-3">
            Roadmap
          </p>

          <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light mb-6">
            Build order
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-bloom-light dark:bg-bloom-light/80 p-4">
              <p className="font-bold text-bloom-forest">P1</p>
              <p className="text-sm text-bloom-navy">Foundation</p>
            </div>

            <div className="rounded-2xl bg-bloom-light dark:bg-bloom-light/80 p-4">
              <p className="font-bold text-bloom-forest">P2</p>
              <p className="text-sm text-bloom-navy">Design System</p>
            </div>

            <div className="rounded-2xl bg-bloom-light dark:bg-bloom-light/80 p-4">
              <p className="font-bold text-bloom-forest">P3</p>
              <p className="text-sm text-bloom-navy">Routine Builder</p>
            </div>

            <div className="rounded-2xl bg-bloom-light dark:bg-bloom-light/80 p-4">
              <p className="font-bold text-bloom-forest">P4</p>
              <p className="text-sm text-bloom-navy">Modes</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Overview