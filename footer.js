// Inject Footer HTML Here
document.getElementById("footer-placeholder").innerHTML = `
    <footer id="footer" class="bg-linear-to-b from-indigo-950 to-slate-900 pt-10 pb-20 fixed bottom-0 w-full">

        <!-- Footer Container -->
        <div class="flex flex-col items-center">

            <!-- Page Logo -->
            <img src="image/REVOFUN_Logo.png" alt="REVOFUN Logo" class="w-[200px]">

            <!-- Footer Icon Links -->
            <ul class="footer-list flex justify-evenly items-center gap-10">

                <!-- Linkedin -->
                <li>
                    <a href="https://linkedin.com/in/robbyarzy/">
                        <img src="image/Linkedin_Logo.png" alt="LinkedIn Logo" class="w-[40px]">
                    </a>
                </li>

                <!-- Email -->
                <li>
                    <a href="mailto:robbyarzy@gmail.com">
                        <img src="image/Gmail_Logo.png" alt="Gmail Logo" class="w-[40px]">
                    </a>
                </li>

                <!-- Whatsapp -->
                <li>
                    <a href="https://wa.me/6282232138510">
                        <img src="image/whatsapp.png" alt="WhatsApp Logo" class="w-[40px]">
                    </a>
                </li>

                <!-- Instagram -->
                <li>
                    <a href="https://www.instagram.com/rbby_rzy/">
                        <img src="image/Instagram_Logo.png" alt="Instagram Logo" class="w-[40px]">
                    </a>
                </li>

                <!-- Telegram -->
                <li>
                    <a href="https://t.me/Robby100903">
                        <img src="image/Telegram_Logo.png" alt="Telegram Logo" class="w-[40px]">
                    </a>
                </li>

                <!-- GitHub -->
                <li>
                    <a href="https://github.com/Revou-FSSE-Feb26/milestone-2-Arzy4-1">
                        <img src="image/Github_Logo.png" alt="GitHub Logo" class="w-[40px]">
                    </a>
                </li>

            </ul>

        </div>

        <!-- Update Information and Copyrights -->
        <div class="flex justify-center text-center text-white pt-20">
            <p>Latest Update: April 23, 2026</p>
            <p class="px-2">|</p>
            <p>&copy; 2026 REVOFUN. All rights reserved.</p>
        </div>

    </footer>
`;