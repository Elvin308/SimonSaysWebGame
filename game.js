
//#region Global Variables
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false;
var level = 0;
var iteration = 0;
const sounds = {};
var harder = false
var faster = false;
//#endregion

//#region Event Handlers

//Start the game on key press
$(document).on("keydown", () => {
    if(!started){
        started = true;
        $("h1").text("Let's beging! ╰（‵□′）╯")
        $("#game-over").text("");
        $(".slider").addClass("disabled")
        $(".checkbox").prop("disabled", true);
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
            $("h1").text("Press A Keyboard Key to Start")
            $("#game-over").text("Game Over, Press Any Key to Restart");
            $("body").addClass("wrong");
            $(".slider").removeClass("disabled")
            $(".checkbox").prop("disabled", false);
        }
    }
});

//Remove the red background after the animation ends
$("body").on("animationend", () => {
    $("body").removeClass("wrong");
});

$("#speed").on('change',(e) => {
    faster = e.target.checked;
});

$("#difficulty").on('change',(e) => {
    harder = e.target.checked;
});

//#endregion

//#region Helper Functions

function generateNextSequence(){
    userClickedPattern = [];
    $("#level").text(`Level ${++level}`);

    // Generate random number between 0-3
    var randomNumber = Math.floor(Math.random() * 4);

    //Add random color to the pattern
    gamePattern.push(buttonColors[randomNumber]);

    //Animate and play sound for the chosen color
    for (let index = (harder ? gamePattern.length - 1 : 0); index < gamePattern.length; index++) {
        const color = gamePattern[index];
        setTimeout(() => {
            playSound(color)
                effectPress(`.${color}`);
        }, (600 / (faster ? 3 : 1))* index);
    }

    iteration = 0;
}

//Plays corresponding sound
function playSound(cube){
    var soundToPlay = sounds[cube].cloneNode(); //Cloned so that sound can overlap
    soundToPlay.play();
}

//Effect for button press
function effectPress(color){
    $(color).toggleClass("pressed");
    setTimeout(() => $(color).toggleClass("pressed"), 200);
}

function preLoadSounds(){
    buttonColors.forEach((name) =>{
    //loading sounds so no delay when page loads
    sounds[name] = new Audio(`./sounds/${name}.mp3`);
    });
    sounds["wrong"] = new Audio(`./sounds/wrong.mp3`);
}

//#endregion

preLoadSounds();