class Statusbar extends DrawableObject {
  static IMAGES = {
    HEART: [
      "./img/4.Marcadores/Purple/0_ .png",
      "./img/4.Marcadores/Purple/20__1.png",
      "./img/4.Marcadores/Purple/40_ .png",
      "./img/4.Marcadores/Purple/60_ .png",
      "./img/4.Marcadores/Purple/80_ .png",
      "./img/4.Marcadores/Purple/100_ .png",
    ],
    COINS: [
      "./img/4.Marcadores/Purple/0_ _1.png",
      "./img/4.Marcadores/Purple/20_ .png",
      "./img/4.Marcadores/Purple/40_ _1.png",
      "./img/4.Marcadores/Purple/60_ _1.png",
      "./img/4.Marcadores/Purple/80_ _1.png",
      "./img/4.Marcadores/Purple/100__1.png",
    ],
    POISON: [
      "./img/4.Marcadores/Purple/0_.png",
      "./img/4.Marcadores/Purple/20_.png",
      "./img/4.Marcadores/Purple/40_.png",
      "./img/4.Marcadores/Purple/60_.png",
      "./img/4.Marcadores/Purple/80_.png",
      "./img/4.Marcadores/Purple/100_.png",
    ],
  };

  static POSITIONS = { HEART: 10, COINS: 305, POISON: 155 };
  percentage = 100;

  /**
   * Creates a status bar, preloads its images and sets position, size and start value.
   * The heart bar starts full (100), the other bars start empty (0).
   * @param {"HEART"|"COINS"|"POISON"} variant - Type of the status bar.
   */
  constructor(variant) {
    super();
    this.images = Statusbar.IMAGES[variant];
    this.loadImage(this.images[0]);
    this.loadImages(this.images);
    this.x = Statusbar.POSITIONS[variant];
    this.y = 0;
    this.width = 110;
    this.height = 35;
    this.setPercentage(variant === "HEART" ? 100 : 0);
  }

  /**
   * Saves the new value and shows the matching image.
   * @param {number} percentage - New value between 0 and 100.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    const path = this.images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Converts the percentage to an image index.
   * 100 -> 5, 80-99 -> 4, 60-79 -> 3, 40-59 -> 2, 1-39 -> 1, 0 -> 0.
   * @returns {number} Index (0-5) in the images array.
   */
  resolveImageIndex() {
    if (this.percentage == 100) return 5;
    else if (this.percentage >= 80) return 4;
    else if (this.percentage >= 60) return 3;
    else if (this.percentage >= 40) return 2;
    else if (this.percentage > 0) return 1;
    else return 0;
  }
}
