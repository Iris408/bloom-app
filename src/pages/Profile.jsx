import { useEffect, useMemo, useState } from "react"

import FontSizeSlider from "../components/ui/FontSizeSlider"
import DyslexicFontToggle from "../components/ui/DyslexicFontToggle"
import ReduceMotionToggle from "../components/ui/ReduceMotionToggle"

function Profile() {
  return (
    <div className="flex w-full min-w-0 max-w-3xl flex-col gap-6 overflow-x-hidden pb-28 sm:gap-8 sm:pb-0">
      <section className="w-full min-w-0 max-w-full overflow-hidden">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-bloom-mid dark:text-blue-500/80">
          <span aria-hidden="true">ꕤ</span>
          Your Space
        </p>

        <h2 className="break-words text-4xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-4xl">
          Profile
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

      <section className="w-full max-w-full overflow-hidden rounded-2xl border border-bloom-sage/25 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
          Bloom reminder
        </p>

        <blockquote className="break-words text-base font-semibold leading-relaxed text-bloom-forest dark:text-bloom-light">
          “Your profile isn't a scorecard."
          "It's a space that adapts to you — not the other way around.”
        </blockquote>

        <div className="mt-5 rounded-2xl bg-bloom-forest p-5 text-bloom-light dark:bg-dark-surface">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-bloom-mint dark:text-bloom-mid">
            Current phase
          </p>

          <h3 className="mb-2 break-words text-lg font-bold text-bloom-light">
            Profile v2.0.0
          </h3>

          <p className="break-words text-sm leading-relaxed text-bloom-light/90">
            Profile is now separate from Settings and focused on identity, Bloom
            preferences, goals, and avatar choices.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Profile