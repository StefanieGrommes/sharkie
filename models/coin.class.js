class Coin extends MoveableObject {
  IMAGES_COINS = [
    "./img/4.Marcadores/1. Coins/1.png",
    "./img/4.Marcadores/1. Coins/2.png",
    "./img/4.Marcadores/1. Coins/3.png",
    "./img/4.Marcadores/1. Coins/4.png",
  ];

  width = 40;
  height = 40;

  /**
   * Creates the coins, preloads all images and starts the animation loops.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);
    this.x = -710 + Math.random() * (2160 - this.width + 710);
    this.y = Math.random() * (GAME_HEIGHT - this.height);
    setStoppableFunction(() => this.animate(), 180);
  }

  /**
   * Starts the movement loop (60 times per second) and the image loop (every 180 ms).
   */
  animate() {
    this.playAnimation(this.IMAGES_COINS);
  }
}
