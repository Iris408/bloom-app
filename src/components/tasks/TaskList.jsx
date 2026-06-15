import { useEffect, useState } from "react"
import TaskCard from "./TaskCard"
import { shouldRunDailyReset, markDailyResetComplete, resetCompletedItems } from "../../utils/dailyResetUtils"
import EmptyState from "../ui/EmptyState"

const emojis = [
  // Morning / daily routine
  "🌅", "☀️", "🛏️", "⏰", "🪥", "🚿", "🧴", "🪞",
  // Food / drink
  "🥣", "🍳", "🍎", "🥪", "🍝", "🍵", "💧",
  // School / work / focus
  "🎒", "📚", "✏️", "💻", "📝", "📅", "✅", "🎯",
  // Movement / health
  "🏃", "🚶", "💪", "🧘", "💊", "🩺",
  // Chores / home
  "🧹", "🧺", "🧼", "🗑️", "🐾", "🪴",
  // Fun / creativity
  "🎮", "🎨", "🎵", "📺", "🧩", "🧸",
  // Outside / travel
  "🚗", "🚌", "🏫", "🏠", "🌳", "🌧️",
  // Rest / evening
  "🛁", "🌙", "💤", "📖", "🕯️",
  // Rewards / motivation
  "🌟", "⭐", "🏆", "🎁", "💖", "👏"
]
const TASK_STORAGE_KEY = "bloom-tasks"
const TASK_DAILY_RESET_KEY = "bloom-tasks-last-reset"

function TaskList() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(TASK_STORAGE_KEY)

      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks)

        if (shouldRunDailyReset(TASK_DAILY_RESET_KEY)) {
          const resetTasks = resetCompletedItems(parsedTasks)

          localStorage.setItem(TASK_DAILY_RESET_KEY, JSON.stringify(resetTasks))
          markDailyResetComplete(TASK_DAILY_RESET_KEY)

          return resetTasks
        }

        return parsedTasks
      }

      return []
    } catch {
      return []
    }
  })
  
  // EN: Save tasks to localStorage whenever the task list changes
  // JP: タスクリストが変更されるたびに localStorage に保存します
  useEffect(() => {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const [inputText, setInputText] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState("📝")
  const [showPicker, setShowPicker] = useState(false)

  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")
  const [editEmoji, setEditEmoji] = useState("")
  const [showEditPicker, setShowEditPicker] = useState(false)

  // EN: Add a new task
  // JP: 新しいタスクを追加します
  function handleAddTask() {
    if (inputText.trim() === "") return

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        emoji: selectedEmoji,
        text: inputText.trim(),
        completed: false,
      },
    ])

    setInputText("")
    setSelectedEmoji("📝")
    setShowPicker(false)
  }

  // EN: Toggle a task between complete and incomplete
  // JP: タスクの完了・未完了を切り替えます
  function handleToggleComplete(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed, 
            } : task
      )
    )
  }


  // EN: Start editing a task
  // JP: タスクの編集を開始します
  function handleEditStart(task) {
    setEditingId(task.id)
    setEditText(task.text)
    setEditEmoji(task.emoji)
    setShowEditPicker(false)
  }

  // EN: Save edited task
  // JP: 編集したタスクを保存します
  function handleEditSave(id) {
    if (editText.trim() === "") return

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: editText.trim(),
              emoji: editEmoji,
            }
          : task
      )
    )

    setEditingId(null)
    setEditText("")
    setEditEmoji("")
    setShowEditPicker(false)
  }

  // EN: Cancel editing
  // JP: 編集をキャンセルします
  function handleEditCancel() {
    setEditingId(null)
    setEditText("")
    setEditEmoji("")
    setShowEditPicker(false)
  }

  // EN: Delete a task
  // JP: タスクを削除します
  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* ADD INPUT AREA */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border border-gray-300 dark:border-dark-border rounded-xl px-3 py-2 bg-white dark:bg-dark-surface/70 focus-within:ring-1 focus-within:ring-bloom-mid/70">
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="text-2xl flex items-center justify-center hover:bg-bloom-light dark:hover:bg-bloom-light/70 rounded-lg p-1 transition">
            {selectedEmoji}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTask()
            }}
            placeholder="Add a new task..."
            className="flex-1 text-gray-700 dark:text-gray-100 dark:bg-transparent placeholder:text-gray-400 dark:placeholder:text-bloom-light/80 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddTask}
            className="text-sm font-semibold text-bloom-mid dark:text-bloom-sage/85 hover:text-bloom-forest dark:hover:text-bloom-light/70 transition"
          >
            Add
          </button>
          </div>

        {showPicker && (
          <div className="bg-white dark:bg-dark-surface/80 border border-gray-200 dark:border-dark-border rounded-2xl shadow p-3 grid grid-cols-8 gap-2">
            {emojis.map((emoji) => (
              <button
                type="button"
                key={emoji}
                onClick={() => {
                  setSelectedEmoji(emoji)
                  setShowPicker(false)
                }}
                className="text-2xl w-10 h-10 rounded-lg flex items-center justify-center border-t border-dark-border hover:bg-bloom-light dark:hover:bg-bloom-light/70 transition"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TASK CARDS */}
      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-bloom-sage/30 bg-white dark:border-dark-border dark:bg-dark-surface/70 p-6 text-center">
          <EmptyState
            icon="🌱"
            title="No tasks yet"
            message="Add one small task when you're ready."
          />
        </div>  
      ) : (
        tasks.map((task) =>
          editingId === task.id ? (
            <div
              key={task.id}
              className="flex flex-col gap-3 border border-gray-300 dark:border-dark-border rounded-xl px-3 py-3 bg-white dark:bg-bloom-mint/30"
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditPicker(!showEditPicker)}
                  className="text-2xl flex items-center justify-center hover:bg-bloom-light dark:hover:bg-bloom-light/80 rounded-lg p-1 transition"
                >
                  {editEmoji}
                </button>

                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEditSave(task.id)
                  }}
                  className="flex-1 text-gray-700 dark:text-gray-100 dark:bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
                />
              </div>

              {showEditPicker && (
                <div className="bg-white dark:bg-transparent border border-gray-200 dark:border-transparent border-t rounded-2xl p-3 grid grid-cols-8 gap-2">
                  {emojis.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => {
                        setEditEmoji(emoji)
                        setShowEditPicker(false)
                      }}
                      className="text-2xl w-10 h-10 rounded-lg flex items-center justify-center border-t border-dark-border hover:bg-bloom-light transition"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => handleEditSave(task.id)}
                  className="text-sm font-medium font-semibold text-bloom-mid dark:text-bloom-sage hover:text-bloom-forest dark:hover:text-bloom-mid transition"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={handleEditCancel}
                  className="text-sm font-lg font-semibold text-bloom-forest dark:text-red-400 hover:text-dark-card dark:hover:text-red-500/90 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEditStart}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
            />
          )
        )
      )}
    </div>  
  )
}

export default TaskList