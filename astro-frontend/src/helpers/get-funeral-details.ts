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
  funeralDate?: string | Date,
  homeTime?: string,
  massTime?: string,
) {
  let dateObj: Date | null = null;

  if (funeralDate) {
    dateObj = new Date(funeralDate);
  }

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
      return `${
        weekdayKey ? `${days.kok[weekdayKey]} (${formattedDate}), ` : ""
      }ಕೆದಾಳಾ ಮ್ಹಣ್ ಮುಖಾರ್ ತಿಳ್ಸಿತೆಲ್ಯಾಂವ್.`;
    }

    const massHour = massTime ? Number(massTime.split(":")[0]) : 0;

    return `${
      weekdayKey ? `${days.kok[weekdayKey]} (${formattedDate}), ` : ""
    }${homeT ? ` ${homeT} ವ್ಹರಾರ್ ಘರಾ ಥಾವ್ನ್` : ""}${
      homeT && massT ? ", " : ""
    }${massT ? `${massT} ವ್ಹರಾರ್ ಇಗರ್ಜೆಂತ್ ಮಿಸಾ ಸವೆಂ ಚಲ್ತೆಲಿ.` : ""}`;
  }

  if (!homeT && !massT) {
    return `${
      weekdayKey ? `${days.en[weekdayKey]} (${formattedDate}), ` : ""
    }Will be informed soon.`;
  }

  return `${
    weekdayKey ? `${days.en[weekdayKey]} (${formattedDate}), ` : ""
  }${homeT ? `funeral cortege leaves residence at ${homeT}` : ""}${
    homeT && massT ? ", followed by " : ""
  }${massT ? `Mass at the church at ${massT}` : ""}.`;
}
