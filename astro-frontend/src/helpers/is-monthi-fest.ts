function getNowInMangalore(): Date {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  );
}

const MONTHI_FEST_MONTH = 8;
const MONTHI_FEST_DAY = 8;

const USE_TEST_DATE = true;
const TEST_MONTHI_FEST_MONTH = 8;
const TEST_MONTHI_FEST_DAY = 3;

function isWithinMonthiFestWindow(date: Date): boolean {
  const month = date.getMonth();
  const day = date.getDate();
  const startMonth = USE_TEST_DATE ? TEST_MONTHI_FEST_MONTH : MONTHI_FEST_MONTH;
  const startDay = USE_TEST_DATE ? TEST_MONTHI_FEST_DAY : MONTHI_FEST_DAY;

  return month === startMonth && day >= startDay && day <= startDay + 1;
}

export function isMonthiFestSeason(now = getNowInMangalore()): boolean {
  return isWithinMonthiFestWindow(now);
}

export function isMonthiFestWeek(now = getNowInMangalore()): boolean {
  return isWithinMonthiFestWindow(now);
}
