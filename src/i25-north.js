function enterI25North(camX, camY) {
    console.log('Leaving for Cheyenne');

    roadBackground.src = '/src/img/i25-north.png';
    roadBackground.onload = function drawSelf() {
        draw();
    }

    cameraX = camX;
    cameraY = camY;//5140;
    spriteX = (canvas.width / 2);
    spriteY = (canvas.height / 2);

    currentCity = City.NONE;
    currentRoad = Road.I25_NORTH;

    /** Create enemy vehicles **/
        //var enemy;
    var enemy = { speed: 10, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0, isReversing: false, reverseCount: 0 };
    enemy.carSprite = new Image();
    enemy.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy.speed = 2;
    enemy.x = 2040;
    enemy.y = 4210;
    enemyArray.push(enemy);

    var enemy2 = { speed: 10, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0, isReversing: false, reverseCount: 0 };
    enemy2.carSprite = new Image();
    enemy2.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy2.speed = 2;
    enemy2.x = 1240;
    enemy2.y = 4510;

    //enemyArray.push(enemy2);

    var enemy3 = { speed: 10, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0, isReversing: false, reverseCount: 0 };
    enemy3.carSprite = new Image();
    enemy3.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy3.speed = 2;
    enemy3.x = 1740;
    enemy3.y = 3410;

    enemyArray.push(enemy3);
}

function checkI25NorthLocations() {
    if (cameraX >= 990 && cameraX <= 1800 &&
        cameraY <= -10) {

        spriteX = 400;
        spriteY = 550;
        currentRoad = Road.NONE;
        currentCity = City.CHEYENNE;
        townBackground.src= cheyenneBackground.src;

    } else if (cameraX >= 990 && cameraX <= 1800 &&
        cameraY >= 4530) {

        spriteX = 400;
        spriteY = 20;
        currentRoad = Road.NONE;
        currentCity = City.DENVER;
        townBackground.src= denverBackground.src;
    }
}
