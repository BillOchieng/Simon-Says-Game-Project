var gameBtn = document.querySelectorAll(".game-button");
var userChoices = [];
var gamePattern = [];
var points = 0; // Points initialized to 0
const delay = 7000; // Set delay for user response, 7 seconds

function playTurn() {
    let level = 0;
    userChoices = [];
    gamePattern.push(chooseRandomButton());
    const turn = setInterval(() => {
        let id = gamePattern[level];
        activateButton(id);
        level++;
        if (level >= gamePattern.length) {
            clearInterval(turn);
            // Set a delay before starting user's turn to ensure the last button's sound and visual cue are completed
            setTimeout(() => {
                checkUserSequence(level); // Check the user's sequence after showing the full pattern
            }, 1000);
        }
    }, 1000);
}

function activateButton(id) {
    const elem = document.getElementById(id);
    const origBg = elem.style.backgroundColor;
    elem.style.backgroundColor = "#FFF";
    setTimeout(() => {
        elem.style.backgroundColor = origBg;
    }, 500);
    playSound(id);
}

function playSound(id) {
    const data = document.getElementById(id).getAttribute("data-button");
    const sound = document.querySelector(`[data-sound='${data}']`);
    sound.play();
}

const elements = Array.from(gameBtn).map(btn => btn.id); // Corrected variable name for consistency

const chooseRandomButton = () => {
    let choice = Math.floor(Math.random() * elements.length);
    return elements[choice];
}

function checkUserSequence(level) {
    setTimeout(() => {
        if (validatePattern()) {
            points++;
            document.getElementById("points").innerText = `Points: ${points}`;
            playTurn(); // Continue to next turn
        } else {
            document.getElementById("points").innerText = "Game Over! Press Start to play again.";
            playSound('lose'); // Play lose sound
            console.log("YOU LOSE!");
            // Optionally, reset the game pattern and points here or prompt the user to press start to try again
        }
    }, delay);
}

const validatePattern = () => {
    if (userChoices.length !== gamePattern.length) return false;
    for (let i = 0; i < userChoices.length; i++) {
        if (userChoices[i] !== gamePattern[i]) return false;
    }
    return true;
}

gameBtn.forEach(btn => {
    btn.addEventListener("click", (evt) => {
        let source = evt.target.id;
        userChoices.push(source);
        activateButton(source);
    });
});

var startBtn = document.getElementById("start-button");
startBtn.addEventListener("click", () => {
    document.getElementById("points").innerText = "Points: 0";
    points = 0; // Reset points to 0
    userChoices = [];
    gamePattern = [];
    playTurn(); // Start the game
});
