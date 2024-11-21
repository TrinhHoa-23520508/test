var started = false;
var buttonColors = ["red", "green", "blue", "yellow"];
var randomChosenColor;
var userChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}
$(document).keypress(function () {
  if (!started) {
    started = true;
    nextSequence();
  }
});
$(".btn").click(function () {
  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
}
function animateWrong() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
}
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("successfull!");
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    wrong();
  }
}
function wrong() {
  animateWrong();
  playSound("wrong");
  started = false;
  $("h1").text("Game Over, Press Any Key to Restart");
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
$(document).click(function () {
  if (!started) {
    started = true;
    nextSequence();
  }
});
