// Clicker Game
const btnStartContainer = document.getElementById("start-button-container");
const btnStart = btnStartContainer.querySelector("button")
const scoreTimerContainer = document.getElementById("score-timer-container");
const score = document.getElementById("score");
const finalScore = document.getElementById("finalscore");
const highScore = document.getElementById("highscore");
const scoreBoard = document.getElementById("scoreboard");
const restartBtn = document.getElementById("restart");
const timerEl = document.getElementById("timer");
const timerPanel = document.getElementById("timer-panel");
const btn = document.getElementById("button-img");
const btn1 = document.getElementById("button-img-1");
const btn2 = document.getElementById("button-img-2");
const btn3 = document.getElementById("button-img-3");

let gameState = initialGameState();
let interval;

function initialGameState(){
    return{
        timeLeft: 10,
        gameActive: false,
    }
};


// Adding 1 Point
function incrementScore() {
    if (!gameState.gameActive) return; //Add points only when the game runs
    score.textContent = Number(score.textContent) + 1; //Adding 1 point
}

// When Button Clicked
btn.addEventListener("click", () => {
    if (!gameState.gameActive) return;

    incrementScore(); //Add points only when the user click the button

    // Add Animation when button clicked
    btn.classList.add("activate"); 

    setTimeout(() => {
    btn.classList.remove("activate");
    }, 100);
});

// When Start Button Clicked
btnStart.addEventListener("click", () => {
    startSequence();
});

// Count Down Function & Game Initialization
function startSequence() {
    clearInterval(interval);
    gameState = initialGameState();
    
    timerEl.textContent = gameState.timeLeft;
    score.textContent = 0;

    btnStartContainer.classList.add("hidden");
    scoreTimerContainer.classList.remove("hidden");
    btn.classList.add("hidden");
    btnStart.classList.add("hidden");

    btn3.classList.remove("hidden");
    btn2.classList.add("hidden");
    btn1.classList.add("hidden");

    setTimeout(() => {
        btn3.classList.add("hidden");
        btn2.classList.remove("hidden");
    }, 1500);

    setTimeout(() => {
        btn2.classList.add("hidden");
        btn1.classList.remove("hidden");
    }, 3000);

    setTimeout(() => {
        btn1.classList.add("hidden");
        btn.classList.remove("hidden");
        gameState.gameActive = true;
        startTimer();
    }, 4500);
}

// Timer Function
function startTimer() {
    clearInterval(interval);

    interval = setInterval(() => {
        gameState.timeLeft--;
        timerEl.textContent = gameState.timeLeft;

        if (gameState.timeLeft <= 0) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

// When Game Ends
function endGame() {
    gameState.gameActive = false; //Stop The game

    btn.classList.remove("hidden");
    btn1.classList.add("hidden");
    btn2.classList.add("hidden");
    btn3.classList.add("hidden");

    gameState.timeLeft = 0;
    timerEl.textContent = gameState.timeLeft;

    // Show the Scoreboard
    scoreBoard.classList.add("activate");

    // Show the Current Score
    const currentScore = Number(score.textContent);
    finalScore.textContent = currentScore;

    // Save the Current Score to Highscore
    let savedHighScore = Number(localStorage.getItem("highScore")) || 0;
    if (currentScore > savedHighScore) {
        savedHighScore = currentScore;
        localStorage.setItem("highScore", savedHighScore);
    }

    // Show the Highscore
    highScore.textContent = savedHighScore;
}

// When Click the Restart Button
restartBtn.addEventListener("click", () => {
    setTimeout(()=>{
        
        // hide scoreboard
        scoreBoard.classList.remove("activate");

        // reset game state, score, and timer
        clearInterval(interval);
        gameState = initialGameState();
        score.textContent = 0;
        timerEl.textContent = gameState.timeLeft;

        // Restart the count down sequence
        startSequence();
        
    },300);
});

// HighScore reset
// window.addEventListener("load", () => {
//     localStorage.removeItem("highScore");
// });