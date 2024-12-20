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

                /*
                                if(getRandomInt(1,2) === 1) {
                                    travelImg.src += '-day.png';
                                } else {
                                    travelImg.src += '-night.png';
                                }
                */

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

    text = 'Front:';
    ctx.fillText(text, textX, textY);
    textY += 10;

    text = 'Back:';
    ctx.fillText(text, textX, textY);
    textY += 10;

    text = 'Left:';
    ctx.fillText(text, textX, textY);
    textY += 10;

    text = 'Right:';
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
    var statusHeight = 20;
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

    // Large map tile scrolling vs single screen city map
    if(currentCity === City.NONE) {
        //console.log('cameraX: ' + cameraX + ',' + cameraY);
        ctx.drawImage(roadBackground, cameraX, cameraY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(sprite, (canvas.width/2), (canvas.height/2), spriteWidth, spriteHeight);

        //ctx.drawImage(enemySprite, enemySprite.x, enemySprite.y, enemyWidth, enemyHeight);
        for(let enemy of enemyArray) {
            enemyAction(cameraX, cameraY, enemy);

            if (isObjectInView(enemy.x, enemy.y, cameraX, cameraY, canvas.width, canvas.height)) {
                ctx.drawImage(enemy.carSprite, (enemy.x - cameraX + (canvas.width/2)), (enemy.y - cameraY + (canvas.height/2)), enemyWidth, enemyHeight);
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

    drawPLayerStatusWindow();
    drawActiveJobWindow();

    requestAnimationFrame(draw);
}

