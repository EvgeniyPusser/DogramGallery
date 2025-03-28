// This script fetches movie data from TMDB API and displays it in a gallery format.
const detailedImage = document.querySelector(".detailedContainer--image");
const detailedTitle = document.querySelector(".detailedContainer--title");

// Your TMDB API Key (Replace with your actual key)
const API_KEY = "1eb9c2c4f46b71a5b4e658c14148c7cd";

// Function to fetch and display movies
async function drawMovies() {
  const galleryContainer = document.getElementById("cats_gallery"); // Reuse gallery ID
  if (!galleryContainer) {
    console.error("Gallery container not found!");
    return;
  }

  try {
    // Fetch movies from TMDB API
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&primary_release_year=1987&with_genres=80,9648`
    );

    if (!response.ok) throw new Error("Failed to fetch movie data");

    const data = await response.json();
    galleryContainer.innerHTML = getMovieItems(data.results);

    // Add event listeners after rendering movies
    addGalleryMovieEventListeners();
  } catch (error) {
    console.error("Error fetching movie data:", error);
    galleryContainer.innerHTML =
      "<p>Error loading movies. Try again later.</p>";
  }
}

// Function to create list items for each movie
function getMovieItems(movies) {
  return movies
    .map((movie) => {
      const image = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "placeholder.jpg"; // Fallback image
      const detailedImage = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : image; // Use backdrop or poster

      return `
        <li class="gallery--item">
          <img
            src="${image}"
            alt="${movie.title}"
            class="gallery--item_image"
            data-detailed-image="${detailedImage}"
            data-detailed-title="${movie.overview || "No description available."}"
          />
          <span class="gallery--item_title">${movie.title}</span>
        </li>
      `;
    })
    .join("");
}

// Add event listener to update detailed view
function addGalleryMovieEventListeners() {
  document.querySelectorAll(".gallery--item_image").forEach((image) => {
    image.addEventListener("click", function () {
      setDetails(image); // Update detailed view when clicked
    });
  });
}

function setDetails(image) {
  // Remove previous animation classes
  detailedImage.classList.remove("animation-up");
  detailedTitle.classList.remove("animation-down");

  setTimeout(() => {
    // Set the detailed image and title
    detailedImage.src = image.getAttribute("data-detailed-image");
    detailedTitle.innerHTML = image.getAttribute("data-detailed-title");

    // Re-add animation classes
    detailedImage.classList.add("animation-up");
    detailedTitle.classList.add("animation-down");
  }, 50);
}

// Load movies when the page is ready
window.onload = drawMovies;

