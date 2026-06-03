import TaskList from "../components/tasks/TaskList"

function Home() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-bloom-forest dark:text-bloom-light">
                ⌂ Today's tasks
            </h2>
            <TaskList />
        </div>
    )
}

export default Home