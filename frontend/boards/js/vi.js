document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const cells = [];

    let currentPlayer = 'x';

    function checkWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let line of lines) {
            const [a, b, c] = line;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return cells[a];
            }
        }

        return cells.includes('') ? null : 'draw';
    }

    function handleClick(index) {
        if (cells[index] || checkWinner()) return;

        cells[index] = currentPlayer;

        const cell = document.createElement('div');
        cell.classList.add('cell', currentPlayer);
        cell.innerHTML = `<span>${currentPlayer.toUpperCase()}</span>`;

        board.replaceChild(cell, board.children[index]);

        const winner = checkWinner();
        if (winner) {
            setTimeout(() => {
                alert(winner === 'draw' ? 'Det blev oavgjort!' : `Spelare ${winner.toUpperCase()} vinner!`);
                resetBoard();
            }, 100);
        }

        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }

    function resetBoard() {
        cells.length = 0;
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            cells.push('');
            const cell = document.createElement('div');
            cell.classList.add('cell');
            board.appendChild(cell);
            cell.addEventListener('click', function() { handleClick(i) }); 
        }
    }

    resetBoard();
});