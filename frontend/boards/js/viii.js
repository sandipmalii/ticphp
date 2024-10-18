let turn = "X";
let board = Array(9).fill(null);
let difficulty = 2;
let winner = null;
let draw = false;
let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function setIaMode(select) {
  difficulty = select;
  resetClick();
}

function onClickButton(button) {
  if (turn === "O" || winner || draw) return;

  mark(button);
}

function mark(button) {
  button.disabled = true;
  const index = parseInt(button.id);
  if (turn === "X") {
    xMark(button, index);
  } else {
    oMark(button, index);
  }
  hasWinner();
  isDraw();
  if (turn === "X" && !winner && !draw) {
    iaMove();
  }
  turn = turn === "X" ? "O" : "X";
}

function xMark(button, index) {
  button.style.backgroundColor = "red";
  button.innerHTML = "X";
  board[index] = "X";
  setFriendlyMessage("Aguarde a IA.");
}

function oMark(button, index) {
  button.style.backgroundColor = "blue";
  button.innerHTML = "O";
  board[index] = "O";
  setFriendlyMessage("Sua vez.");
}

function resetClick() {
  Array.from(document.querySelectorAll(".game-btn")).forEach(function (button) {
    button.style.backgroundColor = "silver";
    button.innerHTML = "";
    button.disabled = false;
  });
  setFriendlyMessage("Começe o jogo");
  board = Array(9).fill(null);
  winner = null;
  draw = false;
  turn = "X";
}

function setFriendlyMessage(message) {
  document.querySelector(".friendly-message").innerHTML = message;
}

function hasWinner() {
  winPatterns.forEach((winPattern) => {
    const [a, b, c] = winPattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      setFriendlyMessage(`"${winner}" Ganhou o jogo`);
    }
  });
}

function isDraw() {
  if (!winner && board.filter((val) => val).length === board.length) {
    setFriendlyMessage("Empatou o jogo");
    draw = true;
  }
}

function iaMove() {
  const buttons = Array.from(document.querySelectorAll(".game-btn"));

  let move = null;
  if (difficulty > 0) move = tryWin();
  if (move === null && difficulty > 1) move = tryBlock();
  if (move === null) move = centerOrRandomMove();

  setTimeout(() => {
    mark(buttons[move]);
  }, 500);
}

function getAvailablePositions() {
  return board.map((val, index) => (val ? null : index)).filter((index) => index !== null);
}

function centerOrRandomMove() {
  const available = getAvailablePositions();

  const centerButton = 4;
  if (available.includes(centerButton)) {
    return centerButton;
  }

  return available[Math.floor(Math.random() * available.length)];
}

function tryWin() {
  const available = getAvailablePositions();
  let winMove = null;
  winPatterns.forEach((winPattern) => {
    const [a, b, c] = winPattern;
    const count = [a, b, c].filter((index) => board[index] === "O").length;
    if (count === 2) {
      winMove = [a, b, c].find((index) => board[index] === null);
    }
  });
  return winMove;
}

function tryBlock() {
  const available = getAvailablePositions();
  let blockMove = null;
  winPatterns.forEach((winPattern) => {
    const [a, b, c] = winPattern;
    const count = [a, b, c].filter((index) => board[index] === "X").length;
    if (count === 2) {
      blockMove = [a, b, c].find((index) => board[index] === null);
    }
  });
  return blockMove;
}
