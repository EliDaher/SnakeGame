// define html elements
const borad = document.getElementById('game-borad');
const logo = document.getElementById('start-logo');
const score = document.getElementById('score');
const hightScoretext = document.getElementById('hightScore');
const arrow = document.querySelectorAll('Arrow')

//define game variables
let snake = [{x: 10, y: 10}];
const gridSize = 20;
let gameInterval;
let gameStarted = false;
let food = generateFood(); 
let direction = 'right';
let gameSpeedDelay = 200;
let hightScore = 0;

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

//draw game mab, snake and food
function draw() {
    borad.innerHTML = '';
    drawSnake();
    updateScore();
    drawFood();
}

//draw snake
function drawSnake() {
    snake.forEach((segment) => {        
        const snakeElement = createGameElement('div', 'snake');
        setposition(snakeElement, segment);
        borad.appendChild(snakeElement);
    });

}

//create a snake or food/div
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//set the position of the snake or food
function setposition(element , position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// Draw food function
function drawFood() {
    if(gameStarted){
        const foodElement = createGameElement('div', 'food');
        setposition(foodElement, food);
        borad.appendChild(foodElement);
    }
}

//generate the food position
function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return{x, y}
}

// Move the snake
function move() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'up':
            head.y--;
            break;
        case 'left':
            head.x--;
                break;
        case 'down':
            head.y++;
            break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay);
        increaseSpeed();
    } else {
        snake.pop();
    }
}

// start the game function
function startGame(){
    gameStarted = true;
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
        
    }, gameSpeedDelay);
}

// Key press listener
function handleKeyPress(event){
    if (
        event.code === 'Space' && !gameStarted ||
        event.key === ' ' && !gameStarted
    ) {
        startGame();   
    } else{
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';  
                break;
            case 'ArrowDown':
                direction = 'down'; 
                break;
            case 'ArrowLeft':
                direction = 'left';   
                break;
            case 'ArrowRight':
                direction = 'right';  
                break;
        }
    }
}
document.addEventListener('keydown', handleKeyPress);

// Game speed increase function
function increaseSpeed(){
    if (gameSpeedDelay > 150){
        gameSpeedDelay -= 5;
    } else if(gameSpeedDelay > 100){
        gameSpeedDelay -= 3
    } else if(gameSpeedDelay > 50){
        gameSpeedDelay -= 2
    } else if(gameSpeedDelay > 25){
        gameSpeedDelay -= 1
    }
}

function checkCollision(){
    const head = snake[0];
    
    if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize){
        resetGame();
    }

    for(let i = 1; i < snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            resetGame();
        }
    }

}

function resetGame(){

    updatehightScore();
    stopGame();
    snake = [{x: 10, y: 10}];
    food = generateFood(); 
    direction = 'right';
    gameSpeedDelay = 200;
    updateScore();
    alert("4:4");
    
}

function updateScore(){
    const currentScore = snake.length - 1;

    score.textContent = currentScore.toString().padStart(3, '0')
}

function updatehightScore(){
    const currentScore = snake.length - 1;
    if(currentScore > hightScore){
        hightScore = currentScore;
        hightScoretext.textContent = hightScore.toString().padStart(3, '0');
    }
    hightScoretext.style.display = 'block';
}
function stopGame(){
    clearInterval(gameInterval);
    gameStarted = false;
    logo.style.display = 'flex';
}

//screen touch detect function

borad.addEventListener('touchstart', function(event){
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
    console.log(touchStartX);
}, false);

borad.addEventListener('touchend', function(event){
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    console.log(touchEndX);
    touchdetect();
}, false);

function touchdetect() {
    
    if (touchEndX < touchStartX) {
        direction = 'left';
    }
    if (touchEndX > touchStartX) {
        direction = 'right';
    }
    if (touchEndY < touchStartY) {
        direction = 'down';
    }
    if (touchEndY > touchStartY) {
        direction = 'up'; 
    }

}




















    
