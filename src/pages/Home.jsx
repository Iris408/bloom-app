import TaskList from "../components/tasks/TaskList"

function Home() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full px-4">
      {/* Page heading */}
      <section className="flex flex-col gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-blue-500/80 mb-2">
            Home
          </p>

          <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light/90">
            Today's focus
          </h2>
        </div>

        <div className="max-w-5xl flex flex-col gap-4">
          <p className="text-xl font-bold text-bloom-forest dark:text-bloom-light/90">
            One small step at a time {" "}
            <span
            className="inline-block dark:[filter:hue-rotate(145deg)_saturate(1.3)_brightness(0.9)]"
            role="img"
            aria-label="indigo seedling"
            >🌱</span>
          </p>

          <p className="text-sm leading-relaxed text-bloom-forest/80 dark:text-gray-300 max-w-3xl">
            You do not need to finish everything at once. Choose one task, start slowly, and take the next step when you're ready.
          </p>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-mint/75">
              Gentle checklist
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-bloom-forest dark:text-gray-300">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-bloom-mint flex-shrink-0" />
                Pick one task
              </div>

              <div className="flex items-center gap-3">
                <span
                  className="h-2 w-2 rounded-full flex-shrink-0"
                  span className="h-2 w-2 rounded-full bg-bloom-teal flex-shrink-0" />
                Take a short pause
              </div>

              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-bloom-sage flex-shrink-0" />
                Mark progress, not perfection
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content area */}
      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,3fr)_minmax(280px,1fr)] gap-8">
        {/* Left column — task input and task list */}
        <div className="flex flex-col gap-4">

            <h2 className="text-2xl font-bold text-bloom-forest dark:text-bloom-light/80 mb-4">
              Today's tasks
            </h2>
          <TaskList />
        </div>

        {/* Right column */}
        <aside className="flex flex-col gap-8 xl:pt-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage mb-3">
              Bloom reminder
            </p>

            <blockquote className="text-base font-semibold leading-relaxed text-bloom-forest dark:text-bloom-light">
              "You don't have to do everything today. One small step is still progress."
            </blockquote>
          </div>

          <div className="border-t border-bloom-sage/20 dark:border-dark-border" />

          <div className="rounded-2xl bg-bloom-forest dark:bg-dark-surface text-white p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mint dark:text-bloom-sage mb-2">
              Current phase
            </p>

            <h3 className="text-lg font-bold text-bloom-light mb-2">
              P1 Foundation
            </h3>

            <p className="text-sm leading-relaxed text-bloom-light dark:text-bloom-light/80">
              Task actions, layout, accessibility settings, and reusable UI
              components are being built first.
            </p>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default Home