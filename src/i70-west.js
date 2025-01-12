enemyLocations = [
    { x: 3422, y: 2298, color: 'maroon' },
    { x: 2690, y: 2298, color: 'maroon' },
    { x: 1790, y: 2298, color: 'maroon' },
    { x: 974, y: 2058, color: 'lime' },
    { x: 638, y: 2430, color: 'maroon' },
    { x: 2426, y: 522, color: 'maroon' },
    { x: 4298, y: 1350, color: 'maroon' },
];

function enterI70West(camX, camY) {
    console.log('Leaving for Grand Junction');
    roadBackground.src = '/src/img/i70-west.png';
    roadBackground.onload = function drawSelf() {
        draw();
    }

    cameraX = camX;
    cameraY = camY;//5140;
    spriteX = (canvas.width / 2);
    spriteY = (canvas.height / 2);

    currentCity = City.NONE;
    currentRoad = Road.I70_WEST;

    let enemyLocations = [
        { x: 3422, y: 2298, color: 'maroon' },
        { x: 2690, y: 2298, color: 'maroon' },
        { x: 1790, y: 2298, color: 'maroon' },
        { x: 974, y: 2058, color: 'lime' },
        { x: 638, y: 2430, color: 'maroon' },
        { x: 2426, y: 522, color: 'maroon' },
        { x: 2174, y: 822, color: 'maroon' },
        { x: 3638, y: 1230, color: 'maroon' },
        { x: 3638, y: 1026, color: 'maroon' },
        { x: 3338, y: 1230, color: 'maroon' },
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

function checkI70WestLocations() {
    if (cameraX >= 4330 && cameraY >= 1230 &&
        cameraY <= 1430) {

        spriteX = 40;
        spriteY = 300;
        currentRoad = Road.NONE;
        currentCity = City.DENVER;
        townBackground.src= denverBackground.src;

    } else if (cameraX <= 0 && cameraY >= 1230 &&
        cameraY <= 1430) {

        spriteX = 750;
        spriteY = 250;
        currentRoad = Road.NONE;
        currentCity = City.GRAND_JUNCTION;
        townBackground.src= grandJunctionBackground.src;
    }
}
