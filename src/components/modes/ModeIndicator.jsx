function ModeIndicator({
  mode,
  username = "",
  demoLabel = "Demo mode",
  variant = "header",
  onCreateAccount,
  onOpenMenu,
}) {
  const isDemo = mode === "demo"
  const isMobile = variant === "mobile"
  const isSidebar = variant === "sidebar"

  const title = isDemo
    ? isMobile
      ? "Demo"
      : demoLabel
    : isMobile
      ? "Saved"
      : "Personal account"

  const detail = isDemo
    ? "Not saved"
    : username
      ? `Signed in as ${username}`
      : "Progress saved"

  const handleClick = () => {
    if (onOpenMenu) {
      onOpenMenu()
      return
    }

    if (isDemo && onCreateAccount) {
      onCreateAccount()
    }
  }

  return (
    <div
      className={`flex min-w-0 items-center gap-2 ${
        isMobile
          ? "max-w-[150px]"
          : isSidebar
            ? "w-full"
            : ""
      }`}
    >
      <button
        type="button"
        onClick={handleClick}
        aria-label={
          isDemo
            ? `${demoLabel}. Changes are not saved.`
            : username
              ? `Personal account. Signed in as ${username}.`
              : "Personal account. Progress is saved."
        }
        className={`group flex min-w-0 items-center gap-2 rounded-full border text-left transition ${
          isMobile
            ? "px-3 py-2"
            : isSidebar
              ? "w-full px-3 py-2.5"
              : "px-3.5 py-2"
        } ${
          isDemo
            ? "border-amber-200/80 bg-amber-50/80 text-amber-900 hover:bg-amber-100 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-100"
            : "border-bloom-sage/30 bg-white/70 text-bloom-forest hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
        }`}
      >
        <span
          aria-hidden="true"
          className={`shrink-0 ${
            isDemo ? "animate-[pulse_1.2s_ease-in-out_1]" : ""
          } motion-reduce:animate-none`}
        >
          {isDemo ? "🌿" : "🌱"}
        </span>

        <span className="min-w-0">
          <span className="block truncate text-xs font-bold">
            {title}
          </span>

          <span
            className={`block truncate text-[11px] ${
              isDemo
                ? "text-amber-800/75 dark:text-amber-100/70"
                : "text-bloom-forest/55 dark:text-gray-300"
            }`}
          >
            {detail}
          </span>
        </span>

        {onOpenMenu && (
          <span
            aria-hidden="true"
            className="shrink-0 text-xs opacity-60 transition group-hover:opacity-100"
          >
            ▾
          </span>
        )}
      </button>

      {!isMobile && !isSidebar && isDemo && onCreateAccount && (
        <button
          type="button"
          onClick={onCreateAccount}
          className="shrink-0 rounded-full bg-bloom-forest px-4 py-2 text-xs font-bold text-bloom-light transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest"
        >
          Create account
        </button>
      )}
    </div>
  )
}

export default ModeIndicator