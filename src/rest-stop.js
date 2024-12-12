function drawRestStopMenu() {
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

    var restStopImg = new Image();
    restStopImg.src = '/src/img/reststop.png';
    ctx.drawImage(restStopImg, boxX, boxY, boxWidth, 133);

    ctx.font = '20px Verdana';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';

    var textX = boxX + 100;
    var textY = boxY + 175;
    var text = 'REST STOP MENU:';
    ctx.fillText(text, textX, textY);
    textY += 50;

    var text = '== BUS SCHEDULE ==';
    ctx.fillText(text, textX, textY);
    textY += 25;
    switch (currentCity) {
        case City.DENVER:
            text = '    1. Denver --> Cheyenne 200qc';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '    2. Denver --> Sante Fe 200qc';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '    3. Denver --> Kansas City 200qc';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '    4. Denver --> Grand Junction 200qc';
            ctx.fillText(text, textX, textY); textY += 50;
            break;
        case City.SANTE_FE:
            text = '    1. Sante Fe --> Denver 200qc';
            ctx.fillText(text, textX, textY);
            textY += 50;
            break;
        case City.CHEYENNE:
            text = '    1. Cheyenne --> Denver 200qc';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '    2. Cheyenne --> Billings 200qc';
            ctx.fillText(text, textX, textY);
            textY += 50;
            break;
        case City.GRAND_JUNCTION:
            text = '    1. Grand Junction --> Denver 200qc';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '    2. Grand Junction --> Salt Lake City 200qc';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '    3. Grand Junction --> Las Vegas 200qc';
            ctx.fillText(text, textX, textY);
            textY += 50;
            break;
        case City.SALT_LAKE_CITY:
            text = '    1. Salt Lake City --> Grand Junction 200qc';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '    2. Salt Lake --> Boise 200qc';
            ctx.fillText(text, textX, textY);
            textY += 50;
            break;
        case City.BOISE:
            text = '    1. Boise --> Salt Lake City 200qc';
            ctx.fillText(text, textX, textY);
            textY += 50;
            break;
        case City.LAS_VEGAS:
            text = '    1. Las Vegas --> Grand Junction 200qc';
            ctx.fillText(text, textX, textY);
            textY += 50;
            break;
        case City.BILLINGS:
            text = '    1. Billings --> Cheyenne 200qc';
            ctx.fillText(text, textX, textY);
            textY += 50;
            break;
    }

    text = '5. Listen for rumors';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '6. Buy Deuterium/Tritium for car power 100qc';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '7. Stay over night 20qc';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '8. Leave the Rest Stop';
    ctx.fillText(text, textX, textY);
}
