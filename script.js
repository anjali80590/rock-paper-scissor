// Initialize player and computer scores, and the round count
let playerScore = 0;
let computerScore = 0;
let rounds = 0;

// Get references to various DOM elements
const choiceButtons = document.querySelectorAll(".choice-button"); // Game choice buttons
const resultDiv = document.getElementById("result"); // Result message display
const playAgainButton = document.getElementById("play-again"); // Play again button
const nextRoundButton = document.getElementById("next-round"); // Next round button
const replayButton = document.getElementById("replay"); // Replay button
const scoreDiv = document.querySelectorAll(".game-score span"); // Score display
const playerChoiceText = document.getElementById("player-choice-text"); // Player's choice text
const computerChoiceText = document.getElementById("computer-choice-text"); // Computer's choice text
const playerChoiceImg = document.getElementById("player-choice-img"); // Player's choice image
const computerChoiceImg = document.getElementById("computer-choice-img"); // Computer's choice image
const choicesDiv = document.getElementById("choices"); // Container for choices

// Function to show game rules
function showRules() {
  const rulesPopup = document.getElementById("rules-popup");
  rulesPopup.style.display = "block";
}

// Function to close game rules popup
function closeRules() {
  const rulesPopup = document.getElementById("rules-popup");
  rulesPopup.style.display = "none";
}

// Event listeners for choice buttons
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (rounds < 5) {
      // Get player's choice and generate a random computer choice
      const playerChoice = button.id;
      const computerChoice = computerPlay();

      // Update choice display and determine the winner of the round
      playerChoiceText.textContent = playerChoice;
      computerChoiceText.textContent = computerChoice;
      playerChoiceImg.src =  "./images/" +playerChoice + ".png";
      computerChoiceImg.src = "./images/"+computerChoice + ".png";
      displayResult(playerChoice, computerChoice);

      

      // Show the choices and increment the round count
      choicesDiv.classList.remove("hidden");
      rounds++;

      // After 5 rounds, show appropriate buttons based on the winner
      if (rounds === 5) {
        if (playerScore > computerScore) {
          nextRoundButton.style.display = "block";
          replayButton.style.display = "none";
          playAgainButton.style.display = "none";
        } else if (computerScore > playerScore) {
          replayButton.style.display = "block";
          nextRoundButton.style.display = "none";
          playAgainButton.style.display = "none";
        } else {
          replayButton.style.display = "block";
          nextRoundButton.style.display = "none";
          playAgainButton.style.display = "none";
        }
      }
    }
  });
});

// Event listener for the "Play Again" button
playAgainButton.addEventListener("click", () => {
  if (rounds < 5) {
    // Show choice buttons and hide other elements
    choiceButtons.forEach((btn) => {
      btn.classList.remove("hidden");
    });
    choicesDiv.classList.add("hidden");
    playAgainButton.classList.add("hidden");
    nextRoundButton.classList.add("hidden");
    replayButton.classList.add("hidden");
    resultDiv.textContent = "";
  }
});

// Event listener for the "Next Round" button
nextRoundButton.addEventListener("click", () => {
  // Reset round count and hide buttons and result message
  rounds = 0;
  nextRoundButton.style.display = "none";
  replayButton.style.display = "none";
  choiceButtons.forEach((btn) => {
    btn.classList.remove("hidden");
  });
  choicesDiv.classList.add("hidden");
  playAgainButton.classList.add("hidden");
  replayButton.classList.add("hidden");
  resultDiv.textContent = "";
});

// Event listener for the "Replay" button
replayButton.addEventListener("click", () => {
  // Refresh the page to start the game again
  location.reload();
});

// Function to generate computer's choice
function computerPlay() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Function to display the result of the round
function displayResult(playerChoice, computerChoice) {
  const winner = determineWinner(playerChoice, computerChoice);

  // Hide choice buttons and display the result message
  choiceButtons.forEach((btn) => {
    btn.classList.add("hidden");
  });

  // Determine and display the result message
  const resultMessage = winner === "Tie" ? "It's a Tie!" : `${winner} wins!`;
  resultDiv.textContent = resultMessage;

  // Update and display the scores
  updateScoreDisplay();

  // After 5 rounds, show appropriate buttons based on the winner
  if (rounds === 5) {
    if (playerScore > computerScore) {
      nextRoundButton.style.display = "block";
      replayButton.style.display = "none";
    } else if (computerScore > playerScore) {
      replayButton.style.display = "block";
      nextRoundButton.style.display = "none";
    } else {
      replayButton.style.display = "block";
      nextRoundButton.style.display = "none";
    }
  }

  // Show the "Play Again" button
  playAgainButton.classList.remove("hidden");
}

// Function to determine the winner of the round
function determineWinner(playerChoice, computerChoice) {
  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    playerScore++;
    return "Player";
  } else if (playerChoice === computerChoice) {
    return "Tie";
  } else {
    computerScore++;
    return "Computer";
  }
}

// Function to update the score display
function updateScoreDisplay() {
  scoreDiv[0].textContent = playerScore;
  scoreDiv[1].textContent = computerScore;
}

