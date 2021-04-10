const GameStates = {
    STARTGAME : 1,
    INSTRUCTIONSCREEN : 2,
    FIGHTENEMY : 3,
    SHOP : 4,
}

var gameOver = false;

var mouseXPos = 0;
var mouseYPos = 0;

var GameState = GameStates.STARTGAME;

var canvas = document.getElementById('GameScreen');
var context = canvas.getContext('2d');

window.onload = draw();

//Draws the GameScreens
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    //if current gamestate is equal to start game draw the introduction screen
    if (GameState == GameStates.STARTGAME) {
        var img = document.getElementById("IntroScreen");
        context.drawImage(img, 0, 0);
    }

    //if current gamestate is equal to input the username then draw the input username screen
    if (GameState == GameStates.INSTRUCTIONSCREEN) {
        var img = document.getElementById("InstructionScreen");
        context.drawImage(img, 0, 0);
    }


    if (GameState == GameStates.FIGHTENEMY) {
        var img = document.getElementById("ArenaScreen");
        context.drawImage(img, 0, 0);
    }

}

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    mouseXPos = event.clientX - rect.left;
    mouseYPos = event.clientY - rect.top;
    console.log("Coordinate x: " + mouseXPos,
        "Coordinate y: " + mouseYPos);
}
var playButtonRect = {
    posX: 427 ,
    posY: 291,
    posX2: 774 ,
    posY2: 346
}

var instructionButtonRect = {
    posX: 427 ,
    posY: 382,
    posX2: 775 ,
    posY2: 438
}

var backInstructionButtonRect = {
    posX: 46,
    posY: 24,
    posX2: 218,
    posY2: 64
}

function mouseIntersectsInstructionButton() {
    if (mouseXPos > instructionButtonRect.posX && mouseXPos < instructionButtonRect.posX2 &&
        mouseYPos > instructionButtonRect.posY && mouseYPos < instructionButtonRect.posY2) {
        GameState = GameStates.INSTRUCTIONSCREEN;
    }
}

function mouseIntersectsBackInstructionButton() {
    if (mouseXPos > backInstructionButtonRect.posX && mouseXPos < backInstructionButtonRect.posX2 &&
        mouseYPos > backInstructionButtonRect.posY && mouseYPos < backInstructionButtonRect.posY2) {
        GameState = GameStates.STARTGAME;
    }
}

function mouseIntersectsPlayButton() {
    if (mouseXPos > playButtonRect.posX && mouseXPos < playButtonRect.posX2 &&
        mouseYPos > playButtonRect.posY && mouseYPos < playButtonRect.posY2) {
        GameState = GameStates.FIGHTENEMY;
    }
}

var myVar = setInterval(gameLoop, 33);

function gameLoop() {
        update();
        draw();
}

function update() {
    
}

canvas.addEventListener("click", function (e) {
    getMousePosition(canvas, e);
    if (GameState == GameStates.STARTGAME) {
        mouseIntersectsInstructionButton();
        mouseIntersectsPlayButton();
    }
    if (GameState == GameStates.INSTRUCTIONSCREEN) {
        mouseIntersectsBackInstructionButton();
    }
});
