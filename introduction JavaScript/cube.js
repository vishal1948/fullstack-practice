// This is the problem I got troubled one day .
//    this is the solution for the cube beeper 5*5 and 8*8 without error.


function main(){
   //your code here
   printToRight();
   printToLeft();
   printToRight();
   printToLeft();
   
   if(leftIsBlocked()){
      while(frontIsClear()){
         putBeeper();
         move();
      }
      putBeeper();
   }else{
      printToRight();
      printToLeft();
      printToRight();
      
      while(frontIsClear()){
         move();
      }
      
      turnRight();
      turnRight();
      
      while(frontIsClear()){
         putBeeper();
         move();
      }
      putBeeper();
      
      
      
   }
  
   
}

function printToRight(){
   while(frontIsClear()){
      
      putBeeper();
      move();
   }
   if(frontIsBlocked()){
       putBeeper();
      turnLeft();
      move();
      turnLeft();
   }
}

function printToLeft(){
   while(frontIsClear()){
      putBeeper();
      move();
   }
   putBeeper();
   turnRight();
   move();
   turnRight();
}