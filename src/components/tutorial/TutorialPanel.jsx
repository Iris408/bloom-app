// EN: Tutorial panel — contextual guide for landing, demo, and app surfaces
// JP: チュートリアルパネル — ランディング・デモ・アプリ画面向けのガイド

import { useMemo, useState } from "react"

const tutorialSteps = {
  landing: [
    {
      icon: "🌱",
      title: "Welcome to Bloom",
      text: "ꕤ Build calm routines one small step at a time. No streaks, pressure, or guilt.",
    },
    {
      icon: "🗺️",
      title: "Choose how to begin",
      text: "ꕤ Try the demo, create your own space, or log in to continue where you left off.",
    },
  ],

  demo: [
    {
      icon: "🌱",
      title: "You are in demo mode",
      text: "Everything here is sample data. Nothing is saved, so you can explore freely.",
    },
    {
      icon: "ꕤ",
      title: "Try one small step",
      text: "Complete a task, start focus mode, or open a routine to see how Bloom works.",
    },
  ],

  app: [
    {
      icon: "🏡",
      title: "Start from Home",
      text: "ꕤ See today's tasks and begin with one small step. You do not need to finish everything.",
    },
    {
      icon: "🗒️",
      title: "Use routines for support",
      text: "ꕤ Break activities into gentle, manageable steps and complete them at your own pace.",
    },
    {
      icon: "📊",
      title: "Progress without pressure",
      text: "ꕤ This page shows what you showed up for. Small steps count just as much as big ones.",
    },
    {
      icon: "🌿",
      title: "Explore at your own pace",
      text: "ꕤ Focus, Moments, and Settings are here whenever you are ready. There is no right order.",
    },
  ],
}

const tutorialSurfaceMeta = {
  landing: { buttonLabel: "Start here" },
  demo:    { buttonLabel: "Demo guide" },
  app:     { buttonLabel: "Bloom guide" },
}

// EN: Step dots — visual progress indicator
// JP: ステップドット — 視覚的な進捗インジケーター
function StepDots({ total, current }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === current
              ? "w-4 bg-bloom-forest dark:bg-bloom-sage"
              : "w-1.5 bg-bloom-sage/30 dark:bg-white/20"
          }`}
        />
      ))}
    </div>
  )
}

function TutorialPanel({
  surface = "landing",
  reduceMotion = false,
  onCreateAccount,
}) {
  const steps      = tutorialSteps[surface] ?? tutorialSteps.landing
  const surfaceMeta = tutorialSurfaceMeta[surface] ?? tutorialSurfaceMeta.landing

  const [isOpen, setIsOpen]           = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const step = useMemo(
    () => steps[currentStep] ?? steps[0],
    [currentStep, steps],
  )

  const isLastStep  = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  const triggerPosition =
    surface === "app"
      ? "bottom-24 sm:bottom-6"
      : "bottom-5 sm:bottom-6"

  const panelPosition =
    surface === "app"
      ? "bottom-36 sm:bottom-20"
      : "bottom-20 sm:bottom-20"

  // EN: Move to next step or close on last step
  // JP: 次のステップへ進む、最終ステップでは閉じる
  function handleNext() {
    if (isLastStep) {
      handleClose()

      // EN: Mark this surface tutorial as complete in localStorage
      // JP: このサーフェスのチュートリアルを完了としてlocalStorageに保存
      try {
        localStorage.setItem(`bloom-tutorial-${surface}-done`, "true")
      } catch {
        // EN: localStorage unavailable — continue silently
        // JP: localStorage が利用不可 — 継続します
      }

      return
    }

    setCurrentStep((current) => current + 1)
  }

  function handleBack() {
    setCurrentStep((current) => Math.max(current - 1, 0))
  }

  // EN: Toggle open/close, always reset to step 0 on open
  // JP: 開閉トグル、開くときは常にステップ0にリセット
  function handleToggle() {
    setIsOpen((current) => {
      const nextState = !current
      if (nextState) setCurrentStep(0)
      return nextState
    })
  }

  function handleClose() {
    setIsOpen(false)
    setCurrentStep(0)
  }

  return (
    <>
      {/* ── Trigger button ── */}
      <button
        type="button"
        onClick={handleToggle}
        className={`fixed right-4 z-40 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-bloom-forest px-4 text-xs font-bold text-bloom-light shadow-lg transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest dark:hover:bg-bloom-light ${triggerPosition} ${
          !isOpen && surface === "demo" ? "bloom-guide-jump" : ""
        }`}
        aria-label={isOpen ? "Close Bloom guide" : "Open Bloom guide"}
        aria-expanded={isOpen}
        title="How to use Bloom"
      >
        {/* EN: Always show ? — close is handled by panel's own button */}
        {/* JP: 常に ? を表示 — 閉じるはパネル内のボタンで行う */}
        <span aria-hidden="true">?</span>

        {!isOpen && <span>{surfaceMeta.buttonLabel}</span>}
      </button>

      {/* ── Tutorial panel ── */}
      {isOpen && (
        <aside
          className={`fixed right-4 z-40 flex w-[min(20rem,calc(100vw-2rem))] flex-col rounded-[1.75rem] border border-bloom-sage/25 bg-white/95 p-4 text-bloom-forest shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-[#252532]/95 dark:text-bloom-light sm:bottom-20 sm:right-5 sm:w-[21rem] sm:p-5 ${panelPosition} ${
            reduceMotion ? "animate-none" : "transition duration-300 ease-out"
          }`}
          role="dialog"
          aria-modal="false"
          aria-label={`${surfaceMeta.buttonLabel}, step ${currentStep + 1} of ${steps.length}`}
        >

          {/* ── Panel header — dots + close ── */}
          <div className="mb-4 flex items-center justify-between gap-4">
            <StepDots total={steps.length} current={currentStep} />

            <button
              type="button"
              onClick={handleClose}
              className="rounded-full px-2 text-sm font-bold text-bloom-forest/50 transition hover:text-bloom-forest dark:text-gray-300 dark:hover:text-bloom-light"
              aria-label="Close tutorial panel"
            >
              x
            </button>
          </div>

          {/* ── Step icon ── */}
          <div
            className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-bloom-light text-2xl dark:bg-white/10"
            aria-hidden="true"
          >
            {step.icon}
          </div>

          {/* ── Step content ── */}
          <h2 className="text-lg font-bold leading-tight text-bloom-forest dark:text-bloom-light">
            {step.title}
          </h2>

          {/* EN: min-h prevents panel height jumping between steps */}
          {/* JP: min-h でステップ間のパネル高さの変化を防ぎます */}
          <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-bloom-forest/70 dark:text-gray-300">
            {step.text}
          </p>

          {/* EN: "Create your space" CTA — demo surface, last step only */}
          {/* JP: デモ画面の最終ステップのみ「スペースを作る」CTAを表示 */}
          {surface === "demo" && isLastStep && onCreateAccount && (
            <button
              type="button"
              onClick={onCreateAccount}
              className="mt-5 w-full rounded-xl bg-bloom-forest px-4 py-3 text-sm font-bold text-bloom-light transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest dark:hover:bg-bloom-light"
            >
              Create your space
            </button>
          )}

          {/* ── Navigation — back + next/got it ── */}
          <div className="mt-5 flex items-center gap-2">

            {/* EN: Back button — hidden on first step */}
            {/* JP: 戻るボタン — 最初のステップでは非表示 */}
            {!isFirstStep && (
              <button
                type="button"
                onClick={handleBack}
                className="rounded-2xl border border-bloom-sage/25 bg-white/65 px-4 py-2 text-sm font-bold text-bloom-forest transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
              >
                Back
              </button>
            )}

            {/* EN: Next or Got it on last step */}
            {/* JP: 最終ステップでは「Got it」を表示 */}
            <button
              type="button"
              onClick={handleNext}
              className="rounded-2xl bg-bloom-forest px-4 py-2 text-sm font-bold text-bloom-light transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest dark:hover:bg-bloom-light"
            >
              {isLastStep ? "Got it" : "Next"}
            </button>

          </div>
        </aside>
      )}
    </>
  )
}

export default TutorialPanel