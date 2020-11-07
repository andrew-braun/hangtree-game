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

// Set initial game state
let answer = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let correctLetters = [];
let incorrectLetters = [];

/* Choose random word and populate the correct number of characters */
const setWord = () => {
	// Reset innerHTML
	wordElement.innerHTML = "";

	// Map letters from answer to DOM elements
	wordElement.innerHTML = `
		${answer
			.split("")
			.map(
				(letter) => `
				<span class="letter">
					${correctLetters.includes(letter) ? letter : ""}
				</span>
				`
			)
			.join("")}
		`;
	checkForWin();
};

const setIncorrectLetters = () => {
	// Reset innerHTML
	incorrectLettersElement.innerHTML = "";

	// Map letters from answer to DOM elements
	incorrectLettersElement.innerHTML = `
			${incorrectLetters
				.map(
					(letter) => `
					<span class="letter">
						${letter}
					</span>
					`
				)
				.join("")}
			`;
};

/* Function to check if two sets are equal 
Used in checkForWin function */
const equalSets = (set1, set2) => {
	return (
		set1.size === set2.size &&
		[...set1].every((value) => (set2) => b.has(value))
	);
};

/* Displays an error prompting user to 
choose an alphabetic character */
const showNonAlphaError = () => {
	errorContainer.classList.toggle("show");
	setTimeout(() => {
		errorContainer.classList.toggle("show");
	}, 750);
};

/* Displays an error telling user that they've
already guessed this letter */
const showAlreadyGuessedError = () => {
	notificationContainer.classList.toggle("show");
	setTimeout(() => {
		notificationContainer.classList.toggle("show");
	}, 750);
};

/* Updates the states of the letter lists */
const updateLetters = (letter) => {
	// Add to list of guessed letters
	guessedLetters.push(letter);
	// If correct, add to correctLetters; else add to incorrectLetters
	const correctLetter = answer.includes(letter);

	if (correctLetter) {
		correctLetters.push(letter);
	} else if (!correctLetter) {
		incorrectLetters.push(letter);
		setIncorrectLetters();
	}

	// Update word on page
	setWord();
};

// Check current correctLetters against answer
const checkForWin = () => {
	if (
		correctLetters.length !== 0 &&
		equalSets(new Set(answer), new Set(correctLetters))
	) {
		popup.style.display = "flex";
	}
};

/* Set blank state on game restart */
const resetGame = () => {
	answer = words[Math.floor(Math.random() * 10)];
	guessedLetters = [];
	correctLetters = [];
	incorrectLetters = [];
	popup.style.display = "none";
	setWord();
	setIncorrectLetters();
};

const handleKeyDown = (event) => {
	const key = event.key;
	// Check that letter is alphabetic
	if (!/^[a-zA-Z]{1}$/.test(key)) {
		showNonAlphaError();
		// Break after error
		return null;
	}
	// Check if letter has already been guessed
	if (guessedLetters.includes(key)) {
		// If so, show notification
		showAlreadyGuessedError();
		// Break after error
		return null;
	} else {
		// Update the guessed, correct, and incorrect letter lists
		updateLetters(key);
	}
};

// Set initial word at start
setWord();

/* Event listeners */

window.addEventListener("keydown", handleKeyDown);
playAgainButton.addEventListener("click", resetGame);
