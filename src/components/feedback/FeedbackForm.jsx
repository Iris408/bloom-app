import { useState } from "react"

const feedbackCategories = [
  "Demo mode",
  "Landing page",
  "Routines",
  "Focus",
  "Moments",
  "Progress",
  "Accessibility",
  "Mobile layout",
  "Other",
]

const feelingOptions = [
  "Calm",
  "Helpful",
  "Gentle",
  "Confusing",
  "Too busy",
  "Too typical",
  "Feels like something is missing",
]

const deviceOptions = ["Mobile", "Tablet", "Desktop", "Other"]

function FeedbackForm() {
  const [category, setCategory] = useState("Demo mode")
  const [feeling, setFeeling] = useState("Calm")
  const [device, setDevice] = useState("Mobile")
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    const feedbackEntry = {
      id: crypto.randomUUID(),
      category,
      feeling,
      device,
      message,
      email,
      createdAt: new Date().toISOString(),
    }

    // EN: Frontend-only beta storage for now.
    // JP: 現時点ではフロントエンドのみのベータ用保存です。
    const existingFeedback = JSON.parse(
      localStorage.getItem("bloom-beta-feedback") || "[]"
    )

    localStorage.setItem(
      "bloom-beta-feedback",
      JSON.stringify([feedbackEntry, ...existingFeedback])
    )

    setIsSubmitted(true)
    setMessage("")
    setEmail("")
  }

  if (isSubmitted) {
    return (
      <section className="rounded-[2rem] border border-bloom-sage/25 bg-white/65 p-6 text-center shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Feedback received
        </p>

        <h3 className="text-2xl font-bold text-bloom-forest dark:text-bloom-light">
          Thank you for helping Bloom grow.
        </h3>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-bloom-forest/75 dark:text-gray-300">
          Your feedback has been saved locally in this browser for the beta version. Later,
          Bloom can connect this form to a backend or feedback inbox.
        </p>

        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="mt-6 rounded-full bg-bloom-mid px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-bloom-forest"
        >
          Send another note
        </button>
      </section>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-bloom-sage/25 bg-white/65 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
    >
      <div className="mb-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Beta feedback
        </p>

        <h3 className="text-2xl font-bold text-bloom-forest dark:text-bloom-light">
          Help shape Bloom gently.
        </h3>

        <p className="mt-3 text-sm leading-7 text-bloom-forest/75 dark:text-gray-300">
          Share what felt helpful, confusing, calming, or missing. Please avoid
          including private or sensitive personal information.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-bloom-forest dark:text-bloom-light">
            What were you testing?
          </span>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-2xl border border-bloom-sage/30 bg-white px-4 py-3 text-sm text-bloom-forest outline-none transition focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:border-white/10 dark:bg-white/10 dark:text-bloom-light"
          >
            {feedbackCategories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-bloom-forest dark:text-bloom-light">
            How did Bloom feel?
          </span>

          <select
            value={feeling}
            onChange={(event) => setFeeling(event.target.value)}
            className="rounded-2xl border border-bloom-sage/30 bg-white px-4 py-3 text-sm text-bloom-forest outline-none transition focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:border-white/10 dark:bg-white/10 dark:text-bloom-light"
          >
            {feelingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-bloom-forest dark:text-bloom-light">
            Device
          </span>

          <select
            value={device}
            onChange={(event) => setDevice(event.target.value)}
            className="rounded-2xl border border-bloom-sage/30 bg-white px-4 py-3 text-sm text-bloom-forest outline-none transition focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:border-white/10 dark:bg-white/10 dark:text-bloom-light"
          >
            {deviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 flex flex-col gap-2">
        <span className="text-sm font-semibold text-bloom-forest dark:text-bloom-light">
          Your feedback
        </span>

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={5}
          required
          placeholder="What worked well? What felt unclear? What would make Bloom easier or calmer to use?"
          className="resize-none rounded-2xl border border-bloom-sage/30 bg-white px-4 py-3 text-sm leading-6 text-bloom-forest outline-none transition placeholder:text-bloom-forest/40 focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:placeholder:text-gray-500"
        />
      </label>

      <label className="mt-5 flex flex-col gap-2">
        <span className="text-sm font-semibold text-bloom-forest dark:text-bloom-light">
          Optional email
        </span>

        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Only if you're happy to be contacted later"
          className="rounded-2xl border border-bloom-sage/30 bg-white px-4 py-3 text-sm text-bloom-forest outline-none transition placeholder:text-bloom-forest/40 focus:border-bloom-mid focus:ring-2 focus:ring-bloom-mint/40 dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:placeholder:text-gray-500"
        />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-bloom-forest/60 dark:text-gray-400">
          This is an early beta — your feedback is saved in this browser for now.
        </p>

        <button
          type="submit"
          disabled={!message.trim()}
          className="rounded-full bg-bloom-mid px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-bloom-forest disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send feedback
        </button>
      </div>
    </form>
  )
}

export default FeedbackForm