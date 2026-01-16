import { Locale } from "~/enums/locale";

const days = {
  en: {
    sunday: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
  },
  kok: {
    sunday: "ಆಯ್ತಾರಾ",
    monday: "ಸೊಮಾರಾ",
    tuesday: "ಮಂಗ್ಳಾರಾ",
    wednesday: "ಬುದ್ವಾರಾ",
    thursday: "ಬ್ರೆಸ್ತಾರಾ",
    friday: "ಸುಕ್ರಾರಾ",
    saturday: "ಸನ್ವಾರಾ",
  },
};

function formatTimeTo12Hour(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 || 12;
  return `${h}:${minute.toString().padStart(2, "0")} ${period}`;
}

export function getFuneralDetails(
  lang: Locale,
  funeralDate?: string,
  homeTime?: string,
  massTime?: string,
  startsFromChurch?: boolean,
) {
  const dateObj = funeralDate ? parseDateOnly(funeralDate) : null;

  const weekdayKey = dateObj
    ? (dateObj
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase() as keyof typeof days.en)
    : null;

  const formattedDate = dateObj
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
        .format(dateObj)
        .replace(/\//g, "-")
    : null;

  const homeT = homeTime ? formatTimeTo12Hour(homeTime) : null;
  const massT = massTime ? formatTimeTo12Hour(massTime) : null;

  if (lang === Locale.KOK) {
    if (!homeT && !massT) {
      return `${weekdayKey ? `${days.kok[weekdayKey]} (${formattedDate}), ` : ""}ಕೆದಾಳಾ ಮ್ಹಣ್ ಮುಖಾರ್ ತಿಳ್ಸಿತೆಲ್ಯಾಂವ್.`;
    }

    if (startsFromChurch) {
      return `${weekdayKey ? `${days.kok[weekdayKey]} (${formattedDate}), ` : ""}${
        homeT ? `${homeT} ವ್ಹರಾರ್ ಇಗರ್ಜೆಂತ್` : ""
      }${homeT && massT ? ", " : ""}${
        massT ? `${massT} ವ್ಹರಾರ್ ಮಿಸಾ ಸವೆಂ ಚಲ್ತೆಲಿ.` : ""
      }`;
    }

    return `${weekdayKey ? `${days.kok[weekdayKey]} (${formattedDate}), ` : ""}${
      homeT ? `${homeT} ವ್ಹರಾರ್ ಘರಾ ಥಾವ್ನ್` : ""
    }${homeT && massT ? ", " : ""}${
      massT ? `${massT} ವ್ಹರಾರ್ ಇಗರ್ಜೆಂತ್ ಮಿಸಾ ಸವೆಂ ಚಲ್ತೆಲಿ.` : ""
    }`;
  }
  if (!homeT && !massT) {
    return `${weekdayKey ? `${days.en[weekdayKey]} (${formattedDate}), ` : ""}Will be informed soon.`;
  }

  if (startsFromChurch) {
    return `${weekdayKey ? `${days.en[weekdayKey]} (${formattedDate}), ` : ""}${
      homeT ? `arrives at the church at ${homeT}` : ""
    }${homeT && massT ? ", followed by " : ""}${
      massT ? `Mass at ${massT}` : ""
    }.`;
  }

  return `${weekdayKey ? `${days.en[weekdayKey]} (${formattedDate}), ` : ""}${
    homeT ? `funeral cortege leaves residence at ${homeT}` : ""
  }${homeT && massT ? ", followed by " : ""}${
    massT ? `Mass at the church at ${massT}` : ""
  }.`;
}

export function parseDateOnly(date?: string | null): Date | null {
  if (!date || typeof date !== "string") return null;

  const parts = date.split("-");
  if (parts.length !== 3) return null;

  const [y, m, d] = parts.map(Number);
  if (!y || !m || !d) return null;

  const parsed = new Date(y, m - 1, d);
  return isNaN(parsed.getTime()) ? null : parsed;
}
