class MoveableObject {
    x = 120;
    y = 320;
    img;
    height = 100;
    width = 150;
    speed = 0.3;
    otherDirection = false;
    imageCache = {};

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

    moveRight() {
        console.log('Move right');
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