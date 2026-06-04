import TaskList from "../components/tasks/TaskList"

function Home() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full px-4">
      {/* Page heading */}
      <section className="flex flex-col gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage mb-2">
            Home
          </p>

          <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
            Today's focus
          </h2>
        </div>

        <div className="max-w-5xl flex flex-col gap-4">
          <p className="text-xl font-bold text-bloom-forest dark:text-bloom-light">
            One small step at a time 🌱
          </p>

          <p className="text-sm leading-relaxed text-bloom-forest/80 dark:text-gray-300 max-w-3xl">
            You do not need to finish everything at once. Choose one task,
            start gently, and take the next step when you're ready.
          </p>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
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

            <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light mb-4">
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
              "A routine does not have to be perfect to be helpful."
            </blockquote>
          </div>

          <div className="border-t border-bloom-sage/20 dark:border-dark-border" />

          <div className="rounded-2xl bg-bloom-forest text-white p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mint mb-2">
              Current phase
            </p>

            <h3 className="text-lg font-bold mb-2">
              P1 Foundation
            </h3>

            <p className="text-sm leading-relaxed text-bloom-light/90">
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