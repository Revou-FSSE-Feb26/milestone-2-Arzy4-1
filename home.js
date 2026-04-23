// Link the "Back To Home" Button to inde.html
const backHomeBtns = document.querySelectorAll(".back-home-btn");

backHomeBtns.forEach((btn) => {

    //When click the button, immediately go to home page
    btn.addEventListener("click", () => {
        window.location.href = "index.html";
    })
})  