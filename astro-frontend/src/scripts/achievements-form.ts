export const form = () => {

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("achievementsForm") as HTMLFormElement;
  const achieverImage = document.getElementById("achiever-image") as HTMLInputElement;
  const wardSelect = document.getElementById("ward-select") as HTMLDivElement;
  const chevron = document.getElementById("dropdown-chevron") as HTMLDivElement;
  const wardMenu = document.getElementById("ward-options-menu") as HTMLDivElement;
  const wardInput = document.getElementById("ward-input") as HTMLInputElement;
  const additionalImages = document.getElementById("additional-images") as HTMLInputElement;
  const achieverErrorMessage = document.getElementById("achiever-image-error") as HTMLParagraphElement;
  const additionalImagesErrorMessage = document.getElementById("additional-images-error") as HTMLParagraphElement;
  const submitButton = form.querySelector('button[type="submit"]');
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
      achieverErrorMessage.textContent = "Please select an image less than 2MB.";
      achieverImage.value = "";
    } else if (achieverImage.files && !handleImageType(achieverImage.files)) {
      achieverErrorMessage.textContent = "Please select a JPG, JPEG or PNG image.";
      achieverImage.value = "";
    } else {
      achieverErrorMessage.textContent = "";
    }
  });

  // Additional Images Validation
  additionalImages.addEventListener("change", () => {
    const selectedFiles = additionalImages?.files;

    if (selectedFiles && selectedFiles.length > 2) {
      additionalImagesErrorMessage.textContent = "Please select no more than 2 additional images.";
      additionalImages.value = "";
    } else if (selectedFiles && !handleImageSize(selectedFiles)) {
      additionalImagesErrorMessage.textContent = "Please select images less than 2MB.";
      additionalImages.value = "";
    } else if (selectedFiles && !handleImageType(selectedFiles)) {
      additionalImagesErrorMessage.textContent = "Please select JPG, JPEG or PNG images.";
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

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);

    if (honeypot.value) {
      alert("Spam trap triggered");
      return;
    }

    showToast();

  });
});
}