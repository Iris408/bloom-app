import { useEffect, useState } from "react";
import useApp from "./context/useApp";
import { getAuthToken, getCurrentUser, logoutUser } from "./api/bloomApi";
import { getAvatarDisplay } from "./utils/avatarStorage";
import { seedDemoData } from "./utils/seedDemoData"
import { isFullPreviewDemoType } from "./data/demoData"
import { resetDemoSessionData } from "./utils/resetDemoSession"

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
import TutorialPanel from "./components/tutorial/TutorialPanel";
import Wins from "./pages/Wins";

import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Accessibility from "./pages/Accessibility";
import BloomBackgroundDecor from "./components/decor/BloomBackgroundDecor";
import FAQPage from "./pages/FAQPage";
import RoadmapPage from "./pages/RoadmapPage";
import FeedbackPage from "./pages/FeedbackPage";

import DailyAffirmationCard from "./components/home/DailyAffirmationCard"
import ExitDemoConfirmModal from "./components/demo/ExitDemoConfirmModal";
import DemoCompletionModal from "./components/demo/DemoCompletionModal";
import GuidedDemoNotice from "./components/demo/GuidedDemoNotice";

const ACTIVE_PAGE_STORAGE_KEY = "bloom-active-page"

function App() {
  const [activePage, setActivePage] = useState(() => {
    try {
      return localStorage.getItem(ACTIVE_PAGE_STORAGE_KEY) || "home"
    } catch {
      return "home"
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_PAGE_STORAGE_KEY, activePage)
    } catch {
      // Page persistence is optional.
    }
  }, [activePage])

  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [authRestoreError, setAuthRestoreError] = useState("")
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { reduceMotion } = useApp()

  // EN: Demo mode lets users/recruiters explore Bloom without a real account.
  // JP: デモモードでは、実際のアカウントなしでBloomを試せます。
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoType, setDemoType] = useState(null);
  const [isDemoCompletionOpen, setIsDemoCompletionOpen] = useState(false);
  const guidedDemoPages = ["routines", "focus", "moments"]
  const isGuidedDemo = isDemoMode && !isFullPreviewDemoType(demoType)

  const guidedDemoPageNames = {
    routines: "routines",
    focus: "focus",
    moments: "moments",
  }

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
    "wins",
    "profile",
    "settings",
    "help",
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
    let shouldIgnore = false

    async function checkExistingLogin() {
      const token = getAuthToken()

      if (!token) {
        if (!shouldIgnore) {
          setCurrentUser(null)
          setIsCheckingAuth(false)
        }

        return
      }

      setIsCheckingAuth(true)
      setAuthRestoreError("")

      try {
        // EN: Restore the signed-in user from the saved token.
        // JP: 保存されたトークンからログインユーザーを復元します。
        const user = await getCurrentUser()

        if (!shouldIgnore) {
          setCurrentUser(user)
        }
      } catch (error) {
        if (shouldIgnore) return

        const status = error?.status

        if (status === 401 || status === 403) {
          // EN: Remove the token only when the backend confirms it is invalid.
          // JP: バックエンドがトークンの無効を確認した場合のみ削除します。
          logoutUser()
          setCurrentUser(null)
          setActivePage("overview")
          return
        }

        // EN: Keep the saved session during temporary connection problems.
        // JP: 一時的な接続エラーでは保存済みセッションを維持します。
        setAuthRestoreError(
          "We couldn't reach Bloom right now. Your session is still saved."
        )
      } finally {
        if (!shouldIgnore) {
          setIsCheckingAuth(false)
        }
      }
    }

    checkExistingLogin()

    return () => {
      shouldIgnore = true
    }
  }, [])

  async function retryAuthRestoration() {
    setIsCheckingAuth(true)
    setAuthRestoreError("")

    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch (error) {
      const status = error?.status || error?.response?.status

      if (status === 401 || status === 403) {
        logoutUser()
        setCurrentUser(null)
        setActivePage("overview")
        return
      }

      setAuthRestoreError(
        "We still couldn't reach Bloom. Please try again in a moment."
      )
    } finally {
      setIsCheckingAuth(false)
    }
  }  
  useEffect(() => {
    function handleDemoCompletion() {
      if (!isDemoMode) return

      const alreadyShown = sessionStorage.getItem(
        "bloom-demo-completion-shown"
      )

      if (alreadyShown) return

      sessionStorage.setItem("bloom-demo-completion-shown", "true")
      setIsDemoCompletionOpen(true)
    }

    window.addEventListener("bloom-demo-completion", handleDemoCompletion)

    return () => {
      window.removeEventListener("bloom-demo-completion", handleDemoCompletion)
    }
  }, [isDemoMode])

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
    const nextDemoType =
      typeof selectedDemoType === "string"
        ? selectedDemoType
        : selectedDemoType?.id ||
          selectedDemoType?.type ||
          selectedDemoType?.value ||
          "simple"

    resetDemoSessionData()
    seedDemoData(nextDemoType)

    setIsDemoMode(true)
    setDemoType(nextDemoType)
    setIsLoginOpen(false)
    setActivePage("home")
  }

  function handleConfirmExitDemo() {
    resetDemoSessionData()

    // EN: Exit demo mode and return to the public Overview page.
    // JP: デモモードを終了し、公開用Overviewページへ戻します。
    setIsDemoMode(false)
    setDemoType(null)
    setIsExitDemoConfirmOpen(false)
    setIsDemoCompletionOpen(false)
    setActivePage("overview")
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
    if (activePage === "accessibility") {
      return <Accessibility setActivePage={handlePageChange} />;
    };
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
    
    if (isGuidedDemo && guidedDemoPages.includes(activePage)) {
      return (
        <GuidedDemoNotice
          pageName={guidedDemoPageNames[activePage]}
          demoType={demoType}
          onGoHome={() => handlePageChange("home")}
          onCreateAccount={handleCreateAccountFromDemo}
        />
      );
    }

    if (activePage === "routines") {
      return (
        <Routines
          currentUser={currentUser}
          isDemoMode={isDemoMode}
          demoType={demoType}
        />
      );    
    }
    if (activePage === "focus") {
      return (
        <Focus
          currentUser={currentUser}
          isDemoMode={isDemoMode}
          demoType={demoType}
        />
      )
    }
    if (activePage === "progress") {
      return (
        <Progress
          currentUser={currentUser}
          isDemoMode={isDemoMode}
          demoType={demoType}
        />
      );
    }
    if (activePage === "moments") return <Moments />;
    if (activePage === "wins") return <Wins />;
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
      <Overview
        setActivePage={handlePageChange}
        onLoginClick={() => openLoginModal("login")}
        onTryDemoClick={() => openLoginModal("demo")}
        onCreateAccountClick={() => openLoginModal("create")}
      />
    );
  }

  if (isDemoMode && !canUseApp) {
    // EN: If the user is in demo mode but cannot access the app, show the Home page.
    // JP: ユーザーがデモモード中でアプリにアクセスできない場合、Homeページを表示します。

    return (
      <Home
        isDemoMode={isDemoMode}
        demoType={demoType}
        onCreateAccount={handleCreateAccountFromDemo}
        onExitDemoClick={() => setIsExitDemoConfirmOpen(true)}
      />
    );
  }

  if (authRestoreError) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center px-6 ${publicBgClass}`}
      >
        <div className="w-full max-w-md rounded-[2rem] border border-bloom-sage/25 bg-white/80 p-7 text-center shadow-sm dark:border-white/10 dark:bg-white/10">
          <p className="text-3xl" aria-hidden="true">
            🌱
          </p>

          <h1 className="mt-4 text-xl font-bold text-bloom-forest dark:text-bloom-light">
            Bloom is having trouble connecting
          </h1>

          <p
            role="alert"
            className="mt-3 text-sm leading-6 text-bloom-forest/65 dark:text-gray-300"
          >
            {authRestoreError}
          </p>

          <button
            type="button"
            onClick={retryAuthRestoration}
            disabled={isCheckingAuth}
            className="mt-6 rounded-full bg-bloom-mid px-5 py-3 text-sm font-bold text-white transition hover:bg-bloom-forest disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCheckingAuth ? "Trying again…" : "Try again"}
          </button>
        </div>
      </div>
    )
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
                  // EN: Calm loading state shown while Bloom restores the saved session.
                  // JP: 保存されたセッションを復元している間に表示する穏やかなローディング状態です。
                  <div className="flex min-h-[60vh] items-center justify-center px-6">
                    <div className="text-center">
                      <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                        Loading your Bloom space…🌱
                      </p>

                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Restoring your account
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
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
                // EN: Calm loading state shown while Bloom restores the saved session.
                // JP: 保存されたセッションを復元している間に表示する穏やかなローディング状態です。
                  <div className="flex min-h-[60vh] items-center justify-center px-6">
                    <div className="text-center">
                      <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                        Loading your Bloom space…🌱
                      </p>

                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Restoring your account
                      </p>
                    </div>
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
      
      <TutorialPanel
        surface={
          !canUseApp
            ? "landing"
            : isDemoMode
              ? "demo"
              : "app"
        }
        onCreateAccount={handleCreateAccountFromDemo}
      />

      <DemoCompletionModal
        isOpen={isDemoCompletionOpen}
        reduceMotion={reduceMotion}
        onClose={() => setIsDemoCompletionOpen(false)}
        onCreateAccount={() => {
          setIsDemoCompletionOpen(false)
          handleCreateAccountFromDemo()
        }}
        onFinishDemo={() => {
          setIsDemoCompletionOpen(false)
          handleConfirmExitDemo()
        }}
      />

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