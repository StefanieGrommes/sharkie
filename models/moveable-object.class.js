class MoveableObject extends DrawableObject{
    speedX = 0.7;
    otherDirection = false;
    speedY = 0.3;
    energy = 100;
    lastHit =  0;

    isColliding(mo) {
        const thisOffset = this.offset || {};
        const otherOffset = mo.offset || {};
        const thisLeft = this.x + (thisOffset.left || 0);
        const thisRight = this.x + this.width - (thisOffset.right || 0);
        const thisTop = this.y + (thisOffset.top || 0);
        const thisBottom = this.y + this.height - (thisOffset.bottom || 0);
        const otherLeft = mo.x + (otherOffset.left || 0);
        const otherRight = mo.x + mo.width - (otherOffset.right || 0);
        const otherTop = mo.y + (otherOffset.top || 0);
        const otherBottom = mo.y + mo.height - (otherOffset.bottom || 0);

        return thisRight > otherLeft &&
            thisLeft < otherRight &&
            thisBottom > otherTop &&
            thisTop < otherBottom;
    }

    playAnimation(images) {
        let index = this.currentImage % images.length; // % heisst modulo also Rest
            let path = images[index];
            this.img = this.imageCache[path];
            this.currentImage++;
    }

    hit() {
    this.energy -= 2;
    if (this.energy < 0) {
        this.energy = 0;
    } else {
        this.lastHit = new Date().getTime();
    }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Diffence in ms
        timepassed = timepassed / 1000 // Differenz in sekunden
        return timepassed < 1;
    }

    moveUp() {
        this.y -= this.speedY;
    }

    moveDown() {
         this.y += this.speedY;
    }

    moveRight() {
        this.x += this.speedX;
    }

    moveLeft() {
        this.x -= this.speedX;
    }






}