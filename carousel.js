/* eslint-disable no-use-before-define */
const images = [
  // array of image URLs
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
  "https://images.unsplash.com/photo-1515895309288-a3815ab7cf81",
  "https://images.unsplash.com/photo-1683900923234-b7e666687ff4",
  "https://images.unsplash.com/photo-1684066344810-efce4ebacab7",
];
let currentImage = 0; // index of the currently displayed image in the images array

let timer = null;

function resetTimer() {
  if (timer) {
    clearTimeout(timer); // clear the existing timer
  }
  // Set a new timer
  timer = setTimeout(() => {
    updateImageTo((currentImage + 1) % images.length);
  }, 5000); // 5000ms = 5s
}

function updateImageTo(index) {
  const previousImage = currentImage;
  currentImage = index;

  document
    .querySelector(`.image-carousel img:nth-child(${previousImage + 1})`)
    .classList.remove("active");

  document
    .querySelector(`.image-carousel img:nth-child(${currentImage + 1})`)
    .classList.add("active");

  document
    .querySelector(
      `.carousel-controls .indicator-tray .indicator:nth-child(${
        previousImage + 1
      })`
    )
    .classList.remove("active");

  document
    .querySelector(
      `.carousel-controls .indicator-tray .indicator:nth-child(${
        currentImage + 1
      })`
    )
    .classList.add("active");

  resetTimer(); // reset the timer whenever the image is updated
}

/* Function to handle both previous and next  */
function handleCarouselStep(direction) {
  const index =
    direction === "next"
      ? (currentImage + 1) % images.length
      : (currentImage - 1 + images.length) % images.length;
  updateImageTo(index);
}

document.addEventListener("DOMContentLoaded", () => {
  /* add images to the image-carousel div */
  const carousel = document.querySelector(".image-carousel");
  images.forEach((imageURL, index) => {
    const img = document.createElement("img");
    img.src = imageURL;
    if (index === 0) {
      img.classList.add("active");
    }
    carousel.appendChild(img);
  });

  /* indicators for the active image  */
  const indicatorTray = document.querySelector(
    ".carousel-controls .indicator-tray"
  );
  images.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    if (index === 0) {
      indicator.classList.add("active");
    }
    indicatorTray.appendChild(indicator);
  });

  /* control image with the previous and next buttons */
  document
    .querySelector(".previous")
    .addEventListener("click", () => handleCarouselStep("previous"));
  document
    .querySelector(".next")
    .addEventListener("click", () => handleCarouselStep("next"));

  /* control image via the arrow keys */
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      handleCarouselStep("next");
    } else if (event.key === "ArrowLeft") {
      handleCarouselStep("previous");
    }
  });

  /* control image by clicking indicators */
  const indicators = document.querySelectorAll(".indicator");
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => updateImageTo(index));
  });

  resetTimer();
});
