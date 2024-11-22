const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.willReadFrequently = true;

const sprite = new Image();
sprite.src = '/src/sprite-facing.png'; // replace with your sprite image path

const spriteWidth = 50;
const spriteHeight = 50;
let spriteX = (canvas.width / 2) - 50;
let spriteY = canvas.height / 2;
const speed = 5;

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

    const color = getColorAt(tempX, tempY);
    console.log(`Color at (${tempX}, ${tempY}): rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
    if(color.r === 0 && color.g === 0 && color.b === 0) {
        spriteX = tempX;
        spriteY = tempY;
    }
}

function getColorAt(x, y) {
    const imageData = ctx.getImageData(x, y, 1, 1);
    const data = imageData.data;
    const rgba = {
        r: data[0], g: data[1], b: data[2], a: data[3]};
    return rgba;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(townBackground, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(sprite, spriteX, spriteY, spriteWidth, spriteHeight);
    requestAnimationFrame(draw);
}

sprite.onload = function() {
    townBackground.onload = function() {
        draw();
    };
};
