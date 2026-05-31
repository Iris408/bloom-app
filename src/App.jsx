import { useState } from 'react'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import BottomNav from './components/layout/BottomNav'

function App() {
  const [activePage, setActivePage] = useState("home")

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">

      <Header />

      {/* Below Header - sidebar + main content */}
      <div className="flex flex-1">

        {/* Sidebar - desktop only // Passing props */}
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        {/* Main content area */}
        <main className="flex-1 flex flex-col px-4 py-8 pb-24 md:pb-8">
          <p className="text-green-700 font-medium">
            Active page: {activePage}
          </p>
        </main>  

      </div>

      {/* Bottom nav - mobile only */}
      <BottomNav activePage={activePage} setActivePage={setActivePage} /> 

    </div>
  )
}

export default App