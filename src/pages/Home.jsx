import TaskList from "../components/tasks/TaskList"
import DemoBanner from "../components/demo/DemoBanner"
import { getAvatarDisplay } from "../utils/avatarStorage"

function Home({
  currentUser = null,
  isDemoMode,
  demoType,
  onCreateAccount,
  onExitDemoClick,
  setActivePage,
}) {
  const avatarDisplay = getAvatarDisplay(currentUser)

  const username =
    currentUser?.username || (isDemoMode ? "Demo user" : "Bloom user")

  const displayName = username

  const shouldShowAvatar =
    avatarDisplay.avatarType === "bloom" && avatarDisplay.avatarUrl

  function goToPage(page) {
    if (!setActivePage) return

    setActivePage(page)
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 overflow-x-hidden pb-28 sm:gap-7 sm:pb-0">
      {isDemoMode && (
        <DemoBanner
          demoType={demoType}
          onCreateAccount={onCreateAccount}
          onExitDemoClick={onExitDemoClick}
        />
      )}

      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
              Home
            </p>

            <h2 className="break-words text-3xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-4xl">
              Good morning, {displayName} ꕤ
            </h2>

            <p className="mt-3 max-w-2xl break-words text-sm leading-relaxed text-bloom-forest/65 dark:text-gray-300">
              Let&apos;s take today one step at a time. Choose what feels
              manageable, pause when needed, and come back gently.
            </p>
          </div>

          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[1.4rem] bg-bloom-forest text-2xl font-bold text-bloom-light shadow-sm">
            {shouldShowAvatar ? (
              <img
                src={avatarDisplay.avatarUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              avatarDisplay.initial
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.85fr)_minmax(260px,0.75fr)]">
        <div className="rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-4 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
                Today
              </p>

              <h3 className="mt-2 text-lg font-bold text-bloom-forest dark:text-bloom-light">
                Today&apos;s tasks
              </h3>
            </div>

            <button
              type="button"
              className="rounded-full bg-bloom-light px-3 py-1.5 text-xs font-bold text-bloom-forest/70 transition hover:bg-bloom-mint/50 dark:bg-white/10 dark:text-gray-300"
            >
              See all
            </button>
          </div>

          <TaskList />
        </div>

        <div className="flex flex-col justify-between rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
              Focus
            </p>

            <div className="mx-auto mt-6 flex h-40 w-40 flex-col items-center justify-center rounded-full border-[10px] border-bloom-sage/35 bg-bloom-light/50 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-semibold text-bloom-forest/60 dark:text-gray-300">
                Deep Focus
              </p>

              <p className="mt-1 text-4xl font-bold text-bloom-forest dark:text-bloom-light">
                25:00
              </p>
            </div>

            <p className="mt-4 text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
              Start with one quiet block. You can stop, pause, or restart
              whenever you need.
            </p>
          </div>

          <button
            type="button"
            onClick={() => goToPage("focus")}
            className="mx-auto mt-5 rounded-full bg-bloom-mid px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-bloom-forest"
          >
            Start focus
          </button>
        </div>

        <div className="rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
                Routine
              </p>

              <h3 className="mt-2 text-lg font-bold text-bloom-forest dark:text-bloom-light">
                Morning Routine
              </h3>

              <p className="mt-1 text-xs text-bloom-forest/60 dark:text-gray-300">
                4 gentle steps
              </p>
            </div>

            <span className="rounded-full bg-bloom-light px-3 py-2 text-sm dark:bg-white/10">
              ☀️
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {["Drink water", "Stretch", "Plan my day", "Gratitude moment"].map(
              (step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 shadow-sm dark:bg-white/5"
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      index < 2
                        ? "bg-bloom-mid text-white"
                        : "border border-bloom-sage/40 text-bloom-forest/50 dark:text-gray-300"
                    }`}
                  >
                    {index < 2 ? "✓" : ""}
                  </span>

                  <p className="text-sm font-semibold text-bloom-forest dark:text-bloom-light">
                    {step}
                  </p>
                </div>
              )
            )}
          </div>

          <button
            type="button"
            onClick={() => goToPage("routines")}
            className="mt-5 w-full rounded-2xl bg-bloom-light px-5 py-3 text-sm font-bold text-bloom-forest transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
          >
            View routine
          </button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.65fr)]">
        <div className="rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
                Progress snapshot
              </p>

              <h3 className="mt-2 text-lg font-bold text-bloom-forest dark:text-bloom-light">
                This week
              </h3>
            </div>

            <button
              type="button"
              onClick={() => goToPage("progress")}
              className="rounded-full bg-bloom-light px-3 py-1.5 text-xs font-bold text-bloom-forest/70 transition hover:bg-bloom-mint/50 dark:bg-white/10 dark:text-gray-300"
            >
              Open progress
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm dark:bg-white/5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-bloom-sage/40 text-xl font-bold text-bloom-forest dark:border-white/10 dark:text-bloom-light">
                ✓
              </div>

              <p className="mt-3 text-2xl font-bold text-bloom-forest dark:text-bloom-light">
                4/6
              </p>

              <p className="text-xs font-semibold text-bloom-forest/60 dark:text-gray-300">
                Routines completed
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm dark:bg-white/5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-bloom-sage/40 text-xl dark:border-white/10">
                ꕤ
              </div>

              <p className="mt-3 text-2xl font-bold text-bloom-forest dark:text-bloom-light">
                3
              </p>

              <p className="text-xs font-semibold text-bloom-forest/60 dark:text-gray-300">
                Focus sessions
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 p-4 text-center shadow-sm dark:bg-white/5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-bloom-sage/40 text-xl dark:border-white/10">
                ☆
              </div>

              <p className="mt-3 text-2xl font-bold text-bloom-forest dark:text-bloom-light">
                85%
              </p>

              <p className="text-xs font-semibold text-bloom-forest/60 dark:text-gray-300">
                Gentle progress
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
            Daily reminder
          </p>

          <h3 className="mt-3 text-xl font-bold leading-snug text-bloom-forest dark:text-bloom-light">
            You are enough, exactly as you are.
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-bloom-forest/65 dark:text-gray-300">
            Small steps are still real progress. You do not need to earn rest.
          </p>

          <div className="pointer-events-none absolute -bottom-8 -right-4 text-7xl opacity-20">
            🌸
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home