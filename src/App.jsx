import { useEffect, useState } from "react";
import { useApp } from "./context/AppContext";
import { getAuthToken, getCurrentUser, logoutUser } from "./api/bloomApi";
import { getAvatarDisplay } from "./utils/avatarStorage";

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
import Settings from "./pages/Settings";

import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Accessibility from "./pages/Accessibility";
import BloomBackgroundDecor from "./components/decor/BloomBackgroundDecor";
import FAQPage from "./pages/FAQPage";
import RoadmapPage from "./pages/RoadmapPage";
import FeedbackPage from "./pages/FeedbackPage";

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

  const [loginInitialView, setLoginInitialView] =useState("login");

  const { isDarkMode, toggleDarkMode } = useApp();

  const avatarDisplay = getAvatarDisplay(currentUser);

  const protectedPages = [
    "home",
    "routines",
    "focus",
    "progress",
    "moments",
    "profile",
    "settings",
  ];

  // EN: Users can access the main app if they are logged in OR using demo mode.
  // JP: ログイン済み、またはデモモードの場合、メインアプリにアクセスできます。
  const canUseApp = Boolean(currentUser) || isDemoMode;

  // EN: Dynamic background based on dark mode.
  // JP: ダークモードに応じて背景を切り替えます。
  const publicBgClass = isDarkMode
    ? "bg-gradient-to-b from-[#202029] via-[#343442] to-[#48485B]"
    : "bg-[#fbf6ed]"

  const protectedBgClass = isDarkMode
    ? "bg-gradient-to-b from-[#202029] via-[#343442] to-[#48485B]"
    : "bg-gradient-to-t from-[#f3f7ed] via-[#e8f0dd] to-[#dde9ce]"

  const bgClass = canUseApp ? protectedBgClass : publicBgClass

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

  useEffect(() => {
    // EN: If a logged-out user somehow lands on a protected page, return to Overview.
    // JP: 未ログインのユーザーが保護ページに入った場合、Overviewへ戻します。
    if (!isCheckingAuth && !canUseApp && protectedPages.includes(activePage)) {
      setActivePage("overview");
    }
  }, [activePage, canUseApp, isCheckingAuth]);

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

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    })
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
  // EN: Close the exit confirmation and open the create-account modal.
  // JP: 終了確認を閉じて、アカウント作成モーダルを開きます。
  setIsExitDemoConfirmOpen(false);
  openLoginModal("create");
}

  function handleAuthSuccess(user) {
    // EN: A real logged-in account should leave demo mode.
    // JP: 実際のログイン済みアカウントではデモモードを終了します。
    setCurrentUser(user);
    setIsDemoMode(false);
    setDemoType(null);
    setIsLoginOpen(false);
    setActivePage("home");
  }

  function handlePageChange(page) {
    // EN: Open the login modal if logged-out users try to access protected pages.
    // JP: 未ログインのユーザーが保護ページへアクセスしようとした場合、ログインモーダルを開きます。
    if (protectedPages.includes(page) && !canUseApp) {
      setActivePage("overview")
      openLoginModal("login")
      return
    }

    setActivePage(page)

    // EN: After changing pages, return the user to the top of the new page.
    // JP: ページを切り替えた後、新しいページの一番上へ移動します。
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      })
    })
  }

  function openLoginModal(initialView = "login") {
    setLoginInitialView(initialView);
    setIsLoginOpen(true);
  }

  function renderPage() {
    // EN: Public information pages are available to all users.
    // JP: 公開情報ページはすべてのユーザーが閲覧できます。
    if (activePage === "about") return <About />;
    if (activePage === "privacy") return <Privacy />;
    if (activePage === "accessibility") return <Accessibility />;
    if (activePage === "roadmap") return <RoadmapPage />;
    if (activePage === "feedback") return <FeedbackPage />;
    if (activePage === "faq") {
      return (
        <FAQPage
          setActivePage={handlePageChange}
          onTryDemoClick={() => openLoginModal("demo")}
        />
      );
    }

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
            currentUser={currentUser}
            isDemoMode={isDemoMode}
            demoType={demoType}
            onCreateAccount={handleCreateAccountFromDemo}
            onExitDemoClick={() => setIsExitDemoConfirmOpen(true)}
            setActivePage={setActivePage}
          />
        );
      }
    if (activePage === "routines") return <Routines />;
    if (activePage === "focus") return <Focus />;
    if (activePage === "progress") return <Progress />;
    if (activePage === "moments") return <Moments />;

    if (activePage === "profile") {
      return (
        <Profile
          currentUser={currentUser}
          isDemoMode={isDemoMode}
          demoType={demoType}
          onLogout={handleLogout}
        />
      );
    }
    if (activePage === "settings") {
      return (
        <Settings
          currentUser={currentUser}
          isDemoMode={isDemoMode}
          onLogout={handleLogout}
        />
      );
    }

    return (
      <Home
        isDemoMode={isDemoMode}
        demoType={demoType}
        onCreateAccount={handleCreateAccountFromDemo}
        onExitDemoClick={() => setIsExitDemoConfirmOpen(true)}
      />
    );  
  }

  return (
    <>

      {/* EN: Background decoration is clipped to the viewport to prevent mobile side-scroll. */}
      {/* JP: モバイルで横スクロールが出ないように、背景装飾を画面幅内に収めます。 */}
      <div 
        className={`relative min-h-screen w-full max-w-full overflow-x-hidden transition-colors duration-300 ${bgClass}`}
      >
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <BloomBackgroundDecor />
        </div>

      {/* EN: Below-header layout with optional sidebar and main content area. */}
      {/* JP: ヘッダー下のサイドバーとメインコンテンツのレイアウトです。 */}
      <div className="relative z-10 min-h-screen w-full">
        {canUseApp ? (
          <div className="flex min-h-screen w-full">
            <Sidebar
              activePage={activePage}
              setActivePage={handlePageChange}
              onOpenHelp={() => handlePageChange("accessibility")}
            />

            <div className="flex min-w-0 flex-1 flex-col"> 
              {/* public pages */} 
              <Header
                canUseApp={canUseApp}
                setActivePage={handlePageChange}
                activePage={activePage}
                currentUser={currentUser}
                avatarDisplay={avatarDisplay}
                isDarkMode={isDarkMode}
                onToggleTheme={toggleDarkMode}
                onProfileClick={() => handlePageChange("profile")}
                isDemoMode={isDemoMode}
                demoType={demoType}
                onLogout={handleLogout}
                onLoginClick={() => openLoginModal("login")}
                onExitDemoClick={() => setIsExitDemoConfirmOpen(true)}
                onCreateAccountClick={() => openLoginModal("create")}
              />

              <div className="relative z-20 md:hidden">
                <DailyAffirmationCard variant="mobile-strip" />
              </div>
   
              <main className="min-w-0 w-full max-w-full flex-1 overflow-x-hidden">
                {isCheckingAuth ? (
                  // EN: Centred loading indicator shown while the auth token is verified.
                  // JP: 認証トークンの確認中に表示される中央寄せのローディング表示です。
                  <div className="flex min-h-[60vh] items-center justify-center">
                    <p className="animate-pulse text-2xl text-gray-500 dark:text-gray-400">
                      🌱 Loading...
                    </p>
                  </div>
                ) : (
                  <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 sm:px-8 lg:px-10">
                    {renderPage()}
                  </div>  
                )}
              </main>
            </div>
          </div>  
        ) : (
          <div className="flex min-h-screen w-full flex-col">
            {/* protected pages */}
            <Header 
              canUseApp={canUseApp}
              setActivePage={handlePageChange}
              activePage={activePage}
              currentUser={currentUser}
              avatarDisplay={avatarDisplay}
              isDarkMode={isDarkMode}
              onToggleTheme={toggleDarkMode}
              onProfileClick={() => handlePageChange("profile")}
              isDemoMode={isDemoMode}
              demoType={demoType}
              onLogout={handleLogout}
              onLoginClick={() => openLoginModal("login")}
              onExitDemoClick={() => setIsExitDemoConfirmOpen(true)}
              onCreateAccountClick={() => openLoginModal("create")}
            />

            <main className="min-w-0 w-full max-w-full flex-1 overflow-x-hidden">
              {isCheckingAuth ? (
                <div className="flex min-h-[60vh] items-center justify-center">
                  <p className="animate-pulse text-sm text-gray-500 dark:text-gray-400">
                    🌱 Loading...
                  </p>
                </div>
              ) : (
                renderPage()
              )}  
            </main>

            <Footer
              setActivePage={handlePageChange}
              onLoginClick={() => openLoginModal("login")}
              onTryDemoClick={() => openLoginModal("demo")}
              onCreateAccountClick={() => openLoginModal("create")}
            />
          </div>
        )}
      </div>
      </div>

      {/* EN: BottomNav and LoginModal are fixed-position elements rendered outside */}
      {/* EN: the wrapper to guarantee they are never clipped or stacking-context trapped. */}
      {/* JP: BottomNav と LoginModal は fixed 要素のため、ラッパー外に配置して */}
      {/* JP: クリッピングやスタッキングコンテキストの影響を受けないようにします。 */}
      {canUseApp && (
        <BottomNav activePage={activePage} setActivePage={handlePageChange} />
      )}

      {isLoginOpen && (
        <LoginModal
          initialView={loginInitialView}
          setCurrentUser={setCurrentUser}
          setActivePage={setActivePage}
          onClose={() => setIsLoginOpen(false)}
          onStartDemo={handleStartDemo}
          onAuthSuccess={handleAuthSuccess}
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