// Inject Navbar HTML Here
document.getElementById("navbar-placeholder").innerHTML = `
    <!-- Navbar Start -->
        <nav id="navbar" class="navbar flex justify-between items-center py-4 px-8 fixed w-full transition-all duration-800 z-100 [&_a,button]:hover:text-gray-300" aria-label="Main Navigation">

            <!-- Page Logo -->
            <a href="index.html">
                <img src="image/REVOFUN_Logo.png" alt="REVOFUN LOGO" class="w-[150px]">
            </a>

            <!-- Page Navigation -->
            <ul class="flex gap-8 text-xl">

                <!-- Home Page -->
                <li><a href="index.html">Home</a></li>

                <!-- Games Pages -->
                <li class="group relative">
                    <button class="group cursor-pointer">Games <i class="fa-solid fa-caret-down"></i></button>
    
                    <!-- Dropdown Menu -->
                    <ul class="text-center absolute -translate-x-[63px] top-full mt-0 pt-2 w-48 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">

                        <!-- Clicker Game Page -->
                        <li class="px-4 py-2 duration-300 hover:scale-110">
                            <a href="clicker.html">Click to Win</a>
                        </li>

                        <!-- Number Guessing Game Page -->
                        <li class="px-4 py-2 duration-300 hover:scale-110">
                            <a href="numberguess.html">Guess the Number</a>
                        </li>

                        <!-- Rock Paper Scissor Game Page -->
                        <li class="px-4 py-2 duration-300 hover:scale-110">
                            <a href="rockpaperscissor.html">Rock Paper Scissors</a>
                        </li>

                    </ul>

                </li>

                <!-- About Page -->
                <li><a href="about.html">About</a></li>

                <!-- Contact Page -->
                <li><a href="contact.html">Contact</a></li>
            </ul>

        </nav>
        <!-- Navbar End -->
`;

// Fixed Navbar Animation
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () =>{
    if(window.scrollY > 200){
        navbar.classList.add("activate");
    } else{
        navbar.classList.remove("activate");
    }
});