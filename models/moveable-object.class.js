class MoveableObject extends DrawableObject{
    speedX = 0.3;
    otherDirection = false;
    speedY = 0.3;
    energy = 100;
    lastHit =  0;

    isColliding(mo) {
        return  this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height;
    }

    playAnimation(images) {
        let index = this.currentImage % images.length; // % heisst modulo also Rest
            let path = images[index];
            this.img = this.imageCache[path];
            this.currentImage++;
    }

    hit() {
    this.energy -= 5;
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
    setInterval(() => {
        this.x -= this.speedX
    }, 1000 / 60);
    }






}