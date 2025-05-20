export const scrollToTop = () => {
  document.querySelector("#scrollToTop")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};
