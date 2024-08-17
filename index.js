let random = generateRandomNumber(); // Generate a random number between 1 and 100
const userInput = document.querySelector("#guessField");
const submit = document.querySelector("#subt");
const previousGuess = document.querySelector(".guesses");
const remainingGuess = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const resultParas = document.querySelector(".resultParas");
const newGameButton = document.querySelector(".newgame");

let prevGuesses = [];
let numGuesses = 1;
let playGame = true;

submit.addEventListener("click", function(e) {
    e.preventDefault();
    if (playGame) {
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    }
});

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        displayMessage("Please enter a valid number");
    } else if (guess < 1 || guess > 100) {
        displayMessage("Please enter a number between 1 and 100");
    } else {
        prevGuesses.push(guess);
        if (numGuesses === 10) {
            displayGuess(guess);
            displayMessage(`Game over! The number was ${random}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess < random) {
        displayMessage("Your guess is too low");
    } else if (guess > random) {
        displayMessage("Your guess is too high");
    } else {
        displayMessage("Congratulations! You guessed the correct number");
        endGame();
    }
}

function displayGuess(guess) {
    userInput.value = "";
    previousGuess.innerHTML += `${guess} `;
    numGuesses++;
    remainingGuess.innerHTML = `${10 - numGuesses + 1}`;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = "";
    userInput.setAttribute("disabled", "true");
    const newGameButtonElem = document.createElement("button");
    newGameButtonElem.classList.add("button");
    newGameButtonElem.innerHTML = `<h2>Start New Game</h2>`;
    resultParas.appendChild(newGameButtonElem);

    newGameButtonElem.addEventListener("click", () => {
        resultParas.removeChild(newGameButtonElem);
        startNewGame();
    });
}

function startNewGame() {
    random = generateRandomNumber();
    prevGuesses = [];
    numGuesses = 1;
    previousGuess.innerHTML = "";
    remainingGuess.innerHTML = `${10 - numGuesses + 1}`;
    userInput.removeAttribute("disabled");
    playGame = true;
}
