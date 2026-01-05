document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uploadForm");
  const videoFile = document.getElementById("videoFile");
  const thumbFile = document.getElementById("thumbFile");
  const titleInput = document.getElementById("videoTitle");
  const descInput = document.getElementById("videoDescription");

  const previewVideo = document.getElementById("previewVideo");
  const previewThumb = document.getElementById("previewThumb");
  const previewTitle = document.getElementById("previewTitle");
  const previewDesc = document.getElementById("previewDesc");

  // Preview video
  videoFile.addEventListener("change", () => {
    const file = videoFile.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      previewVideo.src = url;
    }
  });

  // Preview thumbnail
  thumbFile.addEventListener("change", () => {
    const file = thumbFile.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      previewThumb.src = url;
    }
  });

  // Live update title/description
  titleInput.addEventListener("input", () => previewTitle.textContent = titleInput.value);
  descInput.addEventListener("input", () => previewDesc.textContent = descInput.value);

  // Handle form submission
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Upload simulated! In production, this would send data to the server.");
  });
});
