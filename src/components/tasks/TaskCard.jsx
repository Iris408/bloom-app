import { useApp } from "../../context/AppContext"
import Button from "../ui/Button"

function TaskCard({ task, onEdit, onDelete }) {
  const { isDarkMode, darkStyle } = useApp()

  const cardClass = isDarkMode
    ? "bg-dark-card border-dark-border"
    : "bg-white border-bloom-sage"

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
      <div className="flex justify-end gap-2">

        <Button variant="secondary" onClick={() => onEdit(task)}>Edit</Button>

        <Button variant="danger" onClick={() => onDelete(task.id)}>Delete</Button>

      </div>
    </div>
  )
}

export default TaskCard