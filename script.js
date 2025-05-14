//your JS code here. If required.
let currentPlayer = 'player1';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let player1Name = '';
let player2Name = '';

document.getElementById('submit').addEventListener('click', () => {
    player1Name = document.getElementById('player-1').value || 'Player 1';
    player2Name = document.getElementById('player-2').value || 'Player 2';

    if (!player1Name || !player2Name) {
        alert("Please enter names for both players.");
        return;
    }

    document.getElementById('playerNames').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';

    document.querySelector('.message').textContent = `${player1Name}, you're up!`;

    // Set up click events for cells
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
});

function handleCellClick(event) {
    const cellIndex = event.target.id - 1;

    // If the cell is already taken, don't do anything
    if (gameBoard[cellIndex] !== '') return;

    // Mark the cell with X or O depending on the current player
    gameBoard[cellIndex] = currentPlayer === 'player1' ? 'X' : 'O';
    event.target.textContent = currentPlayer === 'player1' ? 'X' : 'O';

    // Check for a winner
    if (checkWinner()) {
        document.querySelector('.message').textContent = `${currentPlayer === 'player1' ? player1Name : player2Name}, congratulations you won!`;
        document.querySelectorAll('.cell').forEach(cell => {
            cell.removeEventListener('click', handleCellClick);
        });
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
        document.querySelector('.message').textContent = `${currentPlayer === 'player1' ? player1Name : player2Name}, you're up!`;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}
