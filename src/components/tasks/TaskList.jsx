import { useState } from "react"
import TaskCard from "./TaskCard"
import Button from "../ui/Button"

const emojis = ["🌅","🥣","🎒","🏃","📚","🎮","🛁","💤","🎨","🐾","🧹","💊","🎯","🌟","💪","🧘","🌿","☀️","🍵","✏️"]

function TaskList() {
    const [tasks, setTasks] = useState([
        { id: 1, emoji: "🌅", text: "Morning stretches" },
        { id: 2, emoji: "🥣", text: "Eat breakfast" },
        { id: 3, emoji: "🎒", text: "Pack my bag" },
    ])

    const [inputText, setInputText]           = useState("")
    const [selectedEmoji, setSelectedEmoji]   = useState("📝")
    const [showPicker, setShowPicker]         = useState(false)
    const [editingId, setEditingId]           = useState(null)
    const [editText, setEditText]             = useState("")
    const [editEmoji, setEditEmoji]           = useState("")
    const [showEditPicker, setShowEditPicker] = useState(false)

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
        setEditEmoji(task.emoji)
    }

    function handleEditSave(id) {
        if (editText.trim() === "") return
        setTasks(tasks.map((task) =>
            task.id === id
                ? { ...task, text: editText.trim(), emoji: editEmoji }
                : task
        ))
        setEditingId(null)
        setEditText("")
        setEditEmoji("")
        setShowEditPicker(false)
    }

    function handleEditCancel() {
        setEditingId(null)
        setEditText("")
        setEditEmoji("")
        setShowEditPicker(false)
    }

    // -- Delete -- //
    function handleDelete(id) {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    return (
        <div className="flex flex-col gap-4 w-full max-w-lg">

            {/* ── ADD INPUT AREA ── */}
            <div className="flex flex-col gap-2">

               {/* Combined emoji + text input box */}
                <div className="flex flex-1 items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-bloom-sage">
                    {/* Emoji picker button — ADD */}
                    <button
                        onClick={() => setShowPicker(!showPicker)}
                        className="text-2xl flex items-center justify-center hover:bg-bloom-light rounded-lg p-1 transition">
                        {selectedEmoji}
                    </button>

                    {/* Text input — ADD */}
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Add a new task..."
                        className="flex-1 text-gray-700 bg-transparent focus:outline-none"/>

                    {/* Add button */}
                    <Button onClick={handleAddTask}>Add</Button>

                </div>

                {/* Emoji picker grid — ADD */}
                {showPicker && (
                    <div className="bg-white border border-gray-200 rounded-2xl shadow p-3 grid grid-cols-8 gap-2">
                        {emojis.map((emoji) => (
                            <button
                                key={emoji}
                                onClick={() => { setSelectedEmoji(emoji); setShowPicker(false) }}
                                className="text-2xl w-10 h-10 rounded-lg flex items-center justify-center hover:bg-bloom-light transition">
                                {emoji}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ── TASK CARDS ── */}
            {tasks.map((task) => (
                editingId === task.id ? (
                    // Edit mode
                    <div key={task.id} className="bg-white border border-bloom-sage rounded-2xl shadow p-4 flex flex-col gap-2">
                        <div className="flex items-center gap-4">

                            {/* Emoji button — EDIT */}
                            <button
                                onClick={() => setShowEditPicker(!showEditPicker)}
                                className="text-2xl w-10 h-10 rounded-xl border border-gray-300 bg-white flex items-center justify-center hover:bg-bloom-light transition">
                                {selectedEmoji}
                            </button>

                            {/* Text input — EDIT */}
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="flex-1 rounded-lg border border-white px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-white"/>
                        </div>

                        {/* Emoji picker grid — inside the card */}
                        {showEditPicker && (
                            <div className="bg-white border border-gray-200 rounded-2xl shadow p-3 grid grid-cols-8 gap-2">
                                {emojis.map((emoji) => (
                                    <button
                                        key={emoji}
                                        onClick={() => { setEditEmoji(emoji); setShowEditPicker(false) }}
                                        className="text-2xl w-10 h-10 rounded-lg flex items-center justify-center hover:bg-bloom-light transition">
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-end gap-2">
                            <Button onClick={() => handleEditSave(task.id)}>Save</Button>
                            <Button variant="secondary" onClick={handleEditCancel}>Cancel</Button>
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
