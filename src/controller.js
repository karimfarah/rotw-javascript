function moveSprite(e) {
    let tempX = spriteX;
    let tempY = spriteY;
    let tempCameraX = cameraX;
    let tempCameraY = cameraY;
    var tempSpriteSrc = '';

    if(player.car !== null) {
        speed = Math.floor(player.car.topSpeed / 10);
    } else {
        speed = player.speed;
    }

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
        default:
            break;
    }

    //const color = getColorAt(tempX + (spriteWidth / 2) - 1, tempY - 10);
    var getX = tempX;
    var getY = tempY;

    const color = getColorAt(getX, getY);
    //const color = getColorAt(tempX + (spriteWidth / 2) - 1, tempY - 10);
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

        if(player.car !== null) {
            sprite.src = tempSpriteSrc;
        } else {

        }

        console.log(spriteX + ", " + spriteY);
        checkPlayerLocation();
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
            case Road.I70_WEST:
                checkI70WestLocations();
                break;
            case Road.I15_SOUTH:
                checkI15SouthLocations();
                break;
        }
    }
}

async function loadCityChanges(cityLocation) {
    currentCity = cityLocation;
    inTransition = true;

    let safetyCheck = 0;
    randomJobList = [];
    for(let i = 0; i < 4; i++) {
        let freeSlotFound = false;
        while (!freeSlotFound && safetyCheck < 100) {
            let randNum = getRandomInt(0, starterDustRunnerJobs.length - 1);
            if(!randomJobList.includes(randNum)) {
                randomJobList.push(randNum);
                freeSlotFound = true;
            }
            safetyCheck++;
        }
    }

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
