import { useTranslations } from "~/i18n/utils";
import { Locale } from "~/enums/locale";
import { MAX_SIZE, TRUNCATE_AT } from "~/constants/index";

export function validateFileInput({
  lang,
  input,
  fileNameDivId,
  fileName,
  inputErrorMessage,
}: {
  lang: Locale;
  input: HTMLInputElement;
  fileNameDivId: string;
  fileName: string;
  inputErrorMessage: HTMLParagraphElement;
}) {
  const t = useTranslations(lang);

  const fileNameDiv = document.getElementById(
    fileNameDivId,
  ) as HTMLDivElement;

  const fileNameElement = document.getElementById(
    fileName,
  ) as HTMLParagraphElement;

  // Image Validation by size
  const handleImageSize = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > MAX_SIZE) {
        return false;
      }
    }
    return true;
  };

  // Display file names along with x button
  const displayFileNames = (file: File) => {
    fileNameElement.classList.add("hidden");

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper", "flex", "items-center");

    // File name
    const p = document.createElement("p");
    p.textContent =
      file.name.length > TRUNCATE_AT
        ? file.name.slice(0, 20) + "..."
        : file.name;

    // X button
    const xButton = document.createElement("button");
    xButton.textContent = "x";
    xButton.classList.add(
      "x-button",
      "w-6",
      "h-6",
      "mb-1.5",
      "cursor-pointer",
      "text-red-500",
      "font-bold",
    );

    // Remove file name and x button
    xButton.addEventListener("click", () => {
      input.value = "";
      fileNameElement.classList.remove("hidden");
      fileNameDiv.removeChild(wrapper);
    });

    wrapper.appendChild(p);
    wrapper.appendChild(xButton);
    fileNameDiv.appendChild(wrapper);
  };

  input.addEventListener("change", () => {
    const wrapper = fileNameDiv.querySelector(".wrapper");
    if (wrapper) {
      fileNameDiv.removeChild(wrapper);
    }

    if (input.files && !handleImageSize(input.files)) {
      inputErrorMessage.textContent = t("achievement.image-size-error");
      fileNameElement.textContent = t("achievement.no-file-chosen");
      input.value = "";
    } else {
      if (input.files && input.files.length > 0) {
        displayFileNames(input.files[0])
        } else {
        fileNameElement.textContent = t("achievement.no-file-chosen")
      }
      inputErrorMessage.textContent = "";
    }
  });
}
