const denverBackground = new Image();
denverBackground.src = '/src/denver.png';

function checkDenverLocations() {
    if (spriteX >= 590 && spriteX <= 600 &&
        spriteY >= 260 && spriteY <= 280) {
        /** REST STOP **/
        enterDenverRestStop();
    } else if(spriteX >= 160 && spriteX <= 240 &&
        spriteY >= 360 && spriteY <= 380) {
        /** FACTORY **/
        enterDenverFactory();
    } else if(spriteX >= 535 && spriteX <= 555 &&
        spriteY >= 445 && spriteY <= 455) {
        /** FACTORY **/
        enterDustRunners();
    } else if(spriteX >= 380 && spriteY <= 420 &&
        spriteY <= 10) {
        /** NORTH EXIT **/
        enterI25North(1220, 4510);
    } else if(spriteX <= 10 && spriteY >= 200 &&
        spriteY <= 400) {
        /** NORTH EXIT **/
        enterI70West(4310, 1350);
    }
}

function enterDustRunners() {
    console.log("Entering Dust Runners");
    document.removeEventListener('keydown', moveSprite)
    document.addEventListener('keydown', readDenverDustRunnersInput);
    //canvas.addEventListener('click', handleCanvasClick);
    inDustRunners = true;
}

function enterDenverRestStop() {
    console.log("Entering Rest Stop");
    document.removeEventListener('keydown', moveSprite)
    document.addEventListener('keydown', readDenverRestStopInput);
    //canvas.addEventListener('click', handleCanvasClick);
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

function readDenverRestStopInput(e) {
    switch (e.key) {
        case '1':
            inRestStop = false;
            player.money -= 200;
            loadCityChanges(City.CHEYENNE);
            break;
        case '4':
            inRestStop = false;
            player.money -= 200;
            document.removeEventListener('keydown', readDenverRestStopInput);
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

function readDenverDustRunnersInput(e) {
    switch (e.key) {
        case '1':
            player.money -= 200;
            loadCityChanges(City.CHEYENNE);
            break;
        case '4':
            player.money -= 200;
            document.removeEventListener('keydown', readDenverRestStopInput);
            loadCityChanges(City.GRAND_JUNCTION);
            break;
        case '7':
            roadConditionReport = true;
            break;
        case '8':
            inDustRunners = false;
            spriteY -= 20;
            document.removeEventListener('keydown', readDenverRestStopInput);
            document.addEventListener('keydown', moveSprite);
            break;
    }
}