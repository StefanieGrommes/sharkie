class Heart extends MoveableObject {
  width = 40;
  height = 40;

  /**
   * Creates the hearts, preloads all images and sets the position.
   */
  constructor() {
    super();
    this.loadImage("./img/4.Marcadores/green/100_  copia 3.png");
    this.x = -710 + Math.random() * (2160 - this.width + 710);
    this.y = Math.random() * (GAME_HEIGHT - this.height);
  }
}
