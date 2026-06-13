// EN: Return today's date in YYYY-MM-DD format.
// JP: 今日の日付を YYYY-MM-DD 形式で返します。
export function getTodayKey() {
    return new Date().toISOString().split("T")[0]
}