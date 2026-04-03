function getNowInMangalore(): Date {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  );
}

function getGregorianEasterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month, day);
}

function addDays(date: Date, days: number): Date {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function isBetween(date: Date, start: Date, end: Date): boolean {
  return date >= start && date <= end;
}

export function isEasterSeason(): boolean {
  const now = getNowInMangalore();
  const easterSunday = getGregorianEasterSunday(now.getFullYear());
  const palmSunday = addDays(easterSunday, -7);
  const divineMercySunday = addDays(easterSunday, 7);

  return isBetween(now, palmSunday, divineMercySunday);
}

export function isEasterWeek(): boolean {
  const now = getNowInMangalore();
  const easterSunday = getGregorianEasterSunday(now.getFullYear());
  const holyThursday = addDays(easterSunday, -3);
  const easterMonday = addDays(easterSunday, 1);

  return isBetween(now, holyThursday, easterMonday);
}
