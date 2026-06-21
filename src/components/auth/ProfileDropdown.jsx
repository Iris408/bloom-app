import { useEffect, useRef, useState } from "react";

export default function ProfileDropdown({
  currentUser,
  setActivePage,
  onLogout,
  reduceMotion = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // EN: Use photo if available later, otherwise use the user's first initial.
  // JP: 後で写真があれば使用し、なければユーザー名の頭文字を表示します。
  const avatarUrl = currentUser?.photo_url || currentUser?.avatar_url || null;

  const userInitial =
    currentUser?.username?.charAt(0).toUpperCase() ||
    currentUser?.email?.charAt(0).toUpperCase() ||
    "?";

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  function handleNavigate(page) {
    setActivePage(page);
    setIsOpen(false);
  }

  function handleLogoutClick() {
    setIsOpen(false);
    onLogout();
  }

  const transitionClass = reduceMotion
    ? ""
    : "transition duration-200 ease-out motion-reduce:transition-none";

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-bloom-mid/65 text-sm font-semibold text-white shadow-sm"
        aria-label="Open profile menu"
        aria-expanded={isOpen}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          userInitial
        )}
      </button>

      <div
        className={`absolute right-0 z-50 mt-3 w-52 rounded-2xl border border-green-100 bg-white p-2 shadow-lg ${transitionClass} ${
          isOpen
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        } motion-reduce:scale-100`}
      >
        <div className="border-b border-green-100 px-3 py-2">
          <p className="text-sm font-semibold text-gray-800">
            {currentUser?.username}
          </p>
          <p className="truncate text-xs text-gray-500">
            {currentUser?.email}
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleNavigate("profile")}
          className="mt-2 w-full rounded-xl px-3 py-2 text-left text-sm text-gray-700 hover:bg-green-50"
        >
          Profile
        </button>

        <button
          type="button"
          onClick={() => handleNavigate("profile")}
          className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-700 hover:bg-green-50"
        >
          Settings
        </button>

        <button
          type="button"
          onClick={handleLogoutClick}
          className="w-full rounded-xl px-3 py-2 text-left text-sm text-red-700 hover:bg-red-50"
        >
          Log out
        </button>
      </div>
    </div>
  );
}