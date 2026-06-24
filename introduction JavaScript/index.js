// debugger;
var name = prompt("What is your name?");
var initional = name.slice(0, 1).toUpperCase();
var restName = name.slice(1, name.length).toLowerCase();
var newName = initional + restName;
alert("Hello, " + newName);


