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
	console.log(wordElement);
};

// Check if
const equalSets = (set1, set2) => {
	return (
		set1.size === set2.size &&
		[...set1].every((value) => (set2) => b.has(value))
	);
};

// Check current correctLetters against answer
const checkForWin = () => {
	console.log(new Set(answer), new Set(correctLetters));
	if (
		correctLetters.length !== 0 &&
		equalSets(new Set(answer), new Set(correctLetters))
	) {
		popup.style.display = "flex";
	}
};

// Set initial word at start
setWord();

/* Set blank state on game restart */
const resetGame = () => {
	answer = words[Math.floor(Math.random() * 10)];
	guessedLetters = [];
	correctLetters = [];
	popup.style.display = "none";
	setWord(answer, guessedLetters);
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
	if (guessedLetters.includes(event.key)) {
		// If so, show notification
		notificationContainer.classList.toggle("show");
		setTimeout(() => {
			notificationContainer.classList.toggle("show");
		}, 750);
		return null;
	} else {
		// Add to list of guessed letters
		guessedLetters.push(event.key);
		// If correct, add to correctLetters
		if (answer.includes(event.key)) {
			correctLetters.push(event.key);
		}
		// Update word on page
		setWord(answer, guessedLetters);
		// Record as correct letter in state
	}
};

/* Event listeners */

window.addEventListener("keydown", handleKeyDown);
playAgainButton.addEventListener("click", resetGame);
