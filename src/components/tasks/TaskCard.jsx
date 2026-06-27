import { useApp } from "../../context/AppContext"
import TaskCompletionButton from "./TaskCompletionButton"

function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  const { isDarkMode } = useApp()

  const cardClass = isDarkMode
    ? "bg-dark-surface/85 border-dark-border"
    : "bg-white/85 border-bloom-sage/30"

  return (
    <div
      className={`${cardClass} relative rounded-xl border px-3 py-4.5 shadow-sm transition`}
    >
    
    {/* EN: Single row — emoji and task text inline, completion button top-right */}
    {/* JP: 一行レイアウト — 絵文字とタスク文を横並び、完了ボタンは右上 */}
    <div className="flex min-w-0 items-center gap-2 pr-10">
      <div className="absolute right-3 top-3 shrink-0">
        <TaskCompletionButton
          isCompleted={task.completed}
          onClick={() => onToggleComplete(task.id)}
        />
      </div>

      <span className="shrink-0 text-lg leading-none">
        {task.emoji}
      </span>

      <div className="min-w-0 flex-1 overflow-x-auto pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <p
          className={`w-max whitespace-nowrap text-sm font-medium leading-none ${
            task.completed
              ? "text-gray-400 line-through dark:text-bloom-light/60"
              : "text-bloom-forest/80 dark:text-bloom-light/90"
          }`}
        >
          {task.text}
        </p>
      </div>
    </div>

      {/* EN: Icon actions sit close to the bottom-right. */}
      {/* JP: アイコン操作ボタンは右下寄りに配置します。 */}
      <div className="flex shrink-0 mt-2 justify-end gap-2">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="flex h-5.5 w-7 items-center justify-center rounded-full text-xl text-bloom-mid transition hover:bg-bloom-light hover:text-bloom-forest dark:text-bloom-sage dark:hover:bg-white/10 dark:hover:text-bloom-light"
          aria-label="Edit task"
          title="Edit task"
        >
          <span aria-hidden="true">✎</span>
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="flex h-5.5 w-7 items-center justify-center rounded-full text-sm font-bold text-rose-600 transition hover:bg-rose-50 hover:text-rose-700 dark:text-rose-300 dark:hover:bg-rose-950/30 dark:hover:text-rose-200"
          aria-label="Delete task"
          title="Delete task"
        >
          <span aria-hidden="true">🗑</span>
        </button>
      </div>
    </div>
  )
}

export default TaskCard