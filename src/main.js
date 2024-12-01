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



let enemyArray = [];

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

function checkDenverLocations() {
    if (spriteX >= 590 && spriteX <= 600 &&
        spriteY >= 260 && spriteY <= 280) {
        /** REST STOP **/
        enterDenverRestStop();
    } else if(spriteX >= 160 && spriteX <= 240 &&
        spriteY >= 360 && spriteY <= 380) {
        /** FACTORY **/
        enterDenverFactory();
    } else if(spriteX >= 380 && spriteY <= 420 &&
        spriteY <= 10) {
        /** NORTH EXIT **/
        enterI25North(1220, 4510);
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

    /** Create enemy vehicles **/
    //var enemy;
    var enemy = { speed: 10, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0 };
    enemy.carSprite = new Image();
    enemy.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy.speed = 2;
    enemy.x = 2040;
    enemy.y = 4210;
    enemyArray.push(enemy);

    var enemy2 = { speed: 10, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0 };
    enemy2.carSprite = new Image();
    enemy2.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy2.speed = 2;
    enemy2.x = 1240;
    enemy2.y = 4510;

    //enemyArray.push(enemy2);

    var enemy3 = { speed: 10, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0 };
    enemy3.carSprite = new Image();
    enemy3.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy3.speed = 2;
    enemy3.x = 1740;
    enemy3.y = 3410;

    enemyArray.push(enemy3);
}

function checkCheyenneLocations() {
    if (spriteX >= 470 && spriteX <= 480 &&
        spriteY >= 200 && spriteY <= 210) {
        enterCheyenneRestStop();
    } else if(spriteX >= 380 && spriteX <= 420 &&
        spriteY >= 560) {
        enterI25North(1200, 100);
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
    if (cameraX >= 990 && cameraX <= 1800 &&
        cameraY <= -10) {

        spriteX = 400;
        spriteY = 550;
        currentRoad = Road.NONE;
        currentCity = City.CHEYENNE;
        townBackground.src= cheyenneBackground.src;

    } else if (cameraX >= 990 && cameraX <= 1800 &&
        cameraY >= 4530) {

        spriteX = 400;
        spriteY = 20;
        currentRoad = Road.NONE;
        currentCity = City.DENVER;
        townBackground.src= denverBackground.src;
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
    canvas.addEventListener('click', handleCanvasClick);
    inRestStop = true;
}

function enterDenverFactory() {
    console.log("Entering Factory");
    document.removeEventListener('keydown', moveSprite)
    //document.addEventListener('click', readDenverFactoryInput);
    document.addEventListener('click', handleCanvasClick);
    document.addEventListener('keydown', handleKeyDown);
    inFactory = true;
}

const options = ['Option 1', 'Option 2', 'Option 3'];
let dropdownVisible = false;
let selectedOption = null;
const inputBox = { x: 325, y: 205, width: 200, height: 30 };
const cancelBox = { x: 450, y: 500, width: 100, height: 30 };
const saveBox = { x: 600, y: 500, width: 100, height: 30 };
let carNameText = '';
let inputActive = false;

function handleKeyDown(event) {
    if (inputActive) {


        if (event.key === 'Backspace') {
            carNameText = carNameText.slice(0, -1);
        }

        if(carNameText.length > 16) {
            return;
        }

        if (event.key.length === 1) {
            carNameText += event.key;
        }
        drawInputBox();
    }
}

function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log('click at: ' + x + ", " + y);
    // Check if the click is inside the input box
    if (x >= inputBox.x && x <= inputBox.x + inputBox.width && y >= inputBox.y && y <= inputBox.y + inputBox.height) {
        inputActive = true;
    } else {
        inputActive = false;
    }


    if (x >= bodyOptionLocation.x && x <= bodyOptionLocation.x + bodyOptionLocation.width && y >= bodyOptionLocation.y - 25 && y <= bodyOptionLocation.y - 25 + bodyOptionLocation.height) {
        console.log('Pressed Body Option...');
        tempCar.body = getNextEnum(bodyArray, tempCar.body);
    }

    if (x >= chassisOptionLocation.x && x <= chassisOptionLocation.x + chassisOptionLocation.width && y >= chassisOptionLocation.y - 25 && y <= chassisOptionLocation.y - 25 + chassisOptionLocation.height) {
        console.log('Pressed Chassis Option...');
        tempCar.chassis = getNextEnum(chassisArray, tempCar.chassis);
    }

    if (x >= fusionEngineOptionLocation.x && x <= fusionEngineOptionLocation.x + fusionEngineOptionLocation.width && y >= fusionEngineOptionLocation.y - 25 && y <= fusionEngineOptionLocation.y - 25 + fusionEngineOptionLocation.height) {
        console.log('Pressed Fusion Engine Option...');
        tempCar.fusionEngine = getNextEnum(fusionEngineArray, tempCar.fusionEngine);
    }

    if (x >= tiresOptionLocation.x && x <= tiresOptionLocation.x + tiresOptionLocation.width && y >= tiresOptionLocation.y - 25 && y <= tiresOptionLocation.y - 25 + tiresOptionLocation.height) {
        console.log('Pressed Tire Option...');
        tempCar.tires = getNextEnum(tiresArray, tempCar.tires);
    }

    if (x >= weaponFrontOptionLocation.x && x <= weaponFrontOptionLocation.x + weaponFrontOptionLocation.width && y >= weaponFrontOptionLocation.y - 25 && y <= weaponFrontOptionLocation.y - 25 + weaponFrontOptionLocation.height) {
        console.log('Pressed Tire Option...');
        tempCar.weaponFront = getNextEnum(weaponArray, tempCar.weaponFront);
    }

    if (x >= weaponBackOptionLocation.x && x <= weaponBackOptionLocation.x + weaponBackOptionLocation.width && y >= weaponBackOptionLocation.y - 25 && y <= weaponBackOptionLocation.y - 25 + weaponBackOptionLocation.height) {
        console.log('Pressed Tire Option...');
        tempCar.weaponBack = getNextEnum(weaponArray, tempCar.weaponBack);
    }

    if (inBox(x, y, weaponLeftOptionLocation)) {
        console.log('Pressed Tire Option...');
        tempCar.weaponLeft = getNextEnum(weaponArray, tempCar.weaponLeft);
    }

    if (inBox(x, y, weaponRightOptionLocation)) {
        console.log('Pressed Tire Option...');
        tempCar.weaponRight = getNextEnum(weaponArray, tempCar.weaponRight);
    }

    if (inBox(x, y, weaponTopOptionLocation)) {
        console.log('Pressed Tire Option...');
        tempCar.weaponTop = getNextEnum(weaponArray, tempCar.weaponTop);
    }

    calcAndSetCarCost(tempCar);

    // leave the factory
    if (x >= cancelBox.x && x <= cancelBox.x + cancelBox.width && y >= cancelBox.y && y <= cancelBox.y + cancelBox.height) {
        inFactory = false;
        inputActive = false;
        spriteY -= 40;
        document.removeEventListener('click', handleCanvasClick);
        document.removeEventListener('keydown', handleKeyDown);
        document.addEventListener('keydown', moveSprite);
    }

    if (x >= saveBox.x && x <= saveBox.x + saveBox.width && y >= saveBox.y && y <= saveBox.y + saveBox.height) {
        playerCar = tempCar;
        player.hasCar = true;
        player.car = playerCar;
        sprite.src = '/src/img/car-sprite-forward.png';
        inFactory = false;
        inputActive = false;
        spriteY -= 40;
        document.removeEventListener('click', handleCanvasClick);
        document.removeEventListener('keydown', handleKeyDown);
        document.addEventListener('keydown', moveSprite);
    }

    //drawInputBox();
}

function calcAndSetCarCost(carSpecs) {
    var total = carSpecs.body.COST + carSpecs.chassis.COST + carSpecs.fusionEngine.COST + carSpecs.tires.COST +
        carSpecs.weaponFront.COST + carSpecs.weaponBack.COST + carSpecs.weaponLeft.COST + carSpecs.weaponRight.COST +
        carSpecs.weaponTop.COST;

    carSpecs.cost = total;
}

function inBox(x, y, boxRect) {
    if (x >= boxRect.x && x <= boxRect.x + boxRect.width && y >= boxRect.y - 25 && y <= boxRect.y - 25 + boxRect.height) {
        return true;
    }
    return false;
}

function drawInputBox() {
    ctx.fillStyle = '#EEEEEE';
    ctx.fillRect(inputBox.x, inputBox.y, inputBox.width, inputBox.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'green';
    ctx.strokeRect(inputBox.x, inputBox.y, inputBox.width, inputBox.height);
    ctx.fillStyle = 'green';
    ctx.font = '16px Arial';
    ctx.fillText(carNameText, inputBox.x + 25, inputBox.y + 20);

    if(inputActive) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';
        textWidth = ctx.measureText(carNameText).width;
        ctx.fillRect(inputBox.x + 30 + textWidth, inputBox.y + 5, 2, 20);
    }
}

function drawButtons() {
    ctx.fillStyle = '#999999';
    ctx.fillRect(cancelBox.x, cancelBox.y, cancelBox.width, cancelBox.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.strokeRect(cancelBox.x, cancelBox.y, cancelBox.width, cancelBox.height);
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText('CANCEL', cancelBox.x + 20, cancelBox.y + 20);

    ctx.fillStyle = 'green';
    ctx.fillRect(saveBox.x, saveBox.y, saveBox.width, saveBox.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.strokeRect(saveBox.x, saveBox.y, saveBox.width, saveBox.height);
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText('SAVE', saveBox.x + 25, saveBox.y + 20);
}

function drawDropdownButton() {
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(100, 50, 150, 30);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(100, 100, 150, 30);
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText('Select an option', 55, 70);
}

// Draw the drop-down menu options
function drawDropdownOptions() {
    ctx.fillStyle = 'white';
    ctx.fillRect(100, 130, 150, options.length * 30);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(100, 130, 150, options.length * 30);
    for (let i = 0; i < options.length; i++) {
        ctx.fillStyle = 'black';
        ctx.fillText(options[i], 105, 150 + i * 30);
    }
}

function readDenverFactoryInput(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if the click is on the drop-down button
    if (x >= 100 && x <= 300 && y >= 150 && y <= 180) {
        dropdownVisible = !dropdownVisible;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawDropdownButton();
        if (dropdownVisible) {
            drawDropdownOptions();
        }
    } else if (dropdownVisible && x >= 50 && x <= 200 && y >= 80 && y <= 80 + options.length * 30) {
        // Check if the click is on a drop-down option
        const selectedIndex = Math.floor((y - 80) / 30);
        selectedOption = options[selectedIndex];
        dropdownVisible = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawDropdownButton();
        alert(`You selected: ${selectedOption}`);
    }
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

const Subcompact = Object.freeze({
    NAME: 'Subcompact',
    COST: 300,
    WEIGHT: 500,
    CUBIC_FEET: 200
});

const Compact = Object.freeze({
    NAME: 'Compact',
    COST: 400,
    WEIGHT: 600,
    CUBIC_FEET: 220
});

const MidSize = Object.freeze({
    NAME: 'Mid-size',
    COST: 600,
    WEIGHT: 800,
    CUBIC_FEET: 240
});

const Suv = Object.freeze({
    NAME: 'SUV',
    COST: 800,
    WEIGHT: 900,
    CUBIC_FEET: 300
});

const Semi = Object.freeze({
    NAME: 'Semi',
    COST: 30000,
    WEIGHT: 10000,
    CUBIC_FEET: 6000
});

const Pickup = Object.freeze({
    NAME: 'Pickup',
    COST: 900,
    WEIGHT: 1000,
    CUBIC_FEET: 600
});


const LightChassis = Object.freeze({
    NAME: 'Light',
    COST: 300,
    WEIGHT: 1200,
    CUBIC_FEET: 200
});

const StandardChassis = Object.freeze({
    NAME: 'Standard',
    COST: 400,
    WEIGHT: 1500,
    CUBIC_FEET: 300
});

const LargeChassis = Object.freeze({
    NAME: 'Large',
    COST: 600,
    WEIGHT: 2300,
    CUBIC_FEET: 400
});

const HeavyChassis = Object.freeze({
    NAME: 'Heavy',
    COST: 800,
    WEIGHT: 2500,
    CUBIC_FEET: 600
});

const ExtraHeavyChassis = Object.freeze({
    NAME: 'ExtraHeavy',
    COST: 900,
    WEIGHT: 3200,
    CUBIC_FEET: 800
});

const MegaLoadChassis = Object.freeze({
    NAME: 'Light',
    COST: 300,
    WEIGHT: 1200,
    CUBIC_FEET: 200
});

const Chassis = Object.freeze({
    LIGHT: LightChassis,
    STANDARD: StandardChassis,
    LARGE: LargeChassis,
    HEAVY: HeavyChassis,
    EXTRA_HEAVY: ExtraHeavyChassis,
    MEGALOAD: MegaLoadChassis
});
const chassisArray = Object.values(Chassis);


const SmallEngine = Object.freeze({
    NAME: 'Small',
    COST: 300,
    WEIGHT: 400,
    CUBIC_FEET: 25,
    KWATTS: 100,
    HP: 200
});

const MediumEngine = Object.freeze({
    NAME: 'Medium',
    COST: 400,
    WEIGHT: 500,
    CUBIC_FEET: 50,
    KWATTS: 125,
    HP: 300
});

const LargeEngine = Object.freeze({
    NAME: 'Large',
    COST: 600,
    WEIGHT: 600,
    CUBIC_FEET: 75,
    KWATTS: 150,
    HP: 400
});

const ExtraLargeEngine = Object.freeze({
    NAME: 'ExtraLarge',
    COST: 800,
    WEIGHT: 700,
    CUBIC_FEET: 100,
    KWATTS: 200,
    HP: 600
});

const MegaCoreEngine = Object.freeze({
    NAME: 'MegaCore',
    COST: 900,
    WEIGHT: 1000,
    CUBIC_FEET: 200,
    KWATTS: 500,
    HP: 1200
});

const FusionEngine = Object.freeze({
    SMALL: SmallEngine,
    MEDIUM: MediumEngine,
    LARGE: LargeEngine,
    EXTRA_LARGE: ExtraLargeEngine,
    MEGA_CORE: MegaCoreEngine,
});
const fusionEngineArray = Object.values(FusionEngine);

const Body = Object.freeze({
    SUBCOMPACT: Subcompact,
    COMPACT: Compact,
    MIDSIZE: MidSize,
    SUV: Suv,
    PICKUP: Pickup,
    SEMI: Semi
});
const bodyArray = Object.values(Body);

function getNextEnum(enumArray, currentEnum) {
    const currentIndex = enumArray.indexOf(currentEnum);
    const nextIndex = (currentIndex + 1) % enumArray.length;
    return enumArray[nextIndex];
}

const StandardTires = Object.freeze({
    NAME: 'Standard',
    COST: 50,
    WEIGHT: 30,
    CUBIC_FEET: 5,
    HP: 5
});

const OffRoad = Object.freeze({
    NAME: 'Off-Road',
    COST: 100,
    WEIGHT: 40,
    CUBIC_FEET: 10,
    HP: 10
});

const RunFlat = Object.freeze({
    NAME: 'Run-Flat',
    COST: 200,
    WEIGHT: 50,
    CUBIC_FEET: 5,
    HP: 15
});

const Solid = Object.freeze({
    NAME: 'Solid',
    COST: 500,
    WEIGHT: 75,
    CUBIC_FEET: 5,
    HP: 20
});

const Tires = Object.freeze({
    STANDARD: StandardTires,
    OFF_ROAD: OffRoad,
    RUN_FLAT: RunFlat,
    SOLID: Solid
});
const tiresArray = Object.values(Tires);

const MachineGun = Object.freeze({
    NAME: 'Machine Gun',
    COST: 1000,
    WEIGHT: 3,
    UNIT: 20,
    CUBIC_FEET: 5,
    DAMAGE: 20,
    AREA_DAMAGE: false
});

const GrenadeLauncher = Object.freeze({
    NAME: 'Gr. Launchr',
    COST: 1000,
    WEIGHT: 5,
    UNIT: 1,
    CUBIC_FEET: 10,
    DAMAGE: 16,
    AREA_DAMAGE: true
});

const RocketLauncher = Object.freeze({
    NAME: 'Rckt Launchr',
    COST: 1000,
    WEIGHT: 25,
    UNIT: 1,
    CUBIC_FEET: 10,
    DAMAGE: 24,
    AREA_DAMAGE: false
});

const FlameThrower = Object.freeze({
    NAME: 'Flame Thrwr',
    COST: 500,
    WEIGHT: 5,
    UNIT: 1,
    CUBIC_FEET: 10,
    DAMAGE: 20,
    AREA_DAMAGE: false
});

const None = Object.freeze({
    NAME: 'None',
    COST: 0
});

const Weapon = Object.freeze({
    MACHINE_GUN: MachineGun,
    GRENADE_LAUNCHER: GrenadeLauncher,
    ROCKET_LAUNCHER: RocketLauncher,
    FLAME_THROWER: FlameThrower,
    NONE: None,
});
const weaponArray = Object.values(Weapon);

var bodyOptionLocation = { x: 0, y: 0, width: 150, height: 25};
var chassisOptionLocation = { x: 0, y: 0, width: 150, height: 25 };
var fusionEngineOptionLocation = { x: 0, y: 0, width: 150, height: 25 };
var tiresOptionLocation = {x: 0, y: 0, width: 150, height: 25 };
var weaponFrontOptionLocation = { x: 0, y: 0, width: 150, height: 25 };
var weaponBackOptionLocation = { x: 0, y: 0, width: 150, height: 25 };
var weaponLeftOptionLocation = { x: 0, y: 0, width: 150, height: 25  };
var weaponRightOptionLocation = { x: 0, y: 0, width: 150, height: 25  };
var weaponTopOptionLocation = { x: 0, y: 0, width: 150, height: 25  };

var costLocation = { x: 0, y: 0 };
var moneyLocation = { x: 0, y: 0 };


var playerCar = { cost: 1000, body: Body.SUBCOMPACT, chassis: LightChassis, fusionEngine: SmallEngine , tires: StandardTires,
    weaponFront: Weapon.NONE, weaponBack: Weapon.NONE, weaponLeft: Weapon.NONE, weaponRight: Weapon.NONE,
    weaponTop: Weapon.NONE };

var tempCar;

function drawBuildCarMenu() {
    var boxWidth = canvas.width - 100;
    var boxHeight = canvas.height - 100;
    var boxX = (canvas.width - boxWidth) / 2;
    var boxY = (canvas.height - boxHeight) / 2;

    /** SAVE A TEMP CAR THAT MIGHT BE SAVED LATER **/
    tempCar = playerCar;

    /** STATIC ITEMS ON MENU **/
    ctx.fillStyle = 'grey';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 25;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    ctx.strokeStyle = 'green';
    ctx.lineWidth = 4;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    var factoryImg = new Image();
    factoryImg.src = '/src/img/factory-build.png';
    ctx.drawImage(factoryImg, boxX, boxY, boxWidth, 133);

    ctx.font = '20px Verdana';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';

    var textX = boxX + 100;
    var textY = boxY + 150;
    ctx.fillStyle = 'blue';
    var text = 'BUILD YOUR CAR';
    ctx.fillText(text, textX, textY);
    textY += 25;

    ctx.font = '20px Verdana';
    ctx.fillStyle = '#00FFFF';
    text = 'Name Your Car: ';
    ctx.fillText(text, textX, textY);
    textY += 30;
    drawInputBox();

    drawButtons();

    ctx.font = '20px Verdana';
    ctx.fillStyle = '#00FFFF';
    text = 'Money (qc): '; // + playerMoney;
    var alignWithMoneyY = textY;
    ctx.fillText(text, textX, textY); textY += 25;
    text = 'Cost    (qc): '; // + cost;
    ctx.fillText(text, textX, textY);  textY += 25;
    text = 'Body: ';
    ctx.fillText(text, textX, textY);  textY += 25;
    text = 'Chassis/';
    ctx.fillText(text, textX, textY);  textY += 25;
    text = 'Suspension: ';
    ctx.fillText(text, textX, textY);  textY += 25;

    /** ARMOR **/
    var armorY = textY;
    var armorX = textX + 210;
    text = "Armr St Bt";
    ctx.fillText(text, armorX, armorY);  armorY += 25;
    text = "F:";
    ctx.fillText(text, armorX, armorY);  armorY += 25;
    text = "B:";
    ctx.fillText(text, armorX, armorY);  armorY += 25;
    text = "L:";
    ctx.fillText(text, armorX, armorY);  armorY += 25;
    text = "R:";
    ctx.fillText(text, armorX, armorY);  armorY += 25;

    /** Box for Unchangeable Vales **/
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2; textY += 2;
    ctx.strokeRect(textX - 2, textY, 200, 150); textY += 20;

    text = 'Max Weight: ';
    ctx.fillText(text, textX, textY);  textY += 25;
    text = 'Max Space: ';
    ctx.fillText(text, textX, textY);  textY += 25;
    text = 'Top Speed: ';
    ctx.fillText(text, textX, textY);  textY += 25;
    text = 'Top Speed: ';
    ctx.fillText(text, textX, textY);  textY += 25;

    text = 'Weight Left: ';
    ctx.fillText(text, textX, textY);  textY += 25;
    text = 'Space Left: ';
    ctx.fillText(text, textX, textY);  textY += 25;

    textX += 300;
    textY = alignWithMoneyY;
    fusionEngineOptionLocation.x = textX + 125;
    fusionEngineOptionLocation.y = textY;
    text = 'Power Plant: ';
    ctx.fillText(text, textX, textY);  textY += 25;

    tiresOptionLocation.x = textX + 125;
    tiresOptionLocation.y = textY;
    text = 'Tires: ';
    ctx.fillText(text, textX, textY);  textY += 50;


    text = 'Weapons';
    textX += 75;
    ctx.fillText(text, textX, textY);  textY += 25;

    text = 'Front:';
    textX -= 25;
    weaponFrontOptionLocation.x = textX + 75;
    weaponFrontOptionLocation.y = textY;
    ctx.fillText(text, textX, textY);  textY += 25;
    text = 'Back:';
    weaponBackOptionLocation.x = textX + 75;
    weaponBackOptionLocation.y = textY;
    ctx.fillText(text, textX, textY);  textY += 25;
    text = 'Left:';
    weaponLeftOptionLocation.x = textX + 75;
    weaponLeftOptionLocation.y = textY;
    ctx.fillText(text, textX, textY);  textY += 25;
    text = 'Right:';
    weaponRightOptionLocation.x = textX + 75;
    weaponRightOptionLocation.y = textY;
    ctx.fillText(text, textX, textY);  textY += 25;
    text = 'Top:';
    weaponTopOptionLocation.x = textX + 75;
    weaponTopOptionLocation.y = textY;
    ctx.fillText(text, textX, textY);  textY += 25;

    /** PLAYER CHANGEABLE ITEMS **/
    ctx.fillStyle = '#FFFFFF';
    if(player.money - tempCar.cost < 0) {
        ctx.fillStyle = '#FF0000';
    }
    text = '' + player.money - tempCar.cost;
    textX = (canvas.width - boxWidth) / 2 + 225;

    moneyLocation.x = textX;
    moneyLocation.y = textY;
    textY = alignWithMoneyY;
    ctx.fillText(text, textX, alignWithMoneyY); textY += 25;
    ctx.fillStyle = '#FFFFFF';

    costLocation.x = textX;
    costLocation.y = textY;
    text = '' + tempCar.cost;
    ctx.fillText(text, textX, textY);  textY += 25;

    bodyOptionLocation.x = textX;
    bodyOptionLocation.y = textY;
    text = '[' + tempCar.body.NAME + ']';
    ctx.fillText(text, textX, textY);  textY += 50;

    chassisOptionLocation.x = textX;
    chassisOptionLocation.y = textY;
    text = '[' + tempCar.chassis.NAME + ']';
    ctx.fillText(text, textX, textY);  textY += 25;

    text = '[' + tempCar.fusionEngine.NAME + ']';
    ctx.fillText(text, fusionEngineOptionLocation.x, fusionEngineOptionLocation.y);

    text = '[' + tempCar.tires.NAME + ']';
    ctx.fillText(text, tiresOptionLocation.x, tiresOptionLocation.y);

    text = '[' + tempCar.weaponFront.NAME + ']';
    ctx.fillText(text, weaponFrontOptionLocation.x, weaponFrontOptionLocation.y);

    text = '[' + tempCar.weaponBack.NAME + ']';
    ctx.fillText(text, weaponBackOptionLocation.x, weaponBackOptionLocation.y);

    text = '[' + tempCar.weaponLeft.NAME + ']';
    ctx.fillText(text, weaponLeftOptionLocation.x, weaponLeftOptionLocation.y);

    text = '[' + tempCar.weaponRight.NAME + ']';
    ctx.fillText(text, weaponRightOptionLocation.x, weaponRightOptionLocation.y);

    text = '[' + tempCar.weaponTop.NAME + ']';
    ctx.fillText(text, weaponTopOptionLocation.x, weaponTopOptionLocation.y);
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

function drawLocationMenu() {
    if(inRestStop) {
        drawRestStopMenu();
    } else if(inFactory) {
        drawBuildCarMenu();
        //drawInputBox()
        //drawDropdownButton();
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getColorAt(x, y) {
    const imageData = ctx.getImageData(x, y, 1, 1);
    imageData.willReadFrequently = true;

    const data = imageData.data;
    return {
        r: data[0], g: data[1], b: data[2], a: data[3]
    };
}

function isObjectInView(locX, locY, camX, camY, width, height) {
    return true;
    //console.log("check if ("+camX+">="+locX+") and ("+camX+","+camY+") and ("+camX + width+","+camY + height+")");

/** NOTE: Would be nice to get this calculation correct but this one doesn't work right **
    if(locX <= camX && locX <= camX + width &&
        locY <= camY && locY <= camY + height ) {
        return true;
    }
    return false;
*/
}

function calculateAngle(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const angleInRadians = Math.atan2(deltaY, deltaX);
    const angleInDegrees = angleInRadians * (180 / Math.PI);
    return angleInDegrees;
}

function enemyAction(playerX, playerY, enemy) {
    if(playerX <= enemy.x + 400 && playerX >= enemy.x - 400 &&
        playerY <= enemy.y + 300 && playerY >= enemy.y - 300) {
        enemy.moves++;
        if(enemy.moves % 3 !== 0) {
            return;
        }

        let dx = playerX - enemy.x;
        let dy = playerY - enemy.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Normalize the direction vector and set the enemy speed
        if (distance > 0) {
            dx /= distance;
            dy /= distance;
        }

        // Update enemy position
        let tempX = Math.round(enemy.x + (dx * enemy.speed));
        let tempY = Math.round(enemy.y + (dy * enemy.speed));

        const color = getColorAt(tempX - cameraX + (canvas.width/2), tempY - cameraY + (canvas.height/2));
        //console.log(`Color sprite (${tempX}, ${tempY}): rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
        if (color.r === 0 && color.g === 0 && color.b === 0) {
            enemy.prevX = enemy.x;
            enemy.prevY = enemy.y;

            enemy.x = tempX;
            enemy.y = tempY;

            let angle = calculateAngle(enemy.x, enemy.y, enemy.prevX, enemy.prevY);
            console.log("angle: " + angle);
            if(angle >= -22.5 && angle <= 22.5) {
                enemy.carSprite.src = '/src/img/maroon-racer-left.png';
            } else if(angle >= 22.5 && angle <= 67.5) {
                enemy.carSprite.src = '/src/img/maroon-racer-upper-left.png';
            } else if(angle >= 67.5 && angle <= 112.5) {
                enemy.carSprite.src = '/src/img/maroon-racer-forward.png';
            } else if(angle >= 112.5 && angle <= 157.5) {
                enemy.carSprite.src = '/src/img/maroon-racer-upper-right.png';
            } else if((angle >= 157.5 && angle <= 180) || (angle >= -180 && angle <= -157.5)) {
                enemy.carSprite.src = '/src/img/maroon-racer-right.png';
            } else if(angle >= -157.5 && angle <= -112.5) {
                enemy.carSprite.src = '/src/img/maroon-racer-lower-right.png';
            } else if(angle >= -112.5 && angle <= -67.5) {
                enemy.carSprite.src = '/src/img/maroon-racer-down.png';
            } else if(angle >= -67.5 && angle <= -22.5) {
                enemy.carSprite.src = '/src/img/maroon-racer-lower-left.png';
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Large map tile scrolling vs single screen city map
    if(currentCity === City.NONE) {
        //console.log('cameraX: ' + cameraX + ',' + cameraY);
        ctx.drawImage(roadBackground, cameraX, cameraY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(sprite, (canvas.width/2), (canvas.height/2), spriteWidth, spriteHeight);

        //ctx.drawImage(enemySprite, enemySprite.x, enemySprite.y, enemyWidth, enemyHeight);
        for(let enemy of enemyArray) {
            enemyAction(cameraX, cameraY, enemy);

            if (isObjectInView(enemy.x, enemy.y, cameraX, cameraY, canvas.width, canvas.height)) {
                ctx.drawImage(enemy.carSprite, (enemy.x - cameraX + (canvas.width/2)), (enemy.y - cameraY + (canvas.height/2)), enemyWidth, enemyHeight);
            }
        }

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
