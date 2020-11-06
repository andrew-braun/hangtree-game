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

// state.lettersToGuess = new Set("hi"),
const resetGame = () => {
	state.answer = words[Math.floor(Math.random() * 10)];
	state.guessedLetters = [];
	state.correctLetters = [];
	popup.style.display = "none";
	setWord(state.answer, state.guessedLetters);
};

/* Choose random word */
const setWord = (word, letterArray) => {
	wordElement.innerHTML = "";
	const letters = word.split("").map((letter) => {
		const letterDiv = document.createElement("div");
		letterDiv.classList.add("letter");
		if (letterArray.includes(letter)) {
			letterDiv.innerHTML = letter;
			state.correctLetters.push(letter);
		} else {
			letterDiv.innerHTML = "";
		}
		wordElement.appendChild(letterDiv);
	});
	if (
		state.correctLetters.length !== 0 &&
		equalSets(new Set(word), new Set(state.correctLetters))
	) {
		popup.style.display = "flex";
	}
};

setWord(state.answer, state.guessedLetters);

const handleKeyDown = (event) => {
	if (!/^[a-zA-Z]{1}$/.test(event.key)) {
		errorContainer.classList.toggle("show");
		setTimeout(() => {
			errorContainer.classList.toggle("show");
		}, 750);
		return null;
	}
	if (state.guessedLetters.includes(event.key)) {
		notificationContainer.classList.toggle("show");
		setTimeout(() => {
			notificationContainer.classList.toggle("show");
		}, 750);
	} else {
		state.guessedLetters.push(event.key);
		setWord(state.answer, state.guessedLetters);
	}
};

const equalSets = (set1, set2) => {
	return (
		set1.size === set2.size &&
		[...set1].every((value) => (set2) => b.has(value))
	);
};

/* Event listeners */

window.addEventListener("keydown", handleKeyDown);
playAgainButton.addEventListener("click", resetGame);
