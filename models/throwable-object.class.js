class ThrowableObject extends MoveableObject {
  constructor(x, y, otherDirection = false, poisoned = false) {
    super().loadImage(
      poisoned
        ? "./img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png"
        : "./img/1.Sharkie/4.Attack/Bubble trap/Bubble.png",
    );
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
    this.otherDirection = otherDirection;
    this.poisoned = poisoned;
    this.throw();
  }

  throw() {
    setInterval(() => {
      this.x += this.otherDirection ? -8 : 8;
    }, 60);
  }
}