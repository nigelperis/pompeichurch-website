export const shareLink = () => {
  function init() {
    const buttons =
      document.querySelectorAll<HTMLButtonElement>(".share-button");

    if (!buttons) return;

    for (const button of buttons) {
      const payloadData = button.getAttribute("data-share-data");

      if (!payloadData) continue;

      const parsedPayloadData = JSON.parse(payloadData);

      button.addEventListener("click", async () => {
        await navigator.share(parsedPayloadData);
      });
    }
  }
  init();
};
