import Seedling from "../components/ui/Seedling"
import FeedbackForm from "../components/feedback/FeedbackForm"

function LeafIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
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


function LockIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
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


function UserPlusIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
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


function HeartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6c-1.6-1.6-4.1-1.6-5.7 0L12 7.7 8.9 4.6c-1.6-1.6-4.1-1.6-5.7 0s-1.6 4.1 0 5.7L12 19l8.8-8.7c1.6-1.6 1.6-4.1 0-5.7z" />
    </svg>
  )
}


function ShieldIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 19 6v5c0 4.5-2.8 8.4-7 10-4.2-1.6-7-5.5-7-10V6l7-3z" />
      <path d="m9.5 12 1.7 1.7 3.8-4" />
    </svg>
  )
}


function SparkleIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3 14.2 8.8 20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3z" />
      <path d="M19 4v4" />
      <path d="M21 6h-4" />
    </svg>
  )
}


function SunSmallIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93 6.34 6.34" />
      <path d="M17.66 17.66 19.07 19.07" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M6.34 17.66 4.93 19.07" />
      <path d="M19.07 4.93 17.66 6.34" />
    </svg>
  )
}


function PlantIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20V10" />
      <path d="M12 10c-4-1-6-3-7-7 4 0 7 2 7 7z" />
      <path d="M12 12c4-1 6-3 7-7-4 0-7 2-7 7z" />
      <path d="M7 20h10" />
      <path d="M8 20l-1-5h10l-1 5" />
    </svg>
  )
}


function RefreshIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12a8 8 0 0 1-13.7 5.7" />
      <path d="M4 12A8 8 0 0 1 17.7 6.3" />
      <path d="M17 3v4h-4" />
      <path d="M7 21v-4h4" />
    </svg>
  )
}


function HomeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4 11.5 12 4l8 7.5v8a1 1 0 0 1-1 1h-5v-5h-4v5H5a1 1 0 0 1-1-1v-8z" />
    </svg>
  )
}


function BrainIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5a3 3 0 0 0-3 3 3 3 0 0 0-2 5.3A3.5 3.5 0 0 0 8 19h1V5z" />
      <path d="M15 5a3 3 0 0 1 3 3 3 3 0 0 1 2 5.3A3.5 3.5 0 0 1 16 19h-1V5z" />
      <path d="M9 9H7" />
      <path d="M15 9h2" />
      <path d="M9 14H7" />
      <path d="M15 14h2" />
    </svg>
  )
}


function PeopleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="9" r="3" />
      <circle cx="16" cy="9" r="3" />
      <path d="M3.5 20c.8-3.4 2.6-5 5-5" />
      <path d="M20.5 20c-.8-3.4-2.6-5-5-5" />
      <path d="M9.5 20c.6-2.5 1.5-3.8 2.5-3.8s1.9 1.3 2.5 3.8" />
    </svg>
  )
}


function RoundIconBadge({ children, tone = "sage" }) {
  const toneClasses = {
    sage: "bg-bloom-light text-bloom-forest",
    green: "bg-bloom-forest text-bloom-light",
    gold: "bg-[#f7df9e]/70 text-[#8a6a16]",
    pink: "bg-[#f4ccd3]/65 text-[#7a3b48]",
    cream: "bg-white/70 text-bloom-forest",
  }

  return (
    <span
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${toneClasses[tone]} dark:bg-white/10 dark:text-bloom-light`}
    >
      {children}
    </span>
  )
}


function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-bloom-mid dark:text-bloom-sage">
          {eyebrow}
        </p>
      )}

      <h2 className="text-2xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-3xl">
        {title}
      </h2>

      {text && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-bloom-forest/65 dark:text-gray-300 sm:text-base">
          {text}
        </p>
      )}
    </div>
  )
}


function TrustPill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-bloom-sage/20 bg-white/65 px-4 py-2 text-xs font-bold text-bloom-forest/65 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
      {children}
    </span>
  )
}


function FeatureCard({ icon, title, text }) {
  return (
    <article className="rounded-[1.75rem] border border-bloom-sage/25 bg-white/65 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
      <div className="mb-4">{icon}</div>

      <h3 className="text-base font-bold text-bloom-forest dark:text-bloom-light">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-bloom-forest/65 dark:text-gray-300">
        {text}
      </p>
    </article>
  )
}


function StartPathCard({ icon, title, text, buttonText, buttonIcon, onClick, featured = false }) {
  return (
    <article
      className={`flex h-full flex-col rounded-[1.75rem] border p-5 shadow-sm backdrop-blur-sm ${
        featured
          ? "border-[#e4c36b]/45 bg-white/70 text-bloom-forest dark:border-white/10 dark:bg-white/5 dark:text-bloom-light"
          : "border-bloom-sage/25 bg-white/65 text-bloom-forest dark:border-white/10 dark:bg-white/5 dark:text-bloom-light"
      }`}
    >
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${
          featured
            ? "bg-[#f7df9e]/65 text-[#8a6a16] dark:bg-white/10 dark:text-bloom-light"
            : "bg-bloom-light text-bloom-forest dark:bg-white/10 dark:text-bloom-light"
        }`}
      >
        {icon}
      </div>

      <h3 className="text-lg font-bold">{title}</h3>

      <p className="mt-3 flex-1 text-sm leading-6 text-bloom-forest/65 dark:text-gray-300">
        {text}
      </p>

      <button
        type="button"
        onClick={onClick}
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 ${
          featured
            ? "bg-[#d99a28] text-white hover:bg-[#bd8420]"
            : "bg-bloom-forest text-bloom-light hover:bg-bloom-mid"
        }`}
      >
        {buttonIcon && (
          <span className="text-current" aria-hidden="true">
            {buttonIcon}
          </span>
        )}
        {buttonText}
      </button>
    </article>
  )
}


function DemoPreviewCard({ icon, title, text, label, tone = "sage" }) {
  return (
    <article className="flex h-full flex-col rounded-[1.5rem] border border-bloom-sage/20 bg-white/65 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <RoundIconBadge tone={tone}>{icon}</RoundIconBadge>

        <span className="rounded-full bg-bloom-mint/30 px-3 py-1 text-[11px] font-bold text-bloom-forest/60 dark:bg-white/10 dark:text-gray-300">
          {label}
        </span>
      </div>

      <h3 className="text-base font-bold leading-tight text-bloom-forest dark:text-bloom-light">
        {title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-6 text-bloom-forest/60 dark:text-gray-300">
        {text}
      </p>
    </article>
  )
}


function AccessibilityCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-bloom-sage/20 bg-white/55 p-4 dark:border-white/10 dark:bg-white/5">
      <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-bloom-forest/60 dark:text-gray-300">
        {text}
      </p>
    </div>
  )
}


function HeroAppPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[320px] lg:rotate-[3deg]">
      {/* Soft decorative glow */}
      <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-bloom-mint/30 blur-2xl" />
      <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-[#f7df9e]/35 blur-2xl" />

      {/* Shadow layer behind the card */}
      <div className="absolute inset-6 rounded-[2.5rem] bg-black/10 blur-2xl dark:bg-black/25" />

      {/* Main card */}
      <div className="relative min-h-[620px] overflow-hidden rounded-[2.5rem] border border-bloom-sage/25 bg-white/78 p-5 shadow-[0_30px_80px_rgba(45,90,67,0.18)] backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        {/* Phone top bar */}
        <div className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-bloom-sage/30 dark:bg-white/20" />

        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
              Today in Bloom
            </p>

            <h3 className="mt-3 text-2xl font-bold leading-tight text-bloom-forest dark:text-bloom-light">
              A softer start
            </h3>

            <p className="mt-2 text-sm leading-6 text-bloom-forest/60 dark:text-gray-300">
              One calm step at a time.
            </p>
          </div>

          <span className="text-3xl">
            <Seedling variant="indigo" />
          </span>
        </div>

        <div className="space-y-4">
          {[
            ["Morning routine", "3 gentle steps", "Done"],
            ["Focus session", "One small task", "Next"],
            ["Bloom Moment", "Save something good", "Later"],
          ].map(([title, text, status]) => (
            <div
              key={title}
              className="rounded-[1.5rem] border border-bloom-sage/20 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
                    {title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-bloom-forest/55 dark:text-gray-400">
                    {text}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-bloom-light px-3 py-1 text-[11px] font-bold text-bloom-forest/65 dark:bg-white/10 dark:text-gray-300">
                  {status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[1.5rem] bg-bloom-light/75 p-4 text-sm leading-6 text-bloom-forest/70 dark:bg-white/10 dark:text-gray-300">
          Small steps count. Rest counts too.
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-dashed border-bloom-sage/25 bg-white/45 p-4 dark:border-white/10 dark:bg-white/5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-bloom-mid dark:text-bloom-sage">
            Gentle reminder
          </p>

          <p className="mt-2 text-sm leading-6 text-bloom-forest/65 dark:text-gray-300">
            You do not need to do everything today.
          </p>
        </div>
      </div>
    </div>
  )
}


function Overview({
  onLoginClick,
  onTryDemoClick,
  onCreateAccountClick,
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-transparent text-bloom-forest dark:bg-[#24242f] dark:text-bloom-light">
      <div className="pointer-events-none absolute left-[-10rem] top-20 h-80 w-80 rounded-full bg-bloom-mint/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-[32rem] h-96 w-96 rounded-full bg-[#f7df9e]/25 blur-3xl" />

      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8">
        {/* HERO */}
        <section className="grid min-h-[680px] items-start gap-10 py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.75fr)] lg:py-12">
          <div className="max-w-3xl pt-4 text-center lg:text-left">
            <div className="mb-5 flex flex-wrap justify-center gap-2 lg:justify-start">
              <TrustPill>
                <HeartIcon />
                No pressure
              </TrustPill>

              <TrustPill>
                <ShieldIcon />
                Accessibility-first
              </TrustPill>

              <TrustPill>
                <SparkleIcon />
                Demo available
              </TrustPill>
            </div>

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-bloom-mid dark:text-bloom-sage">
              Welcome to Bloom
            </p>

            <h1 className="text-4xl font-bold leading-[1.05] text-bloom-forest dark:text-bloom-light sm:text-5xl lg:text-6xl">
              A calmer way to build your day.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-bloom-forest/70 dark:text-gray-300 lg:mx-0">
              Bloom helps you create gentle routines, focus sessions, and daily
              steps without pressure, streaks, or shame.
            </p>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-bloom-forest/60 dark:text-gray-400 lg:mx-0">
              Designed for people who need structure, softness, and space to
              move at their own pace.
            </p>

            <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row lg:mx-0">
              <button
                type="button"
                onClick={onTryDemoClick}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-bloom-forest px-6 py-3.5 text-sm font-bold text-bloom-light shadow-[0_14px_28px_rgba(45,90,67,0.18)] transition hover:-translate-y-0.5 hover:bg-bloom-mid"
              >
                <PlantIcon className="h-4 w-4 text-white" />
                Try demo
              </button>

              <button
                type="button"
                onClick={onCreateAccountClick}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#9ca447] px-6 py-3.5 text-sm font-bold text-white shadow-[0_14px_28px_rgba(120,130,45,0.18)] transition hover:-translate-y-0.5 hover:bg-[#858d38]"
              >
                {<UserPlusIcon className="h-4 w-4" />}
                Create your space
              </button>

              <button
                type="button"
                onClick={onLoginClick}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-bloom-sage/30 bg-white/72 px-6 py-3.5 text-sm font-bold text-bloom-forest shadow-sm transition hover:-translate-y-0.5 hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
              >
                <LockIcon className="h-4 w-4" />
                Log in
              </button>
            </div>
          </div>

          <div className="pt-2 lg:pt-0">
            <HeroAppPreview />
          </div>
        </section>

        {/* WHAT BLOOM IS */}
        <section>
          <SectionHeader
            eyebrow="What Bloom is"
            title="A gentle space for routines, focus, progress, and memories."
            text="Bloom is built around small steps. It helps you organise the day without turning your wellbeing into a productivity score."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <FeatureCard
              icon={
                <RoundIconBadge tone="sage">
                  <LeafIcon />
                </RoundIconBadge>
              }
              title="Calm routines"
              text="Simple, supportive routines that help you feel more steady and in control."
            />

            <FeatureCard
              icon={
                <RoundIconBadge tone="gold">
                  <SunSmallIcon />
                </RoundIconBadge>
              }
              title="Focus support"
              text="Tools and timers to reduce overwhelm and help you build focus."
            />

            <FeatureCard
              icon={
                <RoundIconBadge tone="sage">
                  <PlantIcon />
                </RoundIconBadge>
              }
              title="Gentle progress"
              text="Small steps, kind tracking, and celebrating progress in your own time."
            />

            <FeatureCard
              icon={
                <RoundIconBadge tone="green">
                  <HeartIcon />
                </RoundIconBadge>
              }
              title="Accessibility first"
              text="Inclusive by design with neurodivergent-friendly features and choices."
            />
          </div>
        </section>

        {/* START YOUR WAY */}
        <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/45 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-7">
          <SectionHeader
            eyebrow="Start your way"
            title="Three simple paths, depending on what you need today."
            text="No guessing, no pressure. Choose the option that feels easiest."
          />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <StartPathCard
              icon={<LockIcon />}
              title="Returning to Bloom"
              text="Log in and return to your saved routines, focus tasks, progress, and moments."
              buttonText="Log in"
              buttonIcon={<LockIcon className="h-4 w-4" />}
              onClick={onLoginClick}
            />

            <StartPathCard
              icon={<UserPlusIcon />}
              title="New to Bloom ?"
              text="Create your space and slowly shape Bloom around your routines, preferences, and support needs."
              buttonText="Create account"
              buttonIcon={<UserPlusIcon className="h-4 w-4" />}
              onClick={onCreateAccountClick}
            />

            <StartPathCard
              featured
              icon={<LeafIcon />}
              title="Just looking around"
              text="Try demo mode first with sample routines and no account needed."
              buttonText="Try demo"
              buttonIcon={<LeafIcon className="h-4 w-4" />}
              onClick={onTryDemoClick}
            />
          </div>
        </section>

        {/* DEMO MODE */}
        <section>
          <SectionHeader
            eyebrow="Demo mode"
            title="Explore Bloom before creating an account."
            text="Demo mode gives you a calm preview with sample data, so you can see whether Bloom feels right for you."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <DemoPreviewCard
              icon={<SunSmallIcon />}
              title="Simple Day"
              text="One routine, one focus block, and a few gentle daily steps."
              label="Quick look"
              tone="gold"
            />

            <DemoPreviewCard
              icon={<BrainIcon />}
              title="Neurodivergent-friendly Day"
              text="Low-pressure wording, calm pacing, and soft recovery support."
              label="Soft setup"
              tone="pink"
            />

            <DemoPreviewCard
              icon={<PeopleIcon />}
              title="Parent / carer preview"
              text="A future-facing preview for support, guidance, and gentle structure."
              label="Planned"
              tone="gold"
            />

            <DemoPreviewCard
              icon={<SparkleIcon />}
              title="Full App Preview"
              text="Explore routines, focus, progress, moments, and settings together."
              label="Full demo"
              tone="sage"
            />
          </div>
        </section>

        {/* ACCESSIBILITY */}
        <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/45 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-7">
          <SectionHeader
            eyebrow="Accessibility & trust"
            title="Accessibility is part of Bloom, not an afterthought."
            text="Bloom includes display and comfort controls directly in the app so users can adjust the experience to what feels manageable."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <AccessibilityCard
              title="Text size"
              text="Choose a comfortable reading size."
            />

            <AccessibilityCard
              title="OpenDyslexic"
              text="Switch to a dyslexia-friendly font."
            />

            <AccessibilityCard
              title="Dark mode"
              text="Use Bloom in a softer low-light view."
            />

            <AccessibilityCard
              title="Reduced motion"
              text="Keep movement calm and minimal."
            />

            <AccessibilityCard
              title="Privacy-aware"
              text="Demo mode uses sample data. Account data belongs to your Bloom space."
            />
          </div>
        </section>

        {/* GENTLE SUPPORT */}
        <section className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="rounded-[2rem] border border-bloom-sage/25 bg-bloom-forest p-6 text-bloom-light shadow-sm dark:border-white/10 dark:bg-bloom-sage dark:text-bloom-forest">
            <p className="text-xs font-bold uppercase tracking-[0.22em] opacity-75">
              Gentle support
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight">
              It is okay to need help.
            </h2>

            <p className="mt-4 text-sm leading-7 opacity-80">
              Bloom can support gentle structure and reflection, but it is not a
              crisis service, therapy app, or medical tool.
            </p>
          </div>

          <div className="rounded-[2rem] border border-bloom-sage/25 bg-white/60 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-base font-bold text-bloom-forest dark:text-bloom-light">
              When support is needed
            </p>

            <p className="mt-3 text-sm leading-7 text-bloom-forest/65 dark:text-gray-300">
              If you are struggling, it is okay to reach out to someone you
              trust, a professional, a local support service, a crisis line, or
              emergency help if you are in immediate danger.
            </p>

            <p className="mt-4 text-sm leading-7 text-bloom-forest/65 dark:text-gray-300">
              Bloom is designed to be a gentle everyday space. It should sit
              alongside real support, not replace it.
            </p>
          </div>
        </section>

        {/* FEEDBACK */}
        <section id="feedback" className="scroll-mt-28">
          <FeedbackForm />
        </section>
      </main>
    </div>
  )
}

export default Overview