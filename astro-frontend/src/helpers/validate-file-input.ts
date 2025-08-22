import { useTranslations } from "~/i18n/utils";
import { Locale } from "~/enums/locale";
import { ALLOWED_TYPES, MAX_SIZE } from "~/constants/index";

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

  // Image Validation by size
  const handleImageSize = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > MAX_SIZE) {
        return false;
      }
    }
    return true;
  };

  // Image Validation by type
  const handleImageType = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      if (!ALLOWED_TYPES.includes(files[i].type)) {
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
      input.value = "";
    } else if (input.files && !handleImageType(input.files)) {
      inputErrorMessage.textContent = t("achievement.image-type-error");
      fileNameElement.textContent = t("achievement.no-file-chosen");
      input.value = "";
    } else {
      input.files && input.files.length > 0
        ? (fileNameElement.textContent = input.files[0].name)
        : (fileNameElement.textContent = t("achievement.no-file-chosen"));
      inputErrorMessage.textContent = "";
    }
  });
}
