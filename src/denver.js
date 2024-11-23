const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.willReadFrequently = true;

const sprite = new Image();
sprite.src = '/src/sprite-facing.png';
//sprite.src = '/src/img/male-character-sheet.png';

const BORDER_WIDTH = 2;
const SPACING_WIDTH = 5;
const SPRITE_WIDTH = 200;
const SPRITE_HEIGHT = 200;

const spriteWidth = 35;
const spriteHeight = 45;
let spriteX = (canvas.width / 2) + 100;
let spriteY = canvas.height / 2;
const speed = 10;
//var offsetPos = spritePositionToImagePosition(1, 0);

const townBackground = new Image();
townBackground.src = '/src/denver.png'; // replace with your town background image path

document.addEventListener('keydown', moveSprite);

function moveSprite(e) {
    let tempX = spriteX;
    let tempY = spriteY;

    switch (e.code) {
        case 'ArrowUp':
            tempY -= speed;
            break;
        case 'ArrowDown':
            tempY += speed;
            break;
        case 'ArrowLeft':
            tempX -= speed;
            break;
        case 'ArrowRight':
            tempX += speed;
            break;
    }

    const color = getColorAt(tempX + (spriteWidth/2) - 1, tempY - 10);
    console.log(`Color at (${tempX}, ${tempY}): rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
    if(color.r === 0 && color.g === 0 && color.b === 0) {
        spriteX = tempX;
        spriteY = tempY;
    }
}

function spritePositionToImagePosition(row, col) {
    return {
        x: (
            BORDER_WIDTH +
            col * (SPACING_WIDTH + SPRITE_WIDTH)
        ),
        y: (
            BORDER_WIDTH +
            row * (SPACING_WIDTH + SPRITE_HEIGHT)
        )
    }
}

function getColorAt(x, y) {
    const imageData = ctx.getImageData(x, y, 1, 1);
    imageData.willReadFrequently = true;

    const data = imageData.data;
    const rgba = {
        r: data[0], g: data[1], b: data[2], a: data[3]};
    return rgba;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(townBackground, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(sprite, spriteX, spriteY, spriteWidth, spriteHeight);
    //ctx.drawImage(sprite, offsetPos.x, offsetPos.y, SPRITE_WIDTH, SPRITE_HEIGHT, spriteX, spriteY, spriteWidth, spriteHeight);
    requestAnimationFrame(draw);
}

sprite.onload = function() {
    townBackground.onload = function() {
        draw();
    };
};
