import { useTranslations } from "~/i18n/utils";
import { Locale } from "../enums/locale";

export const achievementForm = (lang: Locale = Locale.EN) => {
  document.addEventListener("DOMContentLoaded", () => {
    const t = useTranslations(lang);

    const form = document.getElementById("achievementsForm") as HTMLFormElement;

    const achieverImage = document.getElementById(
      "achiever-image",
    ) as HTMLInputElement;
    const achieverImageErrorMessage = document.getElementById(
      "achiever-image-error",
    ) as HTMLParagraphElement;

    const checkboxParentsNames = document.getElementById("checkbox-parents-names") as HTMLInputElement;
    const checkboxTeamMembersNames = document.getElementById("checkbox-team-members-names") as HTMLInputElement;
    const parentsNames = document.getElementById("parents-names") as HTMLInputElement;
    const teamMembersNames = document.getElementById("team-members-names") as HTMLInputElement;

    const wardInput = document.getElementById("ward-input") as HTMLInputElement;
    const wardMenu = document.getElementById(
      "ward-options-menu",
    ) as HTMLDivElement;
    const wardSelect = document.getElementById("ward-select") as HTMLDivElement;
    const chevron = document.getElementById(
      "dropdown-chevron",
    ) as HTMLDivElement;

    const proofOfAchievement = document.getElementById(
      "proof-of-achievement",
    ) as HTMLInputElement;
    const proofOfAchievementErrorMessage = document.getElementById(
      "proof-of-achievement-error-message",
    ) as HTMLParagraphElement;

    const additionalImages = document.getElementById(
      "additional-images",
    ) as HTMLInputElement;
    const additionalImagesErrorMessage = document.getElementById(
      "additional-images-error",
    ) as HTMLParagraphElement;

    const honeypot = document.getElementById("honeypot") as HTMLInputElement;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    const MAX_SIZE = 2 * 1024 * 1024; // 2MB;
    const MAX_IMAGES = 2; // Maximum number of additional images

    // Checkbox for Parents Names
    checkboxParentsNames.addEventListener("change", () => {
      if (checkboxParentsNames.checked) {
        // Show parents section
        parentsNames.classList.remove("hidden");

        // Uncheck and hide team members section
        checkboxTeamMembersNames.checked = false;
        teamMembersNames.classList.add("hidden");
      } else {
        parentsNames.classList.add("hidden");
      }
    });

    // Checkbox for Team Members Names
    checkboxTeamMembersNames.addEventListener("change", () => {
      if (checkboxTeamMembersNames.checked) {
        // Show team members section
        teamMembersNames.classList.remove("hidden");

        // Uncheck and hide parents section
        checkboxParentsNames.checked = false;
        parentsNames.classList.add("hidden");
      } else {
        teamMembersNames.classList.add("hidden");
      }
    });

    // Ward Dropdown
    wardSelect.addEventListener("click", () => {
      wardMenu.classList.toggle("hidden");
      chevron.classList.toggle("rotate-180");
    });

    // Ward Selection
    wardMenu.addEventListener("click", (event) => {
      if (event.target instanceof HTMLDivElement) {
        const selectedWard = event.target.textContent;
        if (selectedWard) {
          wardInput.value = selectedWard;
        }
      }
    });

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

    // Achiever Image Validation
    achieverImage.addEventListener("change", () => {
      if (achieverImage.files && !handleImageSize(achieverImage.files)) {
        achieverImageErrorMessage.textContent =
          t("achievement.image-size-error");
        achieverImage.value = "";
      } else if (achieverImage.files && !handleImageType(achieverImage.files)) {
        achieverImageErrorMessage.textContent =
          t("achievement.image-type-error");
        achieverImage.value = "";
      } else {
        achieverImageErrorMessage.textContent = "";
      }
    });

    // Proof of Achievement Image Validation
    proofOfAchievement.addEventListener("change", () => {
      if (
        proofOfAchievement.files &&
        !handleImageSize(proofOfAchievement.files)
      ) {
        proofOfAchievementErrorMessage.textContent =
          t("achievement.image-size-error");
        proofOfAchievement.value = "";
      } else if (
        proofOfAchievement.files &&
        !handleImageType(proofOfAchievement.files)
      ) {
        proofOfAchievementErrorMessage.textContent =
          t("achievement.image-type-error");
        proofOfAchievement.value = "";
      } else {
        proofOfAchievementErrorMessage.textContent = "";
      }
    });

    // Additional Images Validation
    additionalImages.addEventListener("change", () => {
      const selectedFiles = additionalImages?.files;

      if (selectedFiles && selectedFiles.length > MAX_IMAGES) {
        additionalImagesErrorMessage.textContent =
          t("achievement.additional-images-error");
        additionalImages.value = "";
      } else if (selectedFiles && !handleImageSize(selectedFiles)) {
        additionalImagesErrorMessage.textContent =
          t("achievement.image-size-error");
        additionalImages.value = "";
      } else if (selectedFiles && !handleImageType(selectedFiles)) {
        additionalImagesErrorMessage.textContent =
          t("achievement.image-type-error");
      } else {
        additionalImagesErrorMessage.textContent = "";
      }
    });

    // Success Toast
    function showToast(message = t("achievement.success-message")) {
      const toast = document.getElementById("toast");

      if (toast) {
        const textSpan = document.getElementById("toast-text");

        if (textSpan) {
          textSpan.textContent = message;
        }

        toast.classList.remove("opacity-0");
        toast.classList.add("opacity-100");
        toast.style.pointerEvents = "auto";

        setTimeout(() => {
          toast.classList.remove("opacity-100");
          toast.classList.add("opacity-0");
          toast.style.pointerEvents = "none";
        }, 4000);
      }
    }

    // Form Submission
    form?.addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = new FormData(form);

      // Honeypot Check
      if (honeypot && honeypot.value) {
        return new Response("Server Side Spam Triggered", { status: 400 });
      }

      // Validate Achiever Image
      const isAchieverImageValid =
        !achieverImage.files ||
        (handleImageSize(achieverImage.files) &&
          handleImageType(achieverImage.files));

      // Validate Proof of Achievement Image
      const isProofOfAchievementValid =
        !proofOfAchievement.files ||
        (handleImageSize(proofOfAchievement.files) &&
          handleImageType(proofOfAchievement.files));

      // Validate Additional Images
      const isAdditionalImagesValid =
        !additionalImages.files ||
        (handleImageSize(additionalImages.files) &&
          handleImageType(additionalImages.files));

      // If all validations pass, send the data
      if (
        isAchieverImageValid &&
        isProofOfAchievementValid &&
        isAdditionalImagesValid
      ) {
        try {
          await fetch("/api/send-achievement", {
            method: "POST",
            body: data,
          });

          showToast();

          form.reset(); // Reset the form after successful submission
        } catch (error) {
          console.error("Failed to send data", error);
        }
      }
    });
  });
};
