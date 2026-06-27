
var numberOfButton = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfButton; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {

        var buttonInnerHTML = this.innerHTML;

        switch (buttonInnerHTML) {
            case "w":
                var tom1 = new Audio("sounds/tom-1.mp3");
                tom1.play();
            break;

            case "a":
                var tom2 = new Audio("sounds/tom-2.mp3");
                tom2.play();
            break;

            case "s":
                var tom3 = new Audio("sounds/tom-3.mp3");
                tom3.play();
            break;

            case "d":
                var tom4 = new Audio("sounds/tom-4.mp3");
                tom4.play();
            break;

            case "j":
                var crash = new Audio("sounds/crash.mp3");
                crash.play();
            break;  

            case "k":
                var kick = new Audio("sounds/kick-bass.mp3");
                kick.play();
            break;

            case "l":
                var snare = new Audio("sounds/snare.mp3");
                snare.play();
            break;

            default: console.log(buttonInnerHTML);
        }

    });
}

const soundMap = {
    "w": "sounds/tom-1.mp3",
    "a": "sounds/tom-2.mp3",
    "s": "sounds/tom-3.mp3",
    "d": "sounds/tom-4.mp3",
    "j": "sounds/crash.mp3",
    "k": "sounds/kick-bass.mp3",
    "l": "sounds/snare.mp3"
}

document.addEventListener("keypress", function(event) {
    
    const keyPressed = event.key.toLowerCase();
    if (soundMap[keyPressed]) {
        var audio = new Audio(soundMap[keyPressed]);
        audio.play();
    }
});
