var firstRandomNumber = Math.floor((Math.random() * 6) + 1);
var randomDiceImage = "dice" + firstRandomNumber + ".png";
var randomImageSource = "images/" + randomDiceImage;
var image1 = document.querySelectorAll("img")[0];
image1.setAttribute("src", randomImageSource);

var secondRandomNumber = Math.floor((Math.random() * 6) + 1);
var randomDiceImage2 = "dice" + secondRandomNumber + ".png";
var randomImageSource2 = "images/" + randomDiceImage2;
var image2 = document.querySelectorAll("img")[1];
image2.setAttribute("src", randomImageSource2);

if (firstRandomNumber > secondRandomNumber) {
    document.querySelector("h1").innerHTML = "🏆 Player 1 Wins!";
} else if (secondRandomNumber > firstRandomNumber) {
    document.querySelector("h1").innerHTML = "Player 2 Wins! 🏆";
} else {
    document.querySelector("h1").innerHTML = "Draw! ▄︻デ══━一💥";
}
