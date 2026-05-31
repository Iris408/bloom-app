import { createContext, useContext, useState } from "react"

// create the context
const AppContext = createContext()

// build the provider
function AppProvider({ children }) {

    const [activeMode, setActiveMode]       = useState("standard")
    const [activeTheme, setActiveTheme]     = useState("system")
    const [activeProfile, setActiveProfile] = useState(null)

    return (
        <AppContext.Provider value={{
            activeMode, setActiveMode,
            activeTheme, setActiveTheme,
            activeProfile, setActiveProfile,
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