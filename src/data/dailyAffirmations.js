// EN: Calm daily affirmations shown on the Home page.
// JP: ホーム画面に表示する落ち着いた日替わりメッセージです。

export const dailyAffirmations = [
  "Progress does not have to be perfect.",
  "A calm start is still a start.",
  "You can come back to this later.",
  "Doing a little is still enough.",
  "Small steps are still steps.",
  "You do not have to do everything. Just one thing.",
  "Rest is part of the process, not a break from it.",
  "Being here is enough of a start.",
  "Not every day looks the same. That is okay.",
  "You are allowed to go slowly.",
  "Yesterday does not set the rules for today.",
  "One completed routine is a win worth keeping.",
  "Showing up, still counts.",
  "Today is a new page. Write whatever fits.",
  "Progress does not always feel like progress while it is happening.",
  "Something small done consistently beats something big done once.",
  "Routines are not rules. They are just a shape to lean on.",
  "Energy is not always predictable. Work with what you have today.",
  "A task left undone is not a failure. It is just tomorrow's start.",
  "The goal is calm consistency, not perfection.",
  "Slow is a valid speed.",
]

export const seasonalAffirmations = {
  winter: [
    "Winter is for resting. Spring is for starting. You are always somewhere in between.",
    "Some days bloom loudly. Some days just root quietly underground.",
  ],
  spring: [
    "Every small habit is a seed. Give it time.",
    "Growth is still growth, even when it starts quietly.",
  ],
  summer: [
    "You do not have to be in full bloom every day.",
    "A quiet day can still be a good day.",
  ],
  autumn: [
    "Growth is not always visible from the outside.",
    "Even slow seasons move forward.",
  ],
}

// EN: Return the day number within the year.
// JP: 年の中で何日目かを返します。
function getDayOfYear(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 0)
  const difference = date - startOfYear

  return Math.floor(difference / 86400000)
}

// EN: Return the current season using simple month-based logic.
// JP: 月をもとに現在の季節を簡単に判定します。
function getSeason(date) {
  const month = date.getMonth() + 1

  if (month === 12 || month <= 2) return "winter"
  if (month >= 3 && month <= 5) return "spring"
  if (month >= 6 && month <= 8) return "summer"

  return "autumn"
}

// EN: Get one daily affirmation from the 21-day rotation.
// JP: 21日ローテーションから今日のメッセージを1つ取得します。
export function getDailyAffirmation(date = new Date()) {
  const dayOfYear = getDayOfYear(date)
  const affirmationIndex = dayOfYear % dailyAffirmations.length

  return dailyAffirmations[affirmationIndex]
}

// EN: Get one seasonal affirmation based on the approximate time of year.
// JP: おおよその季節に合わせたメッセージを1つ取得します。
export function getSeasonalAffirmation(date = new Date()) {
  const season = getSeason(date)
  const seasonMessages = seasonalAffirmations[season]
  const dayOfYear = getDayOfYear(date)
  const seasonalIndex = dayOfYear % seasonMessages.length

  return seasonMessages[seasonalIndex]
}