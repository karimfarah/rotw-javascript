const desMoinesBackground = new Image();
desMoinesBackground.src = '/src/desMoines.png';

function checkDesMoinesLocations() {
    if (spriteX >= 400 && spriteX <= 440 &&
        spriteY >= 240 && spriteY <= 260) {
        /** REST STOP **/
        enterDesMoinesRestStop();
    } else if(spriteX >= 160 && spriteX <= 240 &&
        spriteY >= 360 && spriteY <= 380) {
        /** FACTORY **/
        enterDenverFactory();
    } else if(spriteX >= 535 && spriteX <= 555 &&
        spriteY >= 445 && spriteY <= 455) {
        /** FACTORY **/
        enterDustRunners();
    }  else if(spriteX >= 590 &&
        spriteY >= 55 && spriteY <= 110) {
        /** FACTORY **/
        enterGarage();
    } else if(spriteX >= 380 && spriteY <= 420 &&
        spriteY <= 10) {
        /** NORTH EXIT **/
        enterI25North(1220, 4510);
    } else if(spriteX <= 10) {
        /** NORTH EXIT **/
        enterI70West(4310, 1350);
    } else if(spriteX >= 780) {
        /** NORTH EXIT **/
        enterI70East(100, 1350);
    } else if(spriteY >= 580) {
        /** NORTH EXIT **/
        enterI25South(1220, 125);
    }
}

function enterGarage() {
    console.log("Entering Garage");
    document.removeEventListener('keydown', processPlayerInput)
    document.addEventListener('keydown', readGarageInput);
    //canvas.addEventListener('click', handleCanvasClick);
    inGarage = true;
}


function enterDesMoinesRestStop() {
    console.log("Entering Rest Stop");
    document.removeEventListener('keydown', processPlayerInput)
    document.addEventListener('keydown', readDesMoinesRestStopInput);
    //canvas.addEventListener('click', handleCanvasClick);
    inRestStop = true;
}

function enterDenverFactory() {
    console.log("Entering Factory");
    document.removeEventListener('keydown', processPlayerInput)
    //document.addEventListener('click', readDenverFactoryInput);
    document.addEventListener('click', handleCanvasClick);
    document.addEventListener('keydown', handleKeyDown);
    inFactory = true;
}

function readDesMoinesRestStopInput(e) {
    switch (e.key) {
        case '1':
            inRestStop = false;
            player.money -= 200;
            document.removeEventListener('keydown', readDesMoinesRestStopInput);
            storeCarInGarage();
            loadCityChanges(City.KANSAS_CITY);
            break;
        case '2':
            inRestStop = false;
            player.money -= 200;
            document.removeEventListener('keydown', readDesMoinesRestStopInput);
            storeCarInGarage();
            loadCityChanges(City.CHICAGO);
            break;
        case '8':
        case 'Escape':
            inRestStop = false;
            spriteY += 20;
            document.removeEventListener('keydown', readDesMoinesRestStopInput);
            document.addEventListener('keydown', processPlayerInput);
            break;
    }
}

function exitGarage() {
    inGarage = false;
    spriteX -= 20;
    document.removeEventListener('keydown', readGarageInput);
    document.addEventListener('keydown', processPlayerInput);
}

function readGarageInput(e) {
    switch (e.key) {
        case '1':
            player.car = car1;
            removeElementByValue(denverGarageCars,0);
            sprite.src = '/src/img/car-sprite-left.png';
            exitGarage();
            break;
        case '2':
            player.car = car2;
            removeElementByValue(denverGarageCars,1);
            sprite.src = '/src/img/car-sprite-left.png';
            exitGarage();
            break;
        case '3':
            player.car = car3;
            removeElementByValue(denverGarageCars,2);
            sprite.src = '/src/img/car-sprite-left.png';
            exitGarage();
            break;
        case '4':
            player.car = car4;
            removeElementByValue(denverGarageCars,3);
            sprite.src = '/src/img/car-sprite-left.png';
            exitGarage();
            break;
        case '6':

            storeCarInGarage();

            break;
        case '8':
        case 'Escape':
            exitGarage();
            break;
    }

}

function storeCarInGarage() {
    let currentGarage = null;

    switch(currentCity) {
        case City.DENVER:
            currentGarage = denverGarageCars;
            break;
        case City.CHEYENNE:
            currentGarage = cheyenneGarageCars;
            break;
        default:
            return;
    }
    if(player.car !== null) {
        console.log('Saving car in garage');
        currentGarage.push(player.car);
        player.money -= 100;
    } else {
        console.log('No car to save');
    }

    sprite.src = '/src/img/sprite-facing.png';
    player.car = null;
}

