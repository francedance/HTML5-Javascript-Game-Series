//contains all the logics of game

//Game variables
var mysteryNumber = Math.floor(Math.random() * 100); //Random number generating.
var playersGuess = 0; //control variable to count player's guess 
console.log(mysteryNumber); 

var guessesRemaining = 10; //Player gets only 10 chances to guess the number
var guessesMade = 0; //Player's current guess count
var gameState = "";
var gameWon = false; //Boolean value for "false" = player lose , "true" = player wins

//The input and output fields
var input = document.querySelector("#input"); //used to obtain values from input
var output = document.querySelector("#output");

//The button
var button = document.querySelector("button");
button.style.cursor = "pointer"; //changing curso to pointer when hover
button.addEventListener("click", clickHandler, false); //event listener for clicking the button

//Listen for enter key presses
window.addEventListener("keydown", keydownHandler, false); //event listener for keydown 


function keydownHandler(event)
{
  if(event.keyCode === 13) // 13 = ASCII for 'Enter' 
  {
    validateInput(); // calling validateInput function
  }
}

function clickHandler()
{
  validateInput(); // calling validateInput function
  
}

function validateInput()
{
  playersGuess = parseInt(input.value); //parsing number from player's input
  console.log(playersGuess);
  
  //If you're worried about infinity, use this:
  //!isNaN(playersGuess) && isFinite(playersGuess);
  if(isNaN(playersGuess)) //checking to make sure input is only a number
  {
    output.innerHTML = "Please enter a number."; //message to tell player to enter a number
  }
  else
  {
    playGame(); //starting a game
  }
}

function playGame()
{
  guessesRemaining = guessesRemaining - 1; 
  guessesMade = guessesMade + 1;
  gameState 
    = " Guess: " + guessesMade 
    + ", Remaining: " + guessesRemaining;
 
  playersGuess = parseInt(input.value);

  if(playersGuess > mysteryNumber)
  {
    output.innerHTML = "That's too high." + gameState;
    
    //Check for the end of the game
    if (guessesRemaining < 1)
    {
      endGame();
    }
  }
  else if(playersGuess < mysteryNumber)
  {
    output.innerHTML = "That's too low." + gameState;
    
    //Check for the end of the game
    if (guessesRemaining < 1)
    {
      endGame();
    }
  }
  else if(playersGuess === mysteryNumber)
  {
    gameWon = true;
    endGame();
  }
}

function endGame()
{
  if (gameWon)
  {
    output.innerHTML
      = "Yes, it's " + mysteryNumber + "!" + "<br>" 
      + "It only took you " + guessesMade + " guesses.";
  }
  else
  {
    output.innerHTML
      = "No more guesses left!" + "<br>" 
      + "The number was: " + mysteryNumber + ".";
  }
  
  //Disable the button
  button.removeEventListener("click", clickHandler, false);
  button.disabled = true;
  
  //Disable the enter key
  window.removeEventListener("keydown", keydownHandler, false);
  
  //Disable the input field
  input.disabled = true;
}

	
