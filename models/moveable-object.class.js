class MoveableObject extends DrawableObject{
    speed = 0.3;
    otherDirection = false;
    speedY = 0;
    energy = 100;
    lastHit =  0;

    isColliding(mo) {
        return  this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height;
    }

    drawBorder(ctx) {
        if(this instanceof Jellyfish || this instanceof Character || this instanceof Pufferfish || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
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
        this.y += this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
    setInterval(() => {
        this.x -= this.speed;
    }, 1000 / 60);
    }






}