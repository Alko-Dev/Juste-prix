const prizes = [
  "girafe",
  "vélo",
  "mug",
  "télévision (cathodique)",
  "pc portable",
  "voiture thermique sans essence",
  "babouche usée",
  "un chien qui hoche la tête sur la plage arrière de la voiture",
  "1 million de pesos philippins (PHP)"
];

let targetNumber;
let attemptsLeft;
let gameOver = false;

const messagesElement = document.getElementById("messages");
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const resultElement = document.getElementById("result");
const cardElement = document.getElementById("card");
const restartButton = document.getElementById("restartButton");

function startGame() {
  targetNumber = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = 7;
  gameOver = false;
  messagesElement.textContent = "Devinez le nombre entre 1 et 100. Il vous reste " + attemptsLeft + " essais.";
  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;
  resultElement.style.display = "none";
  guessInput.focus();
}

function showMessage(message) {
  messagesElement.textContent = message;
}

function showResult(isWin) {
  gameOver = true;
  guessInput.disabled = true;
  guessButton.disabled = true;
  resultElement.style.display = "block";
  cardElement.classList.remove("hidden");

  if (isWin) {
      const prize = prizes[Math.floor(Math.random() * prizes.length)];
      cardElement.textContent = "Gagné ! Vous remportez : " + prize;
  } else {
      cardElement.textContent = "Perdu ! Le nombre était : " + targetNumber;
  }
}

function checkGuess() {
  if (gameOver) return;

  const guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < 1 || guess > 100) {
      showMessage("Veuillez entrer un nombre entre 1 et 100.");
      return;
  }

  attemptsLeft--;

  if (guess === targetNumber) {
      showResult(true);
  } else if (attemptsLeft === 0) {
      showResult(false);
  } else if (guess < targetNumber) {
      showMessage("Le nombre à deviner est plus grand. Il vous reste " + attemptsLeft + " essais.");
  } else {
      showMessage("Le nombre à deviner est plus petit. Il vous reste " + attemptsLeft + " essais.");
  }
}

function restartGame() {
  startGame();
}

guessButton.addEventListener("click", checkGuess);
guessInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
      checkGuess();
  }
});
restartButton.addEventListener("click", restartGame);

startGame();