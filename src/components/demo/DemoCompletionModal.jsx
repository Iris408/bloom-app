import { useEffect } from "react"

// EN: Demo completion modal — shown after a user completes a demo action
// JP: デモ完了モーダル — ユーザーがデモアクションを完了した後に表示

// EN: Floating leaf SVG — used for the ambient leaf animation
// JP: フローティングリーフSVG — 葉のアニメーションに使用
function FloatingLeaf({ style, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`absolute pointer-events-none select-none opacity-0 ${className}`}
      style={style}
    >
      <path d="M17 8C8 10 5.9 16.17 3.82 22c1.97-2.02 4.1-3.52 6.35-4.38C11.74 16.57 14.42 14.08 17 8z" />
    </svg>
  )
}

// EN: Sprout SVG — animated grow from bottom
// JP: 芽のSVG — 下から成長するアニメーション
function SproutIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="h-10 w-10"
    >
      {/* EN: Stem — draws upward */}
      {/* JP: 茎 — 上に向かって描画 */}
      <line
        x1="24" y1="44"
        x2="24" y2="18"
        stroke="#1D5C45"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="bloom-stem-draw"
      />
      {/* EN: Left leaf */}
      {/* JP: 左の葉 */}
      <path
        d="M24 28 C18 24 10 26 10 20 C10 14 20 14 24 20"
        fill="#8FAF6E"
        className="bloom-leaf-left"
      />
      {/* EN: Right leaf */}
      {/* JP: 右の葉 */}
      <path
        d="M24 24 C30 20 38 22 38 16 C38 10 28 10 24 16"
        fill="#7CC49A"
        className="bloom-leaf-right"
      />
    </svg>
  )
}

function DemoCompletionModal({
  isOpen,
  onClose,
  onCreateAccount,
  onFinishDemo,
  reduceMotion = false,
}) {
    useEffect(() => {
    if (!isOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // EN: Leaf config — position, size, delay, drift direction
  // JP: 葉の設定 — 位置・サイズ・遅延・流れる方向
  const floatingLeaves = [
    { id: 1, top: "8%",  left: "6%",  size: 26, delay: "0.2s",  duration: "6s",  drift: "left"  },
    { id: 2, top: "12%", right: "8%", size: 20, delay: "0.8s",  duration: "7.5s", drift: "right" },
    { id: 3, top: "55%", left: "4%",  size: 18,  delay: "1.2s",  duration: "5.5s", drift: "left"  },
    { id: 4, top: "60%", right: "5%", size: 26, delay: "0.5s",  duration: "8s",   drift: "right" },
    { id: 5, top: "30%", left: "10%", size: 18,  delay: "1.8s",  duration: "6.5s", drift: "left"  },
    { id: 6, top: "35%", right: "9%", size: 21, delay: "1.0s",  duration: "7s",   drift: "right" },
  ]

  return (
    <>
      {/* EN: Animation keyframes injected inline */}
      {/* JP: アニメーションのキーフレームをインライン */}
      {!reduceMotion && (
        <style>{`
          /* EN: Modal rises gently from below */
          /* JP: モーダルが下からふわりと現れる */
          @keyframes bloom-modal-rise {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.97);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          /* EN: Backdrop fades in */
          /* JP: 背景がフェードイン */
          @keyframes bloom-backdrop-fade {
            from { opacity: 0; }
            to   { opacity: 1; }
          }

          /* EN: Sprout stem draws upward */
          /* JP: 茎が上に向かって伸びる */
          @keyframes bloom-stem-draw {
            from { stroke-dashoffset: 30; opacity: 0; }
            to   { stroke-dashoffset: 0;  opacity: 1; }
          }

          /* EN: Left leaf unfurls from the stem */
          /* JP: 左の葉が茎から広がる */
          @keyframes bloom-leaf-left {
            from { transform: scale(0) rotate(-30deg); transform-origin: 24px 24px; opacity: 0; }
            to   { transform: scale(1) rotate(0deg);   transform-origin: 24px 24px; opacity: 1; }
          }

          /* EN: Right leaf unfurls from the stem */
          /* JP: 右の葉が茎から広がる */
          @keyframes bloom-leaf-right {
            from { transform: scale(0) rotate(30deg);  transform-origin: 24px 20px; opacity: 0; }
            to   { transform: scale(1) rotate(0deg);   transform-origin: 24px 20px; opacity: 1; }
          }

          /* EN: Icon circle pulses gently once */
          /* JP: アイコンの円が一度やさしく脈打つ */
          @keyframes bloom-icon-pulse {
            0%   { transform: scale(0.8); opacity: 0; }
            60%  { transform: scale(1.06); opacity: 1; }
            100% { transform: scale(1);   opacity: 1; }
          }

          /* EN: Leaf floats upward and drifts sideways */
          /* JP: 葉が上に浮かびながら横に流れる */
          @keyframes bloom-leaf-float-left {
            0%   { transform: translateY(0)    rotate(0deg)   translateX(0);    opacity: 0; }
            15%  { opacity: 0.55; }
            85%  { opacity: 0.3; }
            100% { transform: translateY(-90px) rotate(-25deg) translateX(-18px); opacity: 0; }
          }

          @keyframes bloom-leaf-float-right {
            0%   { transform: translateY(0)    rotate(0deg)  translateX(0);    opacity: 0; }
            15%  { opacity: 0.55; }
            85%  { opacity: 0.3; }
            100% { transform: translateY(-90px) rotate(25deg) translateX(18px); opacity: 0; }
          }

          /* EN: Apply animations to sprout parts */
          /* JP: 芽の各パーツにアニメーションを適用 */
          .bloom-stem-draw {
            stroke-dasharray: 30;
            animation: bloom-stem-draw 0.6s ease-out 0.3s both;
          }
          .bloom-leaf-left {
            animation: bloom-leaf-left 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.7s both;
          }
          .bloom-leaf-right {
            animation: bloom-leaf-right 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.9s both;
          }

          /* EN: Floating leaf animations */
          /* JP: フローティングリーフのアニメーション */
          .bloom-leaf-float-l {
            animation-name: bloom-leaf-float-left;
            animation-timing-function: ease-in-out;
            animation-fill-mode: both;
            animation-iteration-count: 4;
          }
          .bloom-leaf-float-r {
            animation-name: bloom-leaf-float-right;
            animation-timing-function: ease-in-out;
            animation-fill-mode: both;
            animation-iteration-count: 4;
          }
        `}</style>
      )}

      {/* EN: Backdrop */}
      {/* JP: 背景オーバーレイ */}
      <div
        className="fixed inset-0 z-[90] flex items-end justify-center bg-bloom-forest/20 px-4 pb-4 backdrop-blur-sm sm:items-center sm:pb-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-completion-title"
        onClick={onClose}
        style={
          !reduceMotion
            ? { animation: "bloom-backdrop-fade 0.3s ease-out both" }
            : undefined
        }
      >

        {/* EN: Modal panel */}
        {/* JP: モーダルパネル */}
        <div
          className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-bloom-sage/25 bg-white/95 p-5 text-bloom-forest shadow-2xl dark:border-white/10 dark:bg-[#252532] dark:text-bloom-light sm:p-6"
          onClick={(e) => e.stopPropagation()}
          style={
            !reduceMotion
              ? { animation: "bloom-modal-rise 0.4s cubic-bezier(0.34,1.3,0.64,1) 0.05s both" }
              : undefined
          }
        >

          {/* EN: Floating leaves — decorative, inside modal overflow:hidden */}
          {/* JP: フローティングリーフ — 装飾用、モーダル内にoverflow:hiddenで収める */}
          {!reduceMotion && floatingLeaves.map((leaf) => (
            <FloatingLeaf
              key={leaf.id}
              className={`text-bloom-sage ${
                leaf.drift === "left" ? "bloom-leaf-float-l" : "bloom-leaf-float-r"
              }`}
              style={{
                top:             leaf.top,
                left:            leaf.left  ?? undefined,
                right:           leaf.right ?? undefined,
                width:           `${leaf.size}px`,
                height:          `${leaf.size}px`,
                animationDelay:    leaf.delay,
                animationDuration: leaf.duration,
              }}
            />
          ))}

          {/* EN: Close button */}
          {/* JP: 閉じるボタン */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-bloom-light/70 text-sm font-bold text-bloom-forest transition hover:bg-bloom-mint/70 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
            aria-label="Close demo completion message"
          >
            x
          </button>

          {/* EN: Sprout icon with animated grow */}
          {/* JP: 成長アニメーション付きの芽アイコン */}
          <div
            className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-bloom-light shadow-sm dark:bg-white/10"
            style={
              !reduceMotion
                ? { animation: "bloom-icon-pulse 0.6s cubic-bezier(0.34,1.3,0.64,1) 0.15s both" }
                : undefined
            }
          >
            {reduceMotion ? (
              <span className="text-4xl" aria-hidden="true">🌱</span>
            ) : (
              <SproutIcon />
            )}
          </div>

          {/* EN: Label */}
          {/* JP: ラベル */}
          <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-bloom-mid dark:text-bloom-sage">
            Well done
          </p>

          {/* EN: Title */}
          {/* JP: タイトル */}
          <h2
            id="demo-completion-title"
            className="mt-3 text-center text-3xl font-bold leading-tight text-bloom-forest dark:text-bloom-light"
          >
            You showed up ✨
          </h2>

          {/* EN: Body */}
          {/* JP: 本文 */}
          <p 
            aria-describedby="demo-completion-description"
            className="mx-auto mt-3 max-w-sm text-center text-sm leading-7 text-bloom-forest/65 dark:text-gray-300">
            That is how Bloom works. One small thing at a time.
          </p>

          {/* EN: Actions */}
          {/* JP: アクション */}
          <div className="mt-6 flex flex-col gap-3">

            <button
              type="button"
              onClick={onCreateAccount}
              className="w-full rounded-2xl bg-bloom-forest px-5 py-3 text-sm font-bold text-bloom-light shadow-sm transition hover:bg-bloom-mid dark:bg-bloom-sage dark:text-bloom-forest dark:hover:bg-bloom-light"
            >
              Create your space ⟡
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-2xl border border-bloom-sage/25 bg-white/70 px-5 py-3 text-sm font-bold text-bloom-forest transition hover:bg-bloom-light dark:border-white/10 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
            >
              Keep exploring ꕤ
            </button>

            {/* EN: Exit demo — quiet text link */}
            {/* JP: デモを終了 — 控えめなテキストリンク */}
            {onFinishDemo && (
              <p className="text-center">
                <button
                  type="button"
                  onClick={onFinishDemo}
                  className="text-sm text-bloom-forest/40 underline underline-offset-2 transition hover:text-bloom-forest dark:text-gray-500 dark:hover:text-bloom-light"
                >
                  Exit demo
                </button>
              </p>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default DemoCompletionModal