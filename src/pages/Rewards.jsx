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
                reminder="You earned this. All wins deserve to be noticed."
                phaseTitle="Rewards v1"
                phaseDescription="This page will later show badges, stars, streaks, and gentle rewards for completed routines."
            />
        </div>
    )
}

export default Rewards