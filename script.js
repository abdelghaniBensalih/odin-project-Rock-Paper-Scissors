const choices = document.querySelectorAll('.choice');
const resultDiv = document.getElementById('result');
const finalResultDiv = document.getElementById('final-result');
const playerScoreSpan = document.getElementById('player-score');
const computerScoreSpan = document.getElementById('computer-score');
const resetButton = document.getElementById('reset');

let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        if (roundsPlayed < 5) {
            const playerSelection = choice.id;
            const computerSelection = getComputerChoice();
            const result = playRound(playerSelection, computerSelection);
            resultDiv.textContent = result;
            updateScore(result);
            roundsPlayed++;
            if (roundsPlayed === 5) {
                displayFinalResult();
            }
        }
    });
});

resetButton.addEventListener('click', resetGame);

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomChoice = choices[Math.floor(Math.random() * 3)];
    return randomChoice;
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "It's a draw!";
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        playerScore++;
        return `You Win! ${capitalize(playerSelection)} beats ${computerSelection}.`;
    } else {
        computerScore++;
        return `You Lose! ${capitalize(computerSelection)} beats ${playerSelection}.`;
    }
}

function updateScore(result) {
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
}

function displayFinalResult() {
    if (playerScore > computerScore) {
        finalResultDiv.textContent = "Congratulations! You win the game!";
        finalResultDiv.className = "winner";
    } else if (playerScore < computerScore) {
        finalResultDiv.textContent = "Oh no! You lost the game!";
        finalResultDiv.className = "loser";
    } else {
        finalResultDiv.textContent = "It's a draw! Well played!";
        finalResultDiv.className = "";
    }
    resetButton.style.display = "block";
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundsPlayed = 0;
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
    resultDiv.textContent = '';
    finalResultDiv.textContent = '';
    resetButton.style.display = "none";
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
