const options = ['Option 1', 'Option 2', 'Option 3'];
let dropdownVisible = false;
let selectedOption = null;
const carNameInputBox = { x: 325, y: 205, width: 200, height: 30 };
const cancelBox = { x: 450, y: 500, width: 100, height: 30 };
const saveBox = { x: 600, y: 500, width: 100, height: 30 };
let carNameText = '';
let inputActive = false;

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

var playerCar = { cost: 1000, maxWeight: 5000, currentWeight: 0, maxSpace: 100, currentSpace: 10, topSpeed: 50,
    currentJob: null, name: null, direction: Direction.NORTH,
    body: Body.SUBCOMPACT, chassis: LightChassis, fusionEngine: SmallEngine , tires: StandardTires,
    weaponFront: Weapon.NONE, weaponBack: Weapon.NONE, weaponLeft: Weapon.NONE, weaponRight: Weapon.NONE,
    weaponTop: Weapon.NONE,
    frontArmor: 200, backArmor: 200, leftArmor: 200, rightArmor: 200 };

function Car(car) {
    this.cost = car.cost;
    this.maxWeight = car.maxWeight;
    this.currentWeight = car.currentWeight;
    this.maxSpace = car.maxSpace;
    this.currentSpace = car.currentSpace;
    this.topSpeed = car.topSpeed;
    this.currentJob = car.currentJob;
    this.name = car.name;
    this.body = car.body;
    this.chassis = car.chassis;
    this.fusionEngine = car.fusionEngine;
    this.tires = car.tires;
    this.weaponFront = car.weaponFront;
    this.weaponBack = car.weaponBack;
    this.weaponLeft = car.weaponLeft;
    this.weaponRight = car.weaponRight;
    this.weaponTop = car.weaponTop;
    this.frontArmor = car.frontArmor;
    this.backArmor = car.backArmor;
    this.leftArmor = car.leftArmor;
    this.rightArmor = car.rightArmor;
    this.direction = car.direction;
}

var tempCar;

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

async function popUpSaveError() {
    carSaveError = true;
    await sleep(3000);
    carSaveError = false;
}

function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log('click at: ' + x + ", " + y);
    // Check if the click is inside the input box
    if (x >= carNameInputBox.x && x <= carNameInputBox.x + carNameInputBox.width && y >= carNameInputBox.y && y <= carNameInputBox.y + carNameInputBox.height) {
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
        document.addEventListener('keydown', processPlayerInput);
    }

    if (x >= saveBox.x && x <= saveBox.x + saveBox.width && y >= saveBox.y && y <= saveBox.y + saveBox.height) {
        if((tempCar.maxWeight - tempCar.currentWeight) < 0 || (tempCar.maxSpace - tempCar.currentSpace) < 0 ||
            (player.money - tempCar.cost) < 0) {
            popUpSaveError();
            return;
        }

        storeCarInGarage();

        tempCar.name = carNameText;
        tempCar.direction = Direction.NORTH;
        playerCar = tempCar;
        player.car = new Car(tempCar);

        player.money -= tempCar.cost;
        tempCar = null;
        carNameText = '';

        player.hasCar = true;
        sprite.src = '/src/img/car-sprite-forward.png';
        inFactory = false;
        inputActive = false;
        spriteY -= 40;
        document.removeEventListener('click', handleCanvasClick);
        document.removeEventListener('keydown', handleKeyDown);
        document.addEventListener('keydown', processPlayerInput);
    }

    //drawInputBox();
}

function calcAndSetCarCost(carSpecs) {
    var total = carSpecs.body.COST + carSpecs.chassis.COST + carSpecs.fusionEngine.COST + carSpecs.tires.COST +
        carSpecs.weaponFront.COST + carSpecs.weaponBack.COST + carSpecs.weaponLeft.COST + carSpecs.weaponRight.COST +
        carSpecs.weaponTop.COST;

    var weight = carSpecs.body.WEIGHT + carSpecs.fusionEngine.WEIGHT +
        carSpecs.weaponFront.WEIGHT + carSpecs.weaponBack.WEIGHT + carSpecs.weaponLeft.WEIGHT + carSpecs.weaponRight.WEIGHT +
        carSpecs.weaponTop.WEIGHT;

    var maxWeight = carSpecs.chassis.WEIGHT;

    var maxSpace = carSpecs.body.CUBIC_FEET;
    var space = carSpecs.fusionEngine.CUBIC_FEET +
        carSpecs.weaponFront.CUBIC_FEET + carSpecs.weaponBack.CUBIC_FEET + carSpecs.weaponLeft.CUBIC_FEET + carSpecs.weaponRight.CUBIC_FEET +
        carSpecs.weaponTop.CUBIC_FEET;

    var topSpeed = (180 * carSpecs.fusionEngine.KWATTS * 20) /
        ((carSpecs.fusionEngine.KWATTS * 20) + weight);

    carSpecs.cost = total;
    carSpecs.currentWeight = weight;
    carSpecs.maxWeight = maxWeight;
    carSpecs.maxSpace = maxSpace;
    carSpecs.currentSpace = space;
    carSpecs.topSpeed = Math.round(topSpeed);
}

function inBox(x, y, boxRect) {
    if (x >= boxRect.x && x <= boxRect.x + boxRect.width && y >= boxRect.y - 25 && y <= boxRect.y - 25 + boxRect.height) {
        return true;
    }
    return false;
}

function drawInputBox() {
    ctx.fillStyle = '#EEEEEE';
    ctx.fillRect(carNameInputBox.x, carNameInputBox.y, carNameInputBox.width, carNameInputBox.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'green';
    ctx.strokeRect(carNameInputBox.x, carNameInputBox.y, carNameInputBox.width, carNameInputBox.height);
    ctx.fillStyle = 'green';
    ctx.font = '16px Arial';
    ctx.fillText(carNameText, carNameInputBox.x + 25, carNameInputBox.y + 20);

    if(inputActive) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';
        textWidth = ctx.measureText(carNameText).width;
        ctx.fillRect(carNameInputBox.x + 30 + textWidth, carNameInputBox.y + 5, 2, 20);
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

function drawBuildCarMenu() {
    var boxWidth = canvas.width - 100;
    var boxHeight = canvas.height - 100;
    var boxX = (canvas.width - boxWidth) / 2;
    var boxY = (canvas.height - boxHeight) / 2;

    /** SAVE A TEMP CAR THAT MIGHT BE SAVED LATER **/
    tempCar = playerCar;
    calcAndSetCarCost(tempCar);

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
    var armorInputY = armorY;
    var armorInputX = armorX + 25;
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
    var maxWeightY = textY;
    ctx.fillText(text, textX, textY);  textY += 25;
    text = 'Max Space: ';
    ctx.fillText(text, textX, textY);  textY += 25;
    text = 'Top Speed: ';
    ctx.fillText(text, textX, textY);  textY += 25;
    //text = 'Top Speed: ';
    //ctx.fillText(text, textX, textY);  textY += 25;
    textY += 25;

    text = 'Weight Left: ';
    ctx.fillText(text, textX, textY);  textY += 25;
    text = 'Space Left: ';
    ctx.fillText(text, textX, textY);  textY += 25;

    ctx.fillStyle = '#00FFFF';
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

    /* TODO Car Armor */
    //text = '[' + tempCar.armorFront + ']';
    //ctx.fillText(text, armorInputX, armorInputY); armorInputX += 25;

    /** DERIVED VALUES FROM USER INPUT **/
    ctx.fillStyle = '#FFFFFF';
    textX = 280;
    textY = maxWeightY;
    text = '' + tempCar.maxWeight;
    ctx.fillText(text, textX, textY); textY += 25;
    text = '' + tempCar.maxSpace;
    ctx.fillText(text, textX, textY); textY += 25;

    text = '' + tempCar.topSpeed;
    ctx.fillText(text, textX, textY); textY += 25;
    textY += 25;

    if((tempCar.maxWeight - tempCar.currentWeight) < 0) {
        ctx.fillStyle = '#FF0000';
    } else {
        ctx.fillStyle = '#FFFFFF';
    }
    text = '' + (tempCar.maxWeight - tempCar.currentWeight);
    ctx.fillText(text, textX, textY); textY += 25;

    if((tempCar.maxSpace - tempCar.currentSpace) < 0) {
        ctx.fillStyle = '#FF0000';
    } else {
        ctx.fillStyle = '#FFFFFF';
    }
    text = '' + (tempCar.maxSpace - tempCar.currentSpace);
    ctx.fillText(text, textX, textY); textY += 25;

}


