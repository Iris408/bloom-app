import TaskList from "../components/tasks/TaskList"

function Home() {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,3fr)_minmax(280px,1fr)] gap-8 max-w-7xl mx-auto w-full px-3">

            {/* Left column — main tasks */}
            <section className="flex flex-col gap-4 items-left">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage mb-2">
                        Home
                    </p>
                    <h2 className="text-2xl font-bold text-bloom-forest dark:text-bloom-light">
                        Today's tasks
                    </h2>
                </div>
                <TaskList />
            </section>

            {/* Right column — calm support panel, no boxes */}
            <aside className="flex flex-col gap-6">

                {/* Today's focus */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage mb-2">
                        Today's focus
                    </p>
                    <p className="text-sm text-bloom-forest dark:text-bloom-light">
                        One small step at a time 🌱
                    </p>
                </div>

                {/* Divider */}
                <div className="border-t border-bloom-sage/20 dark:border-dark-border" />

                {/* Gentle reminder */}
                <div>
                    <p className="text-sm text-bloom-forest dark:text-bloom-light leading-relaxed">
                        You do not need to finish everything at once. Choose one task,
                        start gently, and take the next step when you're ready.
                    </p>
                </div>

                {/* Divider */}
                <div className="border-t border-bloom-sage/20 dark:border-dark-border" />

                {/* Gentle checklist */}
                <div className="flex flex-col gap-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
                        Gentle checklist
                    </p>

                    <div className="flex items-center gap-3 text-sm text-bloom-forest dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-bloom-mint flex-shrink-0" />
                        Pick one task
                    </div>

                    <div className="flex items-center gap-3 text-sm text-bloom-forest dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-bloom-teal flex-shrink-0" />
                        Take a short pause
                    </div>

                    <div className="flex items-center gap-3 text-sm text-bloom-forest dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-bloom-sage flex-shrink-0" />
                        Mark progress, not perfection
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-bloom-sage/20 dark:border-dark-border" />

                {/* Bloom reminder quote */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage mb-3">
                        Bloom reminder
                    </p>
                    <blockquote className="text-base font-semibold leading-relaxed text-bloom-forest dark:text-bloom-light">
                        "A routine does not have to be perfect to be helpful."
                    </blockquote>
                </div>

                {/* Divider */}
                <div className="border-t border-bloom-sage/20 dark:border-dark-border" />

                {/* Current phase — keeping the box here as it's a status indicator */}
                <div className="rounded-2xl bg-bloom-forest text-white p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mint mb-2">
                        Current phase
                    </p>
                    <h3 className="text-lg font-bold mb-2">
                        P1 Foundation
                    </h3>
                    <p className="text-sm leading-relaxed text-bloom-light/90">
                        Task actions, layout, accessibility settings and reusable UI components are being built first.
                    </p>
                </div>

            </aside>
        </div>
    )
}

export default Home