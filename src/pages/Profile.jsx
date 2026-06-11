import FontSizeSlider from "../components/ui/FontSizeSlider"
import DyslexicFontToggle from "../components/ui/DyslexicFontToggle"
import ReduceMotionToggle from "../components/ui/ReduceMotionToggle"
import BloomReminder from "../components/ui/BloomReminder"

function Profile() {
  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
          Profile
        </p>

        <h2 className="text-3xl font-bold text-bloom-forest dark:text-bloom-light">
          Profile & Settings
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          Make Bloom feel more like you.
        </p>
      </section>

      {/* EN: Appearance and accessibility settings */}
      {/* JP: 表示とアクセシビリティ設定 */}
      <section className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
          Appearance
        </p>

        <div className="flex flex-col gap-6 rounded-2xl border border-bloom-sage/30 bg-white/80 p-5 dark:border-dark-border dark:bg-dark-surface/55 sm:p-6">
          <FontSizeSlider />

          <div className="flex flex-col gap-5 border-t border-bloom-sage/20 pt-6 dark:border-dark-border">
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