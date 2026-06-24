function lifeInWeeks(age) {

    var target = 90;
    var days = (target - age) * 365;
    var weeks = (target - age) * 52;
    var months = (target - age) * 12;
    
    console.log("You have " + days + " days, " + weeks + " weeks, and " + months + " months left.");
}

lifeInWeeks(27);