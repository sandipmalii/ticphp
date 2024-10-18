// Define bot difficulty levels
const Difficulty = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
};

// Set default bot difficulty to easy
let botDifficulty = Difficulty.EASY;

// Function to make bot move
const botMove = () => {
    let availableMoves = [];
    boxes.forEach((box, index) => {
        if (box.innerText === '') {
            availableMoves.push(index);
        }
    });

    // Select a move based on difficulty level
    let selectedMove;
    switch (botDifficulty) {
        case Difficulty.EASY:
            selectedMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            break;
        case Difficulty.MEDIUM:
            selectedMove = mediumLevelMove(availableMoves);
            break;
        case Difficulty.HARD:
            selectedMove = hardLevelMove(availableMoves);
            break;
        default:
            selectedMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    // Simulate bot click on selected box
    simulateBotMove(selectedMove);
};

const mediumLevelMove = (availableMoves) => {
    // Check if there's a winning move for the opponent and block it
    for (let pattern of winningPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if ((pos1Val === "O" && pos2Val === "O" && pos3Val === "") ||
            (pos1Val === "O" && pos2Val === "" && pos3Val === "O") ||
            (pos1Val === "" && pos2Val === "O" && pos3Val === "O")) {
            // Block the winning move
            for (let move of availableMoves) {
                if (pattern.includes(move)) {
                    return move;
                }
            }
        }
    }
    
    // If there's no immediate threat, make a random move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

const hardLevelMove = (availableMoves) => {
    let bestScore = -Infinity;
    let bestMove;

    const alpha = -Infinity;
    const beta = Infinity;

    const maximize = (depth, alpha, beta) => {
        let result = checkWinner();
        if (result !== null) {
            return result === "X" ? 10 - depth : depth - 10;
        }
        if (availableMoves.length === 0) {
            return 0;
        }

        let maxScore = -Infinity;
        for (let move of availableMoves) {
            // Simulate the move
            boxes[move].innerText = "X";
            let score = minimize(depth + 1, alpha, beta);
            // Undo the move
            boxes[move].innerText = "";
            maxScore = Math.max(maxScore, score);
            alpha = Math.max(alpha, score);
            if (beta <= alpha) {
                break;
            }
        }
        return maxScore;
    };

    const minimize = (depth, alpha, beta) => {
        let result = checkWinner();
        if (result !== null) {
            return result === "X" ? 10 - depth : depth - 10;
        }
        if (availableMoves.length === 0) {
            return 0;
        }

        let minScore = Infinity;
        for (let move of availableMoves) {
            // Simulate the move
            boxes[move].innerText = "O";
            let score = maximize(depth + 1, alpha, beta);
            // Undo the move
            boxes[move].innerText = "";
            minScore = Math.min(minScore, score);
            beta = Math.min(beta, score);
            if (beta <= alpha) {
                break;
            }
        }
        return minScore;
    };

    for (let move of availableMoves) {
        // Simulate the move
        boxes[move].innerText = "X";
        let score = minimize(0, alpha, beta);
        // Undo the move
        boxes[move].innerText = "";
        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
        alpha = Math.max(alpha, score);
    }

    return bestMove;
};


const simulateBotMove = (selectedMove) => {
    boxes[selectedMove].innerText = "X";
    boxes[selectedMove].style.color = "#f2120a";
    boxes[selectedMove].disabled = true;
    boxes[selectedMove].style.backgroundColor = "#dbdbdb";
    checkWinner(); // Check for winner after bot's move
};

// Modify box click event listener to include bot move
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const newBtn = document.querySelector("#new-game");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
let count = 0;
const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === '') {
            count++;
            box.innerText = "O";
            box.style.color = "blue";
            box.disabled = true;
            box.style.backgroundColor = "#dbdbdb";
            checkWinner(); // Check for winner after player's move
            if (!checkWinner()) {
                setTimeout(botMove, 500); // Delay bot move by 500 milliseconds to ensure the player's move is properly updated
            }
        }
    });
});

resetBtn.addEventListener("click", () => {
    enableBoxes();
});

newBtn.addEventListener("click", () => {
    enableBoxes();
    msgContainer.classList.add("hide");
    resetBtn.style.display = "inline";
});

const checkWinner = () => {
    checkDraw();
    for (let pattern of winningPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                boxes[pattern[0]].style.backgroundColor = "greenyellow";
                boxes[pattern[1]].style.backgroundColor = "greenyellow";
                boxes[pattern[2]].style.backgroundColor = "greenyellow";
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations!\n${winner} Won`;
    msgContainer.classList.remove("hide");
    resetBtn.style.display = "none";
    disableBoxes();
};

const checkDraw = () => {
    if (count === 9) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        resetBtn.style.display = "none";
        disableBoxes();
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "white";
        count = 0;
    }
};
