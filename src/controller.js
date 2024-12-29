const Direction = Object.freeze({
    NORTH: 'N',
    SOUTH: 'S',
    EAST: 'E',
    WEST: 'W'
});

function processPlayerInput(e) {
    moveSprite(e);
    fireWeapons(e)
}

function fireWeapons(e) {

    if(player.car === null || currentCity !== City.NONE) {
        return;
    }

    let tempX = spriteX;
    let tempY = spriteY;
    let tempCameraX = cameraX;
    let tempCameraY = cameraY;
    var tempSpriteSrc = '';


    switch (e.code) {
        case 'Digit1':
        case'KeyW':
            console.log('Firing Front weapon');
            bullets.push({x: cameraX + 16, y: cameraY + 16, width: 4, height: 4, angle: 90, prevX: 0, prevY: 0, color: 'blue', isEnemyBullet: false});
            break;
        case 'Digit2':
        case 'KeyS':
            console.log('Firing Back weapon');
            bullets.push({x: cameraX + 16, y: cameraY + 16, width: 4, height: 4, angle: -90, prevX: 0, prevY: 0, color: 'blue', isEnemyBullet: false});
            break;
        case 'Digit3':
        case 'KeyA':
            console.log('Firing Left weapon');
            bullets.push({x: cameraX + 16, y: cameraY + 16, width: 4, height: 4, angle: 0, prevX: 0, prevY: 0, color: 'blue', isEnemyBullet: false});
            break;
        case 'Digit4':
        case 'KeyD':
            console.log('Firing Right weapon');
            bullets.push({x: cameraX + 16, y: cameraY + 16, width: 4, height: 4, angle: 180, prevX: 0, prevY: 0, color: 'blue', isEnemyBullet: false});
            break;
        default:
            break;
    }

}

function moveSprite(e) {
    let tempX = spriteX;
    let tempY = spriteY;
    let tempCameraX = cameraX;
    let tempCameraY = cameraY;


    if(player.car !== null) {
        speed = Math.floor(player.car.topSpeed / 10);
    } else {
        speed = player.speed;
    }

    let carDirection;
    let tempSpriteSrc = '';
    switch (e.code) {
        case 'ArrowUp':
            tempY -= speed;
            tempCameraY -= speed;
            tempSpriteSrc = '/src/img/car-sprite-forward.png';
            carDirection = Direction.NORTH;
            break;
        case 'ArrowDown':
            tempY += speed;
            tempCameraY += speed;
            tempSpriteSrc = '/src/img/car-sprite-down.png';
            carDirection = Direction.SOUTH;
            break;
        case 'ArrowLeft':
            tempX -= speed;
            tempCameraX -= speed;
            tempSpriteSrc = '/src/img/car-sprite-left.png';
            carDirection = Direction.WEST;
            break;
        case 'ArrowRight':
            tempX += speed;
            tempCameraX += speed;
            tempSpriteSrc = '/src/img/car-sprite-right.png';
            carDirection = Direction.EAST;
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
            player.car.direction = carDirection;
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
            document.addEventListener('keydown', processPlayerInput);
            break;
        case City.CHEYENNE:
            await sleep(4000);

            spriteX = 450;
            spriteY = 200;

            inRestStop = false;
            townBackground.src= cheyenneBackground.src;
            document.removeEventListener('keydown', readDenverRestStopInput);
            document.removeEventListener('keydown', readCheyenneRestStopInput);
            document.addEventListener('keydown', processPlayerInput);
            break;
        case City.GRAND_JUNCTION:
            await sleep(4000);

            spriteX = 220;
            spriteY = 260;

            inRestStop = false;
            townBackground.src= grandJunctionBackground.src;
            document.removeEventListener('keydown', readCheyenneRestStopInput);
            document.addEventListener('keydown', processPlayerInput);
            break;
        case City.LAS_VEGAS:
            await sleep(4000);

            spriteX = 460;
            spriteY = 240;

            inRestStop = false;
            townBackground.src= lasVegasBackground.src;
            document.removeEventListener('keydown', readLasVegasRestStopInput);
            document.addEventListener('keydown', processPlayerInput);
            break;
    }

    inTransition = false;
}
