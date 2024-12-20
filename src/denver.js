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
    }  else if(spriteX >= 590 &&
        spriteY >= 55 && spriteY <= 110) {
        /** FACTORY **/
        enterGarage();
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

function enterGarage() {
    console.log("Entering Garage");
    document.removeEventListener('keydown', moveSprite)
    document.addEventListener('keydown', readGarageInput);
    //canvas.addEventListener('click', handleCanvasClick);
    inGarage = true;
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
            document.removeEventListener('keydown', readDenverRestStopInput);
            storeCarInGarage();
            loadCityChanges(City.CHEYENNE);
            break;
        case '4':
            inRestStop = false;
            player.money -= 200;
            document.removeEventListener('keydown', readDenverRestStopInput);
            storeCarInGarage();
            loadCityChanges(City.GRAND_JUNCTION);
            break;
        case '8':
        case 'Escape':
            inRestStop = false;
            spriteX -= 20;
            document.removeEventListener('keydown', readDenverRestStopInput);
            document.addEventListener('keydown', moveSprite);
            break;
    }
}

function exitGarage() {
    inGarage = false;
    spriteX -= 20;
    document.removeEventListener('keydown', readGarageInput);
    document.addEventListener('keydown', moveSprite);
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

let errorMessage1 = '';
let errorMessage2 = '';

async function confirmJobParameters(job) {
    let hasError = false;

    if (player.car === null) {
        console.log('No active car cannot run cargo');
        errorMessage1 = 'You must be in a car to deliver cargo!';
        hasError = true;
    } else if (player.car.currentJob !== null) {
        console.log('You already have an active job, deliver or abandon that one first');
        errorMessage1 = 'You already have an active cargo job';
        errorMessage2 = 'Deliver or abandon that one first'
        hasError = true;
    } else if (job.space > (player.car.maxSpace - player.car.currentSpace)) {
        console.log('Not enough space available for cargo');
        errorMessage1 = 'Not enough space available';
        errorMessage2 = 'in your car for this cargo';
        hasError = true;
    }

    if(hasError) {
        jobConfirmError = true;
        await sleep(5000);
        jobConfirmError = false;
        return;
    }

    player.car.currentJob = job;
}

function drawJobConfirmError() {
    var popUpWidth = canvas.width - 300;
    var popUpHeight = canvas.height - 300;
    var popUpX = (canvas.width - popUpWidth) / 2;
    var popUpY = ((canvas.height - popUpHeight) / 2) - 25;

    ctx.fillStyle = 'white';
    ctx.fillRect(popUpX, popUpY, popUpWidth, popUpHeight);

    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 25;
    ctx.strokeRect(popUpX, popUpY, popUpWidth, popUpHeight);

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    ctx.strokeRect(popUpX, popUpY, popUpWidth, popUpHeight);

    ctx.font = '20px Verdana';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';

    var textX = popUpX + 50;
    var textY = popUpY + 50;
    ctx.fillStyle = '#FF0000';
    var text = 'JOB CONFIRMATION PROBLEM';
    ctx.fillText(text, textX, textY);
    textY += 50;

    ctx.fillStyle = 'black';
    var text = 'I cannot give you that job';
    ctx.fillText(text, textX, textY); textY += 50;

    text = errorMessage1;
    ctx.fillText(text, textX, textY); textY += 25;
    text = errorMessage2;
    ctx.fillText(text, textX, textY); textY += 25;

}

function readDenverDustRunnersInput(e) {
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
            spriteY -= 20;
            document.removeEventListener('keydown', readDenverDustRunnersInput);
            document.addEventListener('keydown', moveSprite);
            break;
        default:
            break;
    }
}