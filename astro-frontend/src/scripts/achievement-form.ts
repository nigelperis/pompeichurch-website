declare global {
  interface Window {
    checkAchievementFormDataLoss: (targetLang: string) => Promise<boolean>;
  }
}

import { useTranslations } from "~/i18n/utils";
import { Locale } from "~/enums/locale";
import Litepicker from "litepicker";
import { validateFileInput } from "~/helpers/validate-file-input";
import { dataLossConfirmation } from "~/helpers/data-loss-confirmation";

export const achievementForm = (lang: Locale = Locale.EN) => {
  document.addEventListener("DOMContentLoaded", () => {
    const t = useTranslations(lang);

    const body = document.body;
    const overlay = document.getElementById("overlay") as HTMLDivElement;

    const form = document.getElementById("achievementsForm") as HTMLFormElement;

    const individualAchievement = document.getElementById(
      "individual-achievement",
    ) as HTMLInputElement;
    const teamAchievement = document.getElementById(
      "team-achievement",
    ) as HTMLInputElement;

    const fullNameDiv = document.getElementById(
      "full-name-div",
    ) as HTMLDivElement;
    const teamNameDiv = document.getElementById(
      "team-name-div",
    ) as HTMLDivElement;
    const fullName = document.getElementById("full-name") as HTMLInputElement;
    const teamName = document.getElementById("team-name") as HTMLInputElement;

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

    const wardInput = document.getElementById("ward-input") as HTMLInputElement;
    const wardMenu = document.getElementById(
      "ward-options-menu",
    ) as HTMLDivElement;
    const wardSelect = document.getElementById("ward-select") as HTMLDivElement;
    const chevron = document.getElementById(
      "dropdown-chevron",
    ) as HTMLDivElement;

    const issueDate = document.getElementById("issue-date") as HTMLInputElement;

    const achievement = document.getElementById(
      "achievement",
    ) as HTMLInputElement;

    const achieverImage = document.getElementById(
      "achiever-image",
    ) as HTMLInputElement;
    const achieverImageErrorMessage = document.getElementById(
      "achiever-image-error",
    ) as HTMLParagraphElement;

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

    // Live Character Counter
    const liveCharacterCounter = (input: HTMLInputElement, limit: number) => {
      input.addEventListener("input", () => {
        const length = input.value.length;
        const liveCounter = input.nextElementSibling as HTMLParagraphElement;
        liveCounter.textContent = `${length}/${limit}`;
      });
    };

    // Live 50 Character Counters
    charactersTracker.forEach((input) => {
      liveCharacterCounter(input, stdLimit);
    });

    // Live 100 Character Counters
    descriptiveCharactersTracker.forEach((input) => {
      liveCharacterCounter(input, descriptiveLimit);
    });

    // Radio Button for Individual Achievement
    individualAchievement.addEventListener("change", async () => {
      if (individualAchievement.checked) {
        // If team name or team members name is not empty
        if (teamName.value !== "" || teamMembersNames.value !== "") {
          overlay.classList.remove("hidden");
          body.style.overflow = "hidden";
          const message = t("achievement.individual-data-loss-message");
          const dataLoss = await dataLossConfirmation(message);
          if (dataLoss) {
            overlay.classList.add("hidden");
            body.style.overflow = "";
            teamName.value = "";
            teamMembersNames.value = "";
          } else {
            teamAchievement.checked = true;
            overlay.classList.add("hidden");
            body.style.overflow = "";
            return;
          }
        }

        // Show full name field
        fullNameDiv.classList.remove("hidden");
        fullName.required = true;

        // Show parents field
        parentsNamesDiv.classList.remove("hidden");
        parentsNames.required = true;

        //Show wards field
        wardSelect.classList.remove("hidden");

        // Hide team name and team members name fields
        teamAchievement.checked = false;
        teamName.required = false;
        teamMembersNames.required = false;
        teamNameDiv.classList.add("hidden");
        teamMembersNamesDiv.classList.add("hidden");
      }
    });

    // Radio Button for Team Achievement
    teamAchievement.addEventListener("change", async () => {
      if (teamAchievement.checked) {
        if (
          fullName.value !== "" ||
          parentsNames.value !== "" ||
          wardInput.value !== ""
        ) {
          overlay.classList.remove("hidden");
          body.style.overflow = "hidden";
          const message = t("achievement.team-data-loss-message");
          const dataLoss = await dataLossConfirmation(message);
          if (dataLoss) {
            overlay.classList.add("hidden");
            body.style.overflow = "";
            fullName.value = "";
            parentsNames.value = "";
            wardInput.value = "";
          } else {
            individualAchievement.checked = true;
            overlay.classList.add("hidden");
            body.style.overflow = "";
            return;
          }
        }

        // Show team name field
        teamNameDiv.classList.remove("hidden");
        teamName.required = true;

        // Show team members field
        teamMembersNamesDiv.classList.remove("hidden");
        teamMembersNames.required = true;

        // Hide full name, parents name and wards fields
        individualAchievement.checked = false;
        fullName.required = false;
        parentsNames.required = false;
        wardInput.required = false;
        fullNameDiv.classList.add("hidden");
        parentsNamesDiv.classList.add("hidden");
        wardSelect.classList.add("hidden");
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

    // Clearing data
    const resetFormFields = () => {
      // Reset character counters
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

      // Reset file names if selected
      const achieverImageName = document.getElementById(
        "achiever-image-file-name",
      );
      if (achieverImageName)
        achieverImageName.textContent = t("achievement.no-file-chosen");

      const additionalImagesName = document.getElementById(
        "additional-images-file-name",
      );
      if (additionalImagesName)
        additionalImagesName.textContent = t("achievement.no-files-chosen");

      const proofOfAchievementName = document.getElementById(
        "proof-of-achievement-file-name",
      );
      if (proofOfAchievementName)
        proofOfAchievementName.textContent = t("achievement.no-file-chosen");

      // Reset form fields to default in case if the last check was team achievement
      teamAchievement.checked = false;
      teamNameDiv.classList.add("hidden");
      teamName.required = false;
      teamMembersNamesDiv.classList.add("hidden");
      teamMembersNames.required = false;

      individualAchievement.checked = true;
      fullNameDiv.classList.remove("hidden");
      fullName.required = true;
      parentsNamesDiv.classList.remove("hidden");
      parentsNames.required = true;
      wardSelect.classList.remove("hidden");
    };

    // Check if the form has data entered
    const isDirty = () => {
      return (
        fullName.value !== "" ||
        parentsNames.value !== "" ||
        wardInput.value !== "" ||
        teamName.value !== "" ||
        teamMembersNames.value !== "" ||
        achievement.value !== "" ||
        issueDate.value !== "" ||
        achieverImage.files?.length !== 0 ||
        proofOfAchievement.files?.length !== 0 ||
        additionalImages.files?.length !== 0
      );
    };

    const handleLanguageSwitch = async (targetLang: string) => {
      if (isDirty()) {
        overlay.classList.remove("hidden");
        body.style.overflow = "hidden";

        const message = t("achievement.language-data-loss-message");
        const confirmation = await dataLossConfirmation(message);

        overlay.classList.add("hidden");
        body.style.overflow = "";

        if (!confirmation) {
          return false;
        }
      }

      return true;
    };

    // Global function
    window.checkAchievementFormDataLoss = async (targetLang: string) => {
      return await handleLanguageSwitch(targetLang);
    };

    // Form Submission
    form?.addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = new FormData(form);

      // Validate Achiever Image: Required, Size and Type
      const isAchieverImageValid =
        achieverImage.files &&
        achieverImage.files.length > 0 &&
        handleImageSize(achieverImage.files) &&
        handleImageType(achieverImage.files);

      // Validate Proof of Achievement Image: Required, Size and Type
      const isProofOfAchievementValid =
        proofOfAchievement.files &&
        proofOfAchievement.files.length > 0 &&
        handleImageSize(proofOfAchievement.files) &&
        handleImageType(proofOfAchievement.files);

      // Validate Additional Images: Size and Type
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
          const res = await fetch("/api/send-achievement", {
            method: "POST",
            body: data,
          });

          // Server error throws to catch block
          if (!res?.ok) {
            throw new Error(`Server error: ${res.status}`);
          }

          showToast();

          // Reset the form fields after successful submission
          form.reset();
          resetFormFields();
        } catch (error) {
          // Form Submission failed
          const toast = document.getElementById("toast") as HTMLDivElement;
          if (toast) {
            toast.classList.add("bg-red-600");
            toast.classList.remove("bg-green-600");
            showToast(t("achievement.error-message"));
          }
          console.error("Failed to send data", error);
        }
      }
    });
  });
};
