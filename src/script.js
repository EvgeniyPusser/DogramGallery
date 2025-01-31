const detailedImage = document.querySelector(".detailedContainer--image");
const detailedTitle = document.querySelector('.detailedContainer--title');
const galleryImages = document.querySelectorAll('.gallery--item_image');
for(let i = 0; i < galleryImages.length; i++) {
    galleryImages[i].addEventListener("click", function() {
        setDetails(galleryImages[i]);
        animate(detailedImage);
        animate(detailedTitle);
    })
}
function setDetails(galleryImage) {
    let image = galleryImage.getAttribute("data-detailed-image");
    detailedImage.src = image
    detailedTitle.innerHTML = galleryImage.getAttribute("data-detailed-title") +
     '<span class="for_ellipsis">...</span>';
}
function animate(element) {
    element.classList.toggle('animation-down');
    element.classList.toggle('animation-up');

}