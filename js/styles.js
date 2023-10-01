const ball = document.getElementById('ball');
const paddleLeft = document.getElementById('paddle-left');
const paddleRight = document.getElementById('paddle-right');
const playerScore = document.getElementById('player-score');
const opponentScore = document.getElementById('opponent-score');
const menu = document.getElementById('menu');
const gameContainer = document.getElementById('game-container');
const startButton = document.getElementById('start-button');

const pongTable = document.querySelector('.pong-table');
const ballSpeed = 5; // Change Ball Speed 
const paddleSpeed = 8; // Change Paddle Speed 

let ballX = pongTable.clientWidth / 2 - ball.clientWidth / 2;
let ballY = pongTable.clientHeight / 2 - ball.clientHeight / 2;
let ballXSpeed = ballSpeed;
let ballYSpeed = ballSpeed;

let playerPaddleY = pongTable.clientHeight / 2 - paddleLeft.clientHeight / 2;
let opponentPaddleY = pongTable.clientHeight / 2 - paddleRight.clientHeight / 2;

let playerScoreValue = 0;
let opponentScoreValue = 0;

let gameStarted = false;

function updateScore() {
    playerScore.textContent = playerScoreValue;
    opponentScore.textContent = opponentScoreValue;
}

function resetGame() {
    playerScoreValue = 0;
    opponentScoreValue = 0;
    playerPaddleY = pongTable.clientHeight / 2 - paddleLeft.clientHeight / 2;
    opponentPaddleY = pongTable.clientHeight / 2 - paddleRight.clientHeight / 2;
    updateScore();
    resetBall();
}

function resetBall() {
    ballX = pongTable.clientWidth / 2 - ball.clientWidth / 2;
    ballY = pongTable.clientHeight / 2 - ball.clientHeight / 2;
    ballXSpeed = ballSpeed;
    ballYSpeed = ballSpeed;
}

function gameLoop() {
    if (gameStarted) {
        ballX += ballXSpeed;
        ballY += ballYSpeed;

        // Ball collisions with top and bottom of the table
        if (ballY <= 0 || ballY + ball.clientHeight >= pongTable.clientHeight) {
            ballYSpeed = -ballYSpeed;
        }

        // Ball collisions with paddles
        if (
            (ballX <= paddleLeft.clientWidth &&
                ballY + ball.clientHeight >= playerPaddleY &&
                ballY <= playerPaddleY + paddleLeft.clientHeight) ||
            (ballX + ball.clientWidth >= pongTable.clientWidth - paddleRight.clientWidth &&
                ballY + ball.clientHeight >= opponentPaddleY &&
                ballY <= opponentPaddleY + paddleRight.clientHeight)
        ) {
            ballXSpeed = -ballXSpeed;
        }

        // Player and opponent paddle movement

        // Opponent AI
        if (ballY > opponentPaddleY + paddleRight.clientHeight / 2 && opponentPaddleY + paddleRight.clientHeight < pongTable.clientHeight) {
            opponentPaddleY += paddleSpeed;
        } else if (ballY < opponentPaddleY + paddleRight.clientHeight / 2 && opponentPaddleY > 0) {
            opponentPaddleY -= paddleSpeed;
        }

        // Ball out of bounds
        if (ballX < 0) {
            opponentScoreValue++;
            resetBall();
        } else if (ballX > pongTable.clientWidth) {
            playerScoreValue++;
            resetBall();
        }

        // Update ball position
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';

        // Update paddle positions
        paddleLeft.style.top = playerPaddleY + 'px';
        paddleRight.style.top = opponentPaddleY + 'px';

        // Update score
        updateScore();
    }

    requestAnimationFrame(gameLoop);
}

// Start the game when the "Start Game" button is clicked
startButton.addEventListener('click', () => {
    menu.style.display = 'none';
    gameContainer.style.display = 'block';
    gameStarted = true;
    resetGame();
});

// Improve game input responsiveness
document.addEventListener('keydown', (event) => {
    if (gameStarted) {
        if (event.key === 'ArrowDown' && playerPaddleY + paddleLeft.clientHeight < pongTable.clientHeight) {
            playerPaddleY += paddleSpeed;
        } else if (event.key === 'ArrowUp' && playerPaddleY > 0) {
            playerPaddleY -= paddleSpeed;
        }
    }
});

// Start the game loop
gameLoop();
