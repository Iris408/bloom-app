import { bloomAvatars } from "../../data/bloomAvatars"

function AvatarChoiceGrid({
  selectedAvatarType,
  selectedAvatarId,
  onSelectAvatar,
  currentInitial = "Aa",
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

      <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() =>
            onSelectAvatar({
              avatarType: "initial",
              avatarId: null,
              avatarUrl: null,
            })
          }
          className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl border text-center transition ${
            selectedAvatarType === "initial"
              ? "border-bloom-forest bg-bloom-forest text-white dark:border-bloom-light/40"
              : "border-bloom-sage/30 bg-bloom-light/70 text-bloom-forest hover:border-bloom-mid dark:border-white/10 dark:bg-white/5 dark:text-bloom-light"
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
              className={`h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition ${
                isSelected
                  ? "border-bloom-forest ring-2 ring-bloom-forest/30 dark:border-bloom-light dark:ring-bloom-light/20"
                  : "border-bloom-sage/30 hover:border-bloom-mid dark:border-white/10"
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
            className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl border border-dashed border-bloom-sage/40 bg-white/50 text-center text-bloom-forest/45 dark:border-white/10 dark:bg-white/5 dark:text-gray-400"
          >
            <span className="text-xl">+</span>
            <span className="mt-1 px-2 text-[10px] font-semibold leading-4">
              Upload later
            </span>
          </button>
        )}
      </div>

      <p className="mt-2 text-[11px] font-semibold text-bloom-forest/45 dark:text-gray-400">
        Scroll sideways to see more avatars.
      </p>
    </div>
  )
}

export default AvatarChoiceGrid