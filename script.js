const wordElement = document.querySelector("#word");
const incorrectLettersElement = document.querySelector("#incorrect-letters");
const popup = document.querySelector("#popup-container");
const notificationContainer = document.querySelector("#notification-container");
const errorContainer = document.querySelector("#error-container");
const winMessage = document.querySelector("#win-message");
const playAgainButton = document.querySelector("#play-again-button");

const figureParts = document.querySelectorAll(".figure-part");

const words = [
	"vulpine",
	"nordic",
	"translucent",
	"indefatigable",
	"curry",
	"love",
	"pasta",
	"veranda",
	"aquatic",
	"magnetism",
];

let state = {
	answer: words[Math.floor(Math.random() * 10)],
	guessedLetters: [],
	correctLetters: [],
};

/* Choose random word and populate the correct number of characters */
const setWord = (word, letterArray) => {
	// Reset innerHTML
	wordElement.innerHTML = "";

	// Map letters from answer to DOM elements
	const letters = word.split("").map((letter) => {
		// Create new div for letter
		const letterDiv = document.createElement("div");
		letterDiv.classList.add("letter");

		// Check whether user has guessed a correct letter
		if (letterArray.includes(letter)) {
			letterDiv.innerHTML = letter;
		} else {
			letterDiv.innerHTML = "";
		}

		// Add letter to guess
		wordElement.appendChild(letterDiv);
	});
	checkForWin();
};

// Check current correctLetters against answer
const checkForWin = () => {
	console.log(new Set(state.answer), new Set(state.correctLetters));
	if (
		state.correctLetters.length !== 0 &&
		equalSets(new Set(state.answer), new Set(state.correctLetters))
	) {
		popup.style.display = "flex";
	}
};

// Set initial word at start
setWord(state.answer, state.guessedLetters);

/* Set blank state on game restart */
const resetGame = () => {
	state.answer = words[Math.floor(Math.random() * 10)];
	state.guessedLetters = [];
	state.correctLetters = [];
	popup.style.display = "none";
	setWord(state.answer, state.guessedLetters);
};

const handleKeyDown = (event) => {
	// Check that letter is alphabetic
	if (!/^[a-zA-Z]{1}$/.test(event.key)) {
		errorContainer.classList.toggle("show");
		setTimeout(() => {
			errorContainer.classList.toggle("show");
		}, 750);
		return null;
	}
	// Chekc if letter has already been guessed
	if (state.guessedLetters.includes(event.key)) {
		// If so, show notification
		notificationContainer.classList.toggle("show");
		setTimeout(() => {
			notificationContainer.classList.toggle("show");
		}, 750);
		return null;
	} else {
		// Add to list of guessed letters
		state.guessedLetters.push(event.key);
		// If correct, add to correctLetters
		if (state.answer.includes(event.key)) {
			state.correctLetters.push(event.key);
		}
		// Update word on page
		setWord(state.answer, state.guessedLetters);
		// Record as correct letter in state
	}
};

// Check if
const equalSets = (set1, set2) => {
	return (
		set1.size === set2.size &&
		[...set1].every((value) => (set2) => b.has(value))
	);
};

/* Event listeners */

window.addEventListener("keydown", handleKeyDown);
playAgainButton.addEventListener("click", resetGame);
