function Button({ variant = "primary", onClick, children, className = "" }) {
    const base = "px-4 py-2 rounded-xl font-semibold transition text-sm"

    const variants = {
        primary:   "bg-bloom-forest text-white hover:bg-bloom-mid",
        secondary: "bg-white text-bloom-forest border border-bloom-forest hover:bg-bloom-light",
        danger:    "bg-white text-red-400 border border-red-300 hover:bg-red-50",
        kid:       "bg-kid-coral text-white hover:bg-orange-500",
    }

    return (
        <button
        onClick={onClick}
        className={`${base} ${variants[variant]} ${className}`}>
            {children}
        </button>
    )
}

export default Button