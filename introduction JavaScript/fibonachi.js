function fibonacciGenerator (n) {
//Do NOT change any of the code above 👆
    
    if(n === 1){return [0];}
    if(n === 2){return [0, 1];}
    
    var arr = [0, 1];
    
    for( var i = 2; i < n; i++){
        
        var nextNum = arr[i -1] + arr[i - 2];
        
        arr.push(nextNum);
    }
    
    console.log(arr);
   
}


fibonacciGenerator (5);
