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

import DailyAffirmationCard from "./components/home/DailyAffirmationCard"
import DemoBanner from "./components/demo/DemoBanner";
import ExitDemoConfirmModal from "./components/demo/ExitDemoConfirmModal";

function App() {
  const [activePage, setActivePage] = useState("overview");
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // EN: Demo mode lets users/recruiters explore Bloom without a real account.
  // JP: デモモードでは、実際のアカウントなしでBloomを試せます。
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoType, setDemoType] = useState(null);

  // EN: Controls the confirmation popup shown before leaving demo mode.
  // JP: デモモードを終了する前に表示する確認ポップアップを管理します。
  const [isExitDemoConfirmOpen, setIsExitDemoConfirmOpen] = useState(false);

  const [loginInitialView, setLoginInitialView] =useState("login")

  const { isDarkMode } = useApp();

  const protectedPages = [
    "home",
    "routines",
    "focus",
    "progress",
    "moments",
    "profile",
  ];

  // EN: Users can access the main app if they are logged in OR using demo mode.
  // JP: ログイン済み、またはデモモードの場合、メインアプリにアクセスできます。
  const canUseApp = Boolean(currentUser) || isDemoMode;

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
    // JP: ユーザーをログアウトし、公開用Overviewページへ戻します。
    logoutUser();
    setCurrentUser(null);
    setIsDemoMode(false);
    setDemoType(null);
    setIsLoginOpen(false);
    setIsExitDemoConfirmOpen(false);
    setActivePage("overview");
  }

  function handleStartDemo(selectedDemoType) {
    // EN: Start demo mode and move the user into the main Bloom app.
    // JP: デモモードを開始し、ユーザーをBloomのメイン画面へ移動します。
    setIsDemoMode(true);
    setDemoType(selectedDemoType);
    setIsLoginOpen(false);
    setActivePage("home");
  }

  function handleConfirmExitDemo() {
    // EN: Exit demo mode and return to the public Overview page.
    // JP: デモモードを終了し、公開用Overviewページへ戻します。
    setIsDemoMode(false);
    setDemoType(null);
    setIsExitDemoConfirmOpen(false);
    setActivePage("overview");
  }

  function handleCreateAccountFromDemo() {
    // EN: Close the exit confirmation and open the login modal.
    // JP: 終了確認を閉じて、ログインモーダルを開きます。
    setIsExitDemoConfirmOpen(false);
    setIsLoginOpen(true);
  }

  function handlePageChange(page) {
    // EN: Open the login modal if logged-out users try to access protected pages.
    // JP: 未ログインのユーザーが保護ページへアクセスしようとした場合、ログインモーダルを開きます。
    if (protectedPages.includes(page) && !canUseApp) {
      setActivePage("overview");
      setIsLoginOpen(true);
      return;
    }

    setActivePage(page);
  }

  function openLoginModal(initialView = "login") {
    setLoginInitialView(initialView)
    setIsLoginOpen(true)
  }

  function renderPage() {
    // EN: Public information pages are available to all users.
    // JP: 公開情報ページはすべてのユーザーが閲覧できます。
    if (activePage === "about") return <About />;
    if (activePage === "privacy") return <Privacy />;
    if (activePage === "accessibility") return <Accessibility />;

    // EN: Logged-out users only see the public Overview page.
    // JP: 未ログインのユーザーには公開用Overviewページだけを表示します。
    if (!canUseApp) {
      return (
        <Overview 
          setActivePage={handlePageChange} 
          onLoginClick={() => openLoginModal("login")}
          onTryDemoClick={() => openLoginModal("demo")}
          onCreateAccountClick={() => openLoginModal("create")}
        />
      );
    }

    // EN: Logged-in users and demo users can access the protected app pages.
    // JP: ログイン済みユーザーとデモユーザーは保護されたアプリ画面にアクセスできます。
      if (activePage === "home") {
        return (
          <Home
            isDemoMode={isDemoMode}
            demoType={demoType}
            onCreateAccount={handleCreateAccountFromDemo}
            onExitDemoClick={() => setIsExitDemoConfirmOpen(true)}
          />
        );
      }
    if (activePage === "routines") return <Routines />;
    if (activePage === "focus") return <Focus />;
    if (activePage === "progress") return <Progress />;
    if (activePage === "moments") return <Moments />;
    if (activePage === "profile") return <Profile />;

    return <Home />;
  }

  return (
    <>

      {/* EN: Background decoration is clipped to the viewport to prevent mobile side-scroll. */}
      {/* JP: モバイルで横スクロールが出ないように、背景装飾を画面幅内に収めます。 */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <BloomBackgroundDecor />
      </div>

      <div
        className={`relative z-10 min-h-screen w-full max-w-full flex flex-col overflow-x-hidden transition-colors duration-300 ${bgClass}`}
      >
          <Header
            setActivePage={handlePageChange}
            activePage={activePage}
            currentUser={currentUser}
            isDemoMode={isDemoMode}
            demoType={demoType}
            onLogout={handleLogout}
            onLoginClick={() => openLoginModal("login")}
            onExitDemoClick={() => setIsExitDemoConfirmOpen(true)}
            onCreateAccountClick={handleCreateAccountFromDemo}
          />

          {canUseApp && (
            <div className="relative z-20 md:hidden">
              <DailyAffirmationCard variant="mobile-strip" />
            </div>
          )}


          {/* EN: Below-header layout with optional sidebar and main content area. */}
          {/* JP: ヘッダー下のサイドバーとメインコンテンツのレイアウトです。 */}
          <div className="flex flex-1">
            {canUseApp && (
              <Sidebar
                activePage={activePage}
                setActivePage={handlePageChange}
              />
            )}

            <main className="min-w-0 w-full max-w-full flex-1 overflow-x-hidden">
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

          {!canUseApp && 
            <Footer
              setActivePage={handlePageChange}
              onLoginClick={() => openLoginModal("login")}
              onTryDemoClick={() => openLoginModal("demo")}
              onCreateAccountClick={() => openLoginModal("create")}
            />}
        </div>

      {/* EN: BottomNav and LoginModal are fixed-position elements rendered outside */}
      {/* EN: the wrapper to guarantee they are never clipped or stacking-context trapped. */}
      {/* JP: BottomNav と LoginModal は fixed 要素のため、ラッパー外に配置して */}
      {/* JP: クリッピングやスタッキングコンテキストの影響を受けないようにします。 */}
      {canUseApp && (
        <BottomNav activePage={activePage} setActivePage={handlePageChange} />
      )}

      {isLoginOpen && !canUseApp && (
        <LoginModal
          initialView={loginInitialView}
          setCurrentUser={setCurrentUser}
          setActivePage={setActivePage}
          onClose={() => setIsLoginOpen(false)}
          onStartDemo={handleStartDemo}
        />
      )}

      {isExitDemoConfirmOpen && (
        <ExitDemoConfirmModal
          onClose={() => setIsExitDemoConfirmOpen(false)}
          onCreateAccount={handleCreateAccountFromDemo}
          onConfirmExit={handleConfirmExitDemo}
        />
      )}
    </>
  );
}

export default App;