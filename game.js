
//#region Global Variables
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false;
var level = 0;
var iteration = 0;
//#endregion

//#region Game Logic

//Start the game on key press
$(document).on("keydown", () => {
    if(!started){
        started = true;
        generateNextSequence();
    }
});

//Cube press logic
$(".cube").on("click", (e) => {
    //If game hasn't started, don't check for correctness
    if(!started){
        effectPress(e.target);
        playSound(e.target.classList[1]);
    }else{
        //Check if the clicked color is the correct one in the sequence
        if(e.target.classList[1] === gamePattern[iteration]){
            playSound(e.target.classList[1]);
            effectPress(e.target);
            iteration++; 

            //If the user has completed the sequence, generate the next one
            if(iteration === gamePattern.length){
                setTimeout(generateNextSequence, 1000);
            }
        } else {
            //Wrong answer / reset game
            playSound("wrong");
            iteration = 0;
            started = false;
            level = 0;
            gamePattern = [];
            $("#level").text("Game Over, Press Any Key to Restart");
        }
    }
});

function generateNextSequence(){
    userClickedPattern = [];
    $("#level").text(`Level ${++level}`);

    // Generate random number between 0-3
    var randomNumber = Math.floor(Math.random() * 4);

    //Add random color to the pattern
    gamePattern.push(buttonColors[randomNumber]);

    //Animate and play sound for the chosen color
    gamePattern.forEach((color,index) => {
        setTimeout( () =>
            {
                playSound(color)
                effectPress(`.${color}`);
            }, 600 * index
        );
    });
    iteration = 0;
}

//#endregion

//#region Helper Functions

//Plays corresponding sound
function playSound(cube){
    new Audio(`./sounds/${cube}.mp3`).play();
}

//Effect for button press
function effectPress(color){
    $(color).toggleClass("pressed");
    setTimeout(() => $(color).toggleClass("pressed"), 200);
}

//#endregion