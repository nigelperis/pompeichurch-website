import { useTranslations } from "~/i18n/utils";
import { Locale } from "~/enums/locale";
import Litepicker from "litepicker";
import { validateFileInput } from "~/helpers/validate-file-input";

export const achievementForm = (lang: Locale = Locale.EN) => {
  document.addEventListener("DOMContentLoaded", () => {
    const t = useTranslations(lang);

    const form = document.getElementById("achievementsForm") as HTMLFormElement;

    const fullNameDiv = document.getElementById("full-name-div") as HTMLDivElement;
    const teamNameDiv = document.getElementById("team-name-div") as HTMLDivElement;
    const fullName = document.getElementById("full-name") as HTMLInputElement;
    const teamName = document.getElementById("team-name") as HTMLInputElement;

    const achievement = document.getElementById("achievement") as HTMLInputElement;

    const issueDate = document.getElementById("issue-date") as HTMLInputElement;

    const achieverImage = document.getElementById(
      "achiever-image",
    ) as HTMLInputElement;
    const achieverImageErrorMessage = document.getElementById(
      "achiever-image-error",
    ) as HTMLParagraphElement;

    const individualAchievement = document.getElementById(
      "individual-achievement",
    ) as HTMLInputElement;
    const teamAchievement = document.getElementById(
      "team-achievement",
    ) as HTMLInputElement;
    const parentsNamesDiv = document.getElementById(
      "parents-names-div",
    ) as HTMLDivElement;
    const teamMembersNamesDiv = document.getElementById(
      "team-members-names-div",
    ) as HTMLDivElement;
    const parentsNames = document.getElementById(
      "parents-names",
    ) as HTMLInputElement;
    const teamMembersNames = document.getElementById(
      "team-members-names",
    ) as HTMLInputElement;
     const radioButtonError = document.getElementById(
       "achievement-type-error",
     ) as HTMLParagraphElement;

    const wardInput = document.getElementById("ward-input") as HTMLInputElement;
    const wardMenu = document.getElementById("ward-options-menu") as HTMLDivElement;
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

    const charactersTracker = document.querySelectorAll(
      ".characters-tracker",
    ) as NodeListOf<HTMLInputElement>;
    const descriptiveCharactersTracker = document.querySelectorAll(
      ".descriptive-characters-tracker",
    ) as NodeListOf<HTMLInputElement>;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    const MAX_SIZE = 2 * 1024 * 1024; // 2MB;
    const MAX_IMAGES = 2; // Maximum number of additional images

    const stdLimit = 50;
    const descriptiveLimit = 100;

    // Date Picker
    new Litepicker({
      element: issueDate as HTMLInputElement,
      format: "DD/MM/YYYY",
      autoApply: true, // Auto-close after selection
      dropdowns: {
        minYear: 2000,
        maxYear: null,
        months: true,
        years: true,
      },
    });

    const liveCharacterCounter = (input: HTMLInputElement, limit: number) => {
      input.addEventListener("input", () => {
        const length = input.value.length;
        const liveCounter =
          input.nextElementSibling as HTMLParagraphElement;
        liveCounter.textContent = `${length}/${limit}`;
      });
    };

    charactersTracker.forEach((input) => {
      liveCharacterCounter(input, stdLimit);
    });

    descriptiveCharactersTracker.forEach((input) => {
      liveCharacterCounter(input, descriptiveLimit);
    });

    achievement.addEventListener("input", () => {
      if (!individualAchievement.checked && !teamAchievement.checked) {
        radioButtonError.classList.remove("hidden");
        radioButtonError.textContent = t("achievement.achievement-type-error");
      }
    });

    // Radio Button for Individual Achievement
    individualAchievement.addEventListener("change", () => {
      if (individualAchievement.checked) {
        // Show full name section
        fullNameDiv.classList.remove("hidden");
        fullName.required = true;

        // Show parents section
        parentsNamesDiv.classList.remove("hidden");
        parentsNames.required = true;

        // Deselect and hide team members section
        radioButtonError.classList.add("hidden");
        radioButtonError.textContent = "";
        teamAchievement.checked = false;
        teamName.required = false;
        teamMembersNames.required = false;
        teamNameDiv.classList.add("hidden");
        teamMembersNamesDiv.classList.add("hidden");
        teamName.value = "";
        teamMembersNames.value = "";
        wardSelect.classList.remove("hidden");
      }
    });

    // Radio Button for Team Achievement
    teamAchievement.addEventListener("change", () => {
      if (teamAchievement.checked) {
        // Show team name section
        teamNameDiv.classList.remove("hidden");
        teamName.required = true;

        // Show team members section
        teamMembersNamesDiv.classList.remove("hidden");
        teamMembersNames.required = true;

        wardSelect.classList.add("hidden");

        // Deselect and hide parents section
        radioButtonError.classList.add("hidden");
        radioButtonError.textContent = "";
        individualAchievement.checked = false;
        fullName.required = false;
        parentsNames.required = false;
        fullNameDiv.classList.add("hidden");
        parentsNamesDiv.classList.add("hidden");
        fullName.value = "";
        parentsNames.value = "";
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

    chevron.addEventListener("click", () => {
      wardInput.focus();
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
    validateFileInput({
      lang,
      input: achieverImage,
      fileName: "achiever-image-file-name",
      inputErrorMessage: achieverImageErrorMessage,
    });

    // Proof of Achievement Validation
    validateFileInput({
      lang,
      input: proofOfAchievement,
      fileName: "proof-of-achievement-file-name",
      inputErrorMessage: proofOfAchievementErrorMessage,
    });

    // Additional Images Validation
    additionalImages.addEventListener("change", () => {
      const fileName = document.getElementById(
        "additional-images-file-name",
      ) as HTMLInputElement;

      const selectedFiles = additionalImages?.files;

      if (selectedFiles && selectedFiles.length > MAX_IMAGES) {
        additionalImagesErrorMessage.textContent = t(
          "achievement.additional-images-error",
        );
        fileName.textContent = t("achievement.no-file-chosen");
      } else if (selectedFiles && !handleImageSize(selectedFiles)) {
        additionalImagesErrorMessage.textContent = t(
          "achievement.image-size-error",
        );
        fileName.textContent = t("achievement.no-file-chosen");
      } else if (selectedFiles && !handleImageType(selectedFiles)) {
        additionalImagesErrorMessage.textContent = t(
          "achievement.image-type-error",
        );
      } else {
          if (selectedFiles?.length === 1) {
            fileName.textContent = selectedFiles[0].name;
          } else if (selectedFiles?.length === 2) {
            fileName.textContent = `${selectedFiles.length} ${t("achievement.files")}`;
          } else {
            fileName.textContent = t("achievement.no-file-chosen");
          }
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

    const resetFormFields = () => {
      charactersTracker.forEach((input: HTMLInputElement) => {
        if (input.nextElementSibling) {
          input.nextElementSibling.textContent = "0/50";
        }
      });

      descriptiveCharactersTracker.forEach((input: HTMLInputElement) => {
        if (input.nextElementSibling) {
          input.nextElementSibling.textContent = "0/100";
        }
      });

      const achieverImageName = document.getElementById("achiever-image-file-name");
      if (achieverImageName)
        achieverImageName.textContent = t("achievement.no-file-chosen");

      const additionalImagesName = document.getElementById("additional-images-file-name");
      if (additionalImagesName)
        additionalImagesName.textContent = t("achievement.no-files-chosen");

      const proofOfAchievementName = document.getElementById("proof-of-achievement-file-name");
      if (proofOfAchievementName)
        proofOfAchievementName.textContent = t("achievement.no-file-chosen");

      if(radioButtonError){
        radioButtonError.classList.add("hidden");
        radioButtonError.textContent = "";
      }
    };

    // Form Submission
    form?.addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = new FormData(form);

      if(!individualAchievement.checked && !teamAchievement.checked) {
        event.preventDefault();
        radioButtonError.classList.remove("hidden");
        radioButtonError.textContent = t("achievement.achievement-type-error");
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

          // Reset the form fields after successful submission
          form.reset();
          resetFormFields();
        } catch (error) {
          console.error("Failed to send data", error);
        }
      }
    });
  });
};
