class DrawableObject {
  x = 120;
  y = 320;
  img;
  height = 100;
  width = 150;
  imageCache = {};
  currentImage = 0;
  max_x_fishes = 3300;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
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
}
