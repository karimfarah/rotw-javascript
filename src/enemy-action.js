let bullets = [];
let bulletSpeed = 5;

function calculateAngle(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const angleInRadians = Math.atan2(deltaY, deltaX);
    const angleInDegrees = angleInRadians * (180 / Math.PI);
    return angleInDegrees;
}



function drawBullets() {
    ctx.fillStyle = 'red';
    bullets.forEach((bullet, index) => {

        angle = bullet.angle;

        if(angle >= -22.5 && angle <= 22.5) {
            bullet.x -= bulletSpeed;
        } else if(angle >= 22.5 && angle <= 67.5) {
            bullet.y -= bulletSpeed;
            bullet.x -= bulletSpeed;
        } else if(angle >= 67.5 && angle <= 112.5) {
            bullet.y -= bulletSpeed;
        } else if(angle >= 112.5 && angle <= 157.5) {
            bullet.y -= bulletSpeed;
            bullet.x += bulletSpeed;
        } else if((angle >= 157.5 && angle <= 180) || (angle >= -180 && angle <= -157.5)) {
            bullet.x += bulletSpeed;
        } else if(angle >= -157.5 && angle <= -112.5) {
            bullet.y += bulletSpeed;
            bullet.x += bulletSpeed;
        } else if(angle >= -112.5 && angle <= -67.5) {
            bullet.y += bulletSpeed;
        } else if(angle >= -67.5 && angle <= -22.5) {
            bullet.y += bulletSpeed;
            bullet.x -= bulletSpeed;
        }

        if (bullet.y < 0 || bullet.y > 6000 || bullet.x < 0 || bullet > 8000) {
            bullets.splice(index, 1);
        }
        ctx.fillRect(bullet.x - cameraX + (canvas.width/2), bullet.y - cameraY + (canvas.height/2), bullet.width, bullet.height);
    });
}

function enemyAction(playerX, playerY, enemy) {
    if(playerX <= enemy.x + 400 && playerX >= enemy.x - 400 &&
        playerY <= enemy.y + 300 && playerY >= enemy.y - 300) {
        enemy.moves++;
        if(enemy.moves % 3 !== 0) {
            return;
        }

        let dx = playerX - enemy.x;
        let dy = playerY - enemy.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Normalize the direction vector and set the enemy speed
        if (distance > 0) {
            dx /= distance;
            dy /= distance;
        }

        // Update enemy position
        let tempX = Math.round(enemy.x + (dx * enemy.speed));
        let tempY = Math.round(enemy.y + (dy * enemy.speed));

        const color = getColorAt(tempX - cameraX + (canvas.width/2), tempY - cameraY + (canvas.height/2));
        //console.log(`Color sprite (${tempX}, ${tempY}): rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
        let isValidMove = false;
        if (color.r === 0 && color.g === 0 && color.b === 0 && enemy.isReversing === false) {
            isValidMove = true;
        } else {
            if(enemy.isReversing === false) {
                enemy.isReversing = true;
                enemy.reverseCount = 20;
            }

            if(enemy.reverseCount === 0) {
                enemy.isReversing = false;
            }

            dx = dx > 0 ? dx : -dx;
            dy = dy > 0 ? dy : -dy;
            tempX = Math.round(enemy.x + (dx * enemy.speed));
            tempY = Math.round(enemy.y + (dy * enemy.speed));
            const color = getColorAt(tempX - cameraX + (canvas.width/2), tempY - cameraY + (canvas.height/2));
            if (color.r === 0 && color.g === 0 && color.b === 0) {
                isValidMove = true;
            }

            enemy.reverseCount--;
        }

        if(isValidMove) {
            enemy.prevX = enemy.x;
            enemy.prevY = enemy.y;

            enemy.x = tempX;
            enemy.y = tempY;

            let angle = calculateAngle(enemy.x, enemy.y, enemy.prevX, enemy.prevY);
            //console.log("angle: " + angle);
            if(angle >= -22.5 && angle <= 22.5) {
                enemy.carSprite.src = '/src/img/maroon-racer-left.png';
            } else if(angle >= 22.5 && angle <= 67.5) {
                enemy.carSprite.src = '/src/img/maroon-racer-upper-left.png';
            } else if(angle >= 67.5 && angle <= 112.5) {
                enemy.carSprite.src = '/src/img/maroon-racer-forward.png';
            } else if(angle >= 112.5 && angle <= 157.5) {
                enemy.carSprite.src = '/src/img/maroon-racer-upper-right.png';
            } else if((angle >= 157.5 && angle <= 180) || (angle >= -180 && angle <= -157.5)) {
                enemy.carSprite.src = '/src/img/maroon-racer-right.png';
            } else if(angle >= -157.5 && angle <= -112.5) {
                enemy.carSprite.src = '/src/img/maroon-racer-lower-right.png';
            } else if(angle >= -112.5 && angle <= -67.5) {
                enemy.carSprite.src = '/src/img/maroon-racer-down.png';
            } else if(angle >= -67.5 && angle <= -22.5) {
                enemy.carSprite.src = '/src/img/maroon-racer-lower-left.png';
            }

            if(playerX <= enemy.x + 200 && playerX >= enemy.x - 200 &&
                playerY <= enemy.y + 150 && playerY >= enemy.y - 150) {
                bullets.push({x: enemy.x + 16, y: enemy.y, width: 2, height: 2, angle: angle});
            }

            //drawBullets();
        }
    }
}
