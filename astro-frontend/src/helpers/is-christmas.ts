export function isChristmasSeason(): boolean {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  return now.getMonth() === 11;
}
