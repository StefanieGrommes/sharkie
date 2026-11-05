class DrawableObject {
x = 120;
y = 320;
img;
height = 100;
width = 150;
imageCache = {};
currentImage = 0;


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

drawBorder(ctx) {
    if(this instanceof Jellyfish || this instanceof Character || this instanceof Pufferfish || this instanceof Endboss) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }
}

draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
}


}