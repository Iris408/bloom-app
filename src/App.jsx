import Header from './components/layout/Header'

function App() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col">

      <Header />

      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8">  
        <p className="text-green-700">Welcome to Bloom 🌱</p> 
      </main>  

    </div>
  )
}

export default App