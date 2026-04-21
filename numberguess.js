// Number Guessing Game
const minNum = 1;
const maxNum = 100;
let answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

console.log("Answer:", answer);

let attempts = 0;
let seconds = 0;
let running = true;

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

// When Start Button Clicked
startBtn.addEventListener("click", () => {
    startBtnContainer.classList.add("hidden");
    startBtn.classList.add("hidden");
    startSequence();
});

function startSequence(){

    // Count Down Timer
    let count = 3;
    countDownEl.classList.remove("hidden");
    countDownEl.textContent = count;

    // When Count Down is 0
    const countDownInterval = setInterval(() => {
        count--;
        countDownEl.textContent = count;

        if (count === 0) {
            clearInterval(countDownInterval);

            countDownEl.classList.add("hidden");
            gameContainer.classList.add("activate");

            running = true; //Start The Game
            timeDisplay.textContent = seconds;

            timer = setInterval(() => {
                if (!running) return;

                seconds++; //Game Timer Start (adding)
                timeDisplay.textContent = seconds;

                // When The Timer is Up
                if (seconds >= 30) {
                    clearInterval(timer);
                    running = false;
                    guessInput.disabled = true;
                    guessBtn.style.pointerEvents = "none";
                    guessBtn.style.opacity = "0.6";
                    scoreBoard.classList.add("activate");
                    finalText.textContent = `Too Bad, Your Final Number Is`;

                    // Showing The Final Answer and Current Time
                    finalNumber.textContent = answer;
                    finalTime.textContent = `-`;

                    // Save the Final Answer and Show the Highscore Time
                    let savedHighScore = Number(localStorage.getItem("highScoreTime")) || 0;
                    highScoreTime.textContent = savedHighScore + `s`;
                }
            }, 1000);
        }
    }, 1000);
}

// When Guess Button CLicked
guessBtn.addEventListener("click", () => {
    if (!running) return;

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

    attempts++;

    // When The Guess is Correct
    if (guess == answer) {
        hintText.textContent = `Correct!`;
        running = false;
        guessInput.disabled = true;
        guessBtn.style.pointerEvents = "none";
        guessBtn.style.opacity = "0.6";
        scoreBoard.classList.add("activate");
        finalText.textContent = `CONGRATULATION!! Your Final Number Is`;
        finalNumber.textContent = answer;

        // Show The Current Time
        const currentScore = seconds;
        finalTime.textContent = currentScore + `s`;

        // Save The Current Time
        let savedHighScore = Number(localStorage.getItem("highScoreTime")) || 0;

        // Rewrite the Current Time as Saved Highscore Time
        if (savedHighScore === 0 || currentScore <= savedHighScore) {
            savedHighScore = currentScore;
            localStorage.setItem("highScoreTime", savedHighScore);
        }

        // Show The Highscore Time
        highScoreTime.textContent = savedHighScore + `s`;
    } else if (Math.abs(guess - answer) <= 10) {
        hintText.textContent = guess < answer ? "Close! Higher!" : "Close! Lower!"; //If the guess is 10 number closer to the answer
    } else {
        hintText.textContent = guess < answer ? "Too Low!!" : "Too High!!"; //If the guess is too far
    }

    guessInput.value = ""; //The input goes empty after user input the number
    guessInput.focus(); //User can immediately input the number
});

// When Restart Button Clicked
restartBtn.addEventListener("click", () => {
    setTimeout(()=> {

        // Reset Game State
        clearInterval(timer);
        running = false;
        seconds = 0;
        hintText.textContent = "Start guessing...";
        timeDisplay.textContent = seconds;
        guessInput.disabled = false;
        guessBtn.style.pointerEvents = "auto";
        guessBtn.style.opacity = "1";
        guessInput.value = "";

        // hide scoreboard
        scoreBoard.classList.remove("activate");

        // Immediately Start the count down sequence and restart game
        startSequence();

        // OPTIONAL: reset game container
        gameContainer.classList.remove("activate");

        // generate new answer
        answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        console.log("New Answer:", answer);

    },300);
});

// Disable Submit Form
const guessForm = document.getElementById("guess-form");

guessForm.addEventListener("submit", (e) => {
    e.preventDefault(); //Prevent the page reload
});
