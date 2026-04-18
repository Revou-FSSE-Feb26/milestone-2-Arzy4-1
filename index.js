// Games Slider
const wrapper = document.getElementById("games-wrapper");
const cards = document.querySelectorAll("#games-container article");
const btnLeft = document.getElementById("prev-btn").addEventListener("click", prevSlide);
const btnRight = document.getElementById("next-btn").addEventListener("click", nextSlide);

const startIndex = 2; // Start from Card 1
const endIndex = 4; // End in Card 3

let currentIndex = startIndex; // To Show the Current Active Card Index
let isMoving = false; // Prevents Spam Clicking While Animation is running

// When Refresh Page
window.addEventListener("load", () => {
    
    // Show the Real First Card of the Slide
    wrapper.scrollLeft = cards[startIndex].offsetLeft;
    
});

// Move the Slider to Specific Card (UI)
function goToSlide(index) {
    wrapper.scrollTo({
        left: cards[index].offsetLeft,
        behavior: "smooth"
    });
}

// Function for Left Scroll Button
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

            // Change the Fake Card 3 to Real Card 3
            currentIndex = 4;
            wrapper.scrollLeft = cards[currentIndex].offsetLeft;

            // 🔥 re-enable smooth
            wrapper.style.scrollBehavior = "smooth";
            
        }

        isMoving = false;
    }, 600);
}

// Function for Right Scroll Button
function nextSlide() {
    if (isMoving) return;
    isMoving = true;

    currentIndex++;
    goToSlide(currentIndex);
    console.log(currentIndex);

    setTimeout(() => {
        if (currentIndex >= 5) {

            // Disable Smooth temporarily
            wrapper.style.scrollBehavior = "auto";

            // Change Fake Card 1 to Real Card 1
            currentIndex = 2;
            wrapper.scrollLeft = cards[currentIndex].offsetLeft;

            // re-enable smooth
            wrapper.style.scrollBehavior = "smooth";
        }

        isMoving = false;
    }, 600);
}

// Games Autoplay Carousel
let autoplay;

function startAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(autoSlide, 8000); //Autoslide function runs for 8 seconds
}

startAutoplay();

function autoSlide() {
    if (isMoving) return;
    nextSlide();
}

// Fixed Navbar Animation
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () =>{
    if(window.scrollY > 200){
        navbar.classList.add("activate");
    } else{
        navbar.classList.remove("activate");
    }
});