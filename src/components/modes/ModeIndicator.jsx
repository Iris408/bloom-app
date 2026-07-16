function ModeIndicator({
  mode,
  username = "",
  onCreateAccount,
  onOpenProfile,
}) {
  const isDemo = mode === "demo"

  return (
    <section
      aria-label={isDemo ? "Demo mode status" : "Account status"}
      className={`mt-4 flex flex-col gap-3 rounded-2xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${
        isDemo
          ? "border-amber-200/70 bg-amber-50/70 dark:border-amber-300/20 dark:bg-amber-300/10"
          : "border-bloom-sage/30 bg-white/65 dark:border-white/10 dark:bg-white/5"
      }`}
    >
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-sm font-bold text-bloom-forest dark:text-bloom-light">
          <span aria-hidden="true">
            {isDemo ? "🌿" : "🌱"}
          </span>

          {isDemo ? "Demo mode" : "Personal account"}
        </p>

        <p className="mt-1 text-sm leading-5 text-bloom-forest/65 dark:text-gray-300">
          {isDemo
            ? "Sample data · Changes are not saved"
            : username
              ? `Signed in as ${username} · Your progress is saved`
              : "Your progress is saved"}
        </p>
      </div>

      {isDemo && onCreateAccount && (
        <button
          type="button"
          onClick={onCreateAccount}
          className="shrink-0 rounded-full bg-bloom-forest px-4 py-2 text-sm font-bold text-bloom-light transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest"
        >
          Create account
        </button>
      )}

      {!isDemo && onOpenProfile && (
        <button
          type="button"
          onClick={onOpenProfile}
          className="shrink-0 rounded-full border border-bloom-sage/30 bg-white/70 px-4 py-2 text-sm font-bold text-bloom-forest transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
        >
          View profile
        </button>
      )}
    </section>
  )
}

export default ModeIndicator