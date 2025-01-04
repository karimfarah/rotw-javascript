const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.willReadFrequently = true;

// Set font and alignment
ctx.font = '48px Arial';
ctx.textAlign = 'center';

// Set the position where you want to draw the text
var titleX = canvas.width / 2;
var titleY = canvas.height / 2;

var gameOver = false;
var inRestStop = false;
var inTransition = false;
var inFactory = false;
var inCasino = false;
var inGarage = false;
var inDustRunners = false;
var roadConditionReport = false;

const sprite = new Image();
sprite.src = '/src/img/sprite-facing.png';
//sprite.src = '/src/img/male-character-sheet.png';

const spriteWidth = 35;
const spriteHeight = 45;
const enemyWidth = 32;
const enemyHeight = 32;

let spriteX = (canvas.width / 2) + 100;
let spriteY = canvas.height / 2;
let speed = 10;

var player = { money: 10000, xp: 0, health: 100, speed: 5, x: spriteX, y: spriteY, hasCar: false, car: null };
//var offsetPos = spritePositionToImagePosition(1, 0);

let carSaveError = false;

let enemyArray = [];

/** STARTING TOWN **/
const townBackground = new Image();
townBackground.src = denverBackground.src; // replace with your town background image path
var currentCity = City.DENVER;
let randomJobList = [0, 1, 2, 3];

/** STARTING ROAD ***/
const roadBackground = new Image();
var currentRoad = Road.NONE;
var cameraX = 0;
var cameraY = 0;

document.addEventListener('keydown', processPlayerInput);


////////////////////////////////////////////////////////////////////////
//
// Store the visit count
//
let visitCount = localStorage.getItem('visitCount');
if (visitCount) {
    visitCount = parseInt(visitCount) + 1;
} else {
    visitCount = 1;
}
localStorage.setItem('visitCount', visitCount);
////////////////////////////////////////////////////////////////////////


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
