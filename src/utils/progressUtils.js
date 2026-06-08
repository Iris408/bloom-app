// EN: Single source of truth for Bloom progress thresholds.
// JP: Bloom の進捗しきい値を一元管理します。

export const THRESHOLDS = [
  {
    min: 100,
    max: 100,
    label: "Perfect day",
    icon: "🌸",
    message: "You completed every step today. That is worth celebrating.",
    barColor: "#1D9E75",
    bgColor: "#E1F5EE",
    textColor: "#0F6E56",
  },
  {
    min: 70,
    max: 99,
    label: "On a roll",
    icon: "⚡",
    message: "Almost there. You have done the hard part.",
    barColor: "#185FA5",
    bgColor: "#E6F1FB",
    textColor: "#185FA5",
  },
  {
    min: 40,
    max: 69,
    label: "Making progress",
    icon: "🌱",
    message: "You are moving forward. Every step counts.",
    barColor: "#BA7517",
    bgColor: "#FAEEDA",
    textColor: "#854F0B",
  },
  {
    min: 1,
    max: 39,
    label: "You showed up",
    icon: "✨",
    message: "Showing up is the first step. You did that.",
    barColor: "#534AB7",
    bgColor: "#EEEDFE",
    textColor: "#534AB7",
  },
  {
    min: 0,
    max: 0,
    label: "Ready when you are",
    icon: "🌙",
    message: "No steps yet today. Whenever you are ready.",
    barColor: "#B4B2A9",
    bgColor: "#F1EFE8",
    textColor: "#5F5E5A",
  },
];

// EN: Returns the display state for a completion percentage.
// JP: 完了率に応じた表示状態を返します。
export function getProgressState(pct) {
  const clamped = Math.min(100, Math.max(0, Math.round(pct)));

  return (
    THRESHOLDS.find((state) => clamped >= state.min && clamped <= state.max) ||
    THRESHOLDS[THRESHOLDS.length - 1]
  );
}

// EN: Converts a Date object into local YYYY-MM-DD format.
// JP: Date オブジェクトをローカルの YYYY-MM-DD 形式に変換します。
export function dateKeyFromDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// EN: Returns today's local date key.
// JP: 今日のローカル日付キーを返します。
export function todayKey() {
  return dateKeyFromDate(new Date());
}

// EN: Returns the last N date keys, oldest first.
// JP: 直近 N 日分の日付キーを古い順に返します。
export function getWeekKeys(n = 7) {
  return Array.from({ length: n }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (n - 1 - index));

    return dateKeyFromDate(date);
  });
}

// EN: Returns a short weekday label from a date key.
// JP: 日付キーから短い曜日ラベルを返します。
export function dayLabel(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-GB", {
    weekday: "short",
  });
}