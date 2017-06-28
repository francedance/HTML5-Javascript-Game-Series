//contains all the logics of the game

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


//The arrow
var arrow = document.querySelector("#arrow");

function render()
{
  //Position the arrow
  //Multipy the players guess by 3 to get the
  //corrent pixel position on the scale
  if(playersGuess > 99){
	  //if guess is greater than 99 , don't render arrow position (out of scale bound)
	  return false
  }else {
  arrow.style.left = playersGuess * 6 + "px"; 
  }
  // width of scale = 600px, to place an arrow in a right position, ex: guess = 10 , need to tell arrow to point at 60px
}

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
  
  if(playersGuess > 99) {
	output.innerHTML = "That's not a number between 0 and 99. Try again!" //in case a player inputs number out of 0-99 range hahaha who would? but in case..
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
  
   //Update the graphic display
  render();
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

	
