function getNextDate(weekday: string): Date {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  const todayIndex = today.getDay();
  const targetIndex = daysOfWeek.indexOf(weekday);
  
  if (targetIndex === -1) {
    throw new Error("Invalid weekday");
  }
  
  let daysUntilNext = targetIndex - todayIndex;
  if (daysUntilNext <= 0) {
    daysUntilNext += 7;
  }
  
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysUntilNext);
  
  return nextDate;
}

function parseHours(hours: string): { hour: number, minute: number } {
  const [hour, minute] = hours.split(":").map((time) => parseInt(time));
  return { hour, minute };
}

export {getNextDate, parseHours};
