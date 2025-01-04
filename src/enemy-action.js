let bullets = [];
let bulletSpeed = 5;

let droppedItems = [];

function Enemy(enemy) {
    this.speed = enemy.speed;
    this.hp = enemy.hp;
    this.x = enemy.x;
    this.y = enemy.y;
    this.car = enemy.car;
    this.color = enemy.color;
    this.carSprite = enemy.carSprite;
    this.prevX = enemy.prevX;
    this.prevY = enemy.prevY;
    this.moves = enemy.moves;
    this.isReversing = enemy.isReversing;
    this.reverseCount = enemy.reverseCount;
}

function calculateAngle(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const angleInRadians = Math.atan2(deltaY, deltaX);
    const angleInDegrees = angleInRadians * (180 / Math.PI);
    return angleInDegrees;
}


function drawDroppedItems() {
    droppedItems.forEach((droppedItem, index) => {
        let image = new Image();
        image.src = droppedItem.src;
        ctx.drawImage(image, droppedItem.x - cameraX + (canvas.width/2), droppedItem.y - cameraY + (canvas.height/2), spriteWidth, spriteHeight);
    });
}

function drawBullets() {

    bullets.forEach((bullet, index) => {
        ctx.fillStyle = bullet.color;

        angle = bullet.angle;

        bullet.prevX = bullet.x;
        bullet.prevY = bullet.y;

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

        if(bullet.isEnemyBullet && playerImpact(bullet)) {
            ctx.fillRect(bullet.x - cameraX + (canvas.width/2), bullet.y - cameraY + (canvas.height/2), bullet.width*5, bullet.height*5);
            calculatePlayerDamage(bullet);
            bullets.splice(index, 1);
        } else if(bullet.isEnemyBullet === false) {
            enemyImpact(bullet);
        }
    });
}

function playerImpact(bullet) {
    let distance = Math.sqrt((bullet.x - (cameraX+16)) ** 2 + (bullet.y - (cameraY+16)) ** 2);
    if(distance < 16) {
        return true;
    }

    return false;
}

function enemyImpact(bullet) {
    enemyArray.forEach((enemy, index) => {
        let distance = Math.sqrt((bullet.x - (enemy.x + 16)) ** 2 + (bullet.y - (enemy.y + 16)) ** 2);
        if (distance < 16) {
            enemy.hp -= 1;
            ctx.fillRect(bullet.x - cameraX + (canvas.width/2), bullet.y - cameraY + (canvas.height/2), bullet.width*5, bullet.height*5);
            if(enemy.hp < 0) {
                droppedItems.push({x: bullet.x, y: bullet.y, src: '/src/img/enemy-destroyed.png'});
                enemyArray.splice(index, 1);
            }
            return true;
        }
    });

    return false;
}

function calculatePlayerDamage(bullet) {
    //let angle = calculateAngle(player.x, player.y, bulletX, bulletY);
    //console.log("angle: " + angle);
    let bulletRelX = (bullet.prevX - cameraX + (canvas.width/2));
    let bulletRelY = (bullet.prevY - cameraY + (canvas.height/2));
    let angle = calculateAngle(spriteX, spriteY, bulletRelX, bulletRelY);

    if(player.car === null) {
        player.health -= 1;

        if(player.health <= 0) {
            gameOver = true;
        }

        return;
    }

    console.log(spriteX + 16, spriteY + 16, bulletRelX, bulletRelY, angle);
    if(angle >= -22.5 && angle <= 22.5) {
        console.log('left panel hit');
        player.car.leftArmor -= 1;
    } else if(angle >= 22.5 && angle <= 67.5) {
        console.log('left or front panel hit');
        getRandomInt(1,2) === 1 ? player.car.leftArmor -= 1 : player.car.frontArmor -= 1
    } else if(angle >= 67.5 && angle <= 112.5) {
        console.log('front panel hit');
        player.car.frontArmor -= 1;
    } else if(angle >= 112.5 && angle <= 157.5) {
        console.log('right or front panel hit');
        getRandomInt(1,2) === 1 ? player.car.rightArmor -= 1 : player.car.frontArmor -= 1
    } else if((angle >= 157.5 && angle <= 180) || (angle >= -180 && angle <= -157.5)) {
        console.log('right panel hit');
        player.car.rightArmor -= 1;
    } else if(angle >= -157.5 && angle <= -112.5) {
        console.log('right or back panel hit');
        getRandomInt(1,2) === 1 ? player.car.rightArmor -= 1 : player.car.backArmor -= 1
    } else if(angle >= -112.5 && angle <= -67.5) {
        console.log('back panel hit');
        player.car.backArmor -= 1;
    } else if(angle >= -67.5 && angle <= -22.5) {
        console.log('left or back panel hit');
        getRandomInt(1,2) === 1 ? player.car.leftArmor -= 1 : player.car.backArmor -= 1
    }

    if(player.car.frontArmor <= 0 || player.car.backArmor <= 0 ||
       player.car.leftArmor <= 0  || player.car.rightArmor <= 0) {
        player.car = null;
        sprite.src = '/src/img/sprite-facing.png';
        droppedItems.push({x: bullet.x, y: bullet.y, src: '/src/img/car-destroyed.png'});
    } else {
        console.log(player.car.frontArmor, player.car.backArmor, player.car.leftArmor, player.car.rightArmor);
    }
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
                enemy.carSprite.src = '/src/img/'+enemy.color+'-racer-left.png';
            } else if(angle >= 22.5 && angle <= 67.5) {
                enemy.carSprite.src = '/src/img/'+enemy.color+'-racer-upper-left.png';
            } else if(angle >= 67.5 && angle <= 112.5) {
                enemy.carSprite.src = '/src/img/'+enemy.color+'-racer-forward.png';
            } else if(angle >= 112.5 && angle <= 157.5) {
                enemy.carSprite.src = '/src/img/'+enemy.color+'-racer-upper-right.png';
            } else if((angle >= 157.5 && angle <= 180) || (angle >= -180 && angle <= -157.5)) {
                enemy.carSprite.src = '/src/img/'+enemy.color+'-racer-right.png';
            } else if(angle >= -157.5 && angle <= -112.5) {
                enemy.carSprite.src = '/src/img/'+enemy.color+'-racer-lower-right.png';
            } else if(angle >= -112.5 && angle <= -67.5) {
                enemy.carSprite.src = '/src/img/'+enemy.color+'-racer-down.png';
            } else if(angle >= -67.5 && angle <= -22.5) {
                enemy.carSprite.src = '/src/img/'+enemy.color+'-racer-lower-left.png';
            }

            if(playerX <= enemy.x + 400 && playerX >= enemy.x - 400 &&
                playerY <= enemy.y + 300 && playerY >= enemy.y - 300) {
                bullets.push({x: enemy.x + 16, y: enemy.y + 16, width: 2, height: 2, angle: angle, prevX: 0, prevY: 0, color: 'red', isEnemyBullet: true});
            }

            //drawBullets();
        }
    }
}
