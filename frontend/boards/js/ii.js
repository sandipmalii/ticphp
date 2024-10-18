let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function handlePlayerTurn(clickedCellIndex) {
  if (gameBoard[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  gameBoard[clickedCellIndex] = currentPlayer;
  checkForWinOrDraw();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function cellClicked(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.id.replace("cell-", "")) - 1;
  if (gameBoard[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  handlePlayerTurn(clickedCellIndex);
  updateUI();
}

const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
  cell.addEventListener("click", cellClicked, false);
});

function updateUI() {
  cells.forEach((cell, i) => {
    cell.className = "cell"; // Reset the class to default 'cell'

    if (gameBoard[i] === "X" || gameBoard[i] === "O") {
      cell.classList.add(gameBoard[i]);
    }
  });
}

function announceWinner(player) {
  const messageElement = document.getElementById("gameMessage");
  if (player == "X") {
    messageElement.innerText = `ARMY Wins!`;
  } else {
    messageElement.innerText = `BTS Wins!`;
  }
}
function announceDraw() {
  const messageElement = document.getElementById("gameMessage");
  messageElement.innerText = "Game Draw!";
}

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkForWinOrDraw() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    announceWinner(currentPlayer);
    gameActive = false;
    return;
  }

  let roundDraw = !gameBoard.includes("");
  if (roundDraw) {
    announceDraw();
    gameActive = false;
    return;
  }
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.className = "cell";
  });
  document.getElementById("gameMessage").innerText = "";
}

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetGame, false);
