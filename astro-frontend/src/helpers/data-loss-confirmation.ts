export function dataLossConfirmation(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    const confirmationPrompt = document.getElementById(
      "confirmation-prompt",
    ) as HTMLDivElement;
    const confirmationMessage = document.getElementById(
      "confirmation-message",
    ) as HTMLParagraphElement;
    const yes = document.getElementById("confirmed") as HTMLButtonElement;
    const no = document.getElementById("dismissed") as HTMLButtonElement;

    if (!confirmationPrompt || !yes || !no) {
      resolve(true);
      return;
    }

    confirmationPrompt.classList.remove("hidden");
    confirmationMessage.textContent = message;

    const handleClick = (value: boolean) => {
      setTimeout(() => {
        confirmationPrompt.classList.add("hidden");
        resolve(value);
      }, 100);
    };

    yes.addEventListener("click", () => handleClick(true));
    no.addEventListener("click", () => handleClick(false));
  });
}
