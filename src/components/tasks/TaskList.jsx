import { useState } from "react"
import TaskCard from "./TaskCard"
import Button from "../ui/Button"

const emojis = [
  "🌅", "🥣", "🎒", "🏃", "📚",
  "🎮", "🛁", "💤", "🎨", "🐾",
  "🧹", "💊", "🎯", "🌟", "💪",
  "🧘", "🌿", "☀️", "🍵", "✏️",
]

function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, emoji: "🌅", text: "Morning stretches" },
    { id: 2, emoji: "🥣", text: "Eat breakfast" },
    { id: 3, emoji: "🎒", text: "Pack my bag" },
  ])

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
      },
    ])

    setInputText("")
    setSelectedEmoji("📝")
    setShowPicker(false)
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
    <div className="flex flex-col gap-4 w-full max-w-lg">
      {/* ADD INPUT AREA */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-bloom-sage">
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="text-2xl flex items-center justify-center hover:bg-bloom-light rounded-lg p-1 transition"
          >
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
            className="flex-1 text-gray-700 dark:text-gray-100 dark:bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
          />

          <Button variant="primary" onClick={handleAddTask}>
            Add
          </Button>
        </div>

        {showPicker && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl shadow p-3 grid grid-cols-8 gap-2">
            {emojis.map((emoji) => (
              <button
                type="button"
                key={emoji}
                onClick={() => {
                  setSelectedEmoji(emoji)
                  setShowPicker(false)
                }}
                className="text-2xl w-10 h-10 rounded-lg flex items-center justify-center hover:bg-bloom-light transition"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TASK CARDS */}
      {tasks.map((task) =>
        editingId === task.id ? (
          <div
            key={task.id}
            className="flex flex-col gap-3 border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-3 bg-white dark:bg-gray-800"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowEditPicker(!showEditPicker)}
                className="text-2xl flex items-center justify-center hover:bg-bloom-light rounded-lg p-1 transition"
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
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl shadow p-3 grid grid-cols-8 gap-2">
                {emojis.map((emoji) => (
                  <button
                    type="button"
                    key={emoji}
                    onClick={() => {
                      setEditEmoji(emoji)
                      setShowEditPicker(false)
                    }}
                    className="text-2xl w-10 h-10 rounded-lg flex items-center justify-center hover:bg-bloom-light transition"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button onClick={() => handleEditSave(task.id)}>
                Save
              </Button>

              <Button variant="secondary" onClick={handleEditCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEditStart}
            onDelete={handleDelete}
          />
        )
      )}
    </div>
  )
}

export default TaskList