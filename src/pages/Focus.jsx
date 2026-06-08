import BloomReminder from "../components/ui/BloomReminder"

function Focus() {
    return (
        <div className="flex flex-col gap-4">
            <div>
            <h2 className="text-2xl font-bold text-green-800">
                𖣠 Focus
            </h2>
            <p className="text-gray-500">
                Coming soon...
            </p>
            </div>

            <BloomReminder
                reminder="If your mind wanders, that's okay."
                phaseTitle="Focus Mode v1"
                phaseDescription="This page will support one-step-at-a-time routines to reduce overwhelm."
            />
        </div>
    )
}

export default Focus