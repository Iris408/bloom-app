import { useApp } from "../../context/AppContext"
import TaskCompletionButton from "./TaskCompletionButton"

function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  const { isDarkMode } = useApp()

  const cardClass = isDarkMode
    ? "bg-dark-surface/85 border-dark-border"
    : "bg-white border-bloom-mid"

  return (
    <div className={`${cardClass} border rounded-2xl shadow p-4 flex flex-col gap-3`}>
      {/* EN: Top row shows the completion button, task emoji and task text */}
      {/* JP: 上の行では完了ボタン、絵文字、タスクのテキストを表示します */}
        <div className="flex items-center gap-4">
          <TaskCompletionButton
            isCompleted={task.completed}
            onClick={() => onToggleComplete(task.id)}
          />
        <span className="text-2xl">{task.emoji}</span>

        <p 
          className={`flex-1 min-w-0 truncate font-medium ${
            task.completed 
              ? "text-gray-400 line-through dark:text-bloom-light/60"
              : "text-gray-700 dark:text-bloom-light/90"
          }`}
        >
          {task.text}
        </p>
      </div>

      {/* EN: Task action buttons */}
      {/* JP: タスク操作ボタン */}
      <div className="flex justify-end gap-4">
        <button 
          type="button"
          onClick={() => onEdit(task)}
          className="text-sm font-semibold text-bloom-mid dark:text-bloom-sage hover:text-bloom-forest dark:hover:text-bloom-light transition"
        >
          Edit
        </button>

        <button 
          type="button"
          onClick={() => onDelete(task.id)}
          className="text-sm font-semibold text-red-400 hover:text-red-500 transition"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskCard