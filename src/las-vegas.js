const lasVegasBackground = new Image();
lasVegasBackground.src = '/src/lasVegas.png';

const betAmountInputBox = { x: 225, y: 205, width: 100, height: 30 };
const rouletteTableBox = { x: 300, y: 300, width: 300, height: 100 };
const leaveBox = { x: 450, y: 500, width: 100, height: 30 };
const spinBox = { x: 600, y: 500, width: 100, height: 30 };
let playerBet = { bet: null, number: null, lowRange: null, highRange: null };
let spinResult = null;

let blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
let redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

let topLineNumbers = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
let middleLineNumbers = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
let bottomLineNumbers = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];

let topHalfNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
let bottomHalfNumbers = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];

let topThirdNumbers = [1,2,3,4,5,6,7,8,9,10,11,12];
let middleThirdNumbers = [13,14,15,16,17,18,19,20,21,22,23,24];
let bottomThirdNumbers = [25,26,27,28,29,30,31,32,33,34,35,36];

let greenNumbers = [-1, 0];
let resultMessage = '';
let playerWon = false;

const Placement = Object.freeze({
    RED: 'Red',
    BLACK: 'Black',
    EVEN: 'Even',
    ODD: 'Odd',
    RANGE: 'Range',
    NUMBER: 'Number'
});

let betAmountText = '';
let chipPlacement = { x: 0, y: 0, prevSet: false, prevBetAmt: 0, currBetAmt: 0 };

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
            player.money -= 200;
            loadCityChanges(City.GRAND_JUNCTION);
            break;
        case '8':
            inRestStop = false;
            spriteY += 20;
            document.removeEventListener('keydown', readLasVegasRestStopInput);
            document.addEventListener('keydown', processPlayerInput);
            break;
    }
}

function enterLasVegasRestStop() {
    console.log("Entering Rest Stop");
    document.removeEventListener('keydown', processPlayerInput);
    document.addEventListener('keydown', readLasVegasRestStopInput);
    inRestStop = true;
}

function enterCasino() {
    console.log("Entering Casino");
    document.removeEventListener('keydown', processPlayerInput)
    //document.addEventListener('click', handleCasinoCanvasClick);
    document.addEventListener('click', handleCasinoCanvasClick);
    document.addEventListener('keydown', handleCasinoKeyDown);
    inCasino = true;
}

async function handleCasinoCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log('click at: ' + x + ", " + y);
    // Check if the click is inside the input box
    if (x >= betAmountInputBox.x && x <= betAmountInputBox.x + betAmountInputBox.width && y >= betAmountInputBox.y && y <= betAmountInputBox.y + betAmountInputBox.height) {
        inputActive = true;
    } else {
        inputActive = false;
    }

    //setChipPlacement(x, y);

    if (x >= 436 && x <= 436 + 40 && y >= 412 && y <= 412 + 12) {
        setChipPlacement(x, y, Placement.RED, null, null, null, null);
    }

    if (x >= 478 && x <= 478 + 40 && y >= 412 && y <= 412 + 12) {
        setChipPlacement(x, y, Placement.BLACK, null, null, null, null);
    }

    if (x >= 396 && x <= 396 + 40 && y >= 412 && y <= 412 + 12) {
        setChipPlacement(x, y, Placement.EVEN, null, null, null, null);
    }

    if (x >= 516 && x <= 516 + 40 && y >= 412 && y <= 412 + 12) {
        setChipPlacement(x, y, Placement.ODD, null, null, null, null);
    }

    if (x >= 356 && x <= 356 + 65 && y >= 393 && y <= 393 + 12) {
        setChipPlacement(x, y, Placement.RANGE, null, topThirdNumbers);
    }

    if (x >= 436 && x <= 436 + 65 && y >= 393 && y <= 393 + 12) {
        setChipPlacement(x, y, Placement.RANGE, null, middleThirdNumbers);
    }

    if (x >= 515 && x <= 515 + 65 && y >= 393 && y <= 393 + 12) {
        setChipPlacement(x, y, Placement.RANGE, null, bottomThirdNumbers);
    }

    if (x >= 356 && x <= 356 + 40 && y >= 412 && y <= 412 + 12) {
        setChipPlacement(x, y, Placement.RANGE, null, topHalfNumbers);
    }

    if (x >= 556 && x <= 556 + 40 && y >= 412 && y <= 412 + 12) {
        setChipPlacement(x, y, Placement.RANGE, null, bottomHalfNumbers);
    }

    if (x >= 598 && x <= 598 + 10 && y >= 318 && y <= 318 + 20) {
        setChipPlacement(x, y, Placement.RANGE, null, topLineNumbers);
    }

    if (x >= 598 && x <= 598 + 15 && y >= 318 && y <= 318 + 20) {
        setChipPlacement(x, y, Placement.RANGE, null, middleLineNumbers);
    }

    if (x >= 598 && x <= 598 + 10 && y >= 370 && y <= 370 + 20) {
        setChipPlacement(x, y, Placement.RANGE, null, bottomLineNumbers);
    }

/*
    if (x >= 356 && x <= 356 + 10 && y >= 318 && y <= 318 + 20) {
        setChipPlacement(x, y, Placement.NUMBER, 3, bottomLineNumbers);
    }
*/

    // 00
    if (x >= 334 && x <= 334 + 10 && y >= 318 && y <= 318 + 35) {
        setChipPlacement(x, y, Placement.NUMBER, -1, bottomLineNumbers);
    }

    // 0
    if (x >= 334 && x <= 334 + 10 && y >= 356 && y <= 356 + 35) {
        setChipPlacement(x, y, Placement.NUMBER, 0, bottomLineNumbers);
    }


    // top row numbers
    let startX = 356;
    let startY = 318;
    for(let i = 3; i <= 36; i += 3) {
        if (x >= startX && x <= startX + 10 && y >= startY && y <= startY + 20) {
            setChipPlacement(x, y, Placement.NUMBER, i, bottomLineNumbers);
        }
        startX += 20;
    }

    // middle row numbers
    startX = 356;
    startY = 343;
    for(let i = 2; i <= 35; i += 3) {
        if (x >= startX && x <= startX + 10 && y >= startY && y <= startY + 20) {
            setChipPlacement(x, y, Placement.NUMBER, i, bottomLineNumbers);
        }
        startX += 20;
    }

    // bottom row numbers
    startX = 356;
    startY = 370;
    for(let i = 1; i <= 34; i += 3) {
        if (x >= startX && x <= startX + 10 && y >= startY && y <= startY + 20) {
            setChipPlacement(x, y, Placement.NUMBER, i, bottomLineNumbers);
        }
        startX += 20;
    }


    if (x >= chassisOptionLocation.x && x <= chassisOptionLocation.x + chassisOptionLocation.width && y >= chassisOptionLocation.y - 25 && y <= chassisOptionLocation.y - 25 + chassisOptionLocation.height) {
    }

    if (x >= fusionEngineOptionLocation.x && x <= fusionEngineOptionLocation.x + fusionEngineOptionLocation.width && y >= fusionEngineOptionLocation.y - 25 && y <= fusionEngineOptionLocation.y - 25 + fusionEngineOptionLocation.height) {
    }

    if (x >= tiresOptionLocation.x && x <= tiresOptionLocation.x + tiresOptionLocation.width && y >= tiresOptionLocation.y - 25 && y <= tiresOptionLocation.y - 25 + tiresOptionLocation.height) {
    }

    if (x >= weaponFrontOptionLocation.x && x <= weaponFrontOptionLocation.x + weaponFrontOptionLocation.width && y >= weaponFrontOptionLocation.y - 25 && y <= weaponFrontOptionLocation.y - 25 + weaponFrontOptionLocation.height) {
    }

    if (x >= weaponBackOptionLocation.x && x <= weaponBackOptionLocation.x + weaponBackOptionLocation.width && y >= weaponBackOptionLocation.y - 25 && y <= weaponBackOptionLocation.y - 25 + weaponBackOptionLocation.height) {
    }

    if (inBox(x, y, weaponLeftOptionLocation)) {
    }

    if (inBox(x, y, weaponRightOptionLocation)) {
    }

    if (inBox(x, y, weaponTopOptionLocation)) {
    }

    // leave the factory
    if (x >= leaveBox.x && x <= leaveBox.x + leaveBox.width && y >= leaveBox.y && y <= leaveBox.y + leaveBox.height) {
        inCasino = false;
        inputActive = false;
        spriteX += 40;
        document.removeEventListener('click', handleCasinoCanvasClick);
        document.removeEventListener('keydown', handleCasinoKeyDown);
        document.addEventListener('keydown', processPlayerInput);
    }

    if (x >= spinBox.x && x <= spinBox.x + spinBox.width && y >= spinBox.y && y <= spinBox.y + spinBox.height) {
        if(player.money < 0) {
            return;
        }

        console.log('Spinning wheel');

        spinWheel = true;

        // -1 is 00
        spinResult = getRandomInt(-1, 36);

        playerWon = false;
        let winFactor = 0;
        switch(playerBet.bet) {
            case Placement.RED:
                if(redNumbers.includes(spinResult)) {
                    playerWon = true;
                    winFactor = 2;
                }
                break;
            case Placement.BLACK:
                if(blackNumbers.includes(spinResult)) {
                    playerWon = true;
                    winFactor = 2;
                }
                break;
            case Placement.EVEN:
                if(spinResult !== 0 && (spinResult % 2) === 0) {
                    playerWon = true;
                    winFactor = 2;
                }
                break;
            case Placement.ODD:
                if(spinResult !== 0 && (spinResult % 2) !== 0) {
                    playerWon = true;
                    winFactor = 2;
                }
                break;
            case Placement.RANGE:
                if(playerBet.numbersList.includes(spinResult)) {
                    playerWon = true;
                    winFactor = 2;
                }
                break;
            case Placement.NUMBER:
                if(playerBet.number === spinResult) {
                    playerWon = true;
                    winFactor = 35;
                }
                break;
            default:
        }

        if(playerWon) {
            resultMessage = 'You WIN ' + (chipPlacement.currBetAmt * winFactor);
            player.money += (chipPlacement.currBetAmt * winFactor);
        } else {
            resultMessage = 'You LOSE ' + chipPlacement.currBetAmt;

            // player money already subtracted
        }

        chipPlacement.x = 0;
        chipPlacement.prevSet = 0;
        chipPlacement.currBetAmt = 0;
        chipPlacement.prevBetAmt = 0;

        await sleep(2000);
        spinWheel = false;
    }

}

function drawSpinWheelNotification() {
    var popUpWidth = canvas.width - 300;
    var popUpHeight = canvas.height - 300;
    var popUpX = (canvas.width - popUpWidth) / 2;
    var popUpY = ((canvas.height - popUpHeight) / 2) - 25;

    ctx.fillStyle = 'white';
    ctx.fillRect(popUpX, popUpY, popUpWidth, popUpHeight);

    ctx.strokeStyle = 'grey';
    ctx.lineWidth = 25;
    ctx.strokeRect(popUpX, popUpY, popUpWidth, popUpHeight);

    if(playerWon) {
        ctx.strokeStyle = 'green';
    } else {
        ctx.strokeStyle = 'red';
    }
    ctx.lineWidth = 4;
    ctx.strokeRect(popUpX, popUpY, popUpWidth, popUpHeight);

    ctx.font = '20px Verdana';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'left';

    var textX = popUpX + 50;
    var textY = popUpY + 50;
    ctx.fillStyle = '#00FF00';
    var text = 'SPINNING WHEEL';
    ctx.fillText(text, textX, textY);
    textY += 50;

    ctx.fillStyle = 'black';
    text = 'Your Bet: ' + playerBet.bet + ' ' +
        (playerBet.number !== null ? (playerBet.number === -1 ? '00' : playerBet.number) :
        (playerBet.bet === Placement.RANGE ? playerBet.numbersList.slice(0,2) + '..' + playerBet.numbersList.slice(-2) : '')) + '';
    ctx.fillText(text, textX, textY); textY += 50;

    let x = (playerBet.number === -1 ? '00' : playerBet.number);

    var winColor = 'UNKNOWN';
    if(redNumbers.includes(spinResult)) {
        winColor = 'RED';
    } else if(blackNumbers.includes(spinResult)) {
        winColor = 'BLACK';
    } else if(greenNumbers.includes(spinResult)) {
        winColor = 'GREEN';
    }

    var oddEvenString = 'ODD';
    if(spinResult > 0 && (spinResult % 2) === 0) {
        oddEvenString = 'EVEN';
    }

    text = 'Winning Number is: ' + (spinResult > 0 ? spinResult : '00') + ' ' + winColor + ' ' + oddEvenString;
    ctx.fillText(text, textX, textY); textY += 50; textY += 25;

    ctx.fillText(resultMessage, textX, textY); textY += 25;
}

function setChipPlacement(chipX, chipY, placementType, number, numbersList) {
    if(chipPlacement.prevSet) {
        player.money += chipPlacement.prevBetAmt;
    }

    chipPlacement.x = chipX;
    chipPlacement.y = chipY;
    chipPlacement.currBetAmt = Number(betAmountText);
    chipPlacement.prevSet = true;
    chipPlacement.prevBetAmt = chipPlacement.currBetAmt;

    player.money -= chipPlacement.currBetAmt;
    playerBet.bet = placementType;
    playerBet.number = number;
    playerBet.numbersList = numbersList;
}

function drawChipPlacement(chipX, chipY) {
    ctx.beginPath();
    ctx.arc(chipX, chipY, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'blue'; // You can change the color
    ctx.fill();
    ctx.closePath();
}

function isNumber(str) {
    return !isNaN(parseInt(str)) && isFinite(str);
}

function handleCasinoKeyDown(event) {
    if (inputActive) {


        if (event.key === 'Backspace') {
            betAmountText = betAmountText.slice(0, -1);
        }

        if((betAmountText.length > 6 || !isNumber(betAmountText)) &&
            betAmountText !== '') {
            return;
        }

        if (event.key.length === 1 && isNumber(event.key)) {
            betAmountText += event.key;
        }

        drawCasinoInputBox();
    }
}

function drawCasinoInputBox() {
    ctx.fillStyle = '#EEEEEE';
    ctx.fillRect(betAmountInputBox.x, betAmountInputBox.y, betAmountInputBox.width, betAmountInputBox.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'green';
    ctx.strokeRect(betAmountInputBox.x, betAmountInputBox.y, betAmountInputBox.width, betAmountInputBox.height);
    ctx.fillStyle = 'green';
    ctx.font = '16px Arial';
    ctx.fillText(betAmountText, betAmountInputBox.x + 25, betAmountInputBox.y + 20);

    // draw the cursor
    if(inputActive) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';
        textWidth = ctx.measureText(betAmountText).width;
        ctx.fillRect(betAmountInputBox.x + 30 + textWidth, betAmountInputBox.y + 5, 2, 20);
    }
}

//const rouletteWheel =

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

    var casinoImg = new Image();
    casinoImg.src = '/src/img/casino.png';
    ctx.drawImage(casinoImg, boxX, boxY, boxWidth, 133);

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
    ctx.fillText(text, betAmountInputBox.x - 150, betAmountInputBox.y + 25);
    textY += 30;
    drawCasinoInputBox();

    ctx.font = '20px Verdana';
    ctx.fillStyle = '#00FFFF';
    text = 'Money Remaining (qc): '; // + playerMoney;
    ctx.fillText(text, betAmountInputBox.x + 125, betAmountInputBox.y + 25);

    ctx.font = '20px Verdana';
    ctx.fillStyle = '#FFFFFF';
    text = '' + player.money; // + playerMoney;
    ctx.fillText(text, betAmountInputBox.x + 400, betAmountInputBox.y + 25);

    var rouletteImg = new Image();
    rouletteImg.src = '/src/img/roulette-full-table.png';
    ctx.drawImage(rouletteImg, boxX + 75, boxY + 200, 550, 250);

/*
    var rouletteTableImg = new Image();
    rouletteTableImg.src = '/src/img/roulette-table.png';
    ctx.drawImage(rouletteTableImg, boxX + 250, boxY + 300, 300, 150);
*/

    drawCasinoButtons();

    if(chipPlacement.x !== 0) {
        drawChipPlacement(chipPlacement.x, chipPlacement.y);
    }
}

function drawCasinoButtons() {
    ctx.fillStyle = '#999999';
    ctx.fillRect(leaveBox.x, leaveBox.y, leaveBox.width, leaveBox.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.strokeRect(leaveBox.x, leaveBox.y, leaveBox.width, leaveBox.height);
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText('LEAVE', leaveBox.x + 20, leaveBox.y + 20);

    ctx.fillStyle = 'green';
    ctx.fillRect(spinBox.x, spinBox.y, spinBox.width, spinBox.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.strokeRect(spinBox.x, spinBox.y, spinBox.width, spinBox.height);
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText('SPIN', spinBox.x + 25, spinBox.y + 20);
}



