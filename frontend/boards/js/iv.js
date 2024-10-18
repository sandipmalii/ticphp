const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let computerPlayer = 'O';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameBoard[cellIndex] !== '' || !gameActive) return;

    makeMove(cellIndex, currentPlayer);

    if (checkWinner(gameBoard) === currentPlayer) {
        message.textContent = 'You win!';
        gameActive = false;
    } else if (gameBoard.includes('')) {
        currentPlayer = 'X';
        setTimeout(computerMove, 500); // Delay the computer's move for a better user experience
    } else {
        message.textContent = 'It\'s a draw!';
        gameActive = false;
    }
}

function computerMove() {
    const emptyCells = gameBoard.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    if (emptyCells.length > 0) {
        const bestMove = getBestMove();
        makeMove(bestMove, computerPlayer);
    }

    if (checkWinner(gameBoard) === computerPlayer) {
        message.textContent = 'Computer wins!';
        gameActive = false;
    } else if (!gameBoard.includes('')) {
        message.textContent = 'It\'s a draw!';
        gameActive = false;
    }
}

function getBestMove() {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = computerPlayer;
            let score = minimax(gameBoard, 0, false);
            gameBoard[i] = '';

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

function minimax(board, depth, isMaximizing) {
    const scores = {
        X: -1,
        O: 1,
        draw: 0
    };

    let result = checkWinner(board);
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = computerPlayer;
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = currentPlayer;
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner(board) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    if (board.includes('')) {
        return null;
    } else {
        return 'draw';
    }
}

function makeMove(index, player) {
    gameBoard[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add(player);
}

function handleResetClick() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = 'You are X, it\'s your turn';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetClick);