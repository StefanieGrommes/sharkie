class Poison extends MoveableObject {
  IMAGES_POISON = [
    "./img/4.Marcadores/Poison/Animada/1.png",
    "./img/4.Marcadores/Poison/Animada/2.png",
    "./img/4.Marcadores/Poison/Animada/3.png",
    "./img/4.Marcadores/Poison/Animada/4.png",
    "./img/4.Marcadores/Poison/Animada/5.png",
    "./img/4.Marcadores/Poison/Animada/6.png",
    "./img/4.Marcadores/Poison/Animada/7.png",
    "./img/4.Marcadores/Poison/Animada/8.png",
  ];

  width = 40;
  height = 40;

  /**
   * Creates the poison bottles, preloads all images and starts the animation loops.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_POISON[0]);
    this.loadImages(this.IMAGES_POISON);
    this.x = 100 + Math.random() * (2400 - 30);
    this.y = Math.random() * (GAME_HEIGHT - this.height);
    setStoppableFunction(() => this.animate(), 250);
  }

  /**
   * Starts the movement loop (60 times per second) and the image loop (every 250 ms).
   */
  animate() {
    this.playAnimation(this.IMAGES_POISON);
  }
}
