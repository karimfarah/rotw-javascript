function enterI70East(camX, camY) {
    console.log('Leaving for Kansas City');
    roadBackground.src = '/src/img/i70-east.png';
    roadBackground.onload = function drawSelf() {
        draw();
    }

    cameraX = camX;
    cameraY = camY;//5140;
    spriteX = (canvas.width / 2);
    spriteY = (canvas.height / 2);

    currentCity = City.NONE;
    currentRoad = Road.I70_EAST;

    let enemyLocations = [
        { x: 844, y: 1794, color: 'maroon' },
        { x: 844, y: 1926, color: 'maroon' },
        { x: 760, y: 822, color: 'maroon' },
        { x: 2056, y: 1374, color: 'lime' },
        { x: 1816, y: 1866, color: 'maroon' },
        { x: 2992, y: 1374, color: 'maroon' },
        { x: 3868, y: 1830, color: 'maroon' },
        { x: 2692, y: 1854, color: 'maroon' },
        { x: 2932, y: 1854, color: 'maroon' },
        { x: 1252, y: 2238, color: 'maroon' },
        { x: 2332, y: 246, color: 'maroon' },
    ];

    // start fresh no enemies from previous run
    enemyArray = [];
    droppedItems = [];

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

function checkI70EastLocations() {
    if (cameraX >= 4330 && cameraY >= 1230 &&
        cameraY <= 1430) {

        spriteX = 40;
        spriteY = 300;
        currentRoad = Road.NONE;
        currentCity = City.KANSAS_CITY;
        townBackground.src= kansasCityBackground.src;

    } else if (cameraX <= 0 && cameraY >= 1230 &&
        cameraY <= 1430) {

        spriteX = 750;
        spriteY = 400;
        currentRoad = Road.NONE;
        currentCity = City.DENVER;
        townBackground.src= denverBackground.src;
    }
}
