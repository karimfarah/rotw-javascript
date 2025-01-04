

function enterI25South(camX, camY) {
    console.log('Leaving for Cheyenne');

    roadBackground.src = '/src/img/i25-south.png';
    roadBackground.onload = function drawSelf() {
        draw();
    }

    cameraX = camX;
    cameraY = camY;//5140;
    spriteX = (canvas.width / 2);
    spriteY = (canvas.height / 2);

    currentCity = City.NONE;
    currentRoad = Road.I25_SOUTH;

    let enemyLocations = [
        { x: 1568, y: 2153, color: 'maroon' },
        { x: 1172, y: 1445, color: 'maroon' },
        { x: 212, y: 905, color: 'maroon' },
        { x: 416, y: 3797, color: 'maroon' },
        { x: 1052, y: 3581, color: 'lime' },
        { x: 1052, y: 3149, color: 'maroon' },
    ];

    // start fresh no enemies from previous run
    enemyArray = [];

    /** Create enemy vehicles **/
    var enemy = { speed: 10, hp: 100, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0, isReversing: false, reverseCount: 0, color: 'maroon' };
    enemyLocations.forEach(location => {
        enemy.carSprite = new Image();
        enemy.carSprite.src = '/src/img/' + location.color + '-racer-down.png';
        enemy.speed = 2;
        enemy.x = location.x;
        enemy.y = location.y;
        enemy.color = location.color;
        enemyArray.push(new Enemy(enemy));
    });
}

function checkI25SouthLocations() {
    if (cameraX >= 990 && cameraX <= 1800 &&
        cameraY <= -10) {

        spriteX = 440;
        spriteY = 550;
        currentRoad = Road.NONE;
        currentCity = City.DENVER;
        townBackground.src= denverBackground.src;

    } else if (cameraX >= 990 && cameraX <= 1800 &&
        cameraY >= 4530) {

        spriteX = 700;
        spriteY = 100;
        currentRoad = Road.NONE;
        currentCity = City.SANTE_FE;
        townBackground.src= santeFeBackground.src;
    }
}
