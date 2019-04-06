/*
    TODO:
    - draw the board (DONE)
    - draw the snake (DONE)
    - try to move the snake (DONE)
    - steer the snake (DONE)
    - handle border collision (DONE)
    - make the snake move on itself (DONE)
    - add food on random spot (DONE)
      - make sure that the food does not spawn on the snake
    - handle snake colliding with itself
    - make the snake longer after eating food
      - food reappears after eating
    - game winning/losing conditions
    - score system
    - UI?
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.font = "25px Arial";
ctx.fillText("Press enter to start the game!", 90, 225); 

let snake = [{x:225,y:225}, {x:250,y:225}, {x:275,y:225}, {x:300,y:225}];
let food = {};
let direction = 'left';
let gameStarted = false;

function startGame() {
    spawnFood();
    drawSnake();
    setInterval(() => move(), 400);

    document.getElementById("canvas").focus();
}

function spawnFood() {
    const x_axis = Math.round(Math.floor(Math.random() * canvas.width) / 25) * 25;
    const y_axis = Math.round(Math.floor(Math.random() * canvas.height) / 25) * 25;
    food = {x:x_axis, y:y_axis};
    drawFood();
    console.log(food);
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

window.addEventListener('keydown', (event) => handleKeyPress(event));

function move() {
    switch(direction) {
        case 'up':
            if (snake[0].y === 0) break;
            snake.unshift({x:snake[0].x, y:snake[0].y-25});
            snake.pop();
            clear();
            drawSnake();
            drawFood();
            break;

        case 'down':
            if (snake[0].y === 475) break;
            snake.unshift({x:snake[0].x, y:snake[0].y+25});
            snake.pop();
            clear();
            drawSnake();
            drawFood();
            break;

        case 'left':
            direction = 'left';
            if (snake[0].x === 0) break;
            snake.unshift({x:snake[0].x-25, y:snake[0].y});
            snake.pop();
            clear();
            drawSnake();
            drawFood();
            break;

        case 'right':
            direction = 'right';
            if (snake[0].x === 475) break;
            snake.unshift({x:snake[0].x+25, y:snake[0].y});
            snake.pop();
            clear();
            drawSnake();
            drawFood();
            break;

        default:
            break;
    }
}

function handleKeyPress(event) {
    console.log(event)
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

        default:
            break;
    }

    console.log(snake[0])
}
