function Button({ variant = "primary", onClick, children, className = "",type = "button", disabled = false }) {
    const base = "px-4 py-2 rounded-xl font-semibold transition text-sm"

    const variants = {
        primary:   "bg-bloom-forest text-white hover:bg-bloom-mid",
        secondary: "bg-white text-bloom-forest border border-bloom-forest hover:bg-bloom-light",
        danger:    "bg-white text-red-400 border border-red-300 hover:bg-red-50",
        kid:       "bg-bloom-coral text-white hover:bg-bloom-amber",
    }

    return (
        <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${base} ${variants[variant]} ${className}`}>
            {children}
        </button>
    )
}

export default Button