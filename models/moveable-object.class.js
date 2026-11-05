class MoveableObject {
    x = 120;
    y = 320;
    img;
    height = 100;
    width = 150;
    speed = 0.3;
    otherDirection = false;
    imageCache = {};
    speedY = 0;
    energy = 100;
    lastHit =  0;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

    isColliding(mo) {
        return  this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height;
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

    playAnimation(images) {
        let index = this.currentImage % images.length; // % heisst modulo also Rest
            let path = images[index];
            this.img = this.imageCache[path];
            this.currentImage++;
    }




}