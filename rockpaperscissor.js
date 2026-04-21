// Rock Paper Scissor Game
const start = document.getElementById("start");
const startBtn = document.getElementById("start-button");
const weapon = document.getElementById("weapon");
const weaponTitle = document.getElementById("weapon-title");
const weaponChoice = document.getElementById("weapon-choice");
const playerChoicesBox = document.getElementById("player-choices-box");
const playerChoice = document.getElementById("player-choice");
const computerChoice = document.getElementById("computer-choice");
const scoreBox = document.getElementById("score-box");

let choice = weaponChoice.querySelectorAll("img");
let resultBox = document.getElementById("result-box");
let resultTxt = resultBox.querySelector("h3");
let restartBtn = resultBox.querySelector("#restart");
let wonValue = document.querySelector("#won span");
let lostValue = document.querySelector("#lost span");
let drawValue = document.querySelector("#draw span");

// Initialized the Score
let won = 0, lost = 0, draw = 0;

// Computer's Possible Choices
let computer = ["Rock", "Paper", "Scissor"];

// Posibble Outcomes
let outcomes = {
    RockRock: "Draw",
    RockPaper: "Computer",
    RockScissor: "You",
    PaperPaper: "Draw",
    PaperScissor: "Computer",
    PaperRock: "You",
    ScissorScissor: "Draw",
    ScissorRock: "Computer",
    ScissorPaper: "You"
};

// When The Start Button Clicked
startBtn.addEventListener("click", () =>{
    start.classList.add("hidden");
    weapon.classList.remove("hidden");
    weaponTitle.classList.add("activate");
    weaponChoice.classList.remove("hidden");
    weaponChoice.classList.add("activate");
    scoreBox.classList.add("activate");
});

// When The User Clicked the Weapon Choices
for(let i = 0; i < choice.length; i++){
    choice[i].addEventListener("click", (e)=> { //for each image add eventListener

        // Set the Revealing Hands to Rock
        playerChoice.src = "image/REVOFUN_RockHand.png";
        computerChoice.src = "image/REVOFUN_RockHand.png";
        
        // Hide the Weapon Choices and Show the Player Choices
        weaponChoice.classList.add("hidden");
        playerChoicesBox.classList.remove("hidden");

        // Add Delay Before Showing The Player Choices
        setTimeout(() => {
            playerChoice.classList.add("activate");
            computerChoice.classList.add("activate");
        }, 1000);

        setTimeout(() => {

            // Pause the Animation of Player Choices
            let playerChoices = playerChoicesBox.querySelectorAll("img");
            for(let i = 0; i < playerChoices.length; i++){
                playerChoices[i].style.animationPlayState = "paused";    
            }

            // Set The Player Choice to the Selected Weapon
            playerChoice.src = e.target.src;

            // Generate Computer a Random Choices
            let randomChoice = computer[Math.floor(Math.random() * computer.length)];
            computerChoice.src = `image/REVOFUN_${randomChoice}Hand1.png`;

            let userChoice = e.target.parentElement.className;
            let outcomeValue = outcomes[userChoice + randomChoice];

            showResult(outcomeValue);

        }, 3000);

    });
}

let showResult =(result) => {
    
    // Show the Result Box
    resultBox.classList.remove("hidden");
    resultBox.classList.add("activate"); //for animation

    // Conditional Result
    switch (result){
        case "You":
            resultTxt.innerHTML = `CONGRATULATION, You Won!!`;
            won++;
            wonValue.innerHTML = won;
            break;

        case "Computer":
            resultTxt.innerHTML = `You Lost, Try Again`;
            lost++;
            lostValue.innerHTML = lost;
            break;

        default:
            resultTxt.innerHTML = `Wow, It's A Draw`;
            draw++;
            drawValue.innerHTML = draw;
            break;
    }
}

// When Restart Button Clicked
restartBtn.addEventListener("click", () => {

    // Reset Game and Animation
    playerChoice.classList.remove("activate");
    computerChoice.classList.remove("activate");
    resultBox.classList.add("hidden");
    weaponChoice.classList.remove("hidden");
    playerChoicesBox.classList.add("hidden");

    // Resume the Animation of Player Choices
    let playerChoices = playerChoicesBox.querySelectorAll("img");
    for(let i = 0; i < playerChoices.length; i++){
        playerChoices[i].style.animationPlayState = "running";    
    }
});