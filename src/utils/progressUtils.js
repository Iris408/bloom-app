// EN: Return a date key in YYYY-MM-DD format.
// JP: 日付キーを YYYY-MM-DD 形式で返します。
export function todayKey(date = new Date()) {
  return date.toISOString().split("T")[0]
}

// EN: Create date keys for the last number of days.
// JP: 指定した日数分の日付キーを作成します。
export function getWeekKeys(days = 7) {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() - (days - 1 - index))

    return todayKey(date)
  })
}

// EN: Convert a date key into a short weekday label.
// JP: 日付キーを短い曜日ラベルに変換します。
export function dayLabel(dateKey) {
  const date = new Date(dateKey)

  return date.toLocaleDateString("en-GB", {
    weekday: "short",
  })
}

// EN: Return a calm progress label and styling based on completion percentage.
// JP: 完了率に応じて、落ち着いた進捗ラベルとスタイルを返します。
export function getProgressState(percentage = 0) {
  if (percentage === 0) {
    return {
      icon: "🌱",
      label: "Ready when you are",
      message: "No rush. Begin whenever it feels right.",
      bgColor: "#F1EFE8",
      textColor: "#5F625A",
      barColor: "#CFCBC1",
    }
  }

  if (percentage < 50) {
    return {
      icon: "🌿",
      label: "Gently beginning",
      message: "You've made a start. That's enough.",
      bgColor: "#EEEDFE",
      textColor: "#534AB7",
      barColor: "#8B7FF5",
    }
  }

  if (percentage < 100) {
    return {
      icon: "🌸",
      label: "Finding your flow",
      message: "You're making your way through. Keep going at your own pace.",
      bgColor: "#FAEEDA",
      textColor: "#854F0B",
      barColor: "#D49B35",
    }
  }

  return {
    icon: "🌳",
    label: "All done",
    message: "You showed up today. That matters.",
    bgColor: "#E1F5EE",
    textColor: "#0F6E56",
    barColor: "#1D9E75",
  }
}