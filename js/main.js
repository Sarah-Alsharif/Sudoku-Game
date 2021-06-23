// variables
const countTimer = document.getElementById("countTimer");
const start = document.getElementById("start");
const choseEasy = document.getElementById("easy");
const choseMedium = document.getElementById("medium");
const choseHard = document.getElementById("hard");
const mistakes = document.getElementById("Mistakes-numbers");
const animate_1 = document.querySelector(".animate-1");
const gameBoard = document.querySelector(".game-board");
const divNumbers = document.querySelector(".game-number");
const pNumber = document.querySelectorAll(".number");
const eraser = document.querySelector(".eraser");
const result = document.querySelector(".result-p");

var numberSelected , boxSelected; //store number and box selected.
var mistak , disableStatus;  // store number of mistak , the status of select
var randomNum, board , boardolution;
var timer , startSecound;

/* ************************************* */
const choses = {
    easy : [
        [
            "-4---71--53--9--7---7-6-94-4-6-8-751-1----69--53-1---296--3--1-37--51---1--2-9367",
            "649527138531894276827163945496382751218475693753916482962738514374651829185249367"],
        [
            "14---2-8-25-34--9--795-1462-3-9-----58162----69--3-15----26-5-88-4--3-7---58742--",
            "146792385258346791379581462437915826581627934692438157713269548824153679965874213"],

        [
            "694-3-1--8127---963--19-----3-9-46----8613-49--62----14-35----85---2-7--26---8415",
            "694832157812745396357196284135984672728613549946257831473561928581429763269378415"]

         ] ,

    medium :  [
         [
            "2--395-1--7--2-34--3-7-1-8----53-1-435--7-----14-----3-6-4-72--1----64-7--795---1",
            "248395716571628349936741582682539174359174628714862953863417295195286437427953861"],
  
         [
            "------9-42-1--6-----83-1625-32615-9--46---3----543----58-1-32-9------57--2--9--38",
            "76325891425194678349837162583261549794678235117543986258716324931982457662459738"],

        [
            "-4-9-18----9----438-63---1--87---3---2---8-546--1329-7-65-4-19-4--8-9-6-------4-2",
            "543921876219687543876354219987465321321798654654132987765243198432819765198576432"]

         ] ,

        
    hard :  [
        [
            "957-1-------2-71-----8--537--8------5-4-7-3-8--9-2-----4--9---3--14---7-----8-42-",
            "957613284483257196612849537178364952524971368369528741845792613291436875736185429"],
        [
            "--6---5-37----8-4----3-97---6--37--148-----76-73-6-------7-4---3-4-8-------5---84",
            "846172593739658142521349768962837451485921376173465829298714635354286917617593284"],

        [
            "---524-9-89-------7-49--3--5---49-7-2---7---5----5-6---4---8--9--7-----2-1-29-4--",
            "136524798895367124724981356583649271261873945479152683642718539957436812318295467"]

         ] ,  
}

/* ************************************* */

// click to start game
start.addEventListener("click" , startGame);
 
function startGame(){
 clearTimeout(timer); // first clear the timer 
 startSecound = 300;
 timer = setInterval(updateTimer , 1000); // update the timer
 animate_1.classList.remove("hide");
 divNumbers.classList.remove("hide");
 randomNum = Math.floor(Math.random() * 3);

    // chose difficulty
 if(choseEasy.checked){
  board = choses.easy[randomNum][0];
 }
 else if(choseMedium.checked){
  board = choses.medium[randomNum][0];
 }
 else{
  board = choses.hard[randomNum][0]
 }
 createBoard(board);  
}

/* ************************************* */

// create a board
function createBoard(board){
  removePoard();
     // crate a boxses
 for(let i=0; i<81; i++){
     var newPox = document.createElement("p");
     newPox.setAttribute(`id` , `${i}`);
     newPox.setAttribute("class" , "small-boxs");
    
     if(board.charAt(i) != "-"){
         newPox.innerHTML = `${board.charAt(i)}`;
     }
     else{
         // add EventListener for each empty boxs , check for "select class" and update the boxSelected
       newPox.addEventListener("click", function(){
            if(!disableStatus){ 
            for(let j=0; j<81; j++){
               document.querySelectorAll(".small-boxs")[j].classList.remove("select")
           }
           this.classList.add("select")
           boxSelected = this;
          // console.log(`this is boxSelected ${boxSelected.id}`);
           update();
            }
       })  
     }
     var boxId = newPox.id;
     createBorder(newPox, boxId);
     gameBoard.appendChild(newPox);  
       
     }
 }

/* ************************************* */

// remove previous board
function removePoard(){
    var boxes = document.querySelectorAll(".small-boxs");
    for(let i=0; i<boxes.length; i++){
      boxes[i].remove();
    }

    // claer the value stored it numberSelected and boxSelected.
    numberSelected = null;
    boxSelected = null;
    disableStatus = false; // if the disableStatus false the player canselect the number and box
    mistak = 0; // clear the mistak back it to 0;
    mistakes.innerHTML = mistak; 
    result.innerHTML = ""; // clear the result in the pagr
   
}

/* ************************************* */

// create border-Bottom and border-Right
function createBorder(newPox, boxId){
    if((boxId >=18 && boxId < 27) || (boxId>=45 && boxId<54)){
        newPox.style.borderBottom = "4px solid black";
    }
    if(boxId == 2 || boxId == 5 || boxId == 11 || boxId == 14 || boxId== 20 || boxId== 23
      || boxId == 29 || boxId == 32 || boxId == 38 ||boxId == 41 || boxId == 47 || boxId == 50 
      ||boxId == 56 || boxId== 59 || boxId == 65 ||boxId  == 68 || boxId == 74 || boxId == 77 ){
        newPox.style.borderRight = "4px solid black";
    }
}

/* ************************************* */

// loop through the number and give it id
for(let i=0; i<pNumber.length; i++){
    //console.log(pNumber[i])
    pNumber[i].setAttribute(`id` , `${i}`);
    numberEvent(pNumber , i);
}

// add  EventListener for each number
function numberEvent(pNumber , i){
  pNumber[i].addEventListener("click" , function(){
       
      if(!disableStatus){
      for(let j=0; j<pNumber.length; j++){
          pNumber[j].classList.remove("select");
      }
      this.classList.add("select");
      numberSelected = this;

    }     
  })
}

/* ************************************* */

// update timer
function updateTimer(){
    var minutis = Math.floor(startSecound / 60);
    if(minutis < 10){
        minutis = "0"+ minutis;
    }
    var secounds = startSecound % 60;
    if(secounds < 10){
        secounds = "0"+ secounds;
    }

    countTimer.innerHTML = `${minutis}:${secounds}`;
    startSecound --;

    if(startSecound == -1){
        clearInterval(timer);
        gameResult();
    }  
}
/* ************************************* */


// update text content in box
function update(){
    if(choseEasy.checked){
        boardolution = choses.easy[randomNum][1];
       }
       else if(choseMedium.checked){
        boardolution = choses.medium[randomNum][1];
       }
       else{
        boardolution = choses.hard[randomNum][1]
       }

    if(boxSelected != null && numberSelected != null){
        boxSelected.innerHTML = numberSelected.textContent;
        checkanswer();
    }
}

/* ************************************* */

// check if the answer is true or false
function checkanswer(){
 if(boardolution.charAt(boxSelected.id) == boxSelected.textContent){
    reset("blue");
    if(gameDone()){ // if it true , call the gameResult to print the result
        gameResult();
    }   
 }

 else{
    reset("red")
     mistak ++;
     mistakes.innerHTML = mistak; 
     if(mistak == 5){ // if mistak = 5 , lose the game call the gameResult to print the result
        clearInterval(timer);
        gameResult();
    }
 }
}

/* *************************************** */

// update color in box , remove select class
function reset(color){
     boxSelected.style.color = color;
     numberSelected.classList.remove("select");
     numberSelected = null;
}

/* *************************************** */

// check if all box is not empty; and return true
function gameDone(){
 var boxs = document.querySelectorAll(".small-boxs");
 for(let i=0; i<boxs.length; i++){
     if(boxs[i].textContent === ""){
             return false;
     }   
 }
    return true; 
}

/* *************************************** */

// update the disableStatus to true so the palyer can't select any number or box.
// check if the player lose or win an update the result in page.
function gameResult(){
   
    disableStatus = true;
    if(mistak == 5 || startSecound == -1 ){
      //  boxSelected.classList.remove("select");
        result.innerHTML = "You are lose";
        result.style.color = "red";
         //console.log("you lose");
    }
    else{
        clearInterval(timer);
     //   boxSelected.classList.remove("select");
        result.innerHTML = "You are win";
        result.style.color = "#23c323";
       //console.log("you lose");
    }  
}

/* *************************************** */

// add event for eraser
eraser.addEventListener("click" , function(){
    if(!disableStatus){
        if(boxSelected){
    boxSelected.textContent = ""; 
    boxSelected.classList.remove("select");
        }
    }
})

/* *************************************** */


