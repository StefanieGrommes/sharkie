class ThrowableObject extends MoveableObject {
   offset = {
    top: 20,
    bottom: 20,
    left: 5,
    right: 5
  };

  /**
   * Creates a bubble at the given position and starts its flight.
   * @param {number} x - Start x position.
   * @param {number} y - Start y position.
   * @param {boolean} [otherDirection=false] - true if the bubble flies to the left.
   * @param {boolean} [poisoned=false] - true for a poison bubble (different image, more damage).
   */
  constructor(x, y, otherDirection = false, poisoned = false) {
    super().loadImage(
      poisoned
        ? "./img/1.Sharkie/4.Attack/Bubble_trap/Poisoned Bubble (for whale).png"
        : "./img/1.Sharkie/4.Attack/Bubble_trap/Bubble.png",
    );
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
    this.otherDirection = otherDirection;
    this.poisoned = poisoned;

    setStoppableFunction(() => this.throw(), 40);
  }

  /**
   * Moves the bubble 8px every 60 ms to the left or right, depending on otherDirection.
   */
  throw() {
    this.x += this.otherDirection ? -8 : 8;
  }
}
