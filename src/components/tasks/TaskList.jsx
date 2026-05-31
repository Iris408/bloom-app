import { useState } from "react"
import TaskCard from "./TaskCard"

const emojis = ["🌅","🥣","🎒","🏃","📚","🎮","🛁","💤","🎨","🐾","🧹","💊","🎯","🌟","💪","🧘","🌿","☀️","🍵","✏️"]

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

    // -- Add -- //
    function handleAddTask() {
        if (inputText.trim() === "") return
        setTasks([...tasks, {
            id: Date.now(),
            emoji: selectedEmoji,
            text: inputText.trim()
        }])
        setInputText("")
        setSelectedEmoji("📝")
        setShowPicker(false)
    }

    // -- Edit -- //
    function handleEditStart(task) {
        setEditingId(task.id)
        setEditText(task.text)
    }

    function handleEditSave(id) {
        if (editText.trim() === "") return
        setTasks(tasks.map((task) =>
            task.id === id ? { ...task, text: editText.trim() } : task
        ))
        setEditingId(null)
        setEditText("")
    }

    // -- Delete -- //
    function handleDelete(id) {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    return (
        <div className="flex flex-col gap-4 w-full max-w-lg">

            {/* Input area */}
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">

                  {/* Emoji picker button */}
                  <button
                    onClick={() => setShowPicker(!showPicker)}
                    className="text-2xl w-12 h-12 rounded-xl border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition">
                    {selectedEmoji}
                  </button>

                  {/* Text input */}
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-2 flex items-center justify-center hoever:bg-gray-100 transition"/>

                    {/* Add button */}
                    <button
                      onClick={handleAddTask}
                      className="bg-green-800 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-900 transition">
                        Add
                      </button>

                </div>

                {/* Emoji picker grid */}
                {showPicker && (
                    <div className="bg-white border-gray-200 rounded-2xl shadow p-3 grid grid-cols-8 gap-2">
                        {emojis.map ((emoji) => (
                            <button
                            key={emoji}
                            onClick={() => { setSelectedEmoji(emoji); setShowPicker(false) }}
                            className="text-2xl w-10 h-10 rounded-lg flex items-center justify-center hover:bg-green-50 transition">
                                {emoji}
                            </button>
                        ))}
                    </div>    
                )}
            </div>

            {/* Task cards */}
            {tasks.map((task) => (
                editingId === task.id ? (
                    // Edit mode
                    <div key={task.id} className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">{task.emoji}</span>
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="flex-1 rounded-lg border border-green-300 px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"/>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEditSave(task.id)}
                              className="text-sm text-white bg-green-800 px-3 py-1 rounded-lg hover:bg-green-900 transition">
                                Save
                              </button>
                              <button
                                onClick={handleEditCancel}
                                className="text-sm text-white bg-green-800 px-3 py-1 rounded-lg hover:bg-green-900 transition">
                                    Cancel
                                </button>
                        </div>
                    </div>    
                ) : (
                    // Normal mode
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEditStart}
                      onDelete={handleDelete}
                    />  
                )
            ))}

        </div>
    )
}

export default TaskList