/*
    TODO:
    - draw the board (DONE)
    - draw the snake (DONE)
    - try to move the snake (DONE)
    - steer the snake (DONE)
    - handle border collision (DONE)
    - make the snake move on itself (DONE)
    - add food on random spot (DONE)
      - make sure that the food does not spawn on the snake (DONE)
    - handle snake colliding with itself (DONE)
    - make the snake longer after eating food (DONE)
      - food reappears after eating (DONE)
    - game winning/losing conditions (DONE)
    - score system (DONE)
    - make the snake faster after certain point limit?
    - make the snake appear on the opposite side when hitting the border?
    - UI?

    FIXES:
    - bug with the snake able to turn 180 degrees (DONE)
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.font = "20px Arial";
ctx.fillText("[ENTER] - start the game", 60, 200);
ctx.fillText("[SPACE] - pause the game", 60, 240); 
ctx.fillText("[UP, DOWN, LEFT, RIGHT] - steer the snake", 60, 280); 
window.addEventListener('keydown', (event) => handleKeyPress(event));

let snake = null;
let food = {};
let score = null;
let direction = null;
let gameStarted = false;
let gameOver = false;
let gamePaused = false;
var game = null;
let tick = 0;
let movementAt = null;

function startGame() {
    snake = [{x:225, y:225}, {x:250, y:225}, {x:275, y:225}, {x:300, y:225}];
    score = 0;
    ticks = 0;
    direction = 'left';
    gameOver = false;
    gameStarted = true;
    clear();
    placeFood();
    drawSnake();
    game = setInterval(() => move(), 200);

    document.getElementById("canvas").focus();
}

function pauseGame() {
    if (gamePaused) {
        game = setInterval(() => move(), 200);
        gamePaused = false;
    } else {
        ctx.fillStyle = '#000000';
        ctx.font = "25px Arial";
        ctx.fillText("Game paused!", 90, 180); 
        ctx.fillText("Press [SPACE] to continue", 90, 210); 
        clearInterval(game);
        gamePaused = true;
    }
}

function endGame() {
    ctx.fillStyle = '#000000';
    ctx.font = "50px Arial";
    ctx.fillText("Game over!", 110, 200); 
    ctx.fillText(`Score: ${score}`, 110, 250); 
    ctx.font = "25px Arial";
    ctx.fillText(`Press [ENTER] to start again!`, 110, 290); 
    clearInterval(game);
    gameOver = true;
}

// i guess i'll add this here even though it's nearly impossible
function winGame() {
    ctx.fillStyle = '#000000';
    ctx.font = "50px Arial";
    ctx.fillText("You.. won?", 110, 200); 
    ctx.font = "30px Arial";
    ctx.fillText("Oh my god..", 120, 235); 
    ctx.font = "25px Arial";
    ctx.fillText(`Press [ENTER] to start again..`, 110, 290); 
    clearInterval(game);
    gameOver = true;
}

function draw() {
    drawFood();
    drawSnake();
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            endGame();
        }
    }
}

function drawFood() {
    ctx.fillStyle = '#DC143C';
    ctx.strokestyle = '#DDA0DD';
    ctx.fillRect(food.x, food.y, 25, 25);
    ctx.strokeRect(food.x, food.y, 25, 25);
}

function drawSnake() {
    for (const trail of snake) {
        ctx.fillStyle = 'lightgreen';
        ctx.strokestyle = 'darkgreen';
        ctx.fillRect(trail.x, trail.y, 25, 25);
        ctx.strokeRect(trail.x, trail.y, 25, 25);
    }
}

function clear() {
    ctx.fillStyle = "#eeeeee";
    ctx.strokeStyle = "darkgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function placeFood() {
    const x_axis = Math.round(Math.floor(Math.random() * (canvas.width-25)) / 25) * 25;
    const y_axis = Math.round(Math.floor(Math.random() * (canvas.height-25)) / 25) * 25;
    for (const trail of snake) {
        if (x_axis === trail.x && y_axis === trail.y) {
            placeFood();
            return;
        }
    }
    food = {x:x_axis, y:y_axis};
    drawFood();
}

function eatFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        snake.push({x:food.x, y:food.y});
        drawSnake();
        placeFood();
        score++;
        document.getElementById("score").innerText = `Score: ${score}`;
    } 
}

function move() {
    switch(direction) {
        case 'up':
            if (snake[0].y === 0) {
                endGame();
                break;
            }
            snake.unshift({x:snake[0].x, y:snake[0].y-25});
            snake.pop();
            clear();
            draw();
            break;

        case 'down':
            if (snake[0].y === 475) {
                endGame();
                break;
            }
            snake.unshift({x:snake[0].x, y:snake[0].y+25});
            snake.pop();
            clear();
            draw();
            break;

        case 'left':
            direction = 'left';
            if (snake[0].x === 0) {
                endGame();
                break;
            }
            snake.unshift({x:snake[0].x-25, y:snake[0].y});
            snake.pop();
            clear();
            draw();
            break;

        case 'right':
            direction = 'right';
            if (snake[0].x === 475) {
                endGame();
                break;
            }
            snake.unshift({x:snake[0].x+25, y:snake[0].y});
            snake.pop();
            clear();
            draw();
            break;

        default:
            break;
    }
    eatFood();
    tick++;
}

function handleKeyPress(event) {
    switch(event.key) {
        case 'ArrowUp':
            if (movementAt === tick) break;
            if (direction === 'up' || direction === 'down') break;
            direction = 'up';
            break;

        case 'ArrowDown':
            if (movementAt === tick) break;
            if (direction === 'up' || direction === 'down') break;
            direction = 'down';
            break;

        case 'ArrowLeft':
            if (movementAt === tick) break;
            if (direction === 'left' || direction === 'right') break;
            direction = 'left';
            break;

        case 'ArrowRight':
            if (movementAt === tick) break;
            if (direction === 'left' || direction === 'right') break;
            direction = 'right';
            break;

        case 'Enter':
            if (!gameStarted || gameOver) {
                startGame();
                gameStarted = true;
                break;
            }

        case ' ':
            if (gameOver) break;
            if (gameStarted) pauseGame();
            break;

        default:
            break;
    }
    movementAt = tick;
}
