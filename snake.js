//board
var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//grid properties
var gridColor = "#2E262A";  // Color of the grid lines
var gridLineWidth = 0.2;      // Width of the grid lines

//snake head
var snakex = blocksize * 5;
var snakey = blocksize * 5;

var velocityx = 0;
var velocityy = 0;

var snakebody = [];

//food
var foodx;
var foody;

var gameover = false;

// Colors for the snake
var headColor = "#E7436A";  // Red for the head
var bodyColor = "#C7375A";  // Pink for the body

// Score
var score = 0;

// Event listeners for buttons
document.addEventListener("DOMContentLoaded", function() {
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d"); //used for drawing on the board

    placefood();
    document.addEventListener("keydown", ChangeDirection); // Key controls
    document.getElementById("up-button").addEventListener("click", moveUp);
    document.getElementById("down-button").addEventListener("click", moveDown);
    document.getElementById("left-button").addEventListener("click", moveLeft);
    document.getElementById("right-button").addEventListener("click", moveRight);

    setInterval(update, 1000 / 10);
    
    // Show buttons if on mobile
    if (isMobile()) {
        document.querySelector('.buttons').style.display = 'flex';
    }
});

function isMobile() {
    return window.innerWidth <= 768; // Adjust the threshold as needed
}

function update() {
    if (gameover) {
        return;
    }

    context.fillStyle = "#181617";
    context.fillRect(0, 0, board.width, board.height);

    drawGrid(); // Draw the grid

    context.fillStyle = "#FF9365";
    context.fillRect(foodx, foody, blocksize, blocksize);

    if (snakex == foodx && snakey == foody) {
        snakebody.push([foodx, foody]);
        placefood();
        score++; // Increment score when food is eaten
        document.getElementById("score").innerText = "Score: " + score; // Update score display
    }

    // Move the snake's body
    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1];
    }
    if (snakebody.length) {
        snakebody[0] = [snakex, snakey];
    }

    // Move the snake's head
    snakex += velocityx * blocksize;
    snakey += velocityy * blocksize;

    // Draw the snake's head with a different color
    context.fillStyle = headColor;
    context.fillRect(snakex, snakey, blocksize, blocksize);

    // Draw the rest of the snake's body with the body color
    context.fillStyle = bodyColor;
    for (let i = 0; i < snakebody.length; i++) {
        context.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize);
    }

    // Game over conditions
    if (snakex < 0 || snakex >= cols * blocksize || snakey < 0 || snakey >= rows * blocksize) {
        gameover = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakebody.length; i++) {
        if (snakex == snakebody[i][0] && snakey == snakebody[i][1]) {
            gameover = true;
            alert("Game Over");
        }
    }
}

function ChangeDirection(e) {
    if (e.code == "KeyW" && velocityy != 1) {
        velocityx = 0;
        velocityy = -1;
    } else if (e.code == "KeyS" && velocityy != -1) {
        velocityx = 0;
        velocityy = 1;
    } else if (e.code == "KeyA" && velocityx != 1) {
        velocityx = -1;
        velocityy = 0;
    } else if (e.code == "KeyD" && velocityx != -1) {
        velocityx = 1;
        velocityy = 0;
    }
}

// Button control functions
function moveUp() {
    if (velocityy != 1) {
        velocityx = 0;
        velocityy = -1;
    }
}

function moveDown() {
    if (velocityy != -1) {
        velocityx = 0;
        velocityy = 1;
    }
}

function moveLeft() {
    if (velocityx != 1) {
        velocityx = -1;
        velocityy = 0;
    }
}

function moveRight() {
    if (velocityx != -1) {
        velocityx = 1;
        velocityy = 0;
    }
}

function placefood() {
    foodx = Math.floor(Math.random() * cols) * blocksize;
    foody = Math.floor(Math.random() * rows) * blocksize;
}

function drawGrid() {
    context.strokeStyle = gridColor;
    context.lineWidth = gridLineWidth;

    // Draw vertical lines
    for (let x = 0; x <= board.width; x += blocksize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, board.height);
        context.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= board.height; y += blocksize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(board.width, y);
        context.stroke();
    }
}