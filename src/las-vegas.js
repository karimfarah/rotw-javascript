const lasVegasBackground = new Image();
lasVegasBackground.src = '/src/lasVegas.png';

function checkLasVegasLocations() {
    if (spriteX >= 440 && spriteX <= 460 &&
        spriteY >= 210 && spriteY <= 230) {
        enterLasVegasRestStop();
    } else if(spriteX >= 200 && spriteX <= 220 &&
        spriteY >= 420 && spriteY <= 440) {
        enterCasino();
    } else if(spriteX >= 750) {
        enterI15South(100, 2200);
    }
}

function readLasVegasRestStopInput(e) {
    switch (e.key) {
        case '1':
            inRestStop = false;
            loadCityChanges(City.GRAND_JUNCTION);
            break;
        case '8':
            inRestStop = false;
            spriteY += 20;
            document.removeEventListener('keydown', readLasVegasRestStopInput);
            document.addEventListener('keydown', moveSprite);
            break;
    }
}

function enterLasVegasRestStop() {
    console.log("Entering Rest Stop");
    document.removeEventListener('keydown', moveSprite);
    document.addEventListener('keydown', readLasVegasRestStopInput);
    inRestStop = true;
}

function enterCasino() {
    console.log("Entering Casino");
    document.removeEventListener('keydown', moveSprite)
    //document.addEventListener('click', handleCasinoCanvasClick);
    document.addEventListener('keydown', handleCasinoKeyDown);
    inCasino = true;
}


function handleCasinoKeyDown(event) {
    if (inputActive) {


        if (event.key === 'Backspace') {
            carNameText = carNameText.slice(0, -1);
        }

        if(carNameText.length > 16) {
            return;
        }

        if (event.key.length === 1) {
            carNameText += event.key;
        }
        drawCasinoInputBox();
    }
}

function drawCasinoInputBox() {
    ctx.fillStyle = '#EEEEEE';
    ctx.fillRect(inputBox.x, inputBox.y, inputBox.width, inputBox.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'green';
    ctx.strokeRect(inputBox.x, inputBox.y, inputBox.width, inputBox.height);
    ctx.fillStyle = 'green';
    ctx.font = '16px Arial';
    ctx.fillText(carNameText, inputBox.x + 25, inputBox.y + 20);

    if(inputActive) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';
        textWidth = ctx.measureText(player.money).width;
        ctx.fillRect(inputBox.x + 30 + textWidth, inputBox.y + 5, 2, 20);
    }
}

//const rouletteWheel =
let spinWheel = true;

async function drawCasinoMenu() {
    var boxWidth = canvas.width - 100;
    var boxHeight = canvas.height - 100;
    var boxX = (canvas.width - boxWidth) / 2;
    var boxY = (canvas.height - boxHeight) / 2;
    /** STATIC ITEMS ON MENU **/
    ctx.fillStyle = 'grey';
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 25;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    ctx.strokeStyle = 'green';
    ctx.lineWidth = 4;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    var factoryImg = new Image();
    factoryImg.src = '/src/img/casino.png';
    ctx.drawImage(factoryImg, boxX, boxY, boxWidth, 133);

    ctx.font = '20px Verdana';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';

    var textX = boxX + 100;
    var textY = boxY + 150;
    ctx.fillStyle = 'blue';
    var text = 'LAS VEGAS CASINO';
    ctx.fillText(text, textX, textY);
    textY += 25;

    ctx.font = '20px Verdana';
    ctx.fillStyle = '#00FFFF';
    text = 'Bet Amount: ';
    ctx.fillText(text, textX, textY);
    textY += 30;
    drawInputBox();

    var rouletteImg = new Image();
    if (spinWheel) {
        rouletteImg.src = '/src/img/roulette-game-still.gif';
    } else {
        rouletteImg.src = '/src/img/roulette-game-still.gif';
    }
    ctx.drawImage(rouletteImg, boxX + 50, boxY + 200, 175, 100);
    spinWheel = false;

    drawButtons();

    ctx.font = '20px Verdana';
    ctx.fillStyle = '#00FFFF';
    text = 'Money Remaining (qc): '; // + playerMoney;
}




