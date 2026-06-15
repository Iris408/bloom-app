import TaskList from "../components/tasks/TaskList"
import DailyAffirmationCard from "../components/home/DailyAffirmationCard"
import EmptyState from "../components/ui/EmptyState"

function Home() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4">
      {/* Page heading / Today's focus */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(280px,1fr)]">
        {/* Left side — Today's focus */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-blue-500/80">
              Home
            </p>

            <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light/90">
              Today&apos;s focus
            </h2>

            {/* EN: Mobile-only collapsible daily reminder */}
            {/* JP: モバイル専用の折りたたみ式デイリーリマインダー */}
            <div className="mt-4 xl:hidden">
              <DailyAffirmationCard variant="collapsible" />
            </div>
          </div>

          <div className="flex max-w-5xl flex-col gap-4">
            <p className="text-xl font-bold text-bloom-forest dark:text-bloom-light/90">
              One small step at a time{" "}
              <span
                className="inline-block dark:[filter:hue-rotate(145deg)_saturate(1.3)_brightness(0.9)]"
                role="img"
                aria-label="indigo seedling"
              >
                🌱
              </span>
            </p>

            <p className="max-w-3xl text-sm leading-relaxed text-bloom-forest/80 dark:text-gray-300">
              You do not need to finish everything at once. Choose one task,
              start slowly, and take the next step when you&apos;re ready.
            </p>

            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-mint/75">
                Gentle checklist
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-3 text-sm text-bloom-forest dark:text-bloom-light/70">
                  <span className="h-2 w-2 flex-shrink-0 rounded-full bg-bloom-mint" />
                  Pick one task
                </div>

                <div className="flex items-center gap-3 text-sm text-bloom-forest dark:text-bloom-light/70">
                  <span className="h-2 w-2 flex-shrink-0 rounded-full bg-bloom-teal" />
                  Take a short pause
                </div>

                <div className="flex items-center gap-3 text-sm text-bloom-forest dark:text-bloom-light/70">
                  <span className="h-2 w-2 flex-shrink-0 rounded-full bg-bloom-sage" />
                  Mark progress, not perfection
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side — Desktop daily reminder */}
        <aside className="hidden xl:block xl:self-start xl:pt-8">
          <DailyAffirmationCard variant="panel" />
        </aside>
      </section>

      {/* Main content area */}
      <section className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,3fr)_minmax(280px,1fr)]">
        {/* Left column — task input and task list */}
        <div className="flex flex-col gap-4">
          <h2 className="mb-4 text-2xl font-bold text-bloom-forest dark:text-bloom-light/80">
            Today&apos;s tasks
          </h2>

          <TaskList />
        </div>

        {/* Right column — desktop supporting panel */}
        <aside className="hidden xl:flex xl:flex-col xl:pt-[64px]">
          <div className="flex h-full min-h-[180px] flex-col justify-between rounded-2xl bg-bloom-forest p-5 text-white dark:bg-dark-surface">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-bloom-mint dark:text-bloom-sage">
              Current phase
            </p>

            <h3 className="mb-2 text-3xl font-bold text-bloom-light">
              P1 Foundation
            </h3>

            <p className="text-medium leading-relaxed text-bloom-light dark:text-bloom-light/80">
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