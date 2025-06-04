
  const submitBtn = document.getElementById('submit');
  const player1Input = document.getElementById('player-1');
  const player2Input = document.getElementById('player-2');
  const playerForm = document.getElementById('player-form');
  const gameContent = document.getElementById('game-content');
  const gameBoard = document.getElementById('game-board');
  const messageDiv = document.querySelector('.message');

  let player1, player2;
  let currentPlayer;
  let boardState = Array(9).fill(null); // null means empty cell
  let gameActive = false;

  submitBtn.addEventListener('click', () => {
    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();

    if (!player1 || !player2) {
      alert('Please enter names for both players.');
      return;
    }

    startGame();
  });

  function startGame() {
    playerForm.style.display = 'none';
    gameContent.style.display = 'block';
    currentPlayer = player1;
    boardState = Array(9).fill(null);
    gameActive = true;

    messageDiv.textContent = `${currentPlayer}, you're up!`;

    // Clear any existing cells
    gameBoard.innerHTML = '';

    // Create cells
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.id = i + 1; // id 1 to 9
      cell.addEventListener('click', () => cellClicked(i));
      gameBoard.appendChild(cell);
    }
  }

  function cellClicked(index) {
    if (!gameActive || boardState[index] !== null) return;

    // Mark the cell with current player's symbol
    boardState[index] = currentPlayer === player1 ? 'X' : 'O';

    const cell = document.getElementById(index + 1);
    cell.textContent = boardState[index];
    cell.classList.add('disabled');

    // Check for win or draw
    if (checkWin()) {
      messageDiv.textContent = `${currentPlayer} congratulations you won!`;
      gameActive = false;
      return;
    }

    if (boardState.every(cell => cell !== null)) {
      messageDiv.textContent = `It's a draw!`;
      gameActive = false;
      return;
    }

    // Switch player
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
  }

  function checkWin() {
    // Winning combinations by indices
    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // cols
      [0,4,8], [2,4,6]           // diagonals
    ];

    return winPatterns.some(pattern => {
      const [a,b,c] = pattern;
      return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
  }
