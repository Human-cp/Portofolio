
const projectImages = document.querySelectorAll(".project-image");

const viewer = document.getElementById("image-viewer");
const viewerImage = document.getElementById("viewer-image");
const closeViewer = document.getElementById("close-viewer");
const prevImage = document.getElementById("prev-image");
const nextImage = document.getElementById("next-image");
const imageCounter = document.getElementById("image-counter");

let currentImageIndex = 0;

function showImage(index) {
    currentImageIndex =
        (index + projectImages.length) % projectImages.length;

    viewerImage.src = projectImages[currentImageIndex].src;
    viewerImage.alt = projectImages[currentImageIndex].alt;

    imageCounter.textContent =
        `${currentImageIndex + 1} / ${projectImages.length}`;
}

projectImages.forEach((image, index) => {
    image.style.cursor = "zoom-in";

    image.addEventListener("click", () => {
        showImage(index);
        viewer.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

function closeImageViewer() {
    viewer.classList.remove("active");
    document.body.style.overflow = "";
}

closeViewer.addEventListener("click", closeImageViewer);

prevImage.addEventListener("click", () => {
    showImage(currentImageIndex - 1);
});

nextImage.addEventListener("click", () => {
    showImage(currentImageIndex + 1);
});

viewer.addEventListener("click", (event) => {
    if (event.target === viewer) {
        closeImageViewer();
    }
});

document.addEventListener("keydown", (event) => {
    if (!viewer.classList.contains("active")) return;

    if (event.key === "Escape") closeImageViewer();
    if (event.key === "ArrowLeft") {
        showImage(currentImageIndex - 1);
    }
    if (event.key === "ArrowRight") {
        showImage(currentImageIndex + 1);
    }
});
