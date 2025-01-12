

function enterI35North(camX, camY) {
    console.log('Leaving for Des Moines');

    roadBackground.src = '/src/img/i35-north.png';
    roadBackground.onload = function drawSelf() {
        draw();
    }

    cameraX = camX;
    cameraY = camY;//5140;
    spriteX = (canvas.width / 2);
    spriteY = (canvas.height / 2);

    currentCity = City.NONE;
    currentRoad = Road.I35_NORTH;

    let enemyLocations = [
        { x: 1810, y: 2400, color: 'maroon' },
        { x: 1280, y: 3680, color: 'maroon' },
        { x: 968, y: 3680, color: 'maroon' },
        { x: 908, y: 2518, color: 'lime' },
        { x: 1160, y: 2518, color: 'maroon' },
        { x: 692, y: 814, color: 'maroon' },
        { x: 464, y: 910, color: 'maroon' },
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

function checkI35NorthLocations() {
    if (cameraX >= 2600 ||
        cameraY <= -20) {

        spriteX = 100;
        spriteY = 500;
        currentRoad = Road.NONE;
        currentCity = City.DES_MOINES;
        townBackground.src= desMoinesBackground.src;

    } else if (cameraX >= 990 && cameraX <= 1800 &&
        cameraY >= 4530) {

        spriteX = 400;
        spriteY = 20;
        currentRoad = Road.NONE;
        currentCity = City.KANSAS_CITY;
        townBackground.src= kansasCityBackground.src;
    }
}
