// const API_KEY = "1eb9c2c4f46b71a5b4e658c14148c7cd"; // Replace with your TMDb API key

// const API_URL =
//   "https://api.themoviedb.org/3/movie/popular?api_key=" +
//   API_KEY +
//   "&language=en-US&page=1";
// const API_URL_IMAGE = "https://image.tmdb.org/t/p/w500/";

// // DOM elements for detailed view
// const detailedImage = document.querySelector(".detailedContainer--image");
// const detailedTitle = document.querySelector(".detailedContainer--title");

// let galleryImages;
// const galleryElem = document.getElementById("cats_gallery");

// // Fetch movie data and draw gallery items
// async function drawGalleryItems() {
//   try {
//     const response = await fetch(API_URL);
//     const data = await response.json();

//     const itemsData = getItemsData(data.results); // Fetch movie data from results
//     const items = getItems(itemsData); // Generate HTML for items
//     galleryElem.innerHTML = items; // Add items to gallery

//     galleryImages = document.querySelectorAll(".gallery--item_image");
//     addListeners(); // Add event listeners to gallery items
//   } catch (error) {
//     console.error("Error fetching movie data:", error);
//   }
// }

// // Fetch data for gallery items
// function getItemsData(movies) {
//   return movies.map((movie) => ({
//     itemImage: getImage(movie.poster_path),
//     detailedImage: getImage(movie.poster_path),
//     title: movie.title,
//     detailedTitle: movie.overview,
//   }));
// }

// // Generate HTML for gallery items
// function getItems(itemsData) {
//   return itemsData
//     .map(({ itemImage, detailedImage, title, detailedTitle }) =>
//       getItem({ itemImage, detailedImage, title, detailedTitle })
//     )
//     .join("");
// }

// // Generate individual gallery item HTML
// function getItem({ itemImage, detailedImage, title, detailedTitle }) {
//   const shortOverview =
//     detailedTitle.length > 25
//       ? detailedTitle.slice(0, 25) + "..."
//       : detailedTitle;
//   return `<li class="gallery--item">
//             <img
//               src="${itemImage}"
//               alt="${title + " image"}"
//               class="gallery--item_image"
//               data-detailed-image="${detailedImage}"
//               data-detailed-title="${detailedTitle}"
//             />
//             <span class="gallery--item_title">${title}</span>
//           </li>`;
// }

// // Get full image URL using the poster_path
// function getImage(imagePath) {
//   return imagePath ? `${API_URL_IMAGE}${imagePath}` : "placeholder.jpg";
// }

// // Add event listeners for gallery images
// function addListeners() {
//   galleryImages.forEach((image) => {
//     image.addEventListener("click", function () {
//       setDetails(image);
//     });
//   });
// }

// // Set the detailed view when a gallery item is clicked
// function setDetails(galleryImage) {
//   const image = galleryImage.getAttribute("data-detailed-image");
//   detailedImage.src = image;
//   detailedTitle.innerHTML =
//     galleryImage.getAttribute("data-detailed-title") +
//     '<span class="for_ellipsis">...</span>';
//   animate();
// }

// // Animate the details view
// function animate() {
//   detailedImage.classList.remove("animation-up");
//   detailedTitle.classList.remove("animation-down");

//   setTimeout(function () {
//     detailedImage.classList.add("animation-up");
//     detailedTitle.classList.add("animation-down");
//   }, 0);
// }

// // Call the function to draw gallery items on page load
// drawGalleryItems();

const API_KEY = "1eb9c2c4f46b71a5b4e658c14148c7cd"; // Replace with your TMDb API key

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=" +
  API_KEY +
  "&language=en-US&page=1";
const API_URL_IMAGE = "https://image.tmdb.org/t/p/w500/";

const detailedImage = document.querySelector(".detailedContainer--image");
const detailedTitle = document.querySelector(".detailedContainer--title");
let galleryImages;
const galleryElem = document.getElementById("cats_gallery");

async function drawGalleryItems() {
  const response = await fetch(API_URL);
  const data = await response.json();
  const itemsData = getItemsData(data.results); //input data from API, output - array of objects
  //  {itemImage, backdropImage, detailedImage, title, detailedTitle}
  const items = getItems(itemsData);
  galleryElem.innerHTML = items;
  galleryImages = document.querySelectorAll(".gallery--item_image");
  addListeners();
}

drawGalleryItems();

function getItemsData(movies) {
  const itemsData = movies.map((movie) => ({
    itemImage: getImage(movie.poster_path), // Poster for gallery
    backdropImage: getImage(movie.backdrop_path), // Backdrop for detailed view
    detailedImage: getImage(movie.poster_path), // Use poster for detailed view initially
    title: movie.title,
    detailedTitle: movie.overview,
  }));
  return itemsData;
}

function getItems(itemsData) {
  const items = itemsData.map(getItem);
  return items.join("");
}

function getItem({ itemImage, backdropImage, title, detailedTitle }) {
  return `
    <li class="gallery--item">
      <img
        src="${itemImage}"
        alt="${title + " poster"}"
        class="gallery--item_image"
        data-detailed-image="${backdropImage}" <!-- Store the backdrop image for detailed view -->
        data-detailed-title="${detailedTitle}"
      />
      <span class="gallery--item_title">${title}</span>
    </li>
  `;
}

function getImage(image_path) {
  return image_path
    ? `${API_URL_IMAGE}${image_path}`
    : "https://via.placeholder.com/500"; // Fallback image if no poster or backdrop
}

function addListeners() {
  galleryImages.forEach((image) => {
    image.addEventListener("click", function () {
      setDetails(image); // When clicked, update the detailed view
    });
  });
}

// function setDetails(galleryImage) {
//   let image = galleryImage.getAttribute("data-detailed-image"); // Get the backdrop image
//   detailedImage.src = "";
//   detailedImage.src = image; // Set the detailed image to the backdrop
//   detailedTitle.innerHTML =
//     galleryImage.getAttribute("data-detailed-title") +
//     '<span class="for_ellipsis">...</span>';
//   animate();
// }

// function setDetails(galleryImage) {
//   // Get the image source from the clicked gallery image
//   let image = galleryImage.getAttribute("data-detailed-image");

//   // Get the detailed title (movie overview or title) from the clicked image
//   const detailedTitleText = galleryImage.getAttribute("data-detailed-title");

//   // Set the detailed image source (main image) to be shown
//   detailedImage.src = "";
//   detailedImage.src = image;

//   // Set the detailed title text (overview or title of the movie)
//   detailedTitle.innerHTML =
//     detailedTitleText + '<span class="for_ellipsis">...</span>';

//   // Trigger the animation for both the image and the title
//   animate();
// }

function setDetails(galleryImage) {
  // Get the detailed image and title from the clicked gallery image
  let image = galleryImage.getAttribute("data-detailed-image");
  let detailedTitleText = galleryImage.getAttribute("data-detailed-title");

  // Set the main detailed image
  detailedImage.src = "";
  detailedImage.src = image;

  // Set the main detailed title (movie title/overview)
  detailedTitle.innerHTML =
    detailedTitleText + '<span class="for_ellipsis">...</span>';

  // Trigger the animation
  animate();
}


function animate() {
  detailedImage.classList.remove("animation-up");
  detailedTitle.classList.remove("animation-down");
  setTimeout(function () {
    detailedImage.classList.add("animation-up");
    detailedTitle.classList.add("animation-down");
  }, 0);
}
