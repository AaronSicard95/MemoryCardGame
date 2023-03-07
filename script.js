const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
let clickedOne = false;
let clickedTwo = false;
let firstGuess;
let secondGuess;
let numGuesses = 0;
let foundMatches = [];
let resetTimer;
let needsReset = false;
let resetScoreButton = document.getElementById("resetGame");
let resetHSButton = document.getElementById("resetHS");
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    divsCreated = true;
  }
}
function giveDivsColors(colorArray){
  let madeCards = gameContainer.children;
  for (let i = 0; i < madeCards.length; i++){
    madeCards[i].classList = colorArray[i];
    console.log(`made card ${i} into ${colorArray[i]}`)
  }
}

function reset(){
  console.log("function ran");
   let cards = document.getElementsByTagName("div");
   for(let i = 0; i < cards.length; i++){
    console.log(i);
    if(!foundMatches.includes(cards[i])){
    cards[i].style.backgroundColor = 'white';
    }
  }
   clickedOne = false;
   clickedTwo = false;
   needsReset = false;
}
function clickedTwoFunc(){
  numGuesses++;
  if(firstGuess.style.backgroundColor == secondGuess.style.backgroundColor){
    document.getElementById("info").innerHTML = `You found a match! </br> Number of Guesses: ${numGuesses}`;
    foundMatches.push(firstGuess);
    foundMatches.push(secondGuess);
  } else{
    document.getElementById("info").innerHTML = `This is not a match. </br> Number of Guesses: ${numGuesses}`;
  }
  if(foundMatches.length >= 10){
    if(Number(localStorage.getItem("highScore")) > numGuesses || localStorage.getItem("highScore") == null){
      localStorage.setItem("highScore", numGuesses.toString());
      setHS();
    }
    needsReset = true;
    resetTimer = setTimeout(resetGame, 2000);
  }else{
  needsReset = true;
  resetTimer = setTimeout(reset, 2000);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if(needsReset == true){
    if(foundMatches.length >= 10){
      resetGame();
      clearTimeout(resetTimer);
    }else{
    reset();
    clearTimeout(resetTimer);
    }
  }
  if((firstGuess != event.target) && (clickedTwo == false)){
    let mydiv = event.target;
    mydiv.style.backgroundColor = mydiv.classList;
    console.log("you just clicked", event.target, mydiv.classList);
    if (clickedOne == false){
      clickedOne = true;
      firstGuess = event.target;
    }else{
      clickedTwo = true;
      secondGuess = event.target;
      clickedTwoFunc();
    }
    }
}

function resetGame(){
  foundMatches = [];
  clickedOne = false;
  clickedTwo = false;
  reset();
  needsReset = false;
  clearTimeout(resetTimer);
  numGuesses = 0;
  document.getElementById("info").innerHTML = "Try to Find Matches!";
  shuffledColors = shuffle(shuffledColors);
  giveDivsColors(shuffledColors);
  
}

function setHS(){
  if(localStorage.getItem("highScore") == null){
    document.getElementById("HSDisplay").innerHTML = `High Score: No High Score`;
  } else{
    document.getElementById("HSDisplay").innerHTML = `High Score: ${localStorage.getItem("highScore")}`;
  }
}
function resetHS(){
  localStorage.removeItem("highScore");
  setHS();
}
setHS();
// when the DOM loads
createDivsForColors(shuffledColors);

resetScoreButton.addEventListener("click", resetGame);
resetHSButton.addEventListener("click", resetHS);