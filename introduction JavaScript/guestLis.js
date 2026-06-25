var guestList = ["Swapnil", "Shubham", "Vijay", "Aniket"];

var guestName = prompt("What is your name?");

if (guestList.includes(guestName)) {
  console.log("Welcome ");
} else {
  console.log("You are not invited");
}
