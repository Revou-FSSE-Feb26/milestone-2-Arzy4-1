// Clicker Game
const score = document.getElementById("score");
const finalScore = document.getElementById("finalscore");
const highScore = document.getElementById("highscore");

const scoreBoard = document.getElementById("scoreboard");
const restartBtn = document.getElementById("restart");

const timerEl = document.getElementById("timer");
const timerPanel = document.getElementById("timer-panel");

const btn = document.getElementById("button-img");
const btnStart = document.getElementById("button-img-start");
const btn1 = document.getElementById("button-img-1");
const btn2 = document.getElementById("button-img-2");
const btn3 = document.getElementById("button-img-3");

let timeLeft = 10;
let gameActive = false;
let interval;

function incrementScore() {
    if (!gameActive) return;
    score.textContent = Number(score.textContent) + 1;
}

btn.addEventListener("click", () => {
    if (!gameActive) return;

    incrementScore();

    btn.classList.add("active");

    setTimeout(() => {
    btn.classList.remove("active");
    }, 100);
});

btnStart.addEventListener("click", () => {
    startSequence();
});

function resetUI() {
    btn.style.display = "none";
    btnStart.style.display = "block";
    btn1.style.display = "none";
    btn2.style.display = "none";
    btn3.style.display = "none";
}

function startSequence() {
    clearInterval(interval);

    gameActive = false;
    timeLeft = 10;
    timerEl.textContent = timeLeft;
    score.textContent = 0;

    btn.style.display = "none";
    btnStart.style.display = "none";

    btn3.style.display = "block";
    btn2.style.display = "none";
    btn1.style.display = "none";

    setTimeout(() => {
        btn3.style.display = "none";
        btn2.style.display = "block";
    }, 1500);

    setTimeout(() => {
        btn2.style.display = "none";
        btn1.style.display = "block";
    }, 3000);

    setTimeout(() => {
        btn1.style.display = "none";
        btn.style.display = "block";
        gameActive = true;
        startTimer();
    }, 4500);
}

function startTimer() {
    clearInterval(interval);

    interval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft < 0) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameActive = false;

    btn.style.display = "block"
    btn1.style.display = "none";
    btn2.style.display = "none";
    btn3.style.display = "none";

    timeLeft = 10;
    timerEl.textContent = timeLeft;

    scoreBoard.classList.add("activate");

    const currentScore = Number(score.textContent);
    finalScore.textContent = currentScore;

    let savedHighScore = Number(localStorage.getItem("highScore")) || 0;
    if (currentScore > savedHighScore) {
        savedHighScore = currentScore;
        localStorage.setItem("highScore", savedHighScore);
    }

    highScore.textContent = savedHighScore;
}

restartBtn.addEventListener("click", () => {

    setTimeout(() => {
        restartGame();
    }, 300); // match your CSS transition
});

function restartGame() {
    // hide scoreboard
    scoreBoard.classList.remove("activate");

    // reset game state
    clearInterval(interval);
    gameActive = false;

    // reset score + timer
    score.textContent = 0;
    timeLeft = 10;
    timerEl.textContent = timeLeft;

    // reset UI
    btn.style.display = "none";
    btn1.style.display = "none";
    btn2.style.display = "none";
    btn3.style.display = "none";

    // 🔥 start again immediately
    btnStart.style.display = "block";
}

// HighScore reset
// window.addEventListener("load", () => {
//     localStorage.removeItem("highScore");
// });