let spinWheel = false;
let jobConfirmError = false;

function drawLocationMenu() {
    if(inRestStop) {
        drawRestStopMenu();
    } else if(inFactory) {
        drawBuildCarMenu();
        //drawInputBox()
        //drawDropdownButton();
    } else if(inCasino) {
        drawCasinoMenu();
    } else if(inDustRunners) {
        drawDustRunnersMenu();
    } else if(inGarage) {
        drawGarageMenu();
    }
}

async function drawTransitionMenu() {
    if (inTransition) {
        var popUpWidth = canvas.width - 300;
        var popUpHeight = canvas.height - 300;
        var popUpX = (canvas.width - popUpWidth) / 2;
        var popUpY = ((canvas.height - popUpHeight) / 2) - 25;

        var travelImg = new Image();
        switch (currentCity) {
            case City.CHEYENNE:
                travelImg.src = '/src/img/travel-cheyenne.png';

                ctx.drawImage(travelImg, popUpX, popUpY, popUpWidth, popUpHeight);
                ctx.font = '20px Verdana';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'left';

                var textX = popUpX + 100;
                var textY = popUpY + 250;

                var text = '...Traveling to Cheyenne...';
                ctx.fillText(text, textX, textY);
                textY += 25;

                text = '(Your ride was uneventful)';
                ctx.fillText(text, textX, textY);
                textY += 25;

                break;
            case City.DENVER:
                travelImg.src = '/src/img/travel-denver.png';

                ctx.drawImage(travelImg, popUpX, popUpY, popUpWidth, popUpHeight);
                ctx.font = '20px Verdana';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'left';

                var textX = popUpX + 100;
                var textY = popUpY + 250;

                var text = '...Traveling to Denver...';
                ctx.fillText(text, textX, textY);
                textY += 25;

                text = '(Your ride was rocky)';
                ctx.fillText(text, textX, textY);
                textY += 25;

                break;
            case City.LAS_VEGAS:
                travelImg.src = '/src/img/travel-lasvegas-day.png';

                ctx.drawImage(travelImg, popUpX, popUpY, popUpWidth, popUpHeight);
                ctx.font = '20px Verdana';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'left';

                var textX = popUpX + 100;
                var textY = popUpY + 250;

                var text = '...Traveling to Las Vegas..';
                ctx.fillText(text, textX, textY);
                textY += 25;

                text = '(Your ride was exhilarating!)';
                ctx.fillText(text, textX, textY);
                textY += 25;

                break;
            case City.GRAND_JUNCTION:
                travelImg.src = '/src/img/travel-grandjunction.png';

                ctx.drawImage(travelImg, popUpX, popUpY, popUpWidth, popUpHeight);
                ctx.font = '20px Verdana';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'left';

                var textX = popUpX + 100;
                var textY = popUpY + 250;

                var text = '...Traveling to Grand Junction...';
                ctx.fillText(text, textX, textY);
                textY += 25;

                text = '(Your ride was bumpy)';
                ctx.fillText(text, textX, textY);
                textY += 25;

                break;
            case City.KANSAS_CITY:
                travelImg.src = '/src/img/travel-kansascity-night.png';

                ctx.drawImage(travelImg, popUpX, popUpY, popUpWidth, popUpHeight);
                ctx.font = '20px Verdana';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'left';

                var textX = popUpX + 100;
                var textY = popUpY + 250;

                var text = '...Traveling to Kansas City...';
                ctx.fillText(text, textX, textY);
                textY += 25;

                text = '(Your ride was absolutely uneventful)';
                ctx.fillText(text, textX, textY);
                textY += 25;

                break;
            case City.DES_MOINES:
                travelImg.src = '/src/img/travel-desmoines.png';

                ctx.drawImage(travelImg, popUpX, popUpY, popUpWidth, popUpHeight);
                ctx.font = '20px Verdana';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'left';

                var textX = popUpX + 100;
                var textY = popUpY + 250;

                var text = '...Traveling to Des Moines...';
                ctx.fillText(text, textX, textY);
                textY += 25;

                text = '(Your ride was uneventful)';
                ctx.fillText(text, textX, textY);
                textY += 25;

                break;
            case City.CHICAGO:
                travelImg.src = '/src/img/travel-chicago.png';

                ctx.drawImage(travelImg, popUpX, popUpY, popUpWidth, popUpHeight);
                ctx.font = '20px Verdana';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'left';

                var textX = popUpX + 100;
                var textY = popUpY + 250;

                var text = '...Traveling to Chicago...';
                ctx.fillText(text, textX, textY);
                textY += 25;

                text = '(Your ride was a little windy)';
                ctx.fillText(text, textX, textY);
                textY += 25;

                break;
            case City.NEW_YORK_CITY:
                travelImg.src = '/src/img/travel-newyorkcity.png';

                ctx.drawImage(travelImg, popUpX, popUpY, popUpWidth, popUpHeight);
                ctx.font = '20px Verdana';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'left';

                var textX = popUpX + 100;
                var textY = popUpY + 250;

                var text = '...Traveling to New York City...';
                ctx.fillText(text, textX, textY);
                textY += 25;

                text = '(Your ride was nostalgic)';
                ctx.fillText(text, textX, textY);
                textY += 25;

                break;
            default:
                //travelImg.src = '/src/img/travel-desmoines.png';

                //ctx.drawImage(travelImg, popUpX, popUpY, popUpWidth, popUpHeight);
                ctx.font = '20px Verdana';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'left';

                var textX = popUpX + 100;
                var textY = popUpY + 150;

                var text = '...Traveling to ' + currentCity + '...';
                ctx.fillText(text, textX, textY);
                textY += 25;

                text = '(Your ride was...interesting)';
                ctx.fillText(text, textX, textY);
                textY += 25;

                break;
        }
    }
}

function drawCarStatusWindow() {
    var statusWidth = 100;
    var statusHeight = 150;
    var statusX = 680;
    var statusY = 20;

    ctx.fillStyle = 'white';
    ctx.fillRect(statusX, statusY, statusWidth, statusHeight);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeRect(statusX, statusY, statusWidth, statusHeight);

    ctx.font = '10px Verdana';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';

    var textX = statusX + 5;
    var textY = statusY + 10;
    var text = 'Driving: ' + (player.car !== null && player.car.name !== null ? player.car.name.slice(0,9) : '');
    ctx.fillText(text, textX, textY);
    textY += 20;

    if(player.car === null) {
        return;
    }

    ctx.fillStyle = 'black';
    if(player.car.frontArmor < 25) {
        ctx.fillStyle = 'red';
    }
    text = 'Front: ' + player.car.frontArmor;
    ctx.fillText(text, textX, textY);
    textY += 10;

    ctx.fillStyle = 'black';
    if(player.car.backArmor < 25) {
        ctx.fillStyle = 'red';
    }
    text = 'Back: ' + player.car.backArmor;
    ctx.fillText(text, textX, textY);
    textY += 10;

    ctx.fillStyle = 'black';
    if(player.car.leftArmor < 25) {
        ctx.fillStyle = 'red';
    }
    text = 'Left: ' + player.car.leftArmor;
    ctx.fillText(text, textX, textY);
    textY += 10;

    ctx.fillStyle = 'black';
    if(player.car.rightArmor < 25) {
        ctx.fillStyle = 'red';
    }
    text = 'Right: ' + player.car.rightArmor;
    ctx.fillText(text, textX, textY);
    textY += 10;
}

function drawActiveJobWindow() {
    var statusWidth = 300;
    var statusHeight = 20;
    var statusX = 20;
    var statusY = 570;

    ctx.fillStyle = 'white';
    ctx.fillRect(statusX, statusY, statusWidth, statusHeight);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeRect(statusX, statusY, statusWidth, statusHeight);

    ctx.font = '10px Verdana';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';

    var textX = statusX + 5;
    var textY = statusY + 10;
    let jobDetails = (player.car !== null && player.car.currentJob !== null ?
                             player.car.currentJob.item + ' To: ' + player.car.currentJob.destinationCity + ' - ' + player.car.currentJob.destBuilding
                                : 'None')
    var text = 'Active Job: ' + jobDetails;
    ctx.fillText(text, textX, textY);
    textY += 10;
}

function drawPLayerStatusWindow() {
    var statusWidth = 140;
    var statusHeight = 50;
    var statusX = 20;
    var statusY = 20;

    ctx.fillStyle = 'white';
    ctx.fillRect(statusX, statusY, statusWidth, statusHeight);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeRect(statusX, statusY, statusWidth, statusHeight);

    ctx.font = '10px Verdana';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';

    var textX = statusX + 5;
    var textY = statusY + 10;
    var text = 'Money (qc): ' + player.money;
    ctx.fillText(text, textX, textY);
    textY += 10;

    ctx.fillStyle = 'black';
    if(player.health < 25) {
        ctx.fillStyle = 'red';
    }
    text = 'Health: ' + player.health;
    ctx.fillText(text, textX, textY);
    textY += 10;

    ctx.fillStyle = 'black';
    text = 'XP: ' + player.xp;
    ctx.fillText(text, textX, textY);
    textY += 10;
}

async function drawNotificationWindow() {
    var popUpWidth = canvas.width - 300;
    var popUpHeight = canvas.height - 300;
    var popUpX = (canvas.width - popUpWidth) / 2;
    var popUpY = ((canvas.height - popUpHeight) / 2) - 25;

    if(carSaveError) {
        ctx.fillStyle = 'white';
        ctx.fillRect(popUpX, popUpY, popUpWidth, popUpHeight);

        ctx.strokeStyle = 'grey';
        ctx.lineWidth = 25;
        ctx.strokeRect(popUpX, popUpY, popUpWidth, popUpHeight);

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        ctx.strokeRect(popUpX, popUpY, popUpWidth, popUpHeight);

        ctx.font = '20px Verdana';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';

        var textX = popUpX + 50;
        var textY = popUpY + 50;
        ctx.fillStyle = '#FF0000';
        var text = 'SAVE ERROR';
        ctx.fillText(text, textX, textY);
        textY += 50;

        ctx.fillStyle = 'black';
        var text = 'Invalid car specs.';
        ctx.fillText(text, textX, textY); textY += 25;

        text = 'Fix all negative/red values before saving';
        ctx.fillText(text, textX, textY); textY += 25;
    } else if(spinWheel) {
        drawSpinWheelNotification();
    } else if(jobConfirmError) {
        drawJobConfirmError();
    }
}

function isObjectInView(locX, locY, camX, camY, width, height) {
    return true;
    //console.log("check if ("+camX+">="+locX+") and ("+camX+","+camY+") and ("+camX + width+","+camY + height+")");

    /** NOTE: Would be nice to get this calculation correct but this one doesn't work right **
     if(locX <= camX && locX <= camX + width &&
     locY <= camY && locY <= camY + height ) {
     return true;
     }
     return false;
     */
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(!gameOver) {
        // Large map tile scrolling vs single screen city map
        if (currentCity === City.NONE) {
            //console.log('cameraX: ' + cameraX + ',' + cameraY);
            ctx.drawImage(roadBackground, cameraX, cameraY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(sprite, (canvas.width / 2), (canvas.height / 2), spriteWidth, spriteHeight);

            //ctx.drawImage(enemySprite, enemySprite.x, enemySprite.y, enemyWidth, enemyHeight);
            for (let enemy of enemyArray) {
                enemyAction(cameraX, cameraY, enemy);

                if (isObjectInView(enemy.x, enemy.y, cameraX, cameraY, canvas.width, canvas.height)) {
                    ctx.drawImage(enemy.carSprite, (enemy.x - cameraX + (canvas.width / 2)), (enemy.y - cameraY + (canvas.height / 2)), enemyWidth, enemyHeight);
                }
            }

            drawCarStatusWindow();
        } else {
            ctx.drawImage(townBackground, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(sprite, spriteX, spriteY, spriteWidth, spriteHeight);

            drawLocationMenu();
            drawTransitionMenu();
            drawNotificationWindow();
        }

        drawDroppedItems();

        drawPLayerStatusWindow();
        drawActiveJobWindow();

        drawBullets();

    } else {
        drawGameOver();
    }

    requestAnimationFrame(draw);
}

async function drawGameOver() {
    var popUpWidth = canvas.width - 300;
    var popUpHeight = canvas.height - 300;
    var popUpX = (canvas.width - popUpWidth) / 2;
    var popUpY = ((canvas.height - popUpHeight) / 2) - 25;

    ctx.fillStyle = 'white';
    ctx.fillRect(popUpX, popUpY, popUpWidth, popUpHeight);

    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 25;
    ctx.strokeRect(popUpX, popUpY, popUpWidth, popUpHeight);

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    ctx.strokeRect(popUpX, popUpY, popUpWidth, popUpHeight);

    ctx.font = '20px Verdana';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';

    var textX = popUpX + 50;
    var textY = popUpY + 50;
    ctx.fillStyle = '#FF0000';
    var text = 'YOU DIED';
    ctx.fillText(text, textX, textY);
    textY += 50;

    ctx.fillStyle = 'black';
    var text = 'Game Over';
    ctx.fillText(text, textX, textY);
    textY += 25;

    text = 'The Wastelands Consume You';
    ctx.fillText(text, textX, textY);
    textY += 25;
}
