import { useTranslations } from "~/i18n/utils";
import { Locale } from "~/enums/locale";
import { ALLOWED_TYPES, MAX_IMAGES, MAX_SIZE } from "~/constants/index";

export function validateAdditionalImages({
  lang,
  additionalImages,
  fileName,
  additionalImagesErrorMessage,
}: {
  lang: Locale;
  additionalImages: HTMLInputElement;
  fileName: string;
  additionalImagesErrorMessage: HTMLParagraphElement;
}) {

  // Image Validation by size
  const handleImageSize = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > MAX_SIZE) {
        return { isValid: false, fileName: files[i].name };
      }
    }
    return { isValid: true, fileName: "" };
  };

  // Image Validation by type
  const handleImageType = (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      if (!ALLOWED_TYPES.includes(files[i].type)) {
        return { isValid: false, fileName: files[i].name };
      }
    }
    return { isValid: true, fileName: "" };
  };

  additionalImages.addEventListener("change", () => {
    const t = useTranslations(lang);

    const fileNameElement = document.getElementById(
     fileName,
    ) as HTMLInputElement;

    const selectedFiles = additionalImages?.files;

    if (selectedFiles && selectedFiles.length > MAX_IMAGES) {
      additionalImagesErrorMessage.textContent = t(
        "achievement.additional-images-error",
      );
      fileNameElement.textContent = t("achievement.no-file-chosen");
      additionalImages.value = "";
      return;
    }

    if (selectedFiles) {
      const isSizeValidation = handleImageSize(selectedFiles);
      const isTypeValidation = handleImageType(selectedFiles);

      if (!isSizeValidation.isValid) {
        additionalImagesErrorMessage.innerHTML = `${t(
          "achievement.image-size-error",
        )}<br><i>${isSizeValidation.fileName}</i>`;

        fileNameElement.textContent = t("achievement.no-file-chosen");
        additionalImages.value = "";
      } else if (!isTypeValidation.isValid) {
        additionalImagesErrorMessage.innerHTML = `${t(
          "achievement.image-type-error",
        )}<br/><i>${isTypeValidation.fileName}</i>`;
        
        fileNameElement.textContent = t("achievement.no-file-chosen");
        additionalImages.value = "";
      } else {
        if (selectedFiles?.length === 1) {
          fileNameElement.textContent = selectedFiles[0].name;
        } else if (selectedFiles?.length === 2) {
          fileNameElement.innerHTML =
            selectedFiles[0].name + "<br>" + selectedFiles[1].name;
        } else {
          fileNameElement.textContent = t("achievement.no-file-chosen");
          additionalImages.value = "";
        }
        additionalImagesErrorMessage.textContent = "";
      }
    }
  });
}
