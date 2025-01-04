function enterI15South(camX, camY) {
    console.log('Leaving for Las Vegas');
    roadBackground.src = '/src/img/i15-south.png';
    roadBackground.onload = function drawSelf() {
        draw();
    }

    cameraX = camX;
    cameraY = camY;//5140;
    spriteX = (canvas.width / 2);
    spriteY = (canvas.height / 2);

    currentCity = City.NONE;
    currentRoad = Road.I15_SOUTH;

    let enemyLocations = [
        { x: 508, y: 1084, color: 'maroon' },
        { x: 1096, y: 556, color: 'maroon' },
        { x: 2452, y: 2200, color: 'maroon' },
        { x: 2776, y: 2476, color: 'lime' },
        { x: 2896, y: 408, color: 'maroon' },
    ];

    // start fresh no enemies from previous run
    enemyArray = [];

    /** Create enemy vehicles **/
    var enemy = { speed: 2, hp: 100, x: 0, y: 0, car: null, carSprite: null, prevX: 0, prevY: 0, moves: 0, isReversing: false, reverseCount: 0, color: 'maroon' };
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

function checkI15SouthLocations() {
    if (cameraX >= 4330) {
        spriteX = 100;
        spriteY = 500;
        currentRoad = Road.NONE;
        currentCity = City.GRAND_JUNCTION;
        townBackground.src= grandJunctionBackground.src;

    } else if (cameraX <= -200) {

        spriteX = 750;
        spriteY = 150;
        currentRoad = Road.NONE;
        currentCity = City.LAS_VEGAS;
        townBackground.src= lasVegasBackground.src;
    }
}
