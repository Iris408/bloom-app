import { useEffect, useState } from "react"

import TaskCard from "./TaskCard"
import {
  markDailyResetComplete,
  resetCompletedItems,
  shouldRunDailyReset,
} from "../../utils/dailyResetUtils"
import EmptyState from "../ui/EmptyState"

const emojis = [
  "🌅", "☀️", "🛏️", "⏰", "🪥", "🚿", "🧴", "🪞",
  "🥣", "🍳", "🍎", "🥪", "🍝", "🍵", "💧","🛒",
  "🎒", "📚", "✏️", "💻", "📝", "📅", "✅", "🎯",
  "🏃", "🚶", "🏋", "🧘", "🚴", "🥊", "⚽", "🏟", "🥅", "💊", "🩺",
  "🧹", "🧺", "🧼", "🗑️", "🦮", "🪴","🏀",
  "🎮", "🎨", "🎵", "📺", "🏓", "📱", "🧩", "🧸",
  "🚗", "🚌", "🏫", "🏠", "🌳", "🌧️","🎾","🌱",
  "🛁", "🌙", "💤", "📖", "🕯️","🛍️","🎨","🖌️",
  "💼", "📫", "🌸", "🌟", "⚽", "🏆", "🎁", "🐈", "👏",
]

const TASK_STORAGE_KEY = "bloom-tasks"
const TASK_DAILY_RESET_KEY = "bloom-tasks-last-reset"

function EmojiPicker({ onSelect }) {
  return (
    <div className="absolute left-0 top-full z-40 mt-2 max-h-52 w-full overflow-y-auto rounded-2xl border border-bloom-sage/25 bg-white/95 p-3 shadow-xl backdrop-blur-lg dark:border-dark-border dark:bg-dark-soil/35">
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
        {emojis.map((emoji) => (
          <button
            type="button"
            key={emoji}
            onClick={() => onSelect(emoji)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-xl transition hover:bg-bloom-light dark:hover:bg-white/10"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}

function TaskList() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(TASK_STORAGE_KEY)

      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks)

        if (shouldRunDailyReset(TASK_DAILY_RESET_KEY)) {
          const resetTasks = resetCompletedItems(parsedTasks)

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

  const [inputText, setInputText] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState("🌱")
  const [showPicker, setShowPicker] = useState(false)

  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")
  const [editEmoji, setEditEmoji] = useState("🌱")
  const [showEditPicker, setShowEditPicker] = useState(false)

  useEffect(() => {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks))

    // EN: Let Home/Progress read updated task data later.
    // JP: 後でHome/Progressが更新されたタスクデータを読めるようにします。
    window.dispatchEvent(new Event("bloom-tasks-updated"))
  }, [tasks])

  function handleAddTask() {
    const cleanText = inputText.trim()

    if (!cleanText) return

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        emoji: selectedEmoji,
        text: cleanText,
        completed: false,
      },
    ])

    setInputText("")
    setSelectedEmoji("🌱")
    setShowPicker(false)
  }

  function handleToggleComplete(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    )
  }

  function handleEditStart(task) {
    setEditingId(task.id)
    setEditText(task.text)
    setEditEmoji(task.emoji || "🌱")
    setShowEditPicker(false)
    setShowPicker(false)
  }

  function handleEditSave(id) {
    const cleanText = editText.trim()

    if (!cleanText) return

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: cleanText,
              emoji: editEmoji,
            }
          : task
      )
    )

    setEditingId(null)
    setEditText("")
    setEditEmoji("🌱")
    setShowEditPicker(false)
  }

  function handleEditCancel() {
    setEditingId(null)
    setEditText("")
    setEditEmoji("🌱")
    setShowEditPicker(false)
  }

  function handleDelete(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative">
        <div className="flex items-center gap-2 rounded-2xl border border-bloom-sage/30 bg-white/80 px-3 py-2 shadow-sm transition focus-within:border-bloom-mid dark:focus-within:border-bloom-sage/50 focus-within:ring-2 focus-within:ring-bloom-mid/35 dark:focus-within:ring-bloom-light/35 dark:border-dark-border dark:bg-dark-surface/95">
          <button
            type="button"
            onClick={() => {
              setShowPicker((currentValue) => !currentValue)
              setShowEditPicker(false)
            }}
            className="flex h-8 w-10 shrink-0 items-center justify-center rounded-xl text-lg border border-bloom-sage dark:border-dark-border transition hover:bg-bloom-light dark:hover:bg-white/10"
            aria-label="Choose task emoji"
          >
            {selectedEmoji}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleAddTask()
            }}
            placeholder="Add one small task..."
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-bloom-forest outline-none placeholder:text-bloom-forest/40 dark:text-gray-100 dark:placeholder:text-bloom-light/60"
          />

          <button
            type="button"
            onClick={handleAddTask}
            className="rounded-full bg-bloom-light px-4 py-2 text-xs font-bold text-bloom-forest transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/20"
          >
            Add
          </button>
        </div>

        {showPicker && (
          <EmojiPicker
            onSelect={(emoji) => {
              setSelectedEmoji(emoji)
              setShowPicker(false)
            }}
          />
        )}
      </div>

      {tasks.length === 0 ? (
        <EmptyState
          icon="🌱"
          title="No tasks yet"
          message="Add one small task when you're ready."
        />
      ) : (
        <div className="max-h-[340px] overflow-y-auto pr-1">
          <div className="flex flex-col gap-3">
            {tasks.map((task) =>
              editingId === task.id ? (
              <div
                key={task.id}
                className="relative rounded-2xl border border-bloom-sage/30 bg-white/80 px-3 py-3 shadow-sm dark:border-dark-border dark:bg-dark-surface/70"
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditPicker((currentValue) => !currentValue)
                      setShowPicker(false)
                    }}
                    className="flex h-8 w-10 shrink-0 items-center justify-center rounded-xl text-2xl transition border border-bloom-sage/40 dark:border-dark-border hover:bg-bloom-light dark:hover:bg-white/10"
                    aria-label="Choose edited task emoji"
                  >
                    {editEmoji}
                  </button>

                  <input
                    type="text"
                    value={editText}
                    onChange={(event) => setEditText(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") handleEditSave(task.id)
                    }}
                    className="min-w-0 flex-1 bg-transparent text-sm font-medium text-bloom-forest outline-none placeholder:text-bloom-forest/40 dark:text-gray-100 dark:placeholder:text-gray-500"
                  />
                </div>

                {showEditPicker && (
                  <EmojiPicker
                    onSelect={(emoji) => {
                      setEditEmoji(emoji)
                      setShowEditPicker(false)
                    }}
                  />
                )}

                <div className="mt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditSave(task.id)}
                    className="rounded-full bg-bloom-mid px-2 py-1 text-xs font-bold text-white transition hover:bg-bloom-forest"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={handleEditCancel}
                    className="rounded-full bg-bloom-light px-2 py-1 text-xs font-bold text-bloom-forest transition hover:bg-bloom-mint/60 dark:bg-white/10 dark:text-bloom-light dark:hover:bg-white/15"
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
          )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskList