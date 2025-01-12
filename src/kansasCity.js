const kansasCityBackground = new Image();
kansasCityBackground.src = '/src/kansasCity.png';

function checkKansasCityLocations() {
    if (spriteX >= 180 && spriteX <= 220 &&
        spriteY >= 360 && spriteY <= 380) {
        /** REST STOP **/
        enterKansasCityRestStop();
    } else if(spriteX >= 535 && spriteX <= 555 &&
        spriteY >= 380 && spriteY <= 420) {
        /** FACTORY **/
        enterDustRunners();
    }  else if(spriteX >= 470 && spriteX <= 500 &&
        spriteY >= 220 && spriteY <= 240) {
        /** GARAGE **/
        enterGarage();
    } else if(spriteY <= 10) {
        /** NORTH EXIT **/
        enterI35North(1220, 4510);
    } else if(spriteX <= 10) {
        /** NORTH EXIT **/
        enterI70East(4310, 1350);
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

function enterKansasCityRestStop() {
    console.log("Entering Rest Stop");
    document.removeEventListener('keydown', processPlayerInput)
    document.addEventListener('keydown', readKansasCityRestStopInput);
    //canvas.addEventListener('click', handleCanvasClick);
    inRestStop = true;
}


function readKansasCityRestStopInput(e) {
    switch (e.key) {
        case '1':
            inRestStop = false;
            player.money -= 200;
            document.removeEventListener('keydown', readKansasCityRestStopInput);
            storeCarInGarage();
            loadCityChanges(City.DENVER);
            break;
        case '2':
            inRestStop = false;
            player.money -= 200;
            document.removeEventListener('keydown', readKansasCityRestStopInput);
            storeCarInGarage();
            loadCityChanges(City.DES_MOINES);
            break;
        case '3':
            inRestStop = false;
            player.money -= 200;
            document.removeEventListener('keydown', readKansasCityRestStopInput);
            storeCarInGarage();
            loadCityChanges(City.ST_LOUIS);
            break;
        case '4':
            inRestStop = false;
            player.money -= 200;
            document.removeEventListener('keydown', readKansasCityRestStopInput);
            storeCarInGarage();
            loadCityChanges(City.OKLAHOMA_CITY);
            break;
        case '8':
        case 'Escape':
            inRestStop = false;
            spriteY -= 20;
            document.removeEventListener('keydown', readKansasCityRestStopInput);
            document.addEventListener('keydown', processPlayerInput);
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