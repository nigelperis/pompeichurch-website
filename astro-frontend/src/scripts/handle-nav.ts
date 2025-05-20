export const handleNav = () => {
  const hamburgerMenu = document.querySelector("#hamburger");
  const hamburgerClose = document.querySelector("#hamburger-close");
  const navbar = document.querySelector("#navbar");
  const expandableLinks = document.querySelectorAll(
    "[data-expandable-links=true]",
  );
  const allNavigationLinks = document.querySelectorAll(
    "nav a:not([data-expandable-links=true])",
  );

  hamburgerMenu?.addEventListener("click", () => {
    navbar?.classList.add("open");
  });

  hamburgerClose?.addEventListener("click", () => {
    expandableLinks.forEach((element) => {
      const expandableContent =
        element.parentElement?.querySelector<HTMLUListElement>("a + ul");
      expandableContent?.style?.setProperty("max-height", "0");
      element.setAttribute("data-is-submenu-expanded", "false");
    });

    navbar?.classList.remove("open");
  });

  expandableLinks.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      const subMenuStatus = element.getAttribute("data-is-submenu-expanded");
      const expandableContent =
        element?.parentElement?.querySelector<HTMLUListElement>("a + ul");

      expandableLinks.forEach((otherElement) => {
        if (otherElement !== element) {
          otherElement.setAttribute("data-is-submenu-expanded", "false");
          otherElement.parentElement
            ?.querySelector<HTMLUListElement>("a + ul")
            ?.style.setProperty("max-height", "0");
        }
      });

      if (subMenuStatus === "true") {
        element.setAttribute("data-is-submenu-expanded", "false");
        expandableContent?.style?.setProperty("max-height", "0");
      } else {
        element.setAttribute("data-is-submenu-expanded", "true");
        const elementHeight = expandableContent?.scrollHeight;
        expandableContent?.style?.setProperty(
          "max-height",
          `${elementHeight ?? 500}px`,
        );
      }
    });
  });

  allNavigationLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent the default behavior

      // Close all expandable submenus
      expandableLinks.forEach((element) => {
        const expandableContent = element.parentElement?.querySelector(
          "a + ul",
        ) as HTMLElement;
        expandableContent?.style.setProperty("max-height", "0");
        element.setAttribute("data-is-submenu-expanded", "false");
      });

      // Close the navbar menu on mobile
      navbar?.classList?.remove("open");

      // Redirect to the link's href
      const anchorElement = link as HTMLAnchorElement;
      if (anchorElement.href) {
        window.location.href = anchorElement.href; // Trigger the redirect
      }
    });
  });
}