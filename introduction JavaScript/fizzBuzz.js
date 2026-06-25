var output = [];

output.length = 30;

function fizzBuzz() {
    var a = 1;

    if(a % 3 == 0){
        output.push("Fizz");
    }
    if(a % 5 == 0){
        output.push("Buzz");
    }
    console.log(output.push(a));
}

fizzBuzz();