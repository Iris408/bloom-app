// EN: Reusable button for marking a task as complete or incomplete.
// JP: タスクを完了・未完了に切り替えるための再利用可能なボタンです。
function TaskCompletionButton({ isCompleted, onClick }) {
    return (
        <button
          type="button"
          onClick={onClick}
          className={`flex h-5 w-6.5 items-center justify-center rounded-full border text-sm font-semibold transition ${
            isCompleted
              ? "border-bloom-mid bg-bloom-forest text-white dark:border-bloom-sage/50 dark:bg-bloom-mid/90 dark:text-bloom-light"
              : "border-bloom-sage/60 bg-white text-slate-300 hover:bg-bloom-light hover:text-bloom-forest dark:border-bloom-sage dark:bg-white/10 dark:text-gray-400 dark:hover:bg-bloom-mint/40 dark:hover:text-bloom-light"
          }`}
          aria-label={isCompleted ? "Mark task as incomplete" : "Mark task as complete"}
        >
            {isCompleted ? "✓" : "✓"}
        </button>  
    )
}

export default TaskCompletionButton