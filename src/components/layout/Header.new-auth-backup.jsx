import { useApp } from "../../context/AppContext";
import ProfileDropdown from "../auth/ProfileDropdown";

export default function Header({
  setActivePage,
  currentUser,
  onLogout,
  reduceMotion = false,
}) {
  const appContext = useApp();
  const { isDarkMode } = appContext;

  const transitionClass = reduceMotion
    ? ""
    : "transition-colors duration-200 motion-reduce:transition-none";

  function handleThemeToggle() {
    // EN: Support either toggleDarkMode() or setIsDarkMode() depending on AppContext.
    // JP: AppContextに合わせて toggleDarkMode() または setIsDarkMode() を使います。
    if (typeof appContext.toggleDarkMode === "function") {
      appContext.toggleDarkMode();
      return;
    }

    if (typeof appContext.setIsDarkMode === "function") {
      appContext.setIsDarkMode((current) => !current);
      return;
    }

    console.warn("Dark mode toggle function was not found in AppContext.");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-green-100/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-md dark:border-gray-700/70 dark:bg-gray-900/80">
      <div className="flex items-center justify-between gap-4">
        {/* EN: Bloom logo / app name */}
        {/* JP: Bloomのロゴ・アプリ名 */}
        <button
          type="button"
          onClick={() => setActivePage("overview")}
          className="flex items-center gap-3 text-left"
          aria-label="Go to Bloom overview"
        >
          <span className="text-3xl cursor-pointer" aria-hidden="true">
            🌱
          </span>

          <div>
            <p className="text-xl font-bold tracking-tight text-green-900 dark:text-green-100">
              Bloom
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-green-700/70 dark:text-green-200/70">
              Calm routines
            </p>
          </div>
        </button>

        {/* EN: Header actions */}
        {/* JP: ヘッダー操作 */}
        <div className="flex items-center gap-3">
          {/* EN: Dark/light mode toggle */}
          {/* JP: ダーク/ライトモード切り替え */}
          <button
            type="button"
            onClick={handleThemeToggle}
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-green-200 bg-white text-lg shadow-sm hover:bg-green-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 ${transitionClass}`}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span aria-hidden="true">{isDarkMode ? "☀️" : "🌙"}</span>
          </button>

          {/* EN: Login button or logged-in avatar menu */}
          {/* JP: ログインボタンまたはログイン中アバターメニュー */}
          {currentUser ? (
            <ProfileDropdown
              currentUser={currentUser}
              setActivePage={setActivePage}
              onLogout={onLogout}
              reduceMotion={reduceMotion}
            />
          ) : (
            <button
              type="button"
              onClick={() => setActivePage("login")}
              className={`rounded-full bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 ${transitionClass}`}
            >
              Log in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}