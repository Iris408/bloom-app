import useApp from "../../context/useApp"

function Seedling({ variant = "green", className = "" }) {
  const { isDarkMode } = useApp()

  const seedlingStyle = {
    display: "inline-block",
    filter: isDarkMode
      ? variant === "indigo"
        ? "hue-rotate(145deg) saturate(1.3) brightness(0.9)"
        : variant === "navy"  
          ? "hue-rotate(155deg) saturate(1.4) brightness(0.6) contrast(1.2)"
          : "hue-rotate(160deg) saturate(1.6) brightness(0.4) contrast(1.4)"
      : "none"
  }

  return (
    <span
      style={seedlingStyle}
      className={className}
      aria-label="seedling"
      role="img"
    >
      🌱
    </span>
  )
}

export default Seedling