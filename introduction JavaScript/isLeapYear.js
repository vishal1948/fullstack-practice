function isLeap(year) {
    
    
    
    if(year %  4 == 0){
        console.log("Leap year." + year);
        if(year % 100 == 0){
            console.log("Not leap year." + year)
            if(year % 400){
                console.log("Leap year." + year);
            }
            
        }
    }else {
        console.log("Not leap year." + year);
    }
}

var a = 2027;
while(a < 2037){
    isLeap(a);
    a++;
}