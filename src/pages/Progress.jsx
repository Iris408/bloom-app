import BloomReminder from "../components/ui/BloomReminder"

function Progress() {
    return (
        <div className="flex flex-col gap-4">
            <div>
            <h2 className="text-2xl font-bold text-green-800">
                √ Progress
            </h2>
            <p className="text-gray-500">
                Coming soon...
            </p>
            </div>

            <BloomReminder
                reminder="Progress isn't always a straight line. Zigzags count too."
                phaseTitle="Progress v1"
                phaseDescription="This page will later show completed routines, task progress, and simple visual summaries."
                />
        </div>
    )
}

export default Progress