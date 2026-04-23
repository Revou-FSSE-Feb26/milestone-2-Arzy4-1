// Games Slider
const wrapper = document.getElementById("games-wrapper");
const cards = document.querySelectorAll("#games-container article");
const btnLeft = document.getElementById("prev-btn");
const btnRight = document.getElementById("next-btn");

// The carousel uses fake cards at both ends to create an infinite loop effect. Real cards are located from index 2 to 4, while the duplicated cards exist before and after them to make the transition look seamless.
const startIndex = 2; // Start from Card 1
const endIndex = 4; // End in Card 3

let currentIndex = startIndex; // Track the currently visible card so the slider knows where to move next.
let isMoving = false; // Prevent multiple slide animation from running at the same time, while the current transition is still in progress.

btnLeft.addEventListener("click", prevSlide);
btnRight.addEventListener("click", nextSlide);

// When Refresh Page
window.addEventListener("load", () => {
    
    // When the page loads, jump directly to the first real card. This avoids showing the fake cards that are only used for looping.
    wrapper.scrollLeft = cards[startIndex].offsetLeft;
    
});

// Smoothly scroll the wrapper to the selected card index.
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
    
    // Wait for the smooth scroll animation to finish before checking, whether the slider has moved into the fake-card area.
    setTimeout(() => {

        // If the slider reaches the fake cards on the left side, instantly jump to the matching real card to preserve the infinite loop illusion.
        if (currentIndex <= 1) { 

            // Temporarily disable smooth scrolling so the jump from fake card to real card so that it happens instantly and is not visible to the user.
            wrapper.style.scrollBehavior = "auto";

            // After reaching the fake card at the left boundary, reset the index to the last real card (fake card 3 on the left (index 1) = real card 3 (index 4)).
            currentIndex = endIndex;
            wrapper.scrollLeft = cards[currentIndex].offsetLeft;

            // Re-enable smooth scrolling for normal user-triggered transitions.
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

    // Wait for the smooth scroll animation to finish before checking, whether the slider has moved into the fake-card area.
    setTimeout(() => {

        // If the slider reaches the fake cards on the right side, instantly jump to the matching real card to preserve the infinite loop illusion.
        if (currentIndex >= 5) {

            // Temporarily disable smooth scrolling so the jump from fake card to real card so that it happens instantly and is not visible to the user.
            wrapper.style.scrollBehavior = "auto";

            // After reaching the fake card at the right boundary, reset the index to the first real card (fake card 1 on the right (index 5) = real card 1 (index 2)).
            currentIndex = startIndex;
            wrapper.scrollLeft = cards[currentIndex].offsetLeft;

            // Re-enable smooth scrolling for normal user-triggered transitions.
            wrapper.style.scrollBehavior = "smooth";
        }

        isMoving = false;
    }, 600);
}

// Automatically move the slider every 8 seconds. This reuses the same nextSlide logic so autoplay behaves the same as manual navigation.
let autoplay;

function startAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(autoSlide, 8000); //Autoslide function runs for 8 seconds
}

startAutoplay();

// Skip autoplay movement if a manual or automatic transition is still running.
function autoSlide() {
    if (isMoving) return;
    nextSlide();
}