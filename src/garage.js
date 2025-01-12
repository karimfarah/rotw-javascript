var denverGarageCars = [];
var cheyenneGarageCars = [];

let car1 = null;
let car2 = null;
let car3 = null;
let car4 = null;

function drawGarageMenu() {
    var boxWidth = canvas.width - 100;
    var boxHeight = canvas.height - 100;
    var boxX = (canvas.width - boxWidth) / 2;
    var boxY = (canvas.height - boxHeight) / 2;

    ctx.fillStyle = 'white';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 25;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    var img = new Image();
    img.src = '/src/img/garage.png';
    ctx.drawImage(img, boxX, boxY, boxWidth, 133);

    ctx.font = '20px Verdana';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';

    switch (currentCity) {
        case City.DENVER:
            car1 = denverGarageCars[0];
            car2 = denverGarageCars[1];
            car3 = denverGarageCars[2];
            car4 = denverGarageCars[3];
            break;
        case City.SANTE_FE:
            break;
        case City.CHEYENNE:
            break;
        case City.GRAND_JUNCTION:
            break;
        case City.SALT_LAKE_CITY:
            break;
        case City.BOISE:
            break;
        case City.LAS_VEGAS:
            break;
        case City.BILLINGS:
            break;
    }

    var textX = boxX + 100;
    var textY = boxY + 150;
    var text = 'GARAGE MENU:';
    ctx.fillText(text, textX, textY);
    textY += 25;

    text = '== CARS ==';
    ctx.fillText(text, textX, textY);
    textY += 25;

    text = '    1. ' + (car1 !== undefined && car1 !== null ? car1.name : ' ... ') + '';
    ctx.fillStyle = 'black';
    ctx.fillText(text, textX, textY);
    textY += 25;

    text = '    2. ' + (car2 !== undefined && car2 !== null ? car2.name : ' ... ') + '';
    ctx.fillStyle = 'black';
    ctx.fillText(text, textX, textY);
    textY += 25;

    text = '    3. ' + (car3 !== undefined && car3 !== null ? car3.name : ' ... ') + '';
    ctx.fillStyle = 'black';
    ctx.fillText(text, textX, textY);
    textY += 25;

    text = '    4. ' + (car4 !== undefined && car4 !== null ? car4.name : ' ... ') + '';
    ctx.fillStyle = 'black';
    ctx.fillText(text, textX, textY);
    textY += 25;

    text = '5. Listen for rumors';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '6. Park car 100qc';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '7. Check road conditions';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '8. Leave Garage';
    ctx.fillText(text, textX, textY);
    text = 'R. Repair Car 500qc'; textY += 50;
    ctx.fillText(text, textX, textY);

}

function enterGarage() {
    console.log("Entering Garage");
    document.removeEventListener('keydown', processPlayerInput)
    document.addEventListener('keydown', readGarageInput);
    //canvas.addEventListener('click', handleCanvasClick);
    inGarage = true;
}

function exitGarage() {
    inGarage = false;
    switch(currentCity) {
        case City.DENVER:
        case City.CHICAGO:
        case City.KANSAS_CITY:
            spriteX -= 20;
            break;
    }

    document.removeEventListener('keydown', readGarageInput);
    document.addEventListener('keydown', processPlayerInput);
}

function readGarageInput(e) {
    switch (e.key) {
        case '1':
            player.car = car1;
            removeElementByValue(denverGarageCars,0);
            sprite.src = '/src/img/car-sprite-left.png';
            exitGarage();
            break;
        case '2':
            player.car = car2;
            removeElementByValue(denverGarageCars,1);
            sprite.src = '/src/img/car-sprite-left.png';
            exitGarage();
            break;
        case '3':
            player.car = car3;
            removeElementByValue(denverGarageCars,2);
            sprite.src = '/src/img/car-sprite-left.png';
            exitGarage();
            break;
        case '4':
            player.car = car4;
            removeElementByValue(denverGarageCars,3);
            sprite.src = '/src/img/car-sprite-left.png';
            exitGarage();
            break;
        case '6':

            storeCarInGarage();

            break;
        case '8':
        case 'Escape':
            exitGarage();
            break;
        case 'R':
        case 'r':
            if(player.car === null) {
                return;
            }

            if(player.car.frontArmor < 200 || player.car.backArmor < 200 ||
                player.car.leftArmor < 200 || player.car.rightArmor < 200) {
                player.money -= 500;

                player.car.frontArmor = 200;
                player.car.backArmor = 200;
                player.car.leftArmor = 200;
                player.car.rightArmor = 200;
            }
            break;
    }

}

function storeCarInGarage() {
    let currentGarage = null;

    switch(currentCity) {
        case City.DENVER:
            currentGarage = denverGarageCars;
            break;
        case City.CHEYENNE:
            currentGarage = cheyenneGarageCars;
            break;
        default:
            return;
    }

    if(player.car !== null) {
        console.log('Saving car in garage');
        currentGarage.push(player.car);
        player.money -= 100;
    } else {
        console.log('No car to save');
    }

    sprite.src = '/src/img/sprite-facing.png';
    player.car = null;

}
