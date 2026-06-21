function Privacy() {
  return (
    <main className="min-h-screen p-6 lg:p-10">
      <section className="mx-auto max-w-4xl rounded-3xl border border-bloom-sage bg-white p-8 shadow dark:border-bloom-mint dark:bg-dark-surface">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-bloom-mid">
          Privacy
        </p>

        <h1 className="mb-4 text-4xl font-bold text-bloom-forest dark:text-bloom-light">
          Privacy and data
        </h1>

        <div className="space-y-5 leading-relaxed text-gray-600 dark:text-gray-300">
          <p>
            Bloom is currently an early beta project. The privacy approach is to
            keep the app simple, transparent, and careful with user data.
          </p>

          <p>
            During the beta stage, Bloom is focused on testing the core app
            experience. Future versions may include accounts, backend storage,
            and cross-device syncing, but those features will be handled with
            clear privacy rules before release.
          </p>

          <p>
            Bloom does not currently include premium features, paid plans, or
            locked content in the beta version.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Privacy;