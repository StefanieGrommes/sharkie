class DrawableObject {
  x = 120;
  y = 320;
  img;
  height = 100;
  width = 150;
  imageCache = {};
  currentImage = 0;
  max_x_fishes = 3300;

  /**
   * Loads the first Image of the Drawable Object.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads the first Image of the Drawable Object.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the current image of the object on the canvas
   * at its position and size.
   * @param {CanvasRenderingContext2D} ctx - Drawing context of the canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


drawBorder(ctx) {
    if(this instanceof Jellyfish || this instanceof Character || this instanceof Pufferfish || this instanceof Endboss) {
        const offset = this.offset || {};
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(
            this.x + (offset.left || 0),
            this.y + (offset.top || 0),
            this.width - (offset.left || 0) - (offset.right || 0),
            this.height - (offset.top || 0) - (offset.bottom || 0)
        );
        ctx.stroke();
    }
}
}
