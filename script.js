
const projectImages = document.querySelectorAll(".project-image");

const viewer = document.getElementById("image-viewer");
const viewerImage = document.getElementById("viewer-image");
const closeViewer = document.getElementById("close-viewer");
const prevImage = document.getElementById("prev-image");
const nextImage = document.getElementById("next-image");
const imageCounter = document.getElementById("image-counter");

let currentImages = [];
let currentImageIndex = 0;

function showImage(index) {
    if (currentImages.length === 0) return;

    currentImageIndex =
        (index + currentImages.length) % currentImages.length;

    viewerImage.src = currentImages[currentImageIndex].src;
    viewerImage.alt = currentImages[currentImageIndex].alt;

    imageCounter.textContent =
        `${currentImageIndex + 1} / ${currentImages.length}`;
}

projectImages.forEach((image) => {
    image.style.cursor = "zoom-in";

    image.addEventListener("click", () => {
        // Ambil gambar hanya dari galeri proyek yang diklik
        const gallery = image.closest(".project-gallery");

        currentImages = gallery
            ? Array.from(gallery.querySelectorAll(".project-image"))
            : [image];

        // Mulai dari gambar yang diklik
        const index = currentImages.indexOf(image);

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

    if (event.key === "Escape") {
        closeImageViewer();
    }

    if (event.key === "ArrowLeft") {
        showImage(currentImageIndex - 1);
    }

    if (event.key === "ArrowRight") {
        showImage(currentImageIndex + 1);
    }
});
