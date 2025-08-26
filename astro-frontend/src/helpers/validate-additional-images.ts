import { useTranslations } from "~/i18n/utils";
import { Locale } from "~/enums/locale";
import { MAX_IMAGES, MAX_SIZE } from "~/constants/index";

export function validateAdditionalImages({
  lang,
  additionalImages,
  fileNameDivId,
  fileName,
  additionalImagesErrorMessage,
}: {
  lang: Locale;
  additionalImages: HTMLInputElement;
  fileNameDivId: string;
  fileName: string;
  additionalImagesErrorMessage: HTMLParagraphElement;
}) {
  const t = useTranslations(lang);
  let validFiles: File[] = [];
  let invalidFiles: File[] = [];

  const fileNameDiv = document.getElementById(
    fileNameDivId,
  ) as HTMLDivElement;

  const fileNameElement = document.getElementById(
      fileName,
    ) as HTMLParagraphElement;

  // Image Validation by size
  const handleImageSize = (file: File) => {
    if (file.size > MAX_SIZE) {
      return { isValid: false, fileName: file.name };
    }
    return { isValid: true, fileName: file.name };
  };

  // Check if file already exists in validFiles
  const isFileAlreadyAdded = (file: File, checkFiles: File[]) => {
    return checkFiles.some(
      (checkFile) =>
        checkFile.name === file.name && checkFile.size === file.size,
    );
  };

  // Remove file from validFiles when x is clicked
  const clearValidFiles = (file: File, checkFiles: File[] = validFiles) => {
   if (isFileAlreadyAdded(file, checkFiles)) {
     validFiles = validFiles.filter(
       (validFile) =>
         !(validFile.name === file.name && validFile.size === file.size)
     );
   }
  };

  // Display file names along with x button
  const displayFileNames = (file:File) => {
    fileNameElement.classList.add("hidden");

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper", "flex", "items-center");

    // File name
    const p = document.createElement("p");
    p.textContent = file.name.slice(0, 8) + "...";

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
      clearValidFiles(file);
      fileNameDiv.removeChild(wrapper);

      if (validFiles.length === 0) {
        additionalImagesErrorMessage.textContent = "";
        fileNameElement.classList.remove("hidden");
        additionalImages.value = "";
      }
    });

    wrapper.appendChild(p);
    wrapper.appendChild(xButton);
    fileNameDiv.appendChild(wrapper);
  };

  additionalImages.addEventListener("change", () => {
    const selectedFiles = additionalImages?.files;

    // Clear previous error messages
    additionalImagesErrorMessage.textContent = "";

    // Check if any new files are selected and less than MAX_IMAGES.
    if (selectedFiles && selectedFiles.length > 0) {
    const newFiles = Array.from(selectedFiles).filter(
      (file) => !isFileAlreadyAdded(file, validFiles),
    );

    if (newFiles.length + validFiles.length > MAX_IMAGES) {
      const wrapper = fileNameDiv.querySelectorAll(".wrapper");
      if (wrapper) {
        wrapper.forEach((wrapper) => {
          fileNameDiv.removeChild(wrapper);
        });
      }

      validFiles = [];
      additionalImages.value = "";
      additionalImagesErrorMessage.textContent = t(
        "achievement.additional-images-error",
      );
      fileNameElement.classList.remove("hidden");
      return;
    }
  }

    if (invalidFiles.length === 2) {
      invalidFiles = []; // Remove files to show more invalid ones when selected
    }

    if (selectedFiles && selectedFiles.length > 0){
    // Loop through selected files
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      const isSizeValidation = handleImageSize(file);
      if (!isSizeValidation.isValid) {
        invalidFiles.push(file);
        invalidFiles.length === 1
          ? (additionalImagesErrorMessage.innerHTML = `${t(
              "achievement.image-size-error",
            )}<br><i>${invalidFiles[0].name}</i>`)
          : (additionalImagesErrorMessage.innerHTML = `${t(
              "achievement.image-size-error",
            )}<br><i>${invalidFiles[0].name} & ${invalidFiles[1].name}</i>`);
      } else {
        // File is valid, check if not already added and we haven't reached the limit
        if (!isFileAlreadyAdded(file, validFiles) && validFiles.length < 2) {
          validFiles.push(file);
          displayFileNames(file);
        }
      }
    }
  }
  });
}
