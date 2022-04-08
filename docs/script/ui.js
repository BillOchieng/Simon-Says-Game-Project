var gameBtns = document.querySelectorAll(".game-button");
var userChoices = []


var startBtn = document.getElementById("start-button");
userChoices = [];
const elements = Array.from(gameBtns).map(button => {
    return button.id;
});
//generate a random number index inf from 0-3
let choice = math.floor(math.random() * elements.length)
// get IDs of all possible buttons
//console.log(choice);
//get IDs for a specific possible number
//console.log(elements[choice]);

startBtn.addEventListener("click", () => {
    document.getElementById("points").innerText = "Points: 0";
    startBtn.style.backgroundColor = "#FF3898";
    console.log("MADE IT HERE");
});
// TODO: Leave this alone until prompted!

