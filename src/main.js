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
    NEW_ORLEANS: 'new orleans',
    NONE: 'none'
});

const Road = Object.freeze({
    I25_NORTH: 'i25 north',
    I25_SOUTH: 'i25 south',
    I70_WEST: 'i70 west',
    I70_EAST: 'i70 west',
    I15_SOUTH: 'i15 north',
    I15_NORTH: 'i15 south',
    I84_NORTH: 'i84 north',
    NONE: 'none'
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

    switch (e.code) {
        case 'ArrowUp':
            tempY -= speed;
            tempCameraY -= speed;
            break;
        case 'ArrowDown':
            tempY += speed;
            tempCameraY += speed;
            break;
        case 'ArrowLeft':
            tempX -= speed;
            tempCameraX -= speed;
            break;
        case 'ArrowRight':
            tempX += speed;
            tempCameraX += speed;
            break;
    }

    const color = getColorAt(tempX + (spriteWidth / 2) - 1, tempY - 10);
    console.log(`Color sprite (${tempX}, ${tempY}): rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
    console.log(`Color camera (${cameraX}, ${cameraY}): rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
    if (color.r === 0 && color.g === 0 && color.b === 0) {
        if(currentCity === City.NONE) {
            cameraX = tempCameraX;
            cameraY = tempCameraY;
        } else {
            spriteX = tempX;
            spriteY = tempY;
        }
        checkPlayerLocation();
    }

}

function checkDenverLocations() {
    if (spriteX >= 590 && spriteX <= 600 &&
        spriteY >= 260 && spriteY <= 280) {
        /** REST STOP **/
        enterDenverRestStop();
    } else if(spriteX >= 380 && spriteY <= 420 &&
        spriteY <= 10) {
        /** NORTH EXIT **/
        enterI25North(920, 4520);
    }
}

function enterI25North(camX, camY) {
    console.log('Leaving for Cheyenne');

    roadBackground.src = '/src/img/i25-north.png';
    roadBackground.onload = function drawSelf() {
        draw();
    }

    cameraX = camX;
    cameraY = camY;//5140;
    spriteX = (canvas.width / 2);
    spriteY = (canvas.height / 2);

    currentCity = City.NONE;
    currentRoad = Road.I25_NORTH;
}

function checkCheyenneLocations() {
    if (spriteX >= 470 && spriteX <= 480 &&
        spriteY >= 200 && spriteY <= 210) {
        enterCheyenneRestStop();
    } else if(spriteX >= 380 && spriteX <= 420 &&
        spriteY >= 560) {
        enterI25North(900, 100);
    }
}

function checkGrandJunctionLocations() {
    if (spriteX >= 200 && spriteX <= 220 &&
        spriteY >= 250 && spriteY <= 270) {
        enterGrandJunctionRestStop();
    }
}

function checkLasVegasLocations() {
    if (spriteX >= 440 && spriteX <= 460 &&
        spriteY >= 210 && spriteY <= 230) {
        enterLasVegasRestStop();
    } else if(spriteX >= 200 && spriteX <= 220 &&
        spriteY >= 420 && spriteY <= 440) {
        enterCasino();
    }
}

function checkI25NorthLocations() {
    if (cameraX >= 690 && cameraX <= 1100 &&
        cameraY <= -10) {

        spriteX = 400;
        spriteY = 550;
        currentRoad = Road.NONE;
        currentCity = City.CHEYENNE;
        townBackground.src= cheyenneBackground.src;

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
        }
    }
}


function enterDenverRestStop() {
    console.log("Entering Rest Stop");
    document.removeEventListener('keydown', moveSprite)
    document.addEventListener('keydown', readDenverRestStopInput);
    inRestStop = true;
}

function enterCheyenneRestStop() {
    console.log("Entering Rest Stop");
    document.removeEventListener('keydown', moveSprite);
    document.addEventListener('keydown', readCheyenneRestStopInput);
    inRestStop = true;
}

function enterGrandJunctionRestStop() {
    console.log("Entering Rest Stop");
    document.removeEventListener('keydown', moveSprite);
    document.addEventListener('keydown', readGrandJunctionRestStopInput);
    inRestStop = true;
}

function enterLasVegasRestStop() {
    console.log("Entering Rest Stop");
    document.removeEventListener('keydown', moveSprite);
    document.addEventListener('keydown', readLasVegasRestStopInput);
    inRestStop = true;
}

function enterCasino() {
    console.log("Entering Casino");
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
    ctx.fillText(text, textX, textY);
    textY += 50;

    var text = '== BUS SCHEDULE ==';
    ctx.fillText(text, textX, textY);
    textY += 25;
    switch (currentCity) {
        case City.DENVER:
            text = '    1. Denver --> Cheyenne 200qc';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '    2. Denver --> Sante Fe 200qc';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '    3. Denver --> Kansas City 200qc';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '    4. Denver --> Grand Junction 200qc';
            ctx.fillText(text, textX, textY); textY += 50;
            break;
        case City.SANTE_FE:
            text = '    1. Sante Fe --> Denver 200qc';
            ctx.fillText(text, textX, textY);
            textY += 50;
            break;
        case City.CHEYENNE:
            text = '    1. Cheyenne --> Denver 200qc';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '    2. Cheyenne --> Billings 200qc';
            ctx.fillText(text, textX, textY);
            textY += 50;
            break;
        case City.GRAND_JUNCTION:
            text = '    1. Grand Junction --> Denver 200qc';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '    2. Grand Junction --> Salt Lake City 200qc';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '    3. Grand Junction --> Las Vegas 200qc';
            ctx.fillText(text, textX, textY);
            textY += 50;
            break;
        case City.SALT_LAKE_CITY:
            text = '    1. Salt Lake City --> Grand Junction 200qc';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '    2. Salt Lake --> Boise 200qc';
            ctx.fillText(text, textX, textY);
            textY += 50;
            break;
        case City.BOISE:
            text = '    1. Boise --> Salt Lake City 200qc';
            ctx.fillText(text, textX, textY);
            textY += 50;
            break;
        case City.LAS_VEGAS:
            text = '    1. Las Vegas --> Grand Junction 200qc';
            ctx.fillText(text, textX, textY);
            textY += 50;
            break;
        case City.BILLINGS:
            text = '    1. Billings --> Cheyenne 200qc';
            ctx.fillText(text, textX, textY);
            textY += 50;
            break;
    }

    text = '5. Listen for rumors';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '6. Buy Deuterium/Tritium for car power 100qc';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '7. Stay over night 20qc';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '8. Leave the Rest Stop';
    ctx.fillText(text, textX, textY);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadCityChanges(cityLocation) {
    currentCity = cityLocation;
    inTransition = true;

    switch(currentCity) {
        case City.DENVER:
            await sleep(4000);

            spriteX = 570;
            spriteY = 260;

            inRestStop = false;
            townBackground.src= denverBackground.src;
            document.removeEventListener('keydown', readDenverRestStopInput);
            document.removeEventListener('keydown', readCheyenneRestStopInput);
            document.removeEventListener('keydown', readGrandJunctionRestStopInput);
            document.addEventListener('keydown', moveSprite);
            break;
        case City.CHEYENNE:
            await sleep(4000);

            spriteX = 450;
            spriteY = 200;

            inRestStop = false;
            townBackground.src= cheyenneBackground.src;
            document.removeEventListener('keydown', readDenverRestStopInput);
            document.removeEventListener('keydown', readCheyenneRestStopInput);
            document.addEventListener('keydown', moveSprite);
            break;
        case City.GRAND_JUNCTION:
            await sleep(4000);

            spriteX = 220;
            spriteY = 260;

            inRestStop = false;
            townBackground.src= grandJunctionBackground.src;
            document.removeEventListener('keydown', readCheyenneRestStopInput);
            document.addEventListener('keydown', moveSprite);
            break;
        case City.LAS_VEGAS:
            await sleep(4000);

            spriteX = 460;
            spriteY = 240;

            inRestStop = false;
            townBackground.src= lasVegasBackground.src;
            document.removeEventListener('keydown', readLasVegasRestStopInput);
            document.addEventListener('keydown', moveSprite);
            break;
    }

    inTransition = false;
}

function readDenverRestStopInput(e) {
    switch (e.key) {
        case '1':
            inRestStop = false;
            loadCityChanges(City.CHEYENNE);
            break;
        case '4':
            inRestStop = false;
            loadCityChanges(City.GRAND_JUNCTION);
            break;
        case '8':
            inRestStop = false;
            spriteX -= 20;
            document.removeEventListener('keydown', readDenverRestStopInput);
            document.addEventListener('keydown', moveSprite);
            break;
    }
}

function readCheyenneRestStopInput(e) {
    switch (e.key) {
        case '1':
            inRestStop = false;
            loadCityChanges(City.DENVER);
            break;
        case '8':
            inRestStop = false;
            spriteX -= 20;
            document.removeEventListener('keydown', readCheyenneRestStopInput);
            document.addEventListener('keydown', moveSprite);
            break;
    }
}

function readLasVegasRestStopInput(e) {
    switch (e.key) {
        case '1':
            inRestStop = false;
            loadCityChanges(City.GRAND_JUNCTION);
            break;
        case '8':
            inRestStop = false;
            spriteY += 20;
            document.removeEventListener('keydown', readLasVegasRestStopInput);
            document.addEventListener('keydown', moveSprite);
            break;
    }
}

function readGrandJunctionRestStopInput(e) {
    switch (e.key) {
        case '1':
            inRestStop = false;
            loadCityChanges(City.DENVER);
            break;
        case '2':
            inRestStop = false;
            loadCityChanges(City.SALT_LAKE_CITY);
            break;
        case '3':
            inRestStop = false;
            loadCityChanges(City.LAS_VEGAS);
            break;
        case '8':
            inRestStop = false;
            spriteX += 20;
            document.removeEventListener('keydown', readGrandJunctionRestStopInput);
            document.addEventListener('keydown', moveSprite);
            break;
    }
}

function getColorAt(x, y) {
    const imageData = ctx.getImageData(x, y, 1, 1);
    imageData.willReadFrequently = true;

    const data = imageData.data;
    return {
        r: data[0], g: data[1], b: data[2], a: data[3]
    };
}

function drawLocationMenu() {
    if(inRestStop) {
        drawRestStopMenu();
    }
}

async function drawTransitionMenu() {
    if (inTransition) {
        var popUpWidth = canvas.width - 300;
        var popUpHeight = canvas.height - 300;
        var popUpX = (canvas.width - popUpWidth) / 2;
        var popUpY = ((canvas.height - popUpHeight) / 2) - 25;

        var travelImg = new Image();
        switch (currentCity) {
            case City.CHEYENNE:
                travelImg.src = '/src/img/travel-cheyenne.png';

                ctx.drawImage(travelImg, popUpX, popUpY, popUpWidth, popUpHeight);
                ctx.font = '20px Verdana';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'left';

                var textX = popUpX + 100;
                var textY = popUpY + 250;

                var text = '...Traveling to Cheyenne...';
                ctx.fillText(text, textX, textY);
                textY += 25;

                text = '(Your ride was uneventful)';
                ctx.fillText(text, textX, textY);
                textY += 25;

                break;
            case City.DENVER:
                travelImg.src = '/src/img/travel-denver.png';

                ctx.drawImage(travelImg, popUpX, popUpY, popUpWidth, popUpHeight);
                ctx.font = '20px Verdana';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'left';

                var textX = popUpX + 100;
                var textY = popUpY + 250;

                var text = '...Traveling to Denver...';
                ctx.fillText(text, textX, textY);
                textY += 25;

                text = '(Your ride was rocky)';
                ctx.fillText(text, textX, textY);
                textY += 25;

                break;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Large map tile scrolling vs single screen city map
    if(currentCity === City.NONE) {
        ctx.drawImage(roadBackground, cameraX, cameraY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(sprite, (canvas.width/2), (canvas.height/2), spriteWidth, spriteHeight);
    } else {
        ctx.drawImage(townBackground, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(sprite, spriteX, spriteY, spriteWidth, spriteHeight);

        drawLocationMenu();
        drawTransitionMenu();
    }

    requestAnimationFrame(draw);
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
