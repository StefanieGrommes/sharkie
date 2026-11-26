class Jellyfish extends MoveableObject {
  width = 80;
  height = 120;
  offset = {
    top: 15,
    bottom: 15,
    left: 8,
    right: 8,
  };

  static IMAGES = {
    GREEN: [
      "./img/2.Enemy/2.Jelly_fish/Super dangerous/Green 1.png",
      "./img/2.Enemy/2.Jelly_fish/Super dangerous/Green 2.png",
      "./img/2.Enemy/2.Jelly_fish/Super dangerous/Green 3.png",
      "./img/2.Enemy/2.Jelly_fish/Super dangerous/Green 4.png",
    ],
    PINK: [
      "./img/2.Enemy/2.Jelly_fish/Super dangerous/Pink 1.png",
      "./img/2.Enemy/2.Jelly_fish/Super dangerous/Pink 2.png",
      "./img/2.Enemy/2.Jelly_fish/Super dangerous/Pink 3.png",
      "./img/2.Enemy/2.Jelly_fish/Super dangerous/Pink 4.png",
    ],
    LILA: [
      "./img/2.Enemy/2.Jelly_fish/Regular damage/Lila 1.png",
      "./img/2.Enemy/2.Jelly_fish/Regular damage/Lila 2.png",
      "./img/2.Enemy/2.Jelly_fish/Regular damage/Lila 3.png",
      "./img/2.Enemy/2.Jelly_fish/Regular damage/Lila 4.png",
    ],
    YELLOW: [
      "./img/2.Enemy/2.Jelly_fish/Regular damage/Yellow 1.png",
      "./img/2.Enemy/2.Jelly_fish/Regular damage/Yellow 2.png",
      "./img/2.Enemy/2.Jelly_fish/Regular damage/Yellow 3.png",
      "./img/2.Enemy/2.Jelly_fish/Regular damage/Yellow 4.png",
    ],
  };

  IMAGES_DEAD = {
    GREEN: [
      "./img/2.Enemy/2.Jelly_fish/Dead/green/g1.png",
      "./img/2.Enemy/2.Jelly_fish/Dead/green/g2.png",
      "./img/2.Enemy/2.Jelly_fish/Dead/green/g3.png",
      "./img/2.Enemy/2.Jelly_fish/Dead/green/g4.png",
    ],
    PINK: [
      "./img/2.Enemy/2.Jelly_fish/Dead/Pink/P1.png",
      "./img/2.Enemy/2.Jelly_fish/Dead/Pink/P2.png",
      "./img/2.Enemy/2.Jelly_fish/Dead/Pink/P3.png",
      "./img/2.Enemy/2.Jelly_fish/Dead/Pink/P4.png",
    ],
    LILA: [
      "./img/2.Enemy/2.Jelly_fish/Dead/Lila/L1.png",
      "./img/2.Enemy/2.Jelly_fish/Dead/Lila/L2.png",
      "./img/2.Enemy/2.Jelly_fish/Dead/Lila/L3.png",
      "./img/2.Enemy/2.Jelly_fish/Dead/Lila/L4.png",
    ],
    YELLOW: [
      "./img/2.Enemy/2.Jelly_fish/Dead/Yellow/y1.png",
      "./img/2.Enemy/2.Jelly_fish/Dead/Yellow/y2.png",
      "./img/2.Enemy/2.Jelly_fish/Dead/Yellow/y3.png",
      "./img/2.Enemy/2.Jelly_fish/Dead/Yellow/y4.png",
    ],
  };

  /**
   * Creates a jellyfish at a random position with a random speed and preloads its images.
   * @param {"GREEN"|"PINK"|"LILA"|"YELLOW"} [variant="GREEN"] - Color variant.
   */
  constructor(variant = "GREEN") {
    super();
    this.images = Jellyfish.IMAGES[variant];
    this.loadImage(this.images[0]);
    this.loadImages(this.images);
    this.x = 200 + Math.random() * (2160 - this.width - 200);
    this.y = Math.random() * (GAME_HEIGHT - this.height) + 20;
    this.speedY = 0.2 + Math.random() * 0.4;
    this.variant = variant;
    this.loadImages(this.IMAGES_DEAD[variant]);
    this.animate();
  }

  /**
   * Starts the loops for swimming (60 times per second), images (every 180 ms)
   * and flying away after death (60 times per second).
   */
  animate() {
    setStoppableFunction(() => this.swimUpAndDown(), 1000 / 60);
    setStoppableFunction(() => this.showImages(), 180);
    setStoppableFunction(() => this.flyAway(), 1000 / 60);
  }

  /**
   * Moves the jellyfish vertically and reverses the direction at the top (y <= 0)
   * and bottom (y >= 380).
   */
  swimUpAndDown() {
    this.y += this.speedY;
    if (this.y >= 380) this.speedY = -Math.abs(this.speedY);
    if (this.y <= 0) this.speedY = Math.abs(this.speedY);
  }

  /**
   * Shows the next frame of the swim animation. After death the dead animation
   * plays once and the jellyfish is then marked as removable.
   */
  showImages() {
    if (this.dead) {
      const imgs = this.IMAGES_DEAD[this.variant];
      if (this.currentImage < imgs.length) {
        this.playAnimation(imgs);
      } else {
        this.removable = true;
      }
    } else {
      this.playAnimation(this.images);
    }
  }
}
