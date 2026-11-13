function getNowInMangalore(): Date {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  );
}

export function isWebsiteAnniversaryWindow(
  now = getNowInMangalore(),
): boolean {
  return (
    now.getFullYear() === 2026 &&
    now.getMonth() === 10 &&
    now.getDate() >= 10 &&
    now.getDate() <= 15
  );
}
