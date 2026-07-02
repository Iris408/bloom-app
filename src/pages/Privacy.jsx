import Seedling from "../components/ui/Seedling"

function InfoCard({ title, children }) {
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

function Privacy() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 pt-8 text-bloom-forest dark:text-bloom-light sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-3xl">
            <Seedling variant="indigo" />
          </span>

          <p className="text-sm font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
            Privacy
          </p>
        </div>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-bloom-forest dark:text-bloom-light md:text-5xl">
          Bloom is being built with privacy, trust, and user control in mind.
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-bloom-forest/75 dark:text-gray-300">
          Bloom is currently in a beta/frontend polish phase. This page explains
          how the current version handles demo mode, feedback, account features,
          and future data handling.
        </p>
      </section>

      {/* Current beta status */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-bloom-light/60 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Current beta privacy status
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          The current public demo is designed for safe exploration.
        </h2>

        <p className="mt-5 max-w-3xl text-sm leading-7 text-bloom-forest/75 dark:text-gray-300">
          Bloom’s current demo experience uses sample data and frontend storage.
          Full account creation, saved cloud data, and deeper backend features
          are planned for a later full-stack version.
        </p>
      </section>

      {/* Main privacy cards */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <InfoCard title="Demo mode uses sample data">
          <p>
            Demo mode is designed so testers and reviewers can explore Bloom
            without creating an account. The routines, tasks, focus sessions,
            and app examples shown in demo mode are sample data.
          </p>

          <p className="mt-3">
            Nothing you do in demo mode is connected to a real Bloom account.
          </p>
        </InfoCard>

        <InfoCard title="Feedback is local-only for now">
          <p>
            The beta feedback form currently saves feedback in your browser
            using localStorage. This means the feedback is stored locally on your
            device for this frontend beta version.
          </p>

          <p className="mt-3">
            It is not currently sent to a backend database or feedback inbox.
          </p>
        </InfoCard>

        <InfoCard title="Account creation is planned later">
          <p>
            Bloom’s account creation flow is currently a placeholder. Full
            account creation, onboarding, saved routines, and cross-device
            progress are planned for Bloom v2.0.0 and later.
          </p>

          <p className="mt-3">
            When those features are added, this privacy page will be updated
            to explain what data is saved, why it is saved, and how users can
            control it.
          </p>
        </InfoCard>

        <InfoCard title="No tracking or ads in the current beta">
          <p>
            Bloom's current beta version is focused on product testing,
            accessibility, demo mode, and frontend user experience.
          </p>

          <p className="mt-3">
            The current beta does not include advertising features or behaviour
            tracking.
          </p>
        </InfoCard>
      </section>

      {/* What may be stored */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Local browser storage
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          What Bloom may store locally during beta
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-bloom-light/70 p-4 dark:bg-white/5">
            <p className="font-bold text-bloom-forest dark:text-bloom-light">
              App preferences
            </p>

            <p className="mt-2 text-sm leading-6 text-bloom-forest/70 dark:text-gray-300">
              Settings such as display preferences, dark mode, font choices, or
              other local UI preferences.
            </p>
          </div>

          <div className="rounded-2xl bg-bloom-light/70 p-4 dark:bg-white/5">
            <p className="font-bold text-bloom-forest dark:text-bloom-light">
              Demo/app state
            </p>

            <p className="mt-2 text-sm leading-6 text-bloom-forest/70 dark:text-gray-300">
              Temporary frontend state used to make the demo and app experience
              feel realistic during testing.
            </p>
          </div>

          <div className="rounded-2xl bg-bloom-light/70 p-4 dark:bg-white/5">
            <p className="font-bold text-bloom-forest dark:text-bloom-light">
              Feedback entries
            </p>

            <p className="mt-2 text-sm leading-6 text-bloom-forest/70 dark:text-gray-300">
              Feedback submitted through the beta form may be saved locally in
              your browser for now.
            </p>
          </div>
        </div>
      </section>

      {/* User guidance */}
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Beta feedback guidance
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          Please avoid sharing sensitive personal information.
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-7 text-bloom-forest/75 dark:text-gray-300">
          <p>
            Bloom's feedback form is for general beta feedback only. Please do
            not include private, medical, financial, safeguarding, or highly
            sensitive personal details in feedback messages.
          </p>

          <p>
            Helpful feedback includes things like: what felt calm, what felt
            confusing, what was difficult to use on mobile, what accessibility
            features helped, and what would make Bloom easier to understand.
          </p>
        </div>
      </section>

      {/* Future privacy direction */}
      <section>
        <div className="mb-6 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
            Future privacy direction
          </p>

          <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
            Bloom's privacy approach will need to grow with the product.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <InfoCard title="v2.0.0 account features">
            <p>
              When real account creation is added, Bloom will clearly explain
              what information is saved and how it is used.
            </p>
          </InfoCard>

          <InfoCard title="Feedback collection">
            <p>
              If feedback is later sent to a backend or email inbox, the app
              should clearly explain where feedback goes and how it is handled.
            </p>
          </InfoCard>

          <InfoCard title="Education features">
            <p>
              Any future child, school, parent, carer, or teacher features will
              require much stronger privacy, consent, safeguarding, and data
              protection planning.
            </p>
          </InfoCard>
        </div>
      </section>

      {/* Last updated */}
      <section className="rounded-3xl border border-bloom-sage/25 bg-white/45 p-5 text-sm leading-7 text-bloom-forest/70 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
        <p>
          <span className="font-bold text-bloom-forest dark:text-bloom-light">
            Last updated:
          </span>{" "}
          June 2026
        </p>

        <p className="mt-2">
          This privacy note is written for Bloom's current beta/frontend version
          and will be reviewed again before any full account, backend,
          analytics, or education-focused release.
        </p>
      </section>
    </div>
  )
}

export default Privacy