/*
    TODO:
    - draw the board (DONE)
    - draw the snake (DONE)
    - try to move the snake (DONE)
    - steer the snake (DONE)
    - handle border collision (DONE)
    - make the snake move on itself (DONE)
    - handle snake colliding with itself
    - add food on random spot
    - make the snake longer after eating food
      - food reappears after eating
    - game winning/losing conditions
    - score system
    - UI?
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let snake = [{x:225,y:225}, {x:250,y:225}, {x:275,y:225}, {x:300,y:225}];
let direction = 'left';

function drawSnake() {
    for (const trail of snake) {
        ctx.fillStyle = 'lightgreen';
        ctx.strokestyle = 'darkgreen';
        ctx.fillRect(trail.x, trail.y, 25, 25);
        ctx.strokeRect(trail.x, trail.y, 25, 25);
    }
}
drawSnake();

function clear() {
    ctx.fillStyle = "#eeeeee";
    ctx.strokeStyle = "darkgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('keydown', (event) => changeDirection(event));

setInterval(() => move(), 400);

function move() {
    switch(direction) {
        case 'up':
            if (snake[0].y === 0) break;
            snake.unshift({x:snake[0].x, y:snake[0].y-25});
            snake.pop();
            clear();
            drawSnake();
            break;

        case 'down':
            if (snake[0].y === 475) break;
            snake.unshift({x:snake[0].x, y:snake[0].y+25});
            snake.pop();
            clear();
            drawSnake();
            break;

        case 'left':
            direction = 'left';
            if (snake[0].x === 0) break;
            snake.unshift({x:snake[0].x-25, y:snake[0].y});
            snake.pop();
            clear();
            drawSnake();
            break;

        case 'right':
            direction = 'right';
            if (snake[0].x === 475) break;
            snake.unshift({x:snake[0].x+25, y:snake[0].y});
            snake.pop();
            clear();
            drawSnake();
            break;

        default:
            break;
    }
}

function changeDirection(event) {
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

        default:
            break;
    }

    console.log(snake[0])
}
