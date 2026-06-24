import { useEffect, useState } from "react";
import { useApp } from "./context/AppContext";
import { getAuthToken, getCurrentUser, logoutUser } from "./api/bloomApi";

import LoginModal from "./components/auth/LoginModal";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import BottomNav from "./components/layout/BottomNav";
import Home from "./pages/Home";
import Overview from "./pages/Overview";
import Routines from "./pages/Routines";
import Focus from "./pages/Focus";
import Progress from "./pages/Progress";
import Moments from "./pages/Moments";
import Profile from "./pages/Profile";
import Footer from "./components/layout/Footer";

import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Accessibility from "./pages/Accessibility";
import BloomBackgroundDecor from "./components/decor/BloomBackgroundDecor";

function App() {
  const [activePage, setActivePage] = useState("overview");
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { isDarkMode } = useApp();

  const protectedPages = [
    "home",
    "routines",
    "focus",
    "progress",
    "moments",
    "profile",
  ];

  // EN: Dynamic background based on dark mode.
  // JP: ダークモードに応じて背景を切り替えます。
  const bgClass = isDarkMode
    ? "bg-gradient-to-b from-[#202029] via-[#343442] to-[#48485B]"
    : "bg-gradient-to-t from-[#f3f7ed] via-[#e8f0dd] to-[#dde9ce]";

  useEffect(() => {
    async function checkExistingLogin() {
      const token = getAuthToken();

      if (!token) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        // EN: Check whether the saved token still belongs to a valid user.
        // JP: 保存済みトークンが有効なユーザーに属しているか確認します。
        const user = await getCurrentUser();
        setCurrentUser(user);

        // EN: Existing logged-in users enter the protected app area.
        // JP: 既にログイン済みのユーザーは保護されたアプリ画面へ移動します。
        setActivePage("home");
      } catch {
        // EN: Remove invalid or expired token.
        // JP: 無効または期限切れのトークンを削除します。
        logoutUser();
        setCurrentUser(null);
        setActivePage("overview");
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkExistingLogin();
  }, []);

  function handleLogout() {
    // EN: Log out the user and return to the public Overview page.
    // JP: ユーザーをログアウトし、公開用のOverviewページへ戻します。
    logoutUser();
    setCurrentUser(null);
    setIsLoginOpen(false);
    setActivePage("overview");
  }

  function handlePageChange(page) {
    // EN: Open the login modal if logged-out users try to access protected pages.
    // JP: 未ログインのユーザーが保護ページへアクセスしようとした場合、ログインモーダルを開きます。
    if (protectedPages.includes(page) && !currentUser) {
      setActivePage("overview");
      setIsLoginOpen(true);
      return;
    }

    setActivePage(page);
  }

  function renderPage() {
    // EN: Public information pages are available to all users.
    // JP: 公開情報ページはすべてのユーザーが閲覧できます。
    if (activePage === "about") return <About />;
    if (activePage === "privacy") return <Privacy />;
    if (activePage === "accessibility") return <Accessibility />;

    // EN: Logged-out users only see the public Overview page.
    // JP: 未ログインのユーザーには公開用Overviewページだけを表示します。
    if (!currentUser) {
      return <Overview setActivePage={handlePageChange} />;
    }

    // EN: Logged-in users can access the protected app pages.
    // JP: ログイン済みユーザーは保護されたアプリ画面にアクセスできます。
    if (activePage === "home") return <Home />;
    if (activePage === "routines") return <Routines />;
    if (activePage === "focus") return <Focus />;
    if (activePage === "progress") return <Progress />;
    if (activePage === "moments") return <Moments />;
    if (activePage === "profile") return <Profile />;

    return <Home />;
  }

  return (
    <>
      {/* EN: Rendered outside the wrapper so overflow-x-hidden and any future */}
      {/* EN: transforms on the wrapper cannot clip or reposition fixed children. */}
      {/* JP: overflow-x-hidden や将来の transform によるクリッピングを防ぐため、 */}
      {/* JP: ラッパー外に配置します。 */}
      <BloomBackgroundDecor />

      <div
        className={`relative min-h-screen flex flex-col overflow-x-hidden transition-colors duration-300 ${bgClass}`}
      >
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header
            setActivePage={handlePageChange}
            activePage={activePage}
            currentUser={currentUser}
            onLogout={handleLogout}
            onLoginClick={() => setIsLoginOpen(true)}
          />

          {/* EN: Below-header layout with optional sidebar and main content area. */}
          {/* JP: ヘッダー下のサイドバーとメインコンテンツのレイアウトです。 */}
          <div className="flex flex-1">
            {currentUser && (
              <Sidebar
                activePage={activePage}
                setActivePage={handlePageChange}
              />
            )}

            <main className="flex-1 flex flex-col px-4 py-8 pb-28 md:pb-10 overflow-x-hidden">
              {isCheckingAuth ? (
                // EN: Centred loading indicator shown while the auth token is verified.
                // JP: 認証トークンの確認中に表示される中央寄せのローディング表示です。
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                    🌱 Loading...
                  </p>
                </div>
              ) : (
                renderPage()
              )}
            </main>
          </div>

          <Footer setActivePage={handlePageChange} />
        </div>
      </div>

      {/* EN: BottomNav and LoginModal are fixed-position elements rendered outside */}
      {/* EN: the wrapper to guarantee they are never clipped or stacking-context trapped. */}
      {/* JP: BottomNav と LoginModal は fixed 要素のため、ラッパー外に配置して */}
      {/* JP: クリッピングやスタッキングコンテキストの影響を受けないようにします。 */}
      {currentUser && (
        <BottomNav activePage={activePage} setActivePage={handlePageChange} />
      )}

      {isLoginOpen && !currentUser && (
        <LoginModal
          setCurrentUser={setCurrentUser}
          setActivePage={setActivePage}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </>
  );
}

export default App;