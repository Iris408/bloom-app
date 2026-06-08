import BloomReminder from "../components/ui/BloomReminder"

function Rewards() {
    return (
        <div className="flex flex-col gap-4">
            <div>
            <h2 className="text-2xl font-bold text-green-800">
                ⟡ Rewards
            </h2>
            <p className="text-gray-500">
                Coming soon...
            </p>
            </div>

            <BloomReminder
                reminder="You earned this. It's not luck, it's effort."
                phaseTitle="Rewards v1"
                phaseDescription="This page will later show visual rewards and keep everything saved with localStorage."
            />
        </div>
    )
}

export default Rewards