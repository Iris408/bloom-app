import { useState } from 'react'
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


function App() {
  const [activePage, setActivePage] = useState("overview")

  function renderPage() {
    if (activePage === "overview") return <Overview />
    if (activePage === "home")     return <Home />
    if (activePage === "routines") return <Routines />
    if (activePage === "focus")    return <Focus />
    if (activePage === "progress") return <Progress />
    if (activePage === "rewards")  return <Rewards />
    if (activePage === "profile")  return <Profile />
  }

  return (
    <div className="min-h-screen bg-bloom-light dark:bg-gray-900 flex flex-col">

      <Header />

      {/* Below Header - sidebar + main content */}
      <div className="flex flex-1">

        {/* Sidebar - desktop only // Passing props */}
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        {/* Main content area */}
        <main className="flex-1 flex flex-col px-4 py-8 pb-24 md:pb-8 dark:bg-gray-900">
          {renderPage()}
        </main>  

      </div>

      {/* Bottom nav - mobile only */}
      <BottomNav activePage={activePage} setActivePage={setActivePage} /> 

    </div>
  )  
}

export default App