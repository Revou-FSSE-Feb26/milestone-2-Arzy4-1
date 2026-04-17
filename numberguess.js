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
const startBtn = document.getElementById("start-button");
const countdownEl = document.getElementById("countdown");
const gameContainer = document.getElementById("game-container");
const scoreBoard = document.getElementById("scoreboard");
const restartBtn = document.getElementById("restart");
const finalTime = document.getElementById("final-time");
const highScoreTime = document.getElementById("highscore-time");
const finalText = document.getElementById("final-text");
const finalNumber = document.getElementById("final-number");
const timerEl = document.getElementById("timer");
const timerPanel = document.getElementById("timer-panel");

startBtn.addEventListener("click", () => {
    startBtn.classList.add("hidden");

    let count = 3;
    countdownEl.classList.remove("hidden");
    countdownEl.textContent = count;

    const countdownInterval = setInterval(() => {
        count--;
        countdownEl.textContent = count;

        if (count === 0) {
            clearInterval(countdownInterval);

            countdownEl.classList.add("hidden");
            gameContainer.classList.add("activate");

            running = true;
            timeDisplay.textContent = seconds;

            timer = setInterval(() => {
                if (!running) return;

                seconds++;
                timeDisplay.textContent = seconds;

                if (seconds >= 30) {
                    clearInterval(timer);
                    running = false;
                    guessInput.disabled = true;
                    guessBtn.style.pointerEvents = "none";
                    guessBtn.style.opacity = "0.6";
                    scoreBoard.classList.add("activate");
                    finalText.textContent = `Too Bad, Your Final Number Is`;
                    finalNumber.textContent = answer;
                    finalTime.textContent = `-`;

                    let savedHighScore = Number(localStorage.getItem("highScoreTime")) || 0;
                    highScoreTime.textContent = savedHighScore + `s`;
                }
            }, 1000);
        }
    }, 1000);
});

guessInput.addEventListener("input", () => {
    guessInput.value = guessInput.value.replace(/[^0-9]/g, "");
});

guessBtn.addEventListener("click", () => {
    if (!running) return;

    const guess = Number(guessInput.value);

    if (guessInput.value === "") {
        hintText.textContent = "Please enter a number!";
        return;
    }

    if (guess < minNum || guess > maxNum) {
        hintText.textContent = `Enter a number from ${minNum} to ${maxNum}!`;
        return;
    }

    attempts++;

    if (guess == answer) {
        hintText.textContent = `Correct!`;
        running = false;
        guessInput.disabled = true;
        guessBtn.style.pointerEvents = "none";
        guessBtn.style.opacity = "0.6";
        scoreBoard.classList.add("activate");
        finalText.textContent = `CONGRATULATION!! Your Final Number Is`;
        finalNumber.textContent = answer;

        const currentScore = seconds;
        finalTime.textContent = currentScore + `s`;

        let savedHighScore = Number(localStorage.getItem("highScoreTime")) || 0;

        if (currentScore <= savedHighScore) {
            savedHighScore = currentScore;
            localStorage.setItem("highScoreTime", savedHighScore);
        }

        highScoreTime.textContent = savedHighScore + `s`;
    } else if (Math.abs(guess - answer) <= 10) {
        hintText.textContent = guess < answer ? "Close! Higher!" : "Close! Lower!";
    } else {
        hintText.textContent = guess < answer ? "Too Low!!" : "Too High!!";
    }

    guessInput.value = "";
    guessInput.focus();
});

restartBtn.addEventListener("click", () => {
    scoreBoard.classList.remove("activate");

    setTimeout(() => {
        restartGame();
    }, 300); // match your CSS transition
});

function restartGame() {
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

    // show start button again
    startBtn.classList.remove("hidden");

    // OPTIONAL: reset game container
    gameContainer.classList.remove("activate");

    // generate new answer
    answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    console.log("New Answer:", answer);
}