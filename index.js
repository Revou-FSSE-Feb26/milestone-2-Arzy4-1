// Games Slider
const wrapper = document.getElementById("games-wrapper");
const cards = document.querySelectorAll("#games-container article");
const btnLeft = document.getElementById("prev-btn").addEventListener("click", prevSlide);
const btnRight = document.getElementById("next-btn").addEventListener("click", nextSlide);

const startIndex = 2;
const endIndex = 4;

let currentIndex = startIndex;
let isMoving = false;

window.addEventListener("load", () => {
    wrapper.scrollLeft = cards[startIndex].offsetLeft;
});

function goToSlide(index) {
    wrapper.scrollTo({
        left: cards[index].offsetLeft,
        behavior: "smooth"
    });
}

function prevSlide() {
    if (isMoving) return;
    isMoving = true;

    currentIndex--;
    goToSlide(currentIndex);
    console.log(currentIndex);

    setTimeout(() => {
        if (currentIndex <= 1) {
             // 🔥 disable smooth temporarily
            wrapper.style.scrollBehavior = "auto";

            currentIndex = 4;
            wrapper.scrollLeft = cards[currentIndex].offsetLeft;

            // 🔥 re-enable smooth
            wrapper.style.scrollBehavior = "smooth";
        }

        isMoving = false;
    }, 600);
}

function nextSlide() {
    if (isMoving) return;
    isMoving = true;

    currentIndex++;
    goToSlide(currentIndex);
    console.log(currentIndex);

    setTimeout(() => {
        if (currentIndex >= 5) {
             // 🔥 disable smooth temporarily
            wrapper.style.scrollBehavior = "auto";

            currentIndex = 2;
            wrapper.scrollLeft = cards[currentIndex].offsetLeft;

            // 🔥 re-enable smooth
            wrapper.style.scrollBehavior = "smooth";
        }

        isMoving = false;
    }, 600);
}

// Games Autoplay Carousel
let autoplay;

function autoSlide() {
    if (isMoving) return;
    nextSlide();
}

function startAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(autoSlide, 8000);
}

startAutoplay();