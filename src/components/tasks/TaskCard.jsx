function TaskCard({ task, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">

            {/* Top row - emoji + task text */}
            <div className="flex item-center gap-4">
                <span className="text-2xl">{task.emoji}</span>
                <p className="text-gray-700 font-medium flex-1">{task.text}</p>
            </div>

            {/* Bottom row - edit + delete buttons */}
            <div className="flex justify-end gap-2">
                <button
                onClick={() => onEdit(task)}
                className="text-sm text-green-700 px-3 py-1 rounded-lg hover:bg-green-50 transition">
                    Edit
                </button>
                <button
                onClick={() => onDelete(task.id)}
                className="text-sm text-red-400 px-3 py-1 rounded-lg hover:bg-red-50 transition">
                    Delete
                </button>
            </div>

        </div>
    )
}

export default TaskCard