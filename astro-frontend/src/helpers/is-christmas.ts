export function isChristmasSeason(): boolean {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  return now.getMonth() === 11;
}

export function isChristmasWeek(): boolean {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const month = now.getMonth();
  const date = now.getDate();

  return month === 11 && date >= 24 && date <= 31;
}
