export const achievementForm = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("achievementsForm") as HTMLFormElement;

    const achieverImage = document.getElementById("achiever-image") as HTMLInputElement;
    const achieverImageErrorMessage = document.getElementById("achiever-image-error") as HTMLParagraphElement;

    const wardInput = document.getElementById("ward-input") as HTMLInputElement;
    const wardMenu = document.getElementById("ward-options-menu") as HTMLDivElement;
    const wardSelect = document.getElementById("ward-select") as HTMLDivElement;
    const chevron = document.getElementById("dropdown-chevron") as HTMLDivElement;

    const proofOfAchievement = document.getElementById("proof-of-achievement") as HTMLInputElement;
    const proofOfAchievementErrorMessage = document.getElementById("proof-of-achievement-error-message") as HTMLParagraphElement;

    const additionalImages = document.getElementById("additional-images") as HTMLInputElement;
    const additionalImagesErrorMessage = document.getElementById("additional-images-error") as HTMLParagraphElement;

    const honeypot = document.getElementById("honeypot") as HTMLInputElement;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

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
        if (event[i].size > 2 * 1024 * 1024) {
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
          "Please select an image less than 2MB.";
        achieverImage.value = "";
      } else if (achieverImage.files && !handleImageType(achieverImage.files)) {
        achieverImageErrorMessage.textContent =
          "Please select a JPG, JPEG or PNG image.";
        achieverImage.value = "";
      } else {
        achieverImageErrorMessage.textContent = "";
      }
    });

    // Proof of Achievement Image Validation
    proofOfAchievement.addEventListener("change", () => {
      if (proofOfAchievement.files && !handleImageSize(proofOfAchievement.files)) {
        proofOfAchievementErrorMessage.textContent =
          "Please select an image less than 2MB.";
        proofOfAchievement.value = "";
      } else if (
        proofOfAchievement.files &&
        !handleImageType(proofOfAchievement.files)
      ) {
        proofOfAchievementErrorMessage.textContent =
          "Please select a JPG, JPEG or PNG image.";
        proofOfAchievement.value = "";
      } else {
        proofOfAchievementErrorMessage.textContent = "";
      }
    });

    // Additional Images Validation
    additionalImages.addEventListener("change", () => {
      const selectedFiles = additionalImages?.files;

      if (selectedFiles && selectedFiles.length > 2) {
        additionalImagesErrorMessage.textContent =
          "Please select no more than 2 additional images.";
        additionalImages.value = "";
      } else if (selectedFiles && !handleImageSize(selectedFiles)) {
        additionalImagesErrorMessage.textContent =
          "Please select images less than 2MB.";
        additionalImages.value = "";
      } else if (selectedFiles && !handleImageType(selectedFiles)) {
        additionalImagesErrorMessage.textContent =
          "Please select JPG, JPEG or PNG images.";
      } else {
        additionalImagesErrorMessage.textContent = "";
      }
    });

    // Success Toast
    function showToast(message = "Your submission was successful!") {
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
      if (isAchieverImageValid && isProofOfAchievementValid && isAdditionalImagesValid) {
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
