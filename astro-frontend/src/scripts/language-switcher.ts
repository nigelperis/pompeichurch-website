import { Locale } from "~/enums/locale";

export const languageSwitcher = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById(
      "lang-button",
    ) as HTMLButtonElement | null;
    const dropdown = document.getElementById(
      "lang-dropdown",
    ) as HTMLElement | null;
    const arrow = document.getElementById("lang-arrow") as HTMLElement | null;

    if (!button || !dropdown || !arrow) return;

    window.addEventListener("load", () => {
      button.removeAttribute("disabled");
    });

    const handleLanguageChange = (lang: string): void => {
      const currentPath = window.location.pathname;
      const pathWithLocaleStripped = currentPath.replace(/^\/kok\//, "/");
      const localeToSwitchTo = lang === "ಕೊಂಕಣಿ" ? Locale.KOK : Locale.EN;
      const newPath =
        localeToSwitchTo === Locale.KOK
          ? `/${localeToSwitchTo}${pathWithLocaleStripped}`
          : `${pathWithLocaleStripped}`;

      window.location.href = newPath;
    };

    const toggleDropdown = (): void => {
      const isVisible = dropdown.classList.contains("visible");
      dropdown.classList.toggle("visible", !isVisible);
      dropdown.style.opacity = isVisible ? "0" : "1";
      dropdown.style.visibility = isVisible ? "hidden" : "visible";
      arrow.classList.toggle("rotate-180", !isVisible);
    };

    button.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
      toggleDropdown();
    });

    document.addEventListener("click", () => {
      dropdown.classList.remove("visible");
      dropdown.style.opacity = "0";
      dropdown.style.visibility = "hidden";
      arrow.classList.remove("rotate-180");
    });

    button.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        dropdown.classList.add("visible");
        dropdown.style.opacity = "1";
        dropdown.style.visibility = "visible";
        arrow.classList.add("rotate-180");
      }
    });

    dropdown.addEventListener("mouseenter", () => {
      dropdown.classList.add("visible");
      dropdown.style.opacity = "1";
      dropdown.style.visibility = "visible";
      arrow.classList.add("rotate-180");
    });

    const hideDropdownWithDelay = (): void => {
      if (window.innerWidth > 768) {
        setTimeout(() => {
          if (!dropdown?.matches(":hover")) {
            dropdown.classList.remove("visible");
            dropdown.style.opacity = "0";
            dropdown.style.visibility = "hidden";
            arrow.classList.remove("rotate-180");
          }
        }, 100);
      }
    };

    button.addEventListener("mouseleave", hideDropdownWithDelay);
    dropdown.addEventListener("mouseleave", hideDropdownWithDelay);

    document
      .querySelectorAll<HTMLButtonElement>("#lang-dropdown button")
      .forEach((btn) => {
        btn.addEventListener("click", (e: MouseEvent) => {
          const target = e.target as HTMLButtonElement;
          handleLanguageChange(target.innerText);
        });
      });
  });
};
