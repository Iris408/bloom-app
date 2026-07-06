import FeedbackForm from "../components/feedback/FeedbackForm"

function FeedbackPage() {
  return (
    <div className="relative min-h-screen w-full bg-transparent px-4 pb-16 pt-28 text-bloom-forest dark:text-bloom-light sm:px-6 sm:pt-32 lg:px-8">
      <main className="mx-auto w-full max-w-5xl">
        <section className="mb-8 rounded-[2rem] border border-bloom-sage/25 bg-white/55 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-bloom-mid dark:text-bloom-sage">
            Feedback
          </p>

          <h1 className="text-3xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-4xl">
            Help shape Bloom.
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-bloom-forest/65 dark:text-gray-300 sm:text-base">
            Bloom is still growing. Your feedback helps improve the app’s
            routines, focus tools, accessibility controls, wording, layout, and
            overall feeling.
          </p>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-bloom-forest/65 dark:text-gray-300">
            Please avoid sharing private, medical, or crisis information in this
            form. Feedback is used only to understand what feels helpful,
            confusing, calming, or difficult inside Bloom.
          </p>
        </section>

        <FeedbackForm />
      </main>
    </div>
  )
}

export default FeedbackPage