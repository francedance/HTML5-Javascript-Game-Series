//Game variables
var jokerX = Math.floor(Math.random() * 354);
var jokerY = 20;
var guessX = 0;
var guessY = 0;
var shotsRemaining = 8;
var shotsMade = 0;
var gameState = "";
var gameWon = false;

//The game objects
var batman = document.querySelector("#batman");
var joker = document.querySelector("#joker");
var batarang = document.querySelector("#batarang");
var bang = document.querySelector("#bang");

//The input and output fields
var inputX = document.querySelector("#inputX");
var inputY = document.querySelector("#inputY");
var output = document.querySelector("#output");

//The button
var button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);

//Listen for enter key presses
window.addEventListener("keydown", keydownHandler, false);

function clickHandler()
{
  validateInput();
}

function keydownHandler(event)
{
  if(event.keyCode === 13)
  {
    validateInput();
  }
}

function validateInput()
{
  guessX = parseInt(inputX.value);
  guessY = parseInt(inputY.value);
  
  if(isNaN(guessX) || isNaN(guessY) )
  {
    output.innerHTML = "Please enter a number.";
  }
  else if(guessX > 399 || guessY > 399)
  {
    output.innerHTML = "Please enter a number less than 400.";
  }
  else
  {
    playGame();
  }
}

function render()
{
  //Position the joker
  joker.style.left = jokerX + "px";
  joker.style.top = jokerY + "px";
  
  //Position the cannon
  batman.style.left = guessX + "px";
  
  //Position the missile
  batarang.style.left = guessX + "px";
  batarang.style.top = guessY + "px";
  
  //display the explosion and hide the 
  //joker if it's been destroyed
  if(gameWon)
  {
    //Display the explosion
    bang.style.display = "block";
    bang.style.left = jokerX + "px";
    bang.style.top = jokerY + "px";
    
    //Hide the joker
    joker.style.display = "none";
    
    //Hide the missile
    batarang.style.display = "none";
  }
}


function playGame()
{
  shotsRemaining = shotsRemaining - 1;
  shotsMade = shotsMade + 1;
  gameState 
    = " Shots: " + shotsMade + ", Remaining: " + shotsRemaining;
  
  //Find out whether the player's x and y guesses are inside
  //The joker's area
  
  if(guessX >= jokerX && guessX <= jokerX + 50)
  {
     //Yes, it's within the X range, so now let's
     //check the Y range
     
     if(guessY >= jokerY  && guessY <= jokerY + 50)
     {
       //It's in both the X and Y range, so it's a hit!
       gameWon = true;
       endGame();
     }
  }
  else
  {
    output.innerHTML = "Miss!" + "<br>" + gameState;
    
    //Check for the end of the game
    if (shotsRemaining < 1)
    {
      endGame();
    }
  }
  
  //Update the joker's position if the
  //game hasn't yet been won
  
  if(!gameWon)
  {
    //Update the joker's X position
    jokerX = Math.floor(Math.random() * 354);
    
    //Add 30 to the new Y position so that
    //the joker moves down
    jokerY += 40;
  } 
  
  //Render the new game state
  render();
  console.log("X: " + jokerX);
  console.log("Y: " + jokerY);
}

function endGame()
{
  if(gameWon)
  {
    output.innerHTML
      = "Hit! You saved the Gotham City!" + "<br>" 
      + "It only took you " + shotsMade + " shots.";
  }
  else
  {
    output.innerHTML
      = "You lost!" + "<br>" 
      + "Hahahahahahahaha!";
  }
  
  //Disable the button
  button.removeEventListener("click", clickHandler, false);
  button.disabled = true;
  
  //Disable the enter key
  window.removeEventListener("keydown", keydownHandler, false);
  
  //Disable the input fields
  inputX.disabled = true;
  inputY.disabled = true;
}