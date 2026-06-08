import { useState } from 'react'
import { useApp } from './context/AppContext'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import BottomNav from './components/layout/BottomNav'
import Home from './pages/Home'
import Overview from './pages/Overview'
import Routines from './pages/Routines'
import Focus from './pages/Focus'
import Progress from './pages/Progress'
import Rewards from './pages/Rewards'
import Profile from './pages/Profile'
import Footer from './components/layout/Footer'


function App() {
  const [activePage, setActivePage] = useState("overview")
  const { isDarkMode, darkStyle } = useApp()

  // Dynamic background based on dark style
const bgClass = isDarkMode
  ? "bg-gradient-to-t from-[#0F1A14] via-[#0D1A0A] to-[#111F0D]" // if isDarkMode is true
  : "bg-gradient-to-t from-[#f3f7ed] via-[#e8f0dd] to-[#dde9ce]" // if isDarkMode is false


  function renderPage() {
    if (activePage === "overview") return <Overview setActivePage={setActivePage}/>
    if (activePage === "home")     return <Home />
    if (activePage === "routines") return <Routines />
    if (activePage === "focus")    return <Focus />
    if (activePage === "progress") return <Progress />
    if (activePage === "rewards")  return <Rewards />
    if (activePage === "profile")  return <Profile />
  }

  return (
    <div className={`min-h-screen flex flex-col ${bgClass}`}>

      <Header setActivePage={setActivePage} activePage={activePage} />

      {/* Below Header - sidebar + main content */}
      <div className="flex flex-1">

        {/* Sidebar - desktop only */}
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        {/* Main content area */}
        <main className={`flex-1 flex flex-col px-4 py-8 pb-24 md:pb-8 ${bgClass}`}>
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