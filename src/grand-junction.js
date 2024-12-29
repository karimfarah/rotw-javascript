const grandJunctionBackground = new Image();
grandJunctionBackground.src = '/src/grandJunction.png';

function checkGrandJunctionLocations() {
    if (spriteX >= 200 && spriteX <= 220 &&
        spriteY >= 250 && spriteY <= 270) {
        enterGrandJunctionRestStop();
    } else if(spriteX >= 780 && spriteY >= 200 &&
        spriteY <= 400) {
        /** NORTH EXIT **/
        enterI70West(100, 1350);
    } else if(spriteX <= 50 || spriteY > 550) {
        /** NORTH EXIT **/
        enterI15South(4330, 200);
    }
}

function enterGrandJunctionRestStop() {
    console.log("Entering Rest Stop");
    document.removeEventListener('keydown', processPlayerInput);
    document.addEventListener('keydown', readGrandJunctionRestStopInput);
    inRestStop = true;
}

function readGrandJunctionRestStopInput(e) {
    switch (e.key) {
        case '1':
            inRestStop = false;
            player.money -= 200;
            document.removeEventListener('keydown', readGrandJunctionRestStopInput);
            loadCityChanges(City.DENVER);
            break;
        case '2':
            inRestStop = false;
            player.money -= 200;
            document.removeEventListener('keydown', readGrandJunctionRestStopInput);
            loadCityChanges(City.SALT_LAKE_CITY);
            break;
        case '3':
            inRestStop = false;
            player.money -= 200;
            document.removeEventListener('keydown', readGrandJunctionRestStopInput);
            loadCityChanges(City.LAS_VEGAS);
            break;
        case '8':
            inRestStop = false;
            spriteX += 20;
            document.removeEventListener('keydown', readGrandJunctionRestStopInput);
            document.addEventListener('keydown', processPlayerInput);
            break;
    }
}