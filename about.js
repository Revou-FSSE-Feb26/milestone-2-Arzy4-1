// Fixed Navbar Animation
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () =>{
    if(window.scrollY > 200){
        navbar.classList.add("activate");
    } else{
        navbar.classList.remove("activate");
    }
});