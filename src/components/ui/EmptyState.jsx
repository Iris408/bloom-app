// EN: Reusable simple empty state message.
// JP: 再利用できるシンプルな空状態メッセージです。
function EmptyState({ icon = "🌿", title, message }) {
  return (
    <div className="rounded-2xl border border-bloom-sage/30 bg-white/60 p-6 text-center dark:border-dark-border dark:bg-dark-surface/70">
      <p className="mb-3 text-3xl">{icon}</p>

      <h3 className="mb-2 text-lg font-bold text-bloom-forest dark:text-bloom-light">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {message}
      </p>
    </div>
  )
}

export default EmptyState