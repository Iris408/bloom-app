import FontSizeSlider from "../components/ui/FontSizeSlider"
import DyslexicFontToggle from "../components/ui/DyslexicFontToggle"
import ReduceMotionToggle from "../components/ui/ReduceMotionToggle"

function SettingsRow({ icon, title, description, rightText }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white/70 px-4 py-4 shadow-sm dark:bg-white/5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bloom-light text-base text-bloom-forest dark:bg-white/10 dark:text-bloom-light">
        {icon}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
          {title}
        </p>

        {description && (
          <p className="mt-1 break-words text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
            {description}
          </p>
        )}
      </div>

      {rightText && (
        <p className="shrink-0 rounded-full bg-bloom-light px-3 py-1 text-xs font-semibold text-bloom-forest/70 dark:bg-white/10 dark:text-gray-300">
          {rightText}
        </p>
      )}
    </div>
  )
}

function SettingsSection({ label, children }) {
  return (
    <section className="flex flex-col gap-3">
      <p className="px-1 text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
        {label}
      </p>

      <div className="rounded-[1.75rem] border border-bloom-sage/25 bg-white/45 p-3 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-4">
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </section>
  )
}

function Settings({ currentUser = null, isDemoMode = false, onLogout }) {
  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-6 overflow-x-hidden pb-28 sm:gap-8 sm:pb-0">
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-7">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Settings
        </p>

        <h2 className="break-words text-3xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-4xl">
          Account settings
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-bloom-forest/70 dark:text-gray-300">
          Manage privacy, subscription options, account controls, and display
          preferences separately from your Bloom profile.
        </p>

        <div className="mt-5 rounded-2xl bg-bloom-light/70 px-4 py-3 text-sm text-bloom-forest/75 dark:bg-white/10 dark:text-gray-300">
          {isDemoMode
            ? "Demo mode uses sample data only. Settings shown here are a preview."
            : currentUser?.email
              ? `Signed in as ${currentUser.email}`
              : "Signed in account details will appear here."}
        </div>
      </section>

      <SettingsSection label="Subscription">
        <SettingsRow
          icon="♢"
          title="Bloom plan"
          description="Subscription controls will be added after the core v2.0.0 account foundation is stable."
          rightText="Free"
        />

        <SettingsRow
          icon="✦"
          title="Manage subscription"
          description="Future place for plan changes, billing, receipts, and subscription status."
          rightText="Planned"
        />
      </SettingsSection>

      <SettingsSection label="Privacy">
        <SettingsRow
          icon="◌"
          title="Privacy centre"
          description="Review how Bloom stores account data, preferences, feedback, and future saved routines."
          rightText="v2.0"
        />

        <SettingsRow
          icon="✓"
          title="Demo data"
          description="Demo mode stays separate from real account data and uses sample information only."
          rightText="Safe"
        />

        <SettingsRow
          icon="!"
          title="Delete account"
          description="Account deletion controls should be added before wider public account use."
          rightText="Later"
        />
      </SettingsSection>

      <SettingsSection label="Display and accessibility">
        <div className="rounded-2xl bg-white/70 px-4 py-4 shadow-sm dark:bg-white/5">
          <FontSizeSlider />
        </div>

        <div className="rounded-2xl bg-white/70 px-4 py-4 shadow-sm dark:bg-white/5">
          <DyslexicFontToggle />
        </div>

        <div className="rounded-2xl bg-white/70 px-4 py-4 shadow-sm dark:bg-white/5">
          <ReduceMotionToggle />
        </div>
      </SettingsSection>

      <SettingsSection label="Account">
        <SettingsRow
          icon="@"
          title="Email"
          description={currentUser?.email || "No connected account email available."}
        />

        <SettingsRow
          icon="⌁"
          title="Security"
          description="Password reset, email verification, and session management can be added later."
          rightText="Planned"
        />

        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            className="rounded-2xl bg-bloom-forest px-5 py-4 text-left text-sm font-bold text-white shadow-sm transition hover:bg-bloom-mid"
          >
            Log out
          </button>
        )}
      </SettingsSection>

      <section className="w-full max-w-full overflow-hidden rounded-2xl border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
          Bloom reminder
        </p>

        <blockquote className="break-words text-base font-semibold leading-relaxed text-bloom-forest dark:text-bloom-light">
          “Settings are for control. Profile is for personal support.”
        </blockquote>

        <div className="mt-5 rounded-2xl bg-bloom-forest p-5 text-bloom-light dark:bg-dark-surface">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-bloom-mint dark:text-bloom-mid">
            Current phase
          </p>

          <h3 className="mb-2 break-words text-lg font-bold text-bloom-light">
            Settings v2.0.0
          </h3>

          <p className="break-words text-sm leading-relaxed text-bloom-light/90">
            Settings is now separate from Profile and focused on privacy,
            subscription, account controls, and display preferences.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Settings