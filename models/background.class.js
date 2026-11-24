class Background extends MoveableObject {
  width = 720;
  height = 480;

  /**
   * Creates the background, preloads the images
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
