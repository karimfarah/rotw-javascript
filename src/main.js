const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.willReadFrequently = true;

// Set font and alignment
ctx.font = '48px Arial';
ctx.textAlign = 'center';

// Set the position where you want to draw the text
var titleX = canvas.width / 2;
var titleY = canvas.height / 2;

var inRestStop = false;
var inTransition = false;
var inFactory = false;
var inCasino = false;

const sprite = new Image();
sprite.src = '/src/img/sprite-facing.png';
//sprite.src = '/src/img/male-character-sheet.png';

const spriteWidth = 35;
const spriteHeight = 45;
const enemyWidth = 32;
const enemyHeight = 32;

let spriteX = (canvas.width / 2) + 100;
let spriteY = canvas.height / 2;
const speed = 10;

var player = { money: 10000, speed: 10, x: spriteX, y: spriteY, hasCar: false, car: null };
//var offsetPos = spritePositionToImagePosition(1, 0);

let carSaveError = false;

let enemyArray = [];


/** STARTING TOWN **/
const townBackground = new Image();
townBackground.src = denverBackground.src; // replace with your town background image path
var currentCity = City.DENVER;

/** STARTING ROAD ***/
const roadBackground = new Image();
var currentRoad = Road.NONE;
var cameraX = 0;
var cameraY = 0;

document.addEventListener('keydown', moveSprite);

function moveSprite(e) {
    let tempX = spriteX;
    let tempY = spriteY;
    let tempCameraX = cameraX;
    let tempCameraY = cameraY;
    var tempSpriteSrc = '';

    switch (e.code) {
        case 'ArrowUp':
            tempY -= speed;
            tempCameraY -= speed;
            tempSpriteSrc = '/src/img/car-sprite-forward.png';
            break;
        case 'ArrowDown':
            tempY += speed;
            tempCameraY += speed;
            tempSpriteSrc = '/src/img/car-sprite-down.png';
            break;
        case 'ArrowLeft':
            tempX -= speed;
            tempCameraX -= speed;
            tempSpriteSrc = '/src/img/car-sprite-left.png';
            break;
        case 'ArrowRight':
            tempX += speed;
            tempCameraX += speed;
            tempSpriteSrc = '/src/img/car-sprite-right.png';
            break;
    }

    const color = getColorAt(tempX + (spriteWidth / 2) - 1, tempY - 10);
    // console.log(`Color sprite (${tempX}, ${tempY}): rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
    // console.log(`Color camera (${cameraX}, ${cameraY}): rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
    if (color.r === 0 && color.g === 0 && color.b === 0) {
        if(currentCity === City.NONE) {
            cameraX = tempCameraX;
            cameraY = tempCameraY;
        } else {
            spriteX = tempX;
            spriteY = tempY;
        }

        if(player.hasCar === true) {
            sprite.src = tempSpriteSrc;
        } else {

        }

        checkPlayerLocation();
    }

}

function checkPlayerLocation() {
    if (currentRoad === Road.NONE) {
        switch (currentCity) {
            case City.DENVER:
                checkDenverLocations();
                break;
            case City.CHEYENNE:
                checkCheyenneLocations();
                break;
            case City.GRAND_JUNCTION:
                checkGrandJunctionLocations();
                break;
            case City.LAS_VEGAS:
                checkLasVegasLocations();
                break;
        }
    } else {
        switch (currentRoad) {
            case Road.I25_NORTH:
                checkI25NorthLocations();
                break;
            case Road.I70_WEST:
                checkI70WestLocations();
                break;
            case Road.I15_SOUTH:
                checkI15SouthLocations();
                break;
        }
    }
}



sprite.onload = function() {
    townBackground.onload = function() {
        draw();
    };

    if(roadBackground !== undefined) {
        roadBackground.onload = function() {
            draw();
        };
    }
};

draw();
