
let starterDustRunnerJobs = [
    { minExp: 0, sourceCity: City.DENVER, destinationCity: City.CHEYENNE, destBuilding: Building.GARAGE, item: "Random Truck Parts", payout: 200, space: 100, weight: 100 },
    { minExp: 0, sourceCity: City.DENVER, destinationCity: City.CHEYENNE, destBuilding: Building.DUST_RUNNERS, item: "Contract Papers", payout: 300, space: 50, weight: 50 },
    { minExp: 0, sourceCity: City.DENVER, destinationCity: City.GRAND_JUNCTION, destBuilding: Building.WEAPONS, item: "Crates of Weaponry", payout: 800, space: 250, weight: 250 },
    { minExp: 0, sourceCity: City.DENVER, destinationCity: City.GRAND_JUNCTION, destBuilding: Building.SCRAP_YARD, item: "Scrap Metal", payout: 400, space: 150, weight: 150 },
    { minExp: 0, sourceCity: City.CHEYENNE, destinationCity: City.DENVER, destBuilding: Building.GARAGE, item: "Random Truck Parts", payout: 200, space: 100, weight: 100 },
    { minExp: 0, sourceCity: City.CHEYENNE, destinationCity: City.DENVER, destBuilding: Building.DUST_RUNNERS, item: "Contract Papers", payout: 300, space: 50, weight: 50 },
    { minExp: 0, sourceCity: City.CHEYENNE, destinationCity: City.DENVER, destBuilding: Building.WASTELANDERS, item: "Crates of Weaponry", payout: 800, space: 250, weight: 250 },
    { minExp: 0, sourceCity: City.CHEYENNE, destinationCity: City.DENVER, destBuilding: Building.SCRAP_YARD, item: "Scrap Metal", payout: 400, space: 150, weight: 150 }
];

let job1 = null;
let job2 = null;
let job3 = null;
let job4 = null;

function drawDustRunnersMenu() {
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
    img.src = '/src/img/dust-runners.png';
    ctx.drawImage(img, boxX, boxY, boxWidth, 133);

    ctx.font = '20px Verdana';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';

    var textX = boxX + 100;
    var textY = boxY + 150;
    var text = 'DUST RUNNERS MENU:';
    ctx.fillText(text, textX, textY);
    textY += 25;

    var text = '== JOBS ==';
    ctx.fillText(text, textX, textY);
    textY += 25;
    job1 = starterDustRunnerJobs[randomJobList[0]];
    job2 = starterDustRunnerJobs[randomJobList[1]];
    job3 = starterDustRunnerJobs[randomJobList[2]];
    job4 = starterDustRunnerJobs[randomJobList[3]];
    switch (currentCity) {
        case City.DENVER:
            text = '    1. ' + job1.sourceCity + ' --> ' + job1.destinationCity + ' - ' + job1.destBuilding + ' (' +  job1.payout + 'gc)';
            ctx.fillStyle = 'green';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '        (' + job1.item + ' lbs:' + job1.weight + ' sp:' + job1.space + ')';
            ctx.fillStyle = 'black';
            ctx.fillText(text, textX, textY);
            textY += 25;

            text = '    2. ' + job2.sourceCity + ' --> ' + job2.destinationCity + ' - ' + job2.destBuilding + ' (' +  job2.payout + 'gc)';
            ctx.fillStyle = 'green';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '        (' + job2.item + ' lbs:' + job2.weight + ' sp:' + job2.space + ')';
            ctx.fillStyle = 'black';
            ctx.fillText(text, textX, textY);
            textY += 25;

            text = '    3. ' + job3.sourceCity + ' --> ' + job3.destinationCity + ' - ' + job3.destBuilding + ' (' +  job3.payout + 'gc)';
            ctx.fillStyle = 'green';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '        (' + job3.item + ' lbs:' + job3.weight + ' sp:' + job3.space + ')';
            ctx.fillStyle = 'black';
            ctx.fillText(text, textX, textY);
            textY += 25;

            text = '    4. ' + job4.sourceCity + ' --> ' + job4.destinationCity + ' - ' + job4.destBuilding + ' (' +  job4.payout + 'gc)';
            ctx.fillStyle = 'green';
            ctx.fillText(text, textX, textY);
            textY += 25;
            text = '        (' + job4.item + ' lbs:' + job4.weight + ' sp:' + job4.space + ')';
            ctx.fillStyle = 'black';
            ctx.fillText(text, textX, textY);
            textY += 25;
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
    text = '7. Check road conditions';
    ctx.fillText(text, textX, textY); textY += 25;
    text = '8. Leave Dust Runners';
    ctx.fillText(text, textX, textY);

}

function deliverJob(city, building) {
    if(player.car === null || player.car.currentJob === null) {
        return;
    }

    if(player.car.currentJob.destinationCity === city &&
        player.car.currentJob.destBuilding === building) {
        player.money += player.car.currentJob.payout;
        player.car.currentJob = null;
    }
}