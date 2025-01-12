const santeFeBackground = new Image();
santeFeBackground.src = '/src/santeFe.png';

function checkSanteFeLocations() {
    if (spriteX >= 50 && spriteX <= 300 &&
        spriteY >= 430 && spriteY <= 600) {
        /** REST STOP **/
        enterSanteFeRestStop();
    } else if(spriteX >= 50 && spriteX <= 300 &&
        spriteY >= 20 && spriteY <= 180) {
        /** DUST RUNNERS **/
        enterDustRunners();
    } else if(spriteX >= 780 || spriteY <= 10) {
        /** NORTH EXIT **/
        enterI25South(1220, 4510);
    }
}

function enterDustRunners() {
    console.log("Entering Dust Runners");
    document.removeEventListener('keydown', processPlayerInput)
    document.addEventListener('keydown', readSanteFeDustRunnersInput);
    //canvas.addEventListener('click', handleCanvasClick);
    inDustRunners = true;
}

function enterSanteFeRestStop() {
    console.log("Entering Rest Stop");
    document.removeEventListener('keydown', processPlayerInput)
    document.addEventListener('keydown', readSanteFeRestStopInput);
    //canvas.addEventListener('click', handleCanvasClick);
    inRestStop = true;
}

function readSanteFeRestStopInput(e) {
    switch (e.key) {
        case '1':
            inRestStop = false;
            player.money -= 200;
            document.removeEventListener('keydown', readSanteFeRestStopInput);
            storeCarInGarage();
            loadCityChanges(City.CHEYENNE);
            break;
        case '4':
            inRestStop = false;
            player.money -= 200;
            document.removeEventListener('keydown', readSanteFeRestStopInput);
            storeCarInGarage();
            loadCityChanges(City.GRAND_JUNCTION);
            break;
        case '8':
        case 'Escape':
            inRestStop = false;
            spriteY -= 20;
            document.removeEventListener('keydown', readSanteFeRestStopInput);
            document.addEventListener('keydown', processPlayerInput);
            break;
    }
}

/*let errorMessage1 = '';
let errorMessage2 = '';*/

async function confirmJobParameters(job) {
    let hasError = false;

    if (player.car === null) {
        console.log('No active car cannot run cargo');
        errorMessage1 = 'You must be in a car to deliver cargo!';
        hasError = true;
    } else if (player.car.currentJob !== null) {
        console.log('You already have an active job, deliver or abandon that one first');
        errorMessage1 = 'You already have an active cargo job';
        errorMessage2 = 'Deliver or abandon that one first'
        hasError = true;
    } else if (job.space > (player.car.maxSpace - player.car.currentSpace)) {
        console.log('Not enough space available for cargo');
        errorMessage1 = 'Not enough space available';
        errorMessage2 = 'in your car for this cargo';
        hasError = true;
    }

    if(hasError) {
        jobConfirmError = true;
        await sleep(5000);
        jobConfirmError = false;
        return;
    }

    player.car.currentJob = job;
}

function drawJobConfirmError() {
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
    var text = 'JOB CONFIRMATION PROBLEM';
    ctx.fillText(text, textX, textY);
    textY += 50;

    ctx.fillStyle = 'black';
    var text = 'I cannot give you that job';
    ctx.fillText(text, textX, textY); textY += 50;

    text = errorMessage1;
    ctx.fillText(text, textX, textY); textY += 25;
    text = errorMessage2;
    ctx.fillText(text, textX, textY); textY += 25;

}

function readSanteFeDustRunnersInput(e) {
    switch (e.key) {
        case '1':
            confirmJobParameters(job1);
            break;
        case '2':
            confirmJobParameters(job2);
            break;
        case '3':
            confirmJobParameters(job3);
            break;
        case '4':
            confirmJobParameters(job4);
            break;
        case '7':
            roadConditionReport = true;
            break;
        case '8':
        case 'Escape':
            inDustRunners = false;
            spriteY += 20;
            document.removeEventListener('keydown', readSanteFeDustRunnersInput);
            document.addEventListener('keydown', processPlayerInput);
            break;
        default:
            break;
    }
}