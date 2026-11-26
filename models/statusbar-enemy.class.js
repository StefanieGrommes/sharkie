class StatusbarEnemy extends Statusbar {
  static ICON = "./img/2.Enemy/3_Final_Enemy/2.floating/1.png";

  /**
   * Creates a endboss bar with boss icon on top
   */
  constructor() {
    super("HEART");
    this.x = 460;
    this.icon = new Image();
    this.icon.src = StatusbarEnemy.ICON;
    this.setPercentage(100);
  }
  /**
   * Draws the bar and the boss icon over the heart symbol.
   * @param {CanvasRenderingContext2D} ctx - Canvas context.
   */
  draw(ctx) {
    super.draw(ctx);
    ctx.drawImage(this.icon, this.x - 15, this.y - 25, 62, 70);
  }
}
