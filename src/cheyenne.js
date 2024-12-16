const cheyenneBackground = new Image();
cheyenneBackground.src = '/src/cheyenne.png';

function checkCheyenneLocations() {
    if (spriteX >= 470 && spriteX <= 480 &&
        spriteY >= 200 && spriteY <= 210) {
        enterCheyenneRestStop();
    } else if(spriteX >= 380 && spriteX <= 420 &&
        spriteY >= 560) {
        enterI25North(1200, 100);
    }
}

function enterCheyenneRestStop() {
    console.log("Entering Rest Stop");
    document.removeEventListener('keydown', moveSprite);
    document.addEventListener('keydown', readCheyenneRestStopInput);
    inRestStop = true;
}

function readCheyenneRestStopInput(e) {
    switch (e.key) {
        case '1':
            inRestStop = false;
            player.money -= 200;
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

