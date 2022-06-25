var gamePattern = [];

var level = 0;
var gameStarted = false;

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (currentLevel === gamePattern.length - 1) {
            setTimeout(function () {
                userClickedPattern.length = 0;
                nextSequence()
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    gameStarted = true;
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);

    console.log(buttonColours[randomNumber]);

    randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);
}

function handler() {
    userChosenColour = this.id;

    playSound(userChosenColour);
    animatePress(userChosenColour);

    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    checkAnswer(userClickedPattern.lastIndexOf(userChosenColour))
}

$(document).on("keypress", function () {
    if (!gameStarted) {
        setTimeout(function () {
            nextSequence();
        }, 500);
    }
});

$(".btn").click(handler);