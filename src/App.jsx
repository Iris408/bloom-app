import { useEffect, useState } from "react";
import { useApp } from "./context/AppContext";
import { getAuthToken, getCurrentUser, logoutUser } from "./api/bloomApi";

import Login from "./pages/Login";
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

function App() {
  const [activePage, setActivePage] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

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

        setActivePage("overview");
      } catch (error) {
        // EN: Remove invalid or expired token.
        // JP: 無効または期限切れのトークンを削除します。
        logoutUser();
        setCurrentUser(null);
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkExistingLogin();
  }, []);

  function handleLogout() {
    // EN: Log out the user and return to the login page.
    // JP: ユーザーをログアウトし、ログインページへ戻します。
    logoutUser();
    setCurrentUser(null);
    setActivePage("login");
  }

  function handlePageChange(page) {
    // EN: Redirect logged-out users to login if they try to access protected pages.
    // JP: 未ログインのユーザーが保護ページへアクセスしようとした場合、ログインページへ移動します。
    if (protectedPages.includes(page) && !currentUser) {
      setActivePage("login");
      return;
    }

    setActivePage(page);
  }

  function renderPage() {
    // EN: Extra safety guard for protected pages.
    // JP: 保護ページ用の追加安全チェックです。
    if (protectedPages.includes(activePage) && !currentUser) {
      return (
        <Login
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setActivePage={handlePageChange}
          onLogout={handleLogout}
        />
      );
    }

    if (activePage === "login") {
      return (
        <Login
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setActivePage={handlePageChange}
          onLogout={handleLogout}
        />
      );
    }

    if (activePage === "overview") {
      return <Overview setActivePage={handlePageChange} />;
    }

    if (activePage === "home") return <Home />;
    if (activePage === "routines") return <Routines />;
    if (activePage === "focus") return <Focus />;
    if (activePage === "progress") return <Progress />;
    if (activePage === "moments") return <Moments />;
    if (activePage === "profile") return <Profile />;

    return <Overview setActivePage={handlePageChange} />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col overflow-x-hidden transition-colors duration-300 ${bgClass}`}
    >
      <Header
        setActivePage={handlePageChange}
        activePage={activePage}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* EN: Below header layout with sidebar and main content. */}
      {/* JP: ヘッダー下のサイドバーとメインコンテンツのレイアウトです。 */}
      <div className="flex flex-1">
        <Sidebar activePage={activePage} setActivePage={handlePageChange} />

        <main
          className={`flex-1 flex flex-col px-4 py-8 pb-28 md:pb-10 overflow-x-hidden ${bgClass}`}
        >
          {isCheckingAuth ? (
            <p className="text-sm text-gray-600">Checking login...</p>
          ) : (
            renderPage()
          )}
        </main>
      </div>

      <BottomNav activePage={activePage} setActivePage={handlePageChange} />

      <Footer />
    </div>
  );
}

export default App;