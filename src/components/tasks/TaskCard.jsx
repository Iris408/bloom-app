import { useApp } from "../../context/AppContext"
import Button from "../ui/Button"

function TaskCard({ task, onEdit, onDelete }) {
  const { isDarkMode, darkStyle } = useApp()

  const cardClass = isDarkMode
    ? "bg-bloom-mid/40 border-dark-border"
    : "bg-white border-bloom-mid"

  return (
    <div className={`${cardClass} border rounded-2xl shadow p-4 flex flex-col gap-3`}>
      {/* EN: Top row shows the task emoji and task text */}
      {/* JP: 上の行ではタスクの絵文字とテキストを表示します */}
      <div className="flex items-center gap-4">
        <span className="text-2xl">{task.emoji}</span>

        <p className="text-gray-700 dark:text-gray-100 font-medium flex-1 min-w-0 truncate">
          {task.text}
        </p>
      </div>

      {/* EN: Task action buttons */}
      {/* JP: タスク操作ボタン */}
      <div className="flex justify-end gap-4">
        <button type="button"
        onClick={() => onEdit(task)}
        className="text-sm font-medium font-semibold text-bloom-mid dark:text-bloom-sage hover:text-bloom-forest dark:hover:text-bloom-light transition"
       >Edit</button>

        <button type="button"
        onClick={() => onDelete(task.id)}
        className="text-sm font-medium font-semibold text-red-400 hover:text-red-500 transition"
       >Delete</button>

      </div>
    </div>
  )
}

export default TaskCard