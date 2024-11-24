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

/**** CITY CONSTANT IMAGES ****/
const City = Object.freeze({
    DENVER: 'denver',
    CHEYENNE: 'cheyenne',
    KANSAS_CITY: 'kansas city',
    SANTE_FE: 'sante fe',
    GRAND_JUNCTION: 'grand junction',
    LAS_VEGAS: 'las vegas',
    SALT_LAKE_CITY: 'salt lake city',
    BOISE: 'boise',
    BILLINGS: 'billings',
    DES_MOINE: 'des moine',
    CHICAGO: 'chicago',
    ST_LOUIS: 'st louis',
    OKLAHOMA_CITY: 'oklahoma city',
    LITTLE_ROCK: 'little rock',
    ARLINGTON: 'arlington',
    NEW_ORLEANS: 'new orleans'
});

const denverBackground = new Image();
denverBackground.src = '/src/denver.png';

const cheyenneBackground = new Image();
cheyenneBackground.src = '/src/cheyenne.png';

const grandJunctionBackground = new Image();
grandJunctionBackground.src = '/src/grandJunction.png';

const lasVegasBackground = new Image();
lasVegasBackground.src = '/src/lasVegas.png';

/*** STARTING TOWN ***/
const townBackground = new Image();
townBackground.src = denverBackground.src; // replace with your town background image path
var currentCity = City.DENVER;

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
        checkPlayerLocation();
    }
}

function checkDenverLocations() {
    if (spriteX >= 590 && spriteX <= 600 &&
        spriteY >= 260 && spriteY <= 280) {
        enterRestStop();
    }
}

function checkCheyenneLocations() {
    if (spriteX >= 590 && spriteX <= 600 &&
        spriteY >= 260 && spriteY <= 280) {
        enterRestStop();
    }
}

function checkPlayerLocation() {
    switch(currentCity) {
        case City.DENVER:
            checkDenverLocations();
            break;
        case City.CHEYENNE:
            checkCheyenneLocations();
            break;
    }
}


function enterRestStop() {
    console.log("Entering Rest Stop");
    document.removeEventListener('keydown', moveSprite)
    document.addEventListener('keydown', readRestStopInput);
    inRestStop = true;
}

function drawRestStopMenu() {
    var boxWidth = canvas.width - 100;
    var boxHeight = canvas.height - 100;
    var boxX = (canvas.width - boxWidth) / 2;
    var boxY = (canvas.height - boxHeight) / 2;

    ctx.fillStyle = 'white';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 25;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    var restStopImg = new Image();
    restStopImg.src = '/src/img/reststop.png';
    ctx.drawImage(restStopImg, boxX, boxY, boxWidth, 133);

    ctx.font = '20px Verdana';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';

    var textX = boxX + 100;
    var textY = boxY + 175;
    var text = 'REST STOP MENU:';
    ctx.fillText(text, textX, textY); textY += 50;
    text = '1. Bus To Cheyenne 200qc';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '2. Bus To Sante Fe 200qc';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '3. Bus To Kansas City 200qc';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '4. Bus To Grand Junction 200qc';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '5. Listen for rumors';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '6. Buy Deuterium/Tritium for car power 100qc';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '7. Stay over night 20qc';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '8. Leave the Rest Stop';
    ctx.fillText(text, textX, textY); textY += 25;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadCityChanges() {
    switch(currentCity) {
        case City.DENVER:
            inRestStop = false;
            townBackground.src= denverBackground.src;
            document.removeEventListener('keydown', readRestStopInput);
            document.addEventListener('keydown', moveSprite);
            break;
        case City.CHEYENNE:
            await sleep(4000);

            inRestStop = false;
            townBackground.src= cheyenneBackground.src;
            document.removeEventListener('keydown', readRestStopInput);
            document.addEventListener('keydown', moveSprite);
            break;
    }
}

function readRestStopInput(e) {
    switch (e.key) {
        case '1':
            currentCity = City.CHEYENNE;
            spriteX = 450;
            spriteY = 200;
            loadCityChanges();
            break;
        case '8':
            inRestStop = false;
            spriteX -= 20;
            document.removeEventListener('keydown', readRestStopInput);
            document.addEventListener('keydown', moveSprite);
            break;
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

function drawLocationMenu() {
    if(inRestStop) {
        drawRestStopMenu();
    }
}

function drawTransitionMenu() {
    if(inRestStop) {
        switch (currentCity) {
            case City.CHEYENNE:
                var travelToCheyenne = new Image();
                travelToCheyenne.src = '/src/img/travel-cheyenne.png';
                var popUpWidth = canvas.width - 300;
                var popUpHeight = canvas.height - 300;
                var popUpX = (canvas.width - popUpWidth) / 2;
                var popUpY = (canvas.height - popUpHeight) / 2;

                ctx.drawImage(travelToCheyenne, popUpX, popUpY, popUpWidth, popUpHeight);
                ctx.font = '20px Verdana';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'left';

                var textX = popUpX + 100;
                var textY = popUpY + 250;
                var text = '...Traveling to Cheyenne...';
                ctx.fillText(text, textX, textY); textY += 25;
                text = '(Your ride was uneventful)';
                ctx.fillText(text, textX, textY); textY += 25;
                break;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(townBackground, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(sprite, spriteX, spriteY, spriteWidth, spriteHeight);

    drawLocationMenu();
    drawTransitionMenu();

    //ctx.drawImage(sprite, offsetPos.x, offsetPos.y, SPRITE_WIDTH, SPRITE_HEIGHT, spriteX, spriteY, spriteWidth, spriteHeight);
    // Draw the text
    //ctx.fillText('DENVER', titleX, titleY);
    requestAnimationFrame(draw);
}

sprite.onload = function() {
    townBackground.onload = function() {
        draw();
    };
};
