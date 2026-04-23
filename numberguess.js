// Number Guessing Game
const hintText = document.getElementById("hint-text");
const timeDisplay = document.getElementById("time-display");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const guessDisplay = document.getElementById("guess-display");
const startBtnContainer = document.getElementById("start-button-container");
const startBtn = startBtnContainer.querySelector("button");
const countDownEl = document.querySelector("#countdown span");
const gameContainer = document.getElementById("game-container");
const scoreBoard = document.getElementById("scoreboard");
const restartBtn = document.getElementById("restart");
const finalTime = document.getElementById("final-time");
const highScoreTime = document.getElementById("highscore-time");
const finalText = document.getElementById("final-text");
const finalNumber = document.getElementById("final-number");
const timerEl = document.getElementById("timer");
const timerPanel = document.getElementById("timer-panel");

const minNum = 1;
const maxNum = 100;

let gameState = initialGameState();
let timer;

function initialGameState() {
    return {
        answer: Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum, 
        attempts: 0, 
        seconds: 0, 
        running: false
    }
};

// When Start Button Clicked
startBtn.addEventListener("click", () => {
    startBtnContainer.classList.add("hidden");
    startBtn.classList.add("hidden");
    startSequence(); 
});

// This function handles the full game start flow: show countdown first, then begin the 30-second game timer
function startSequence(){

    // Count Down Timer
    let count = 3; // Start a 3-second countdown before the game begins
    countDownEl.classList.remove("hidden");
    countDownEl.textContent = count;

    // When Count Down Ends
    const countDownInterval = setInterval(() => {
        count--;
        countDownEl.textContent = count;

        // Once countdown reaches 0, start the main game timer
        if (count === 0) {
            clearInterval(countDownInterval);

            countDownEl.classList.add("hidden"); //Hide the count down timer
            gameContainer.classList.add("activate"); //Show all the game panel

            gameState.running = true; // Start the game, allow guessing and timer updates after the countdown finishes
            timeDisplay.textContent = gameState.seconds; //show the game timer

            timer = setInterval(() => {
                if (!gameState.running) return; // "running" controls whether the game is active or stopped

                gameState.seconds++; // Main game timer: counts how long the player takes to guess
                timeDisplay.textContent = gameState.seconds;

                // If the player does not guess the correct number within 30 seconds, end the game, reveal the answer, and show the scoreboard
                if (gameState.seconds >= 30) {
                    clearInterval(timer);
                    gameState.running = false; //End the game if the timer reach 30s
                    guessInput.disabled = true; //after the game ends, user can't enter a number anymore
                    guessBtn.style.pointerEvents = "none"; //"Guess This Number" button is not clickable anymore
                    guessBtn.style.opacity = "0.6"; //Reduce opacity for "Guess This Number" button
                    scoreBoard.classList.add("activate"); //Show the scoreboard
                    finalText.textContent = `Too Bad, Your Final Number Is`; //Show final text "Too Bad, Your Final Number Is" if user didn't put any number

                    // Showing The Final Answer and Current Time
                    finalNumber.textContent = gameState.answer;
                    finalTime.textContent = `-`;

                    // Save the Final Answer and Show the Highscore Time
                    let savedHighScore = Number(localStorage.getItem("highScoreTime")) || 0;
                    highScoreTime.textContent = `${savedHighScore}s`;
                }
            }, 1000);
        }
    }, 1000);
}

// When Guess Button CLicked
guessBtn.addEventListener("click", () => {
    if (!gameState.running) return; // "running" controls whether the game is active or stopped

    const guess = Number(guessInput.value);

    // When The Input is More Then Max or Min or Not Entered
    if (guessInput.value === "") {
        hintText.textContent = "Please enter a number!";
        return;
    }
    if (guess < minNum || guess > maxNum) {
        hintText.textContent = `Enter a number from ${minNum} to ${maxNum}!`;
        return;
    }

    gameState.attempts++;

    // When user guess
    if (guess == gameState.answer) { // End the game immediately when the player finds the correct answer
        hintText.textContent = `Correct!`;
        gameState.running = false; //Game ends immediately
        guessInput.disabled = true; //User can't input number anymore
        guessBtn.style.pointerEvents = "none"; //"Guess This Number" button is not clickable anymore
        guessBtn.style.opacity = "0.6"; //Reduce opacity of the button
        scoreBoard.classList.add("activate"); //Immediately show the scoreboard
        finalText.textContent = `CONGRATULATION!! Your Final Number Is`;
        finalNumber.textContent = gameState.answer;

        // Show The Current Time
        const currentScore = gameState.seconds;
        finalTime.textContent = `${currentScore}s`;

        // Save The Current Time
        let savedHighScore = Number(localStorage.getItem("highScoreTime")) || 0;

        // Update highscore only if current score is better (lower time)
        if (savedHighScore === 0 || currentScore <= savedHighScore) {
            savedHighScore = currentScore; //Update Highscore if the user hit new record
            localStorage.setItem("highScoreTime", savedHighScore);
        }

        // Show The Highscore Time
        highScoreTime.textContent = `${savedHighScore}s`;

    } else if (Math.abs(guess - gameState.answer) <= 10) { // Give a "Close" hint when the guess is within range of 10 numbers of the correct answer
        hintText.textContent = guess < gameState.answer
        ? "Close! Higher!"
        : "Close! Lower!";
    } else { // Give a "Too" hint when the guess is too far from the correct answer
        hintText.textContent = guess < gameState.answer
        ? "Too Low!!"
        : "Too High!!";
    }

    guessInput.value = ""; //The input goes empty after user input the number
    guessInput.focus(); //User can immediately input the number
});

// Reset timer, input state, scoreboard, and answer before starting a new countdown
restartBtn.addEventListener("click", () => {
    setTimeout(()=> {

        // Reset the data
        gameState = initialGameState();

        // Reset timer and input state
        clearInterval(timer);
        hintText.textContent = "Start guessing...";
        timeDisplay.textContent = gameState.seconds;
        guessInput.disabled = false; //User can't input any number
        guessBtn.style.pointerEvents = "auto";
        guessBtn.style.opacity = "1";
        guessInput.value = ""; //Empty the input field

        // hide scoreboard
        scoreBoard.classList.remove("activate");

        // Immediately Start the count down sequence and restart the game
        startSequence();

        // Show all the game panel again after start sequence ends
        gameContainer.classList.remove("activate");

    },300);
});

// Disable Submit Form
const guessForm = document.getElementById("guess-form");

guessForm.addEventListener("submit", (e) => {
    e.preventDefault(); //Prevent the page reload
});
