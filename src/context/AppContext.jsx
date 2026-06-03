import { createContext, useContext, useState } from "react"

// create the context
const AppContext = createContext()

function AppProvider({ children }) {
    const [activeMode, setActiveMode]       = useState("standard")
    const [activeTheme, setActiveTheme]     = useState("system")
    const [activeProfile, setActiveProfile] = useState(null)
    const [isDarkMode, setIsDarkMode]       = useState(false)

    function toggleDarkMode() {
        const newValue = !isDarkMode
        setIsDarkMode(newValue)

        if (newValue) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }

    return (
        <AppContext.Provider value={{
            activeMode, setActiveMode,
            activeTheme, setActiveTheme,
            activeProfile, setActiveProfile,
            isDarkMode, toggleDarkMode,
        }}>
            {children}
        </AppContext.Provider>
    )
}

// build a custom hook for easy access
function useApp() {
    return useContext(AppContext)
}

export { AppProvider, useApp }