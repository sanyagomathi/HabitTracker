export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function getTodayEntry(entries) {
  const today = getTodayDate();
  return entries.find((entry) => entry.entry_date === today) || null;
}

export function isCompleted(entry) {
  return ["Done", "On Time", "Good", "Within Budget"].includes(entry.status);
}

export function calculateStreak(entries) {
  if (!entries || entries.length === 0) return 0;

  const completedDates = entries
    .filter(isCompleted)
    .map((entry) => entry.entry_date)
    .sort((a, b) => new Date(b) - new Date(a));

  if (completedDates.length === 0) return 0;

  let streak = 0;
  let current = new Date();

  while (true) {
    const dateStr = current.toISOString().split("T")[0];
    if (completedDates.includes(dateStr)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}