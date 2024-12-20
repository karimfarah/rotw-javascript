const cheyenneBackground = new Image();
cheyenneBackground.src = '/src/cheyenne.png';

function checkCheyenneLocations() {
    if (spriteX >= 470 && spriteX <= 480 &&
        spriteY >= 200 && spriteY <= 210) {
        enterCheyenneRestStop();
    } else if(spriteX >= 380 && spriteX <= 420 &&
        spriteY >= 560) {
        enterI25North(1200, 100);
    }  else if(spriteX >= 215 && spriteX <= 285 &&
        spriteY >= 385) {
        enterCheyenneGarage();
    } else if(spriteX >= 495 &&
        spriteY >= 55 && spriteY <= 110) {
        enterCheyenneDustRunners();
    }
}

function enterCheyenneDustRunners() {
    console.log("Entering Dust Runners");
    document.removeEventListener('keydown', moveSprite)
    document.addEventListener('keydown', readCheyenneDustRunnersInput);
    //canvas.addEventListener('click', handleCanvasClick);
    inDustRunners = true;
}

function enterCheyenneRestStop() {
    console.log("Entering Rest Stop");

    deliverJob(City.CHEYENNE, Building.REST_STOP);

    document.removeEventListener('keydown', moveSprite);
    document.addEventListener('keydown', readCheyenneRestStopInput);
    inRestStop = true;
}

function enterCheyenneGarage() {
    console.log("Entering Garage");

    deliverJob(City.CHEYENNE, Building.GARAGE);

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

function readCheyenneDustRunnersInput(e) {
    switch (e.key) {
        case '1':
            confirmJobParameters(job1);
            break;
        case '2':
            confirmJobParameters(job2);
            break;
        case '3':
            confirmJobParameters(job3);
            break;
        case '4':
            confirmJobParameters(job4);
            break;
        case '7':
            roadConditionReport = true;
            break;
        case '8':
        case 'Escape':
            inDustRunners = false;
            spriteX -= 20;
            document.removeEventListener('keydown', readCheyenneDustRunnersInput);
            document.addEventListener('keydown', moveSprite);
            break;
        default:
            break;
    }
}

