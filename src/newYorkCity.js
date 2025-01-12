const newYorkCityBackground = new Image();
newYorkCityBackground.src = '/src/newyorkcity.png';

function checkNewYorkCityLocations() {
    if (spriteX >= 585 && spriteX <= 595 &&
        spriteY >= 140 && spriteY <= 180) {
        /** REST STOP **/
        enterNewYorkCityRestStop();
    }
}

function enterDustRunners() {
    console.log("Entering Dust Runners");
    document.removeEventListener('keydown', processPlayerInput)
    document.addEventListener('keydown', readNewYorkCityRestStopInput);
    //canvas.addEventListener('click', handleCanvasClick);
    inDustRunners = true;
}

function enterNewYorkCityRestStop() {
    console.log("Entering Rest Stop");
    document.removeEventListener('keydown', processPlayerInput)
    document.addEventListener('keydown', readNewYorkCityRestStopInput);
    //canvas.addEventListener('click', handleCanvasClick);
    inRestStop = true;
}

function readNewYorkCityRestStopInput(e) {
    switch (e.key) {
        case '1':
            inRestStop = false;
            player.money -= 200;
            document.removeEventListener('keydown', readNewYorkCityRestStopInput);
            storeCarInGarage();
            loadCityChanges(City.CHICAGO);
            break;
        case '8':
        case 'Escape':
            inRestStop = false;
            spriteX -= 20;
            document.removeEventListener('keydown', readNewYorkCityRestStopInput);
            document.addEventListener('keydown', processPlayerInput);
            break;
    }
}
