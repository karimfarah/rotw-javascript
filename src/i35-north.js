

function enterI35North(camX, camY) {
    console.log('Leaving for Des Moines');

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

    let enemyLocations = [
        { x: 2040, y: 4210, color: 'maroon' },
        { x: 1740, y: 3410, color: 'maroon' },
        { x: 272, y: 2866, color: 'maroon' },
        { x: 56, y: 3046, color: 'lime' },
        { x: 140, y: 622, color: 'maroon' },
        { x: 488, y: 550, color: 'maroon' },
        { x: 464, y: 910, color: 'maroon' },
        { x: 2036, y: 2258, color: 'lime' },
        { x: 2036, y: 2206, color: 'lime' },
        { x: 2288, y: 2254, color: 'maroon' },
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

function checkI35NorthLocations() {
    if (cameraX >= 990 && cameraX <= 1800 &&
        cameraY <= -10) {

        spriteX = 400;
        spriteY = 550;
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
