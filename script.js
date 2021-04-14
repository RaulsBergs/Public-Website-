const GameStates = {
    STARTGAME : 1,
    INSTRUCTIONSCREEN : 2,
    FIGHTENEMY : 3,
    SHOP : 4,
}

var gameOver = false;

var playerHealth = 200;
var enemyHealth = 200;

var mouseXPos = 0;
var mouseYPos = 0;

var enemyXpos = 400;
var enemyYpos = 100;

var enemySpriteSheetXPos = 0;
var enemySpriteSheetYPos = 0;

var enemySpriteSheetWidth = 488;
var enemySpriteSheetHeight = 220;

var enemySpriteWidth = 488 / 4;
var enemySpriteHeight = 110;

var enemySpriteFrames = 4;
var enemySpriteCurrentFrame = 0;

var GameState = GameStates.STARTGAME;

var canvas = document.getElementById('GameScreen');
var context = canvas.getContext('2d');

var enemySprite = document.getElementById("Enemy");

window.onload = draw();

//Draws the GameScreens
function draw() {

    //if current gamestate is equal to start game draw the introduction screen
    if (GameState == GameStates.STARTGAME) {
        var img = document.getElementById("IntroScreen");
        context.drawImage(img, 0, 0);
    }

    //if current gamestate is equal to instruction screen then draw the instruction screen
    if (GameState == GameStates.INSTRUCTIONSCREEN) {
        var img = document.getElementById("InstructionScreen");
        context.drawImage(img, 0, 0);
    }


    if (GameState == GameStates.FIGHTENEMY) {
        var img = document.getElementById("ArenaScreen");
        context.drawImage(img, 0, 0);

        updateFrame();
        context.drawImage(enemySprite, enemySpriteSheetXPos, enemySpriteSheetYPos, enemySpriteWidth, enemySpriteHeight,
            enemyXpos, enemyYpos, 366, 330);

        context.strokeRect(10, 290, 60, 200);
        context.fillStyle = "#1f7a1f";
        context.fillRect(11, 289, 58, playerHealth);

        context.strokeRect(500, 50, 200, 30);
        context.fillStyle = "#1f7a1f";
        context.fillRect(500, 50, enemyHealth, 30);
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

var shieldButtonPosAndRad = {
    posX: 352,
    posY: 460,
    radius: 37
}

var healButtonPosAndRad = {
    posX: 598,
    posY: 460,
    radius: 37
}

var attackButtonPosAndRad = {
    posX: 857,
    posY: 460,
    radius: 37
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
        document.getElementById("abilityLog").innerHTML = "";
        playerHealth = 200;
        enemyHealth = 200;
    }
}

function mouseIntersectsShieldButton() {
    var tempRadius = ((mouseXPos - shieldButtonPosAndRad.posX) * (mouseXPos - shieldButtonPosAndRad.posX) +
        (mouseYPos - shieldButtonPosAndRad.posY) * (mouseYPos - shieldButtonPosAndRad.posY));

    tempRadius = Math.sqrt(tempRadius);

    if (tempRadius < shieldButtonPosAndRad.radius) {
        console.log("Colision!");
        processShieldAbility();
        processEnemyAttack();
    }
}

function mouseIntersectsHealButton() {
    var tempRadius = ((mouseXPos - healButtonPosAndRad.posX) * (mouseXPos - healButtonPosAndRad.posX) +
        (mouseYPos - healButtonPosAndRad.posY) * (mouseYPos - healButtonPosAndRad.posY));

    tempRadius = Math.sqrt(tempRadius);

    if (tempRadius < healButtonPosAndRad.radius) {
        console.log("Colision!");
        processHealAbility();
        processEnemyAttack();
    }
}

function mouseIntersectsAttackButton() {
    var tempRadius = ((mouseXPos - attackButtonPosAndRad.posX) * (mouseXPos - attackButtonPosAndRad.posX) +
        (mouseYPos - attackButtonPosAndRad.posY) * (mouseYPos - attackButtonPosAndRad.posY));

    tempRadius = Math.sqrt(tempRadius);

    if (tempRadius < attackButtonPosAndRad.radius) {
        console.log("Colision!");
        processAttackAbility();
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

    if (GameState == GameStates.FIGHTENEMY) {
        mouseIntersectsShieldButton();
        mouseIntersectsHealButton();
        mouseIntersectsAttackButton();
    }
});

function updateFrame() {
    //Calculating the x coordinate for spritesheet 
    enemySpriteSheetXPos = enemySpriteCurrentFrame * enemySpriteWidth;
    enemySpriteCurrentFrame = ++enemySpriteCurrentFrame % enemySpriteFrames;
}

function processShieldAbility() {
    document.getElementById("abilityLog").innerHTML = "You shielded against the enemy attack! ";
}

function processHealAbility() {
    if (playerHealth <= 170) {
        document.getElementById("abilityLog").innerHTML = "you have restored 30 health!";
        playerHealth = playerHealth + 30;
    }
    else {
        document.getElementById("abilityLog").innerHTML = "You can't restore any more health!";
    }
}

function processAttackAbility() {
    document.getElementById("abilityLog").innerHTML = "You dealt 30 damage to the enemy!";

    enemyHealth = enemyHealth - 30;
    if (enemyHealth < 0) {
        document.getElementById("abilityLog").innerHTML = "you have defeated the enemy! Game Over";
        GameState = GameStates.STARTGAME;
    }
    processEnemyAttack();
}

function processEnemyAttack() {
    if (enemyHealth > 100) {
        document.getElementById("abilityLog").innerHTML = "The sorcerer lit you on fire dealing 35 damage!";
        playerHealth = playerHealth - 35;
    } 
    else {
        document.getElementById("abilityLog").innerHTML = "The sorcerer regenerated 15 health!";
        enemyHealth = enemyHealth + 15;
    }
}