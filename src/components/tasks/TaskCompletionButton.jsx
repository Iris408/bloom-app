// EN: Reusable button for marking a task as complete or incomplete.
// JP: タスクを完了・未完了に切り替えるための再利用可能なボタンです。
function TaskCompletionButton({ isCompleted, onClick }) {
    return (
        <button
          type="button"
          onClick={onClick}
          className={`flex h-5 w-6.5 items-center justify-center rounded-full border text-sm font-semibold transition ${
            isCompleted
              ? "border-bloom-mid bg-bloom-forest text-white dark:border-bloom-sage/50 dark:bg-bloom-mint/30 dark:text-dark-bg"
              : "border-bloom-sage/60 bg-white text-slate-300 hover:bg-bloom-light hover:text-bloom-forest dark:border-bloom-sage/50 dark:bg-bloom-mint/20 dark:text-bloom-light dark:hover:bg-bloom-mid/90"
          }`}
          aria-label={isCompleted ? "Mark task as incomplete" : "Mark task as complete"}
        >
            {isCompleted ? "✓" : "✓"}
        </button>  
    )
}

export default TaskCompletionButton