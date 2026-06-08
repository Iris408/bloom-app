import FontSizeSlider from '../components/ui/FontSizeSlider'
import DyslexicFontToggle from '../components/ui/DyslexicFontToggle'
import ReduceMotionToggle from '../components/ui/ReduceMotionToggle'
import BloomReminder from '../components/ui/BloomReminder'

function Profile() {
  return (
    <div className="flex flex-col gap-8 max-w-lg">
      <div>
      <h2 className="text-2xl font-bold text-bloom-forest dark:text-bloom-light">
        ⌖ Profile & Settings
      </h2>
      </div>

      {/* Appearance section */}
      <div className="flex flex-col gap-4">

        <p className="text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-bloom-sage">
          Appearance
        </p>

        <div className="bg-white dark:bg-dark-surface border border-bloom-sage/30 dark:border-dark-border rounded-2xl p-6 flex flex-col gap-6">
          <FontSizeSlider />

          <div className="border-t border-bloom-sage/20 dark:border-dark-border pt-6 flex flex-col gap-5">
            <DyslexicFontToggle />
            <ReduceMotionToggle />
          </div>
        </div>
      </div>

      <BloomReminder
        reminder="Your settings are yours to change — anytime, no questions asked.."
        phaseTitle="Profile v1"
        phaseDescription="This page will later manage accessibility preferences, user modes, and personalised routine settings."
      />

    </div>
  )
}

export default Profile
