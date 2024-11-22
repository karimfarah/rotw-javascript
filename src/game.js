const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const car = {x: canvas.width / 2, y: canvas.height - 30, width: 50, height: 30, speed: 5};
const bullets = [];
const bulletSpeed = 7;
document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowLeft':
            car.x -= car.speed;
            break;
        case 'ArrowRight':
            car.x += car.speed;
            break;
        case 'Space':
            bullets.push({x: car.x + car.width / 2, y: car.y, width: 5, height: 10});
            break;
    }
});

function drawCar() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

function drawBullets() {
    ctx.fillStyle = 'red';
    bullets.forEach((bullet, index) => {
        bullet.y -= bulletSpeed;
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCar();
    drawBullets();
    requestAnimationFrame(update);
}

update();