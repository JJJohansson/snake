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
    - handle snake colliding with itself
    - make the snake longer after eating food (DONE)
      - food reappears after eating (DONE)
    - game winning/losing conditions
    - score system
    - UI?
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.font = "25px Arial";
ctx.fillText("Press [ENTER] to start the game!", 70, 225); 
window.addEventListener('keydown', (event) => handleKeyPress(event));

let snake = [{x:225, y:225}, {x:250, y:225}, {x:275, y:225}, {x:300, y:225}];
let food = {};
let direction = 'left';
let gameStarted = false;
let gamePaused = false;
var game = null;

function startGame() {
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
        ctx.font = "50px Arial";
        ctx.fillText("Game paused!", 90, 225); 
        clearInterval(game);
        gamePaused = true;
    }
}

function draw() {
    drawFood();
    drawSnake();
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
            console.log(`x_axis: ${x_axis}, y_axis:${y_axis}`);
            console.log('food on snake! RESETTING!');
            placeFood();
            return;
        }
    }
    food = {x:x_axis, y:y_axis};
    console.log('food placed at ', food);
    drawFood();
}

function eatFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        snake.push({x:food.x, y:food.y});
        drawSnake();
        console.log('nom nom nom');
        placeFood();
    } 
}

function move() {
    switch(direction) {
        case 'up':
            if (snake[0].y === 0) break;
            snake.unshift({x:snake[0].x, y:snake[0].y-25});
            snake.pop();
            clear();
            draw();
            break;

        case 'down':
            if (snake[0].y === 475) break;
            snake.unshift({x:snake[0].x, y:snake[0].y+25});
            snake.pop();
            clear();
            draw();
            break;

        case 'left':
            direction = 'left';
            if (snake[0].x === 0) break;
            snake.unshift({x:snake[0].x-25, y:snake[0].y});
            snake.pop();
            clear();
            draw();
            break;

        case 'right':
            direction = 'right';
            if (snake[0].x === 475) break;
            snake.unshift({x:snake[0].x+25, y:snake[0].y});
            snake.pop();
            clear();
            draw();
            break;

        default:
            break;
    }
    eatFood();
}

function handleKeyPress(event) {
    switch(event.key) {
        case 'ArrowUp':
            if (direction === 'up' || direction === 'down') break;
            direction = 'up';
            break;

        case 'ArrowDown':
            if (direction === 'up' || direction === 'down') break;
            direction = 'down';
            break;

        case 'ArrowLeft':
            if (direction === 'left' || direction === 'right') break;
            direction = 'left';
            break;

        case 'ArrowRight':
            if (direction === 'left' || direction === 'right') break;
            direction = 'right';
            break;

        case 'Enter':
            if (gameStarted) break;
            startGame();
            gameStarted = true;
            break;

        case ' ':
            if (gameStarted) pauseGame();
            break;

        default:
            break;
    }
}
