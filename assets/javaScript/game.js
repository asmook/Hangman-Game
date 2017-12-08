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
var lettersAndBlanks = "";
for (var i = selectedWord.length - 1; i >= 0; i--) {
	lettersAndBlanks = lettersAndBlanks + "_"
}

var selectedWordArray = selectedWord.split("");
var lettersAndBlanksArray

function reset() {
	numWords = hangmanWords.length;
	selectedNumber = Math.floor(Math.random()*numWords);
	selectedWord = hangmanWords[selectedNumber];

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

	selectedWordArray = selectedWord.split("");
	lettersAndBlanksArray = lettersAndBlanks.split("");
	incorrectGuessesRemaining = 10
	letterFound = false;
	incorrectLetterFound = false;
	incorrectGuesses = [];
}
// 5) when the user guesses a letter, you loop through the selectedWord
// and see if the letter exists in there... if it does, you replace the
// relevant lettersAndBlanks spaces with the correct letters

var incorrectGuessesRemaining = 10
var letterFound = false;
var incorrectLetterFound = false;
var incorrectGuesses = [];
var winOrLose = "";
var wins = 0;
var losses = 0;

window.addEventListener("keypress", function (event) {
	if (event.defaultPrevented) {
		return; // Do nothing if the event was already processed
	}

	if (event.key >= "a" & event.key <= "z") {
		for (var i = selectedWordArray.length - 1; i >= 0; i--) {
			if (event.key == selectedWordArray[i]) {
				lettersAndBlanksArray[i] = selectedWordArray[i];
				lettersAndBlanks = lettersAndBlanksArray.join("");
				letterFound = true;
			}
		}

		if (letterFound == false) {
			for (var i = incorrectGuesses.length - 1; i >= 0; i--) {
				if (event.key == incorrectGuesses[i]) {
					incorrectLetterFound = true;
				}
			}
			if (incorrectLetterFound == false) {
				incorrectGuessesRemaining -= 1;
				incorrectGuesses.push(event.key);
			}
			incorrectLetterFound = false;
		}
		letterFound = false;
	
		if (lettersAndBlanks == selectedWord) {
			winOrLose = "win"
			wins += 1;
			reset();
		}
		if (incorrectGuessesRemaining == 0){
			winOrLose = "lose"
			losses += 1;
			reset();
		}
	}
	
	// Cancel the default action to avoid it being handled twice
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