import { bloomAvatars } from "../../data/bloomAvatars"

function AvatarChoiceGrid({
  selectedAvatarType,
  selectedAvatarId,
  onSelectAvatar,
  currentInitial = "?",
  showUploadOption = true,
}) {
  return (
    <div className="rounded-[1.75rem] border border-bloom-sage/25 bg-white/55 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="mb-4">
        <p className="text-sm font-bold text-bloom-forest dark:text-bloom-light">
          Choose your profile image
        </p>

        <p className="mt-1 text-xs leading-5 text-bloom-forest/65 dark:text-gray-300">
          Use your initial, choose a Bloom avatar, or upload your own photo later.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
        <button
          type="button"
          onClick={() =>
            onSelectAvatar({
              avatarType: "initial",
              avatarId: null,
              avatarUrl: null,
            })
          }
          className={`flex aspect-square flex-col items-center justify-center rounded-2xl border text-center transition ${
            selectedAvatarType === "initial"
              ? "border-bloom-forest bg-bloom-forest text-white"
              : "border-bloom-sage/30 bg-bloom-light/70 text-bloom-forest hover:border-bloom-mid"
          }`}
        >
          <span className="text-2xl font-bold">{currentInitial}</span>
          <span className="mt-1 text-[10px] font-semibold">Initial</span>
        </button>

        {bloomAvatars.map((avatar) => {
          const isSelected =
            selectedAvatarType === "bloom" && selectedAvatarId === avatar.id

          return (
            <button
              key={avatar.id}
              type="button"
              onClick={() =>
                onSelectAvatar({
                  avatarType: "bloom",
                  avatarId: avatar.id,
                  avatarUrl: avatar.image,
                })
              }
              className={`aspect-square overflow-hidden rounded-2xl border transition ${
                isSelected
                  ? "border-bloom-forest ring-2 ring-bloom-forest/30"
                  : "border-bloom-sage/30 hover:border-bloom-mid"
              }`}
            >
              <img
                src={avatar.image}
                alt={avatar.label}
                className="h-full w-full object-cover"
              />
            </button>
          )
        })}

        {showUploadOption && (
          <button
            type="button"
            disabled
            className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-dashed border-bloom-sage/40 bg-white/50 text-center text-bloom-forest/45 dark:border-white/10 dark:bg-white/5 dark:text-gray-400"
          >
            <span className="text-xl">+</span>
            <span className="mt-1 px-2 text-[10px] font-semibold leading-4">
              Upload later
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export default AvatarChoiceGrid