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

    // start fresh no enemies from previous run
    enemyArray = [];

    /** Create enemy vehicles **/
    var enemy = { speed: 10, hp: 100, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0, isReversing: false, reverseCount: 0 };
    enemy.carSprite = new Image();
    enemy.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy.speed = 2;
    enemy.x = 2040;
    enemy.y = 4210;
    enemyArray.push(enemy);

    var enemy2 = { speed: 10,hp: 100, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0, isReversing: false, reverseCount: 0 };
    enemy2.carSprite = new Image();
    enemy2.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy2.speed = 2;
    enemy2.x = 1240;
    enemy2.y = 4510;

    //enemyArray.push(enemy2);

    var enemy3 = { speed: 10, hp: 100, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0, isReversing: false, reverseCount: 0 };
    enemy3.carSprite = new Image();
    enemy3.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy3.speed = 2;
    enemy3.x = 1740;
    enemy3.y = 3410;
    enemyArray.push(enemy3);

    var enemy4 = { speed: 10, hp: 100, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0, isReversing: false, reverseCount: 0 };
    enemy4.carSprite = new Image();
    enemy4.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy4.speed = 2;
    enemy4.x = 272;
    enemy4.y = 2866;
    enemyArray.push(enemy4);

    var enemy5 = { speed: 10, hp: 100, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0, isReversing: false, reverseCount: 0 };
    enemy5.carSprite = new Image();
    enemy5.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy5.speed = 2;
    enemy5.x = 56;
    enemy5.y = 3046;
    enemyArray.push(enemy5);

    var enemy6 = { speed: 10, hp: 100, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0, isReversing: false, reverseCount: 0 };
    enemy6.carSprite = new Image();
    enemy6.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy6.speed = 2;
    enemy6.x = 140;
    enemy6.y = 622;
    enemyArray.push(enemy6);

    var enemy7 = { speed: 10, hp: 100, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0, isReversing: false, reverseCount: 0 };
    enemy7.carSprite = new Image();
    enemy7.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy7.speed = 2;
    enemy7.x = 488;
    enemy7.y = 550;
    enemyArray.push(enemy7);

    var enemy8 = { speed: 10, hp: 100, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0, isReversing: false, reverseCount: 0 };
    enemy8.carSprite = new Image();
    enemy8.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy8.speed = 2;
    enemy8.x = 464;
    enemy8.y = 910;
    enemyArray.push(enemy8);

    var enemy7 = { speed: 10, hp: 100, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0, isReversing: false, reverseCount: 0 };
    enemy7.carSprite = new Image();
    enemy7.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy7.speed = 2;
    enemy7.x = 2036;
    enemy7.y = 2258;
    enemyArray.push(enemy7);

    var enemy9 = { speed: 10, hp: 100, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0, isReversing: false, reverseCount: 0 };
    enemy9.carSprite = new Image();
    enemy9.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy9.speed = 2;
    enemy9.x = 2036;
    enemy9.y = 2206;
    enemyArray.push(enemy9);

    var enemy10 = { speed: 10, hp: 100, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0, isReversing: false, reverseCount: 0 };
    enemy10.carSprite = new Image();
    enemy10.carSprite.src = '/src/img/maroon-racer-down.png';
    enemy10.speed = 2;
    enemy10.x = 2288;
    enemy10.y = 2254;
    enemyArray.push(enemy10);
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
