// // Select the central image and title elements
// const detailedImage = document.getElementById("detailedImage");
// const detailedTitle = document.getElementById("detailedTitle");

// // Function to render images and names
// async function drawImages(elem) {
//   try {
//     const response = await fetch("https://api.thecatapi.com/v1/breeds");
//     if (!response.ok) throw new Error("Failed to fetch cat breeds");

//     const data = await response.json();
//     elem.innerHTML = getItems(data);
//     addGalleryImageEventListeners(); // Add event listeners after rendering
//   } catch (error) {
//     console.error("Error fetching cat images:", error);
//     elem.innerHTML = "<p>Error loading cat breeds. Try again later.</p>";
//   }
// }

// // Function to create list items for each breed
// function getItems(data) {
//   return data
//     .map((breed) => {
//       const image = breed.reference_image_id
//         ? `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
//         : "placeholder.jpg"; // Handle missing images
//       return `
//         <li class="gallery--item">
//           <img
//             src="${image}"
//             alt="${breed.name}"
//             class="gallery--item_image"
//             data-detailed-image="${image}"
//             data-detailed-title="${breed.description}"
//           />
//           <span class="gallery--item_title">${breed.name}</span>
//         </li>
//       `;
//     })
//     .join("");
// }

// // Add event listener to update central image and title
// function addGalleryImageEventListeners() {
//   document.querySelectorAll(".gallery--item_image").forEach((image) => {
//     image.addEventListener("click", function () {
//       setDetails(image);
//     });
//   });
// }

// function setDetails(image) {
//   // Temporarily remove animations to restart them
//   detailedImage.classList.remove("animation-up");
//   detailedTitle.classList.remove("animation-down");

//   // Set a small delay before changing the image (for animation to reset)
//   setTimeout(() => {
//     detailedImage.src = image.getAttribute("data-detailed-image");
//     detailedTitle.innerHTML = image.getAttribute("data-detailed-title");

//     // Trigger animation for smooth transition
//     detailedImage.classList.add("animation-up");
//     detailedTitle.classList.add("animation-down");
//   }, 50);
// }

// // Draw images when the page is loaded
// window.onload = function () {
//   const galleryContainer = document.getElementById("ul_elem");
//   if (galleryContainer) {
//     drawImages(galleryContainer);
//   } else {
//     console.error("Element #ul_elem not found");
//   }
// };
// Select the central image and title elements
const detailedImage = document.getElementById("detailedImage");
const detailedTitle = document.getElementById("detailedTitle");

// Function to render images and names
async function drawImages() {
  const galleryContainer = document.getElementById("ul_elem");
  if (!galleryContainer) {
    console.error("Element #ul_elem not found");
    return;
  }

  try {
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    if (!response.ok) throw new Error("Failed to fetch cat breeds");

    const data = await response.json();
    galleryContainer.innerHTML = getItems(data);

    // Add event listeners after rendering images
    addGalleryImageEventListeners();
  } catch (error) {
    console.error("Error fetching cat images:", error);
    galleryContainer.innerHTML =
      "<p>Error loading cat breeds. Try again later.</p>";
  }
}

// Function to create list items for each breed
function getItems(data) {
  return data
    .map((breed) => {
      const image = breed.reference_image_id
        ? `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
        : "placeholder.jpg"; // Handle missing images
      return `
        <li class="gallery--item">
          <img
            src="${image}"
            alt="${breed.name}"
            class="gallery--item_image"
            data-detailed-image="${image}"
            data-detailed-title="${breed.description}"
          />
          <span class="gallery--item_title">${breed.name}</span>
        </li>
      `;
    })
    .join("");
}

// Add event listener to update central image and title
function addGalleryImageEventListeners() {
  const galleryImages = document.querySelectorAll(".gallery--item_image");
  galleryImages.forEach((image) => {
    image.addEventListener("click", function () {
      setDetails(image); // When clicked, update the detailed view
    });
  });
}

function setDetails(image) {
  // Remove animation classes
  detailedImage.classList.remove("animation-up");
  detailedTitle.classList.remove("animation-down");

  // Use requestAnimationFrame to ensure animation resets
  requestAnimationFrame(() => {
    // Change the image and text
    detailedImage.src = image.getAttribute("data-detailed-image");
    detailedTitle.innerHTML = image.getAttribute("data-detailed-title");

    // Force reflow (ensures animations restart)
    void detailedImage.offsetWidth;

    // Re-add animation classes
    detailedImage.classList.add("animation-up");
    detailedTitle.classList.add("animation-down");
  }, 0);
}

// Draw images when the page is loaded
window.onload = drawImages;
