let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function makeMove(index) {
    if (gameOver || board[index] !== '') return;

    board[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].textContent = currentPlayer;
    
    if (checkWin()) {
        document.getElementById('result').textContent = `Le joueur ${currentPlayer} gagne !`;
        gameOver = true;
    } else if (board.every(cell => cell !== '')) {
        document.getElementById('result').textContent = 'Match nul !';
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function resetBoard() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
        cell.textContent = '';
    }
    document.getElementById('result').textContent = '';
}

resetBoard();
