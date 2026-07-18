// EN: Shown when a demo user navigates to a page not available in their demo type
// JP: デモユーザーが現在のデモタイプで利用できないページに移動した際に表示

import { isNeurodivergentDemoType } from "../../data/demoData"

function GuidedDemoNotice({
  pageName = "this page",
  demoType = "simple",
  onGoHome,
  onCreateAccount,
}) {
  const isNeurodivergentDemo = isNeurodivergentDemoType(demoType)

  const heading = isNeurodivergentDemo
    ? "You are exploring the Calm Day demo."
    : "You are exploring the Simple Day demo."

  const body = isNeurodivergentDemo
    ? `This demo is designed to feel lighter. The ${pageName} page is part of the full app — in this demo, a gentle version is available on Home.`
    : `In Simple Day, everything is available from the Home page. This keeps the experience contained and easy to follow.`

  const footerNote = isNeurodivergentDemo
    ? "Want to see everything? The Full App Preview is available from the demo selection screen."
    : "Full App Preview lets you explore all pages together."

  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center justify-center px-4 py-10">
      <div className="w-full rounded-[2rem] border border-bloom-sage/25 bg-white/65 p-6 text-center shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:p-8">

        {/* EN: Icon */}
        {/* JP: アイコン */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-bloom-light text-3xl dark:bg-white/10">
          🌿
        </div>

        {/* EN: Label */}
        {/* JP: ラベル */}
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
          Guided demo
        </p>

        {/* EN: Heading — tells user exactly which demo they are in */}
        {/* JP: 見出し — ユーザーがどのデモにいるかを明示 */}
        <h2 className="mt-3 text-2xl font-bold leading-tight text-bloom-forest dark:text-bloom-light sm:text-3xl">
          {heading}
        </h2>

        {/* EN: Body — explains why this page is limited and what to do */}
        {/* JP: 本文 — このページが制限されている理由と次のアクションを説明 */}
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-bloom-forest/65 dark:text-gray-300">
          {body}
        </p>

        {/* EN: Primary actions */}
        {/* JP: 主要アクション */}
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onGoHome}
            className="rounded-2xl bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest dark:hover:bg-bloom-light"
          >
            Go to Home
          </button>

          <button
            type="button"
            onClick={onCreateAccount}
            className="rounded-2xl border border-bloom-sage/25 bg-white/70 px-5 py-3 text-sm font-bold text-bloom-forest transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
          >
            Create your space
          </button>
        </div>

        {/* EN: Quiet secondary actions */}
        {/* JP: 控えめなセカンダリアクション */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="text-xs text-bloom-forest/40 underline underline-offset-2 transition hover:text-bloom-forest dark:text-gray-500 dark:hover:text-bloom-light"
          >
            Go back
          </button>
        </div>

        {/* EN: Footer note — actionable direction to full demo */}
        {/* JP: フッターノート — フルデモへの案内 */}
        <p className="mt-5 text-xs leading-5 text-bloom-forest/45 dark:text-gray-400">
          {footerNote}
        </p>

      </div>
    </section>
  )
}

export default GuidedDemoNotice