//your JS code here. If required.
document.getElementById('submit').addEventListener('click', startGame);

let player1, player2, currentPlayer, gameBoard, gameOver;

function startGame() {
    player1 = document.getElementById('player-1').value;
    player2 = document.getElementById('player-2').value;

    // Check for empty player names
    if (!player1 || !player2) {
        alert("Please enter names for both players.");
        return;
    }

    // Hide input section and show game board
    document.querySelector('.input-section').style.display = 'none';
    document.querySelector('.board').style.display = 'grid';

    currentPlayer = player1; // Start with player1
    gameBoard = Array(9).fill(null); // 9 empty cells
    gameOver = false;

    // Display the first player's turn
    document.querySelector('.message').textContent = `${currentPlayer}, you're up!`;

    // Add event listeners to each cell
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
}

function handleClick(event) {
    const cellId = event.target.id;
    
    if (gameBoard[cellId - 1] || gameOver) return; // If the cell is already filled or game is over, do nothing

    // Mark the cell with the current player's symbol (X or O)
    gameBoard[cellId - 1] = currentPlayer === player1 ? 'X' : 'O';
    event.target.textContent = currentPlayer === player1 ? 'X' : 'O';

    // Check for a winner
    if (checkWinner()) {
        document.querySelector('.message').textContent = `${currentPlayer} congratulations you won!`;
        gameOver = true;
        return;
    }

    // Check for a draw (no empty cells left)
    if (gameBoard.every(cell => cell)) {
        document.querySelector('.message').textContent = "It's a draw!";
        gameOver = true;
        return;
    }

    // Switch players
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    document.querySelector('.message').textContent = `${currentPlayer}, you're up!`;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6], // Diagonal 2
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}
