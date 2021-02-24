//Game Data
//document.getElementById("welcome").innerHTML = "Welcome Rauls";

//Width and height for the canvas
var canvasWidth = 360;
var canvasHeight = 500;

//the with and height of the spritesheet
var spriteWidth = 1536;
var spriteHeight = 256;

//there are 1 rows and 5 cols in the player sprite sheet
var rows = 1;
var cols = 5;

//getting the size on one columne
var width = spriteWidth / 6.1;

//getting the size of one row
var height = spriteHeight / rows;
            
var curFrame = 0;

//The total amount of frames is 5 
var frameCount = 5;

//x and y coordinates of the canvas
var srcX = 0;
var srcY = 0;

//bools to control one button to work at one time
var movingBool = false;

            
var speed = 0;

//Getting the canvas 
var canvas = document.getElementById('canvas');

//setting width and height of the canvas 
canvas.width = canvasWidth;
canvas.height = canvasHeight;

//setting context to the canvas 
var ctx = canvas.getContext("2d");

//setting up player with sprite
var character = new Image();
character.src = "spritestrip.png";

//setting up background sprite
var backGround = new Image();
backGround.src = "Background.png";
backGround.style.width = '2%'
backGround.style.height = 'auto'

//The positions of the player
var characterXPos = 100;
var characterYPos = 200;
            
//Speed of the player
var characterSpeed = 0;

function updateFrame() {
    //Calculating the x coordinate for spritesheet 
    srcX = curFrame * width;
    curFrame = ++curFrame % frameCount;
    ctx.clearRect(characterXPos, characterYPos, width, height);
}

function moveCharacter() {
    characterXPos = (characterXPos + characterSpeed);
    if (characterXPos > canvasWidth) {
        characterXPos = -200;
    }
    if (characterXPos < -200) {
        characterXPos = canvasWidth;
    }
    localStorage.setItem('xPos', characterXPos);
}

function onPageLoad() {
   // var playerName = document.getElementsByName("gamertag");
    document.getElementById("welcome").innerHTML = "Welcome ";
}

function updateScore() {
    var player_score = localStorage.getItem("score");

    document.getElementById("PlayerScore").onclick()
    {
        innerHTML(player_score = player_score + 1);
    }
}
     
//Directs gameloop to the right button function dependant on which button is clicked
function processButtons() {
    document.getElementById("stopMovingButton").onclick = function () {
        stopMoving();
    };
    document.getElementById("runLeftButton").onclick = function () {
        moveLeft();
    };
    document.getElementById("runRightButton").onclick = function () {
        moveRight();
    };
}

function stopMoving() {
    srcX = 0;
    movingBool = false;
}

function moveRight() {
    characterSpeed = 30;
    character.src = "spritestrip.png";
    width = spriteWidth / 6.1;
    movingBool = true;
}

function moveLeft() {
    characterSpeed = -30;
    character.src = "spritestripmirror.png"
    width = spriteWidth / 5.9;
    movingBool = true;
}

function gameLoop() {
    if (movingBool === true) {
        updateFrame();
        moveCharacter();
    }
    processButtons();
    //updateScore();
    void ctx.drawImage(backGround, -300, -300);
    ctx.drawImage(character, srcX, srcY, width, height, characterXPos, characterYPos, width, height);
    document.getElementById("playerPos").innerHTML = "Player Position " + localStorage.getItem("xPos");
    onPageLoad();
}
//Method that runs every 100 milliseconds
setInterval(gameLoop, 75);


