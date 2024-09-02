const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

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

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (board[cellIndex] !== '' || isGameOver) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkForWinner()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        isGameOver = true;
        highlightWinningCells();
    } else if (board.includes('')) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    } else {
        statusText.textContent = `It's a draw!`;
        isGameOver = true;
    }
}

function checkForWinner() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            highlightCells([a, b, c]);
            return true;
        }
        return false;
    });
}

function highlightCells(cellsToHighlight) {
    cellsToHighlight.forEach(index => {
        cells[index].style.backgroundColor = '#27ae60';
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameOver = false;
    currentPlayer = 'X';
    statusText.textContent = `Player X's turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#34495e';
    });
}
