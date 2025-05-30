export const pullDown = () => {
  document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
    (toggle as HTMLButtonElement).addEventListener(
      "click",
      function (this: HTMLButtonElement) {
        const dropdownId = this.getAttribute("data-dropdown-id");
        const dropdownContent = document.querySelector(
          `.dropdown-content[data-dropdown-id="${dropdownId}"]`,
        );

        if (dropdownContent instanceof HTMLElement) {
          const arrow = this.querySelector(".arrow");
          const isOpen = dropdownContent.classList.contains("open");

          if (isOpen) {
            dropdownContent.style.maxHeight =
              dropdownContent.scrollHeight + "px";
            dropdownContent.offsetHeight;
            dropdownContent.style.maxHeight = "0";
            dropdownContent.classList.remove("open");
            if (arrow) arrow.classList.remove("rotate");
          } else {
            dropdownContent.style.maxHeight =
              dropdownContent.scrollHeight + "px";
            dropdownContent.classList.add("open");
            if (arrow) arrow.classList.add("rotate");
          }
        }
      },
    );
  });
};
