const wordElement = document.querySelector("#word");
const incorrectLettersElement = document.querySelector("#incorrect-letters");
const popup = document.querySelector("#popup-container");
const notificationContainer = document.querySelector("#notification-container");
const errorContainer = document.querySelector("#error-container");
const winMessage = document.querySelector("#win-message");
const playAgainButton = document.querySelector("#play-again-button");

const figureParts = document.querySelectorAll(".figure-part");

// Get words from WordsAPI

async function setUp() {
	// Fetch random word from API
	const response = await fetch(
		`https://shadow-rain-api-proxy.herokuapp.com/words/?lettersMax=10&partOfSpeech=noun&letterPattern=&^[A-Za-z]+$&random=true`
	);
	const data = await response.json();
	const word = await data.word;

	// Set the answer variable to the word
	await setAnswer(word);

	// Set up the word in the DOM
	await setWord();

	return word;
}

// Set initial game state
let answer = "";
let guessedLetters = [];
let correctLetters = [];
let incorrectLetters = [];

/* Set answer variable to word from async fetch request */
function setAnswer(word) {
	answer = word;
}

/* Set the word in the DOM based on guesses so far */
function setWord() {
	// Reset innerHTML
	wordElement.innerHTML = "";

	// Map letters from answer to DOM elements
	wordElement.innerHTML = `
		${answer
			.split("")
			.map((letter) =>
				letter === " " || letter === "-"
					? `<span class="non-letter"> </span>`
					: `
				<span class="letter">
					${correctLetters.includes(letter) ? letter : ""}
				</span>
				`
			)
			.join("")}
		`;

	// Check to see if rendered word is a win
	checkForWin();
}

// Update the incorrect guesses in the DOM
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
	addStrokes();
	checkForLoss();
};

/* Update the states of the letter lists */
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

/* Check for win condition: all letters in answer also in correctLetters */
const checkForWin = () => {
	if (
		correctLetters.length !== 0 &&
		equalSets(new Set(answer.replace(/\s|-/, "")), new Set(correctLetters))
	) {
		winMessage.innerText = "Victory!";
		popup.style.display = "flex";
	}
};

/* Check for loss condition: incorrectLetters = numOfStrokes */
const checkForLoss = () => {
	if (incorrectLetters.length === figureParts.length) {
		winMessage.innerText = "Defeat!";
		popup.style.display = "flex";
	}
};

// Add strokes
const addStrokes = () => {
	figureParts.forEach((part, index) => {
		const incorrectCount = incorrectLetters.length;
		if (index < incorrectCount) {
			part.style.display = "block";
		} else {
			part.style.display = "none";
		}
	});
};

/* Set blank state on game restart */
const resetGame = () => {
	answer = "";
	guessedLetters = [];
	correctLetters = [];
	incorrectLetters = [];
	popup.style.display = "none";
	figureParts.forEach((part) => (part.style.display = "none"));
	setUp();
	setIncorrectLetters();
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

const handleKeyDown = (event) => {
	const key = event.key.toLowerCase();

	// Check that letter is alphabetic
	if (!/^[a-zA-Z]{1}$/.test(key)) {
		showNonAlphaError();
	}
	// Check if letter has already been guessed
	else if (guessedLetters.includes(key)) {
		// If so, show notification
		showAlreadyGuessedError();
	} else {
		// Update the guessed, correct, and incorrect letter lists
		updateLetters(key);
	}
};

// Set initial word at start
setUp();

/* Event listeners */

window.addEventListener("keydown", handleKeyDown);
playAgainButton.addEventListener("click", resetGame);
