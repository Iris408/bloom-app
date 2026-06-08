import { createContext, useContext, useState, useEffect } from "react"

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
    const [focusTasks, setFocusTasks]       = useState(() => {
        const saved = localStorage.getItem("bloom_focus_tasks");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("bloom_focus_tasks", JSON.stringify(focusTasks));
    }, [focusTasks]);

    function toggleDarkStyle() {
    setDarkStyle(darkStyle === "grey" ? "green" : "grey")
    }

    const addFocusTask = (title, dateKey) => {
        setFocusTasks((prev) => [
            ...prev,
    {
      id: crypto.randomUUID(),
      title,
      scheduledFor: dateKey,
      completedOn: null,
    },
  ]);
};

    const completeFocusTask = (id, dateKey) => {
        setFocusTasks((prev) => 
            prev.map((task) =>
                task.id === id ? { ...task, completedOn: dateKey } : task
    )
  );
};

const deleteFocusTask = (id) => {
  setFocusTasks((prev) => prev.filter((task) => task.id !== id));
};

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
            toggleDarkStyle,

            fontSize,      applyFontSize,
            dyslexicFont,  toggleDyslexicFont,
            reduceMotion,  toggleReduceMotion,
            
            focusTasks,    
            setFocusTasks,
            addFocusTask,
            completeFocusTask,
            deleteFocusTask,  
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
export default AppContext