const playerX = document.getElementById('player-x');
const playerO = document.getElementById('player-o');
const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const checkWin = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]            
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return null;
};

const checkDraw = () => !gameBoard.includes('');

const handleGameOver = (winner) => {
    gameActive = false;
    if (winner) {
        messageElement.textContent = `Player ${winner} win!`;
    } else {
        messageElement.textContent = "Draw!";
    }
};

const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageElement.textContent = `Player's move ${currentPlayer}`;
};

const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', event.target.textContent);
};

const handleDragOver = (event) => {
    event.preventDefault();
    if (gameActive && !event.target.textContent && event.target.classList.contains('cell')) {
        event.target.classList.add('drag-over');
    }
};

const handleDragLeave = (event) => {
    if (event.target.classList.contains('cell')) {
        event.target.classList.remove('drag-over');
    }
};

const handleDrop = (event) => {
    event.preventDefault();
    if (gameActive && !event.target.textContent && event.target.classList.contains('cell')) {
        const droppedPiece = event.dataTransfer.getData('text/plain');
        const cellIndex = parseInt(event.target.dataset.index);

        if (droppedPiece === currentPlayer) {
            gameBoard[cellIndex] = currentPlayer;
            event.target.textContent = currentPlayer;
            event.target.classList.remove('drag-over');

            const winner = checkWin();
            if (winner) {
                handleGameOver(winner);
            } else if (checkDraw()) {
                handleGameOver(null);
            } else {
                switchPlayer();
            }
        }
    }
};

playerX.addEventListener('dragstart', handleDragStart);
playerO.addEventListener('dragstart', handleDragStart);

cells.forEach(cell => {
    cell.addEventListener('dragover', handleDragOver);
    cell.addEventListener('dragleave', handleDragLeave);
    cell.addEventListener('drop', handleDrop);
});

resetButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    messageElement.textContent = `Player's move ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('drag-over');
    });
});

messageElement.textContent = `Player's move ${currentPlayer}`;