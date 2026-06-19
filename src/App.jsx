import { useState } from 'react'
import { useApp } from './context/AppContext'
import { getCurrentUser, loginUser } from "./api/bloomApi"
import Login from "./pages/Login";
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import BottomNav from './components/layout/BottomNav'
import Home from './pages/Home'
import Overview from './pages/Overview'
import Routines from './pages/Routines'
import Focus from './pages/Focus'
import Progress from './pages/Progress'
import Moments from './pages/Moments'
import Profile from './pages/Profile'
import Footer from './components/layout/Footer'


function App() {
  const [activePage, setActivePage] = useState("login");
  const { isDarkMode, darkStyle } = useApp()

  // Dynamic background based on dark style
const bgClass = isDarkMode
  ? "bg-gradient-to-b from-[#202029] via-[#343442] to-[#48485B]" // if isDarkMode is true
  : "bg-gradient-to-t from-[#f3f7ed] via-[#e8f0dd] to-[#dde9ce]" // if isDarkMode is false


  function renderPage() {
    if (activePage === "overview") return <Overview setActivePage={setActivePage}/>
    if (activePage === "login")    return <Login />;
    if (activePage === "home")     return <Home />
    if (activePage === "routines") return <Routines />
    if (activePage === "focus")    return <Focus />
    if (activePage === "progress") return <Progress />
    if (activePage === "moments")  return <Moments />
    if (activePage === "profile")  return <Profile />
  }

  return (
    <div className={`min-h-screen flex flex-col overflow-x-hidden transition-colors duration-300 ${bgClass}`}>

      <Header setActivePage={setActivePage} activePage={activePage} />

      {/* Below Header - sidebar + main content */}
      <div className="flex flex-1">

        {/* Sidebar - desktop only */}
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        {/* Main content area */}
        <main className={`flex-1 flex flex-col px-4 py-8 pb-28 md:pb-10 overflow-x-hidden ${bgClass}`}>
          {renderPage()}
        </main>  

      </div>

      {/* Bottom nav - mobile only */}
      <BottomNav activePage={activePage} setActivePage={setActivePage} /> 

      <Footer />

    </div>
  )
}

export default App