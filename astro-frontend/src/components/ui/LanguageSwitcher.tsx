"use client";

import { useState } from "react";
import { Locale } from "~/enums/locale";
import { cn } from "~/helpers/cn";

interface Language {
  code: Locale;
  name: string;
  label: string;
}

const LANGUAGES: Language[] = [
  { code: Locale.EN, name: "Eng", label: "Switch to English" },
  { code: Locale.KOK, name: "ಕೊಂಕಣಿ", label: "Switch to Konkani" },
];

interface Props {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale: initialLocale }: Props) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(initialLocale);

  const handleLanguageChange = (newLocale: Locale) => {
    setCurrentLocale(newLocale);
    const { pathname, search, hash } = window.location;
    const pathWithLocaleStripped = pathname.replace(/^\/kok\//, "/");
    const newPath =
      newLocale === "kok"
        ? `/kok${pathWithLocaleStripped}`
        : `${pathWithLocaleStripped}`;

    window.location.href = `${newPath}${search}${hash}`;
  };

  return (
    <div className="inline-flex rounded-full bg-yellow-400 p-0.5 shadow-sm">
      <div className="flex gap-0 rounded-full text-sm font-semibold">
        {LANGUAGES.map((language) => (
          <button
            key={language.code}
            type="button"
            onClick={() => handleLanguageChange(language.code)}
            className={cn(
              "px-3 py-2 rounded-full transition-all duration-300 cursor-pointer font-medium",
              currentLocale === language.code
                ? "bg-white text-black shadow-md"
                : "text-black hover:text-black/90",
              language.code === Locale.KOK ? "font-noto-sans-kannada pb-0.5" : "font-roboto",
            )}
            aria-label={language.label}
            aria-pressed={currentLocale === language.code}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  );
}
