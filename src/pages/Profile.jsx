import FontSizeSlider from "../components/ui/FontSizeSlider"
import DyslexicFontToggle from "../components/ui/DyslexicFontToggle"
import ReduceMotionToggle from "../components/ui/ReduceMotionToggle"
import BloomReminder from "../components/ui/BloomReminder"

function Profile() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-3xl flex-col gap-6 overflow-x-hidden px-4 pb-28 sm:gap-8 sm:px-0 sm:pb-0">
      <section className="w-full min-w-0 max-w-full overflow-hidden">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
          Profile
        </p>

        <h2 className="break-words text-4xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-4xl">
          Profile & Settings
        </h2>

        <p className="mt-4 max-w-2xl break-words text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          Make Bloom feel more like you.
        </p>
      </section>

      {/* EN: Appearance and accessibility settings */}
      {/* JP: 表示とアクセシビリティ設定 */}
      <section className="flex w-full min-w-0 max-w-full flex-col gap-4 overflow-hidden">
        <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
          Appearance
        </p>

        <div className="flex w-full min-w-0 max-w-full flex-col gap-6 overflow-hidden rounded-2xl border border-bloom-sage/30 bg-white/80 p-5 dark:border-dark-border dark:bg-dark-surface/55 sm:p-6">
          <FontSizeSlider />

          <div className="flex w-full min-w-0 flex-col gap-5 border-t border-bloom-sage/20 pt-6 dark:border-dark-border">
            <DyslexicFontToggle />
            <ReduceMotionToggle />
          </div>
        </div>
      </section>

      <BloomReminder
        reminder="Your settings are yours to change — anytime, no questions asked."
        phaseTitle="Profile v1"
        phaseDescription="This page will later manage accessibility preferences, user modes, and personalised routine settings."
      />
    </div>
  )
}

export default Profile