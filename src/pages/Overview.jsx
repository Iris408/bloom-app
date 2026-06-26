import Seedling from "../components/ui/Seedling"
import FeedbackForm from "../components/feedback/FeedbackForm"

function LeafIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 19c8-1 13-6 14-14-8 1-13 6-14 14z" />
      <path d="M5 19c4-4 8-7 14-14" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

function UserPlusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3.5 20c1.1-4 3.3-6 6.5-6" />
      <path d="M18 8v8" />
      <path d="M14 12h8" />
    </svg>
  )
}

function SlidersIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h10" />
      <path d="M18 7h2" />
      <path d="M16 5v4" />
      <path d="M4 12h4" />
      <path d="M12 12h8" />
      <path d="M10 10v4" />
      <path d="M4 17h12" />
      <path d="M18 15v4" />
    </svg>
  )
}

function SectionTitle({ children }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-2 text-center">
      <span className="text-xl text-bloom-mid">
        <Seedling variant="indigo" />
      </span>

      <h2 className="text-2xl font-bold text-bloom-forest dark:text-bloom-light">
        {children}
      </h2>
    </div>
  )
}

function TrustBadge({ title, text, icon }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white/45 p-4 dark:bg-white/5">
      <span className="mt-0.5 text-bloom-mid">{icon}</span>

      <div>
        <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
          {text}
        </p>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, text, tone = "sage" }) {
  const toneClasses = {
    sage: "bg-bloom-mint/35 text-bloom-forest",
    gold: "bg-[#f7df9e]/45 text-[#8a6a16]",
    forest: "bg-bloom-forest text-bloom-light",
    cream: "bg-bloom-light text-bloom-forest",
  }

  return (
    <article className="rounded-3xl border border-bloom-sage/25 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${toneClasses[tone]}`}
      >
        {icon}
      </div>

      <h3 className="text-base font-bold text-bloom-forest dark:text-bloom-light">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-bloom-forest/70 dark:text-gray-300">
        {text}
      </p>
    </article>
  )
}

function MiniStepCard({ icon, title }) {
  return (
    <div className="flex min-h-[92px] flex-col items-center justify-center rounded-2xl border border-bloom-sage/20 bg-bloom-light/60 p-3 text-center text-xs text-bloom-forest dark:border-white/10 dark:bg-white/5 dark:text-bloom-light">
      <span className="mb-2 flex h-8 w-8 items-center justify-center text-bloom-mid">
        {icon}
      </span>

      <span className="font-semibold leading-4">{title}</span>
    </div>
  )
}

function PathCard({ tone = "green", title, steps, buttonText, onClick }) {
  const isGold = tone === "gold"

  return (
    <article
      className={`rounded-3xl border bg-white/75 p-5 shadow-sm backdrop-blur-sm dark:bg-white/5 ${
        isGold
          ? "border-[#e4c36b]/45 dark:border-white/10"
          : "border-bloom-sage/25 dark:border-white/10"
      }`}
    >
      <h3 className="mb-4 text-lg font-bold text-bloom-forest dark:text-bloom-light">
        {title}
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {steps.map((step) => (
          <MiniStepCard key={step.title} icon={step.icon} title={step.title} />
        ))}
      </div>

      <button
        type="button"
        onClick={onClick}
        className={`mt-5 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 ${
          isGold
            ? "bg-[#d99a28] hover:bg-[#b97e17]"
            : "bg-bloom-forest hover:bg-bloom-mid"
        }`}
      >
        {buttonText}
      </button>
    </article>
  )
}

function DemoCard({ title, text, label, tone = "sage" }) {
  const toneClasses = {
    sage: "bg-bloom-mint/35 text-bloom-forest",
    pink: "bg-[#f4ccd3]/55 text-[#7a3b48]",
    gold: "bg-[#f7df9e]/55 text-[#8a6a16]",
    forest: "bg-bloom-forest text-bloom-light",
  }

  return (
    <article className="flex h-full flex-col rounded-3xl border border-bloom-sage/25 bg-white/75 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${toneClasses[tone]}`}
      >
        <LeafIcon />
      </div>

      <h3 className="text-base font-bold text-bloom-forest dark:text-bloom-light">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-bloom-forest/70 dark:text-gray-300">
        {text}
      </p>

      <p className="mt-auto rounded-full bg-bloom-light/70 px-4 py-2 text-center text-xs font-semibold text-bloom-forest/75 dark:bg-white/10 dark:text-bloom-light">
        {label}
      </p>
    </article>
  )
}

function AccessibilityItem({ title, text }) {
  return (
    <div className="rounded-2xl bg-white/65 p-4 dark:bg-white/5">
      <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
        {text}
      </p>
    </div>
  )
}

function Overview({
  onLoginClick,
  onTryDemoClick,
  onCreateAccountClick,
}) {
  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 overflow-hidden px-4 pb-16 pt-6 text-bloom-forest dark:text-bloom-light sm:px-6 lg:px-8">
      {/* Decorative botanical background hints */}

      {/* HERO */}
      <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-bloom-mid dark:text-bloom-sage">
            Welcome to Bloom
          </p>

          <h1 className="text-4xl font-bold leading-[1.08] text-bloom-forest dark:text-bloom-light sm:text-5xl lg:text-6xl">
            Bloom helps you build gentle routines, focus sessions, and daily
            steps without pressure.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-bloom-forest/75 dark:text-gray-300">
            A calm, neurodivergent-friendly app for everyday wellbeing —
            designed to support you, your routines, and your way.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:max-w-2xl sm:grid-cols-3">
            <button
              type="button"
              onClick={onTryDemoClick}
              className="rounded-2xl bg-bloom-forest px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-bloom-mid"
            >
              Try demo
            </button>

            <button
              type="button"
              onClick={onCreateAccountClick}
              className="rounded-2xl bg-bloom-mid px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-bloom-forest"
            >
              Create account
            </button>

            <button
              type="button"
              onClick={onLoginClick}
              className="rounded-2xl border border-bloom-sage/40 bg-white/70 px-6 py-3 text-sm font-semibold text-bloom-forest shadow-sm transition hover:-translate-y-0.5 hover:bg-bloom-mint/25 dark:border-white/10 dark:bg-white/10 dark:hover:bg-bloom-mint/70 dark:text-bloom-light"
            >
              Log in
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <TrustBadge
              title="Made for calm"
              text="Low pressure, high support"
              icon="♡"
            />

            <TrustBadge
              title="Privacy first"
              text="Your data stays yours"
              icon="♢"
            />

            <TrustBadge
              title="For all minds"
              text="Inclusive by design"
              icon="✦"
            />
          </div>
        </div>

        {/* Hero app preview */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">

          <div className="relative rotate-0 rounded-[2rem] border border-bloom-sage/25 bg-white/80 p-5 shadow-xl dark:border-white/10 dark:bg-white/10 sm:rotate-4 sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-2xl font-bold text-bloom-forest dark:text-bloom-light">
                  Good morning
                </p>

                <p className="mt-1 text-sm leading-6 text-bloom-forest/65 dark:text-gray-300">
                  Let's build a calm and kind day together.
                </p>
              </div>

              <span className="text-2xl">
                <Seedling variant="indigo" />
              </span>
            </div>

            <p className="mb-3 text-sm font-bold text-bloom-forest dark:text-bloom-light">
              Today's plan
            </p>

            <div className="space-y-3">
              {[
                ["Calm routine", "10min gentle reset", true],
                ["Focus session", "Deep work · 25 min", true],
                ["Daily step", "Drink water", false],
              ].map(([title, subtitle, done]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-bloom-sage/20 bg-white/85 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-bloom-forest dark:text-bloom-light">
                        {title}
                      </p>

                      <p className="text-xs text-bloom-forest/60 dark:text-gray-400">
                        {subtitle}
                      </p>
                    </div>

                    {done ? (
                      <span className="rounded-full bg-bloom-mid px-2 py-1 text-xs text-white">
                        ✓
                      </span>
                    ) : (
                      <span className="h-5 w-5 rounded-full border border-bloom-sage/50" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-bloom-light/80 p-4 text-center text-sm leading-6 text-bloom-forest/75 dark:bg-white/5 dark:text-gray-300">
              Small steps, gentle progress. You're doing better than you think.
            </div>
          </div>
        </div>
      </section>

      {/* WHAT BLOOM IS */}
      <section>
        <SectionTitle>What Bloom is</SectionTitle>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <FeatureCard
            icon={<LeafIcon />}
            title="Calm routines"
            text="Simple, supportive routines that help you feel steady and in control."
          />

          <FeatureCard
            icon="◌"
            title="Focus support"
            text="Tools and timers to reduce overwhelm and support focus."
            tone="gold"
          />

          <FeatureCard
            icon={
              <span className="text-2xl">
                <Seedling variant="indigo" />
              </span>
            }
            title="Gentle progress"
            text="Small steps, kind tracking, and celebrating progress in your own time."
          />

          <FeatureCard
            icon="♡"
            title="Accessibility first"
            text="Inclusive by design with neurodivergent-friendly features and choices."
            tone="forest"
          />
        </div>
      </section>

      {/* 3 WAYS */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/45 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
        <SectionTitle>3 ways to get started</SectionTitle>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <PathCard
            title="Returning user"
            buttonText="Log in"
            onClick={onLoginClick}
            steps={[
              { icon: <LockIcon />, title: "Log in" },
              { icon: <LeafIcon />, title: "Calm loading" },
              { icon: "⌂", title: "Home" },
            ]}
          />

          <PathCard
            title="New user"
            buttonText="Create account"
            onClick={onCreateAccountClick}
            steps={[
              { icon: <UserPlusIcon />, title: "Create account" },
              { icon: <LeafIcon />, title: "Onboarding" },
              { icon: "⌂", title: "Home" },
            ]}
          />

          <PathCard
            tone="gold"
            title="Demo user"
            buttonText="Try demo"
            onClick={onTryDemoClick}
            steps={[
              { icon: <LeafIcon />, title: "Try demo" },
              { icon: <SlidersIcon />, title: "Choose setup" },
              { icon: "★", title: "Demo home" },
            ]}
          />
        </div>
      </section>

      {/* DEMO MODE */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/45 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-bloom-forest dark:text-bloom-light">
            Explore Bloom with demo mode
          </h2>

          <p className="mt-2 text-sm leading-6 text-bloom-forest/65 dark:text-gray-300">
            Demo mode uses sample data only. You can explore freely without
            creating an account.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <DemoCard
            title="Simple Day"
            text="A calm, realistic preview with one routine, one focus block, and gentle tasks."
            label="Great for a quick look"
            tone="gold"
          />

          <DemoCard
            title="Neurodivergent-friendly Day"
            text="A softer setup with low-pressure routines and recovery-friendly wording."
            label="Designed with care"
            tone="pink"
          />

          <DemoCard
            title="Parent / carer preview"
            text="Experience Bloom from a parent, carer, or teacher perspective."
            label="Support for carers"
            tone="gold"
          />

          <DemoCard
            title="Full App Preview"
            text="Explore Bloom with sample routines, focus sessions, moments, and settings."
            label="See the full experience"
            tone="sage"
          />
        </div>
      </section>

      {/* FEEDBACK */}
      <section id="feedback" className="scroll-mt-28">
        <FeedbackForm />
      </section>

      {/* ACCESSIBILITY */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/45 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
        <SectionTitle>Accessibility & trust</SectionTitle>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <AccessibilityItem
            title="Text size"
            text="Adjust text to what feels comfortable."
          />
          <AccessibilityItem
            title="Dyslexia-friendly"
            text="OpenDyslexic option available."
          />
          <AccessibilityItem
            title="Reduced motion"
            text="Smoother experience with less movement."
          />
          <AccessibilityItem
            title="Dark mode"
            text="Easy on the eyes, day or night."
          />
          <AccessibilityItem
            title="Calm visuals"
            text="Soft colours, gentle shapes, no clutter."
          />
        </div>

        <div className="mt-6 rounded-3xl bg-bloom-light/70 p-5 dark:bg-white/5">
          <p className="text-base font-bold text-bloom-forest dark:text-bloom-light">
            Privacy comes first
          </p>

          <p className="mt-2 text-sm leading-6 text-bloom-forest/70 dark:text-gray-300">
            Personal data is only saved when you create an account. Demo mode
            uses sample data, and nothing you do in demo mode is connected to a
            real user account yet.
          </p>
        </div>
      </section>
    </div>
  )
}      

export default Overview