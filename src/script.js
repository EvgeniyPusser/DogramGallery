// Select the central image and title elements
const detailedImage = document.getElementById("detailedImage");
const detailedTitle = document.getElementById("detailedTitle");

// Function to render images and names
async function drawImages(elem) {
  const response = await fetch("https://api.thecatapi.com/v1/breeds");
  const data = await response.json();
  const items = getItems(data);
  elem.innerHTML = items;
}

// Function to create list items for each breed
function getItems(data) {
  const items = data.map((breed) => getItem(breed));
  return items.join("");
}

// Function to create an individual gallery item
function getItem(breed) {
  const image = `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`;
  const name = breed.name;
  const description = breed.description;

  const item = `
    <li class="gallery--item">
      <img
        src="${image}"
        alt="${name}"
        class="gallery--item_image"
        data-detailed-image="${image}"
        data-detailed-title="${description}"
      />
      <span class="gallery--item_title">${name}</span>
    </li>
  `;
  return item;
}

// Get all gallery images
const galleryImages = document.querySelectorAll(".gallery--item_image");

// Add event listener to update central image and title
galleryImages.forEach((image) => {
  image.addEventListener("click", function () {
    setDetails(image);
  });
});

function setDetails(image) {
  // Get the detailed image and title from the clicked image
  let imageSrc = image.getAttribute("data-detailed-image");
  let imageTitle = image.getAttribute("data-detailed-title");

  // Update the central image and description with the clicked image's data
  detailedImage.src = imageSrc;
  detailedTitle.innerHTML = imageTitle;

  // Trigger animation for smooth transition
  animate();
}

function animate() {
  // Remove and re-add animation classes to trigger the animation effect
  detailedImage.classList.remove("animation-up");
  detailedTitle.classList.remove("animation-down");
  setTimeout(function () {
    detailedImage.classList.add("animation-up");
    detailedTitle.classList.add("animation-down");
  }, 0);
}

// Initial call to render images in the gallery
const ulElem = document.getElementById("ul_elem");
drawImages(ulElem);
