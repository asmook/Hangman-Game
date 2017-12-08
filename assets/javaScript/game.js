// 1) create an array of potential words
var hangmanWords = ["slipper", "gloves", "coat", "snow", "blanket", "soup", "apple-cider", "cuddle", "hot-chocolate", "fire", "christmas", "family"];

// 2) select a random word from the array above 
// hint -- use Math.floor and Math.random to randomly select one
var numWords = hangmanWords.length;
var selectedNumber = Math.floor(Math.random()*numWords);

// 3) set the selected word to a variable (like selectedWord)
var selectedWord = hangmanWords[selectedNumber];

// 4) use the length of the selectedWord to create a NEW variable
// BUT this new variable will instead be a string of the same length
// but with all blanks...
// so, if your selectedWord is "Kittens", you would want your 
// lettersAndBlanks string to be "_ _ _ _ _ _ _"
// you'll probably need to .split both selectedWord and lettersAndBlanks
// into arrays


//initalize the letters and blanks variable. loop through- the letters of the selected word. making a copy of 
//the selected word filling in underscores instead of the actual letters and also keeping dashes in their appropriate location.
//!= means not equal
var lettersAndBlanks = "";
for (var i = 0; i <= selectedWord.length - 1; i++) {
	if (selectedWord[i] != "-") {
		lettersAndBlanks = lettersAndBlanks + "_";
	}
	else
	{
		lettersAndBlanks = lettersAndBlanks + "-";
	}
}
//initaizing the variables for selected word array. selectedword.split means splitting the selected word into individual characters. 
// initalizing lettersandblanks array. lettersandblanks.split means essentially splitting the underscores and dasshes
var selectedWordArray = selectedWord.split("");
var lettersAndBlanksArray = lettersAndBlanks.split("");


//this function resets the game for the next round after a win or lose.
function reset() {
	//get the number of words in the hangman array
	numWords = hangmanWords.length;
	//selecting a random position in the array. m.r giving us a number between 0 & 1. it multiplies by number of words to give us a number 
	//between 0 &11.99999. math.floor chops off the random decimal so we have an actual number from the array 
	selectedNumber = Math.floor(Math.random()*numWords);
	//setting our variable to whatever the random number was out of that array. selected number established on the above line of code
	selectedWord = hangmanWords[selectedNumber];
	//
	//initalize the letters and blanks variable. loop through- the letters of the selected word. making a copy of 
	//the selected word filling in underscores instead of the actual letters and also keeping dashes in their appropriate location.
	//!= means not equal
	lettersAndBlanks = "";
	for (var i = 0; i <= selectedWord.length - 1; i++) {
		if (selectedWord[i] != '-') {
			lettersAndBlanks = lettersAndBlanks + "_";
		}
		else
		{
			lettersAndBlanks = lettersAndBlanks + "-";
		}
	}
	////initaizing the variables for selected word array. selectedword.split means splitting the selected word into individual characters. 
// initalizing lettersandblanks array. lettersandblanks.split means essentially splitting the underscores and dasshes
	selectedWordArray = selectedWord.split("");
	lettersAndBlanksArray = lettersAndBlanks.split("");
	//reset the guess remaining counter for a new round
	incorrectGuessesRemaining = 10
	//for every bad letter guessed, its put into an array to be displayed. this always reset to an empty array upon each new game
	incorrectGuesses = [];
}
// 5) when the user guesses a letter, you loop through the selectedWord
// and see if the letter exists in there... if it does, you replace the
// relevant lettersAndBlanks spaces with the correct letters
//just initalizing some shit
var incorrectGuessesRemaining = 10
var letterFound = false;
var incorrectLetterFound = false;
var incorrectGuesses = [];
var winOrLose = "";
var wins = 0;
var losses = 0;

//when any key is pressed, it will run through this evnt 
window.addEventListener("keypress", function (event) {
	//meh-idk
	if (event.defaultPrevented) {
		return; // Do nothing if the event was already processed
	}
	//just usng actual letter keys for the game. 
	if (event.key >= "a" & event.key <= "z") {
		//for every letter in our selected word array, we will run through this for loop once. c(for loop) o(for loop) a(for loop) t(for loop)-
		//side note, this runs through the words backwards. i is equal to length of the word minus 1. i is redeuced (decremented) aka fucking subtracted by one... 
		//evry time the loop runs. ie i--
		for (var i = selectedWordArray.length - 1; i >= 0; i--) {
			//if the key pressed represtents the current letter were looking at in the word,  
			if (event.key == selectedWordArray[i]) {
				//then the letters will be revealed
				lettersAndBlanksArray[i] = selectedWordArray[i];
				//combing the characters to put in the string
				lettersAndBlanks = lettersAndBlanksArray.join("");
				//yeah bitch, you found the letters in this selected word.
				letterFound = true;

			}
		}
		//if the key pressed is NOT any of the letters in the word
		if (letterFound == false) {
			//then runs this for loop to see if the user has incorrectly already guessed this letter
			for (var i = incorrectGuesses.length - 1; i >= 0; i--) {
				if (event.key == incorrectGuesses[i]) {
					incorrectLetterFound = true;
				}
			}
			//if the user hasnt alredy guessed that letter incorrctly, 
			if (incorrectLetterFound == false) {
				//then decrement from number of guesses remaining
				incorrectGuessesRemaining -= 1;
				//recording the incorrect key press (adds one value to the end of the array)
				incorrectGuesses.push(event.key);
			}
			//reset so that way the logic works as intended, the next time through the event. it runs through this entire function 
			//every time we press a key
			incorrectLetterFound = false;
		}//see last cooment ""
		letterFound = false;
	
		//if user reveals every letter...
		if (lettersAndBlanks == selectedWord) {
			winOrLose = "win"
			wins += 1;
			reset();
		}
		//if no moer guesses are availiable, lose
		if (incorrectGuessesRemaining == 0){
			winOrLose = "lose"
			losses += 1;
			reset();
		}
	}
	
	// Cancel the default action to avoid it being handled twice
	//meh-idk
	event.preventDefault();
}, true);
	// the last option dispatches the event to the listener first,
	// then dispatches event to window


// example --- if user guesses 't'
//"Kittens"
//"_ _ t t _ _ _"

// try something like this 
//if (selectedWord[i] === letterGuessed) {
//	lettersAndBlanks[i] = letterGuessed; 
	// this is what adds the correctly guessed letters to the lettersAndBlanks array
//}

// 6) each time a user guesses an incorrect letter, subtract one from their available guess count

// 7) at the end of every "round" (so basically, after each time a user guesses and you either subtract
// an available guess OR you update the lettersAndBlanks array with the correctly-guessed letter) 
// after the round ends, check to see if the user is out of available guesses --- THEN THEY LOSE
// OR check to see if selectedWord === lettersAndBlanks --- THEN THEY WIN
// OR if neither of those is true, then they get another guess

// 8) IF they either win or lose, then you'd want to increment the win or loss count and reset