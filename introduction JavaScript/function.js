function getMilk(money){
    console.log("step by step instuctions");
    var botl = 30;

    var numberOfBotl = Math.floor(money /  botl);

    var cost = money - (botl * numberOfBotl)

    console.log("I got " + money+ " rs. " + "one bootle is for " + botl + " rs. so i bring " +  numberOfBotl + " bottels with change rs " + cost + ".");
}

getMilk(100);
