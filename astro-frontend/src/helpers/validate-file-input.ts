import { useTranslations } from "~/i18n/utils";
import { Locale } from "~/enums/locale";

export function validateFileInput({
  lang,
  input,
  fileName,
  inputErrorMessage,
}: {
  lang: Locale;
  input: HTMLInputElement;
  fileName: string;
  inputErrorMessage: HTMLParagraphElement;
}) {

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB;
  const MAX_IMAGES = 2; // Maximum number of additional images

  // Image Validation by size
  const handleImageSize = (event: FileList) => {
    for (let i = 0; i < event.length; i++) {
      if (event[i].size > MAX_SIZE) {
        return false;
      }
    }
    return true;
  };

  // Image Validation by type
  const handleImageType = (event: FileList) => {
    for (let i = 0; i < event.length; i++) {
      if (!allowedTypes.includes(event[i].type)) {
        return false;
      }
    }
    return true;
  };

  input.addEventListener("change", () => {
    const t = useTranslations(lang);

    const fileNameElement = document.getElementById(fileName) as HTMLInputElement;

    if (input.files && !handleImageSize(input.files)) {
      inputErrorMessage.textContent = t("achievement.image-size-error");
      fileNameElement.textContent = t("achievement.no-file-chosen");
    } else if (input.files && !handleImageType(input.files)) {
      inputErrorMessage.textContent = t("achievement.image-type-error");
      fileNameElement.textContent = t("achievement.no-file-chosen");
    } else {
      input.files && input.files.length > 0
        ? (fileNameElement.textContent = input.files[0].name)
        : (fileNameElement.textContent = t("achievement.no-file-chosen"));
      inputErrorMessage.textContent = "";
    }
  });
}
