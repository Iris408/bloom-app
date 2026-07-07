import { useEffect, useMemo, useState } from "react"

const tutorialSteps = {
  landing: [
    {
      icon: "🌱",
      title: "Welcome to Bloom",
      text: "Bloom helps you build calm routines, one small step at a time. No streaks, no pressure, no shame.",
    },
    {
      icon: "🗺",
      title: "Three ways to start",
      text: "Try demo with sample data, create your own space to save your progress, or log in to return to your Bloom.",
    },
    {
      icon: "☁️",
      title: "One thing to know",
      text: "Bloom is not a productivity tracker. Start when you are ready and return without pressure.",
    },
  ],

  demo: [
    {
      icon: "🌱",
      title: "Hi there! You are now in demo mode",
      text: "Everything you see is sample data." + " Nothing personal - Explore freely!",
    },
    {
      icon: "✓",
      title: "Try completing a task",
      text: "Tap the circle on any task card to mark it as done. That small moment is what Bloom is built around.",
    },
    {
      icon: "📋",
      title: "Explore your routines",
      text: "Feel free to visit Routines to explore starter sequences or gently build one that fits your day.",
    },
    {
      icon: "💾",
      title: "Want to save your progress?",
      text: "Create your space to save routines, settings, and progress - yours to return to at anytime.",
    },
  ],

  app: [
    {
      icon: "🏠",
      title: "This is your Home",
      text: "Your tasks for today live here. Start with something small - it's okay to take it slow.",
    },
    {
      icon: "📋",
      title: "Build gentle routines",
      text: "Routines are small step-by-step guides to follow at your own pace - No deadlines, no pressure.",
    },
    {
      icon: "🎯",
      title: "One thing at a time",
      text: "Pick one thing. Set a timer if it helps. Stop whenever you need to - that is always okay.",
    },
    {
      icon: "📊",
      title: "Your gentle progress",
      text: "Progress shows what you completed - not what you missed. Small steps count too.",
    },
  ],
}

const tutorialSurfaceMeta = {
  landing: {
    buttonLabel: "Start here",
    eyebrow: "Bloom guide",
    title: "Public guide",
  },
  demo: {
    buttonLabel: "Demo start",
    eyebrow: "Demo guide",
    title: "Demo mode guide",
  },
  app: {
    buttonLabel: "App guide",
    eyebrow: "Bloom app guide",
    title: "Protected app guide",
  },
}

function TutorialPanel({
  surface = "landing",
  reduceMotion = false,
  onCreateAccount,
}) {
  const steps = tutorialSteps[surface] ?? tutorialSteps.landing
  const surfaceMeta = tutorialSurfaceMeta[surface] ?? tutorialSurfaceMeta.landing

  const storagePrefix = `bloom-${surface}-tutorial`

  const stepKey = `${storagePrefix}-step`
  const dismissedKey = `${storagePrefix}-dismissed`

  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const step = useMemo(
    () => steps[currentStep] ?? steps[0],
    [currentStep, steps],
  )

  const isLastStep = currentStep === steps.length - 1

  function saveStep(nextStep) {
    setCurrentStep(nextStep)
    localStorage.setItem(stepKey, String(nextStep))
  }

  function handleNext() {
    if (isLastStep) {
      setIsOpen(false)
      setCurrentStep(0)
      return
    }

    setCurrentStep((step) => step + 1)
  }

  function handleBack() {
    if (currentStep === 0) return

    setCurrentStep((step) => step - 1)
  }

  function handleToggle() {
    setIsOpen((current) => {
      const nextOpenState = !current

      if (nextOpenState) {
        setCurrentStep(0)
      }

      return nextOpenState
    })
  }

  function handleClose() {
    setIsOpen(false)
    setCurrentStep(0)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-40 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-bloom-forest px-4 text-xs font-bold text-bloom-light shadow-lg transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest dark:hover:bg-bloom-light"
        aria-label={isOpen ? "Close Bloom guide" : "Open Bloom guide"}
        title="How to use Bloom"
      >
        <span aria-hidden="true">{isOpen ? "𝒙" : "?"}</span>
        {!isOpen && <span>{surfaceMeta.buttonLabel}</span>}
      </button>

      {isOpen && (
        <aside
          className={`fixed bottom-18 right-4 z-40 flex w-[min(20rem,calc(100vw-2rem))] flex-col rounded-[1.75rem] border border-bloom-sage/25 bg-white/92 p-4 text-bloom-forest shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-[#252532]/95 dark:text-bloom-light sm:bottom-20 sm:right-5 sm:w-[21rem] sm:p-5 ${
            reduceMotion
              ? "animate-none"
              : "transition duration-300 ease-out"
          }`}
          aria-label="Bloom tutorial"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bloom-mid dark:text-bloom-sage">
              Step {currentStep + 1} of {steps.length}
            </p>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full px-2 text-sm font-bold text-bloom-forest/50 transition hover:text-bloom-forest dark:text-gray-300 dark:hover:text-bloom-light"
              aria-label="Close tutorial panel"
            >
              𝒙
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col"> 
            <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-bloom-light text-2xl dark:bg-white/10">
              {step.icon}
            </div>
          </div>

          <h2 className="text-lg font-bold leading-tight text-bloom-forest dark:text-bloom-light">
            {step.title}
          </h2>

          <p className="mt-3 text-sm leading-7 text-bloom-forest/65 dark:text-gray-300">
            {step.text}
          </p>

          {surface === "demo" && isLastStep && onCreateAccount && (
            <button
              type="button"
              onClick={onCreateAccount}
              className="mt-5 w-full rounded-2xl bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest dark:hover:bg-bloom-light"
            >
              Create your space
            </button>
          )}

            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-2xl border border-bloom-sage/25 bg-white/65 px-4 py-2 text-sm font-bold text-bloom-forest transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
                >
                  Back
                </button>
              )}

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