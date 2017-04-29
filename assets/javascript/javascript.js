//Game sequence:
        //1.Hangman is a game which will display a dash array of a secrect word.
        //2.Player will guess a secret word with the same number of dash array of that secret word.
        //3.Player will press a key for that the secret word. 
        //4.If the guess is correct, the alphabet will replace the dash field.
        //5.If the guess is incorrect, the alphabet will display on another field.
             //5.1 Player should have 10 options to miss the guess.
             //5.2 If the player guess incorrectly, guess options will countdoun by 1.
             //5.3 If the guess options countdown to 0, the game is over.
             //5.4 A meesage will display.
             //5.6 Player should have the option to play again.
        //6. All guessed letters will display in one field.
        //7.If all dash array field is filled by alphabet, Player wins the game.
        //8.If the player wins the game, a meesage will display on the sceen.
        //9. Player can play again.
        //End

//Begin:
      
//To create a hangman object.

var hangman = {
  guessWord: "",   //Empty array for guessing word.
  targetArray: [],   //Empty array for the secret word
  targetDiv: "",      //A '-' array to be displayed

  wins: 0,           //Counter, if the player finds the word, counter will be incremented by 1.
  guessesLeft: 10,   //Another counter for incorrect guess.
  guessLetter: "", //Empty array for incorrect guess.
  
  
  correctGuessCounter: 0, //Counter for guess the correct letter in secret word

//Secret word library.
  secretWord: ["awesome", "orange", "gaffe", 'liberty', 'commits', "tweak", "pet", "fail", "lucky", "habit", "guts", "vow", "eat", "chair", "floral", "instance", "amazing", "tune", "nobel", "awful"] ,

//To pick a secret word from secret Word library array
  toGenSecretWord: function() {
    var randomNumber = Math.floor(Math.random() * (this.secretWord.length - 1));
    hangman.guessWord = hangman.secretWord[randomNumber];
  },

//Picked secret word to be placed in the empty targetArray and to be splitted into letters srting
  toGenTargetArray: function() {
    hangman.targetArray = hangman.guessWord.split("");
  },



//To create an element with a class targetDiv where "-" string will display as same size of target array. 
  toGenGuessDiv: function() {
    for (var i = 0; i < hangman.targetArray.length; i++) {
      if (hangman.targetArray[i] === "-") {
          hangman.targetDiv += "<div class='targetDiv'>" + "-" + "</div>";
      }
      else {
          this.targetDiv += "<div class='targetDiv'>" + "_" + "</div>";
      }
    }
  },

//To create new elements in  html page 
  toUpdateHTML: function() {
    var html =
    "<div>Wins: " + hangman.wins + "</div>" +
    "<div>Remaining Guess: " + hangman.guessesLeft + "</div>" +
    "<div>Guessed Letters: " + hangman.guessLetter + "</div>" + "<div>Guess a word equal to the dashes below.</div>";
    document.querySelector("#createPara").innerHTML = html;
  },


//Refreshing game for play 
//Refresh to pick a secret word for play
//Refresh to generate an array for secret word
//Refreshing target array
// Initializes HTML again
  toResetHangman: function () {
    this.correctGuessCounter = 0;
    this.guessLetter = "";
    this.targetDiv = "";
    this.guessesLeft = 10;
    this.toGenSecretWord();  
    this.toGenTargetArray(); 
    this.toGenGuessDiv();    
    this.toUpdateHTML(); 

    var newDiv = this.targetDiv;
    document.querySelector("#displayGuessed").innerHTML = newDiv;
  },

};

hangman.toGenSecretWord();  //Prepares the data for guess.  
hangman.toGenTargetArray(); //Generates the target array 
hangman.toGenGuessDiv();    //Creates the guess div, with the underscores.
hangman.toUpdateHTML();     // Initializes HTML

var newDiv = hangman.targetDiv;
document.querySelector("#displayGuessed").innerHTML = newDiv;
hangman.toUpdateHTML();




//var userGuess;
//Main process for User key actions:
//To set a counter and initiaizes with 0
//If user misses a guess, counter will be incremented by 1.
//Determines key and convert into lower case
//Open source music
//To allow the user to enter a guess letter once
//No repetition
//If the guess is correct,
//Play music
//correctGuessCounter will add by 1.
//All guess letter will be counted
//Guessed letter will be printed 
//if the guess ic incorrect
//If correct guess will match secret word, win counter add one and pop up alert message
// Guesses left will countdown up to 0 and guessed letter will be counted.
// When all guess becomes 0, alert pop up and reset game automatically
var userGuess;
document.onkeyup = function(event) {
    var counter = 0;
    userGuess = String.fromCharCode(event.keyCode).toLowerCase(); 
    var newPara = document.getElementsByClassName("targetDiv");
    var music = new Audio("assets/music/bensound-anewbeginning.mp3");

    if (hangman.guessLetter.indexOf(userGuess) < 0) {
      for (var i = 0; i < hangman.targetArray.length;  i++) {
      if (userGuess === hangman.targetArray[i]) {
        music.play();
        hangman.correctGuessCounter++;
        hangman.guessLetter += userGuess;
        newPara[i].innerHTML = userGuess; 
      } else {
        counter++;
        hangman.toUpdateHTML();
      }
     

    if (hangman.correctGuessCounter === hangman.targetArray.length ) {
        hangman.wins++;
        alert("Your won! Play again!!");
        hangman.toResetHangman();
      }
    }
  }
      hangman.toUpdateHTML();
      if (counter > 0 ) {
        hangman.guessesLeft -= 1;
      }
    hangman.toUpdateHTML();
      
    if (hangman.guessesLeft === 0) {
        alert("You lost, try again!");
        hangman.toResetHangman();
      }
};
  
  


