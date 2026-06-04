import { createContext, useContext, useState } from "react"

// create the context
const AppContext = createContext()

function AppProvider({ children }) {
    const [activeMode, setActiveMode]       = useState("standard")
    const [activeTheme, setActiveTheme]     = useState("system")
    const [activeProfile, setActiveProfile] = useState(null)
    const [isDarkMode, setIsDarkMode]       = useState(false)
    const [darkStyle, setDarkStyle]         = useState("green")
    const [fontSize, setFontSize]           = useState("medium")
    const [dyslexicFont, setDyslexicFont]   = useState(false)
    const [reduceMotion, setReduceMotion]   = useState(false)

    function toggleDarkStyle() {
    setDarkStyle(darkStyle === "grey" ? "green" : "grey")
    } 

    function toggleDarkMode() {
        const newValue = !isDarkMode
        setIsDarkMode(newValue)

        if (newValue) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }

    function applyFontSize(size) {
    // EN: Remove all font size classes then apply the chosen one
    // JP: すべてのフォントサイズクラスを削除し、選択したサイズを適用します
    document.documentElement.classList.remove(
        "font-small", "font-medium", "font-large", "font-xl"
    )
    document.documentElement.classList.add(`font-${size}`)
    setFontSize(size)
}

    function toggleDyslexicFont() {
    const newValue = !dyslexicFont
    setDyslexicFont(newValue)
    if (newValue) {
        document.documentElement.classList.add("dyslexic")
    } else {
        document.documentElement.classList.remove("dyslexic")
    }
}

    function toggleReduceMotion() {
        const newValue = !reduceMotion
        setReduceMotion(newValue)

        if (newValue) {
            document.documentElement.classList.add("reduce-motion")   
        } else {
            document.documentElement.classList.remove("reduce-motion")
        }
    }

    return (
        <AppContext.Provider value={{
            activeMode,    setActiveMode,
            activeTheme,   setActiveTheme,
            activeProfile, setActiveProfile,
            isDarkMode,    toggleDarkMode,
            darkStyle,     
            fontSize,      applyFontSize,
            dyslexicFont,  toggleDyslexicFont,
            reduceMotion,  toggleReduceMotion
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