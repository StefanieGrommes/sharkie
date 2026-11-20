class MoveableObject extends DrawableObject {
  speedX = 0.7;
  otherDirection = false;
  speedY = 0.3;
  energy = 100;
  lastHit = 0;
  lastMovement;
  flySpeed = 8;
  dead = false;
  removable = false;
  flyDirection = 1;

  isColliding(mo) {
    const thisOffset = this.offset || {};
    const otherOffset = mo.offset || {};
    const thisLeft = this.x + (thisOffset.left || 0);
    const thisRight = this.x + this.width - (thisOffset.right || 0);
    const thisTop = this.y + (thisOffset.top || 0);
    const thisBottom = this.y + this.height - (thisOffset.bottom || 0);
    const otherLeft = mo.x + (otherOffset.left || 0);
    const otherRight = mo.x + mo.width - (otherOffset.right || 0);
    const otherTop = mo.y + (otherOffset.top || 0);
    const otherBottom = mo.y + mo.height - (otherOffset.bottom || 0);

    return (
      thisRight > otherLeft &&
      thisLeft < otherRight &&
      thisBottom > otherTop &&
      thisTop < otherBottom
    );
  }

  playAnimation(images) {
    let index = this.currentImage % images.length;
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  showImages() {
    const images = this.getCurrentImages();
    if (images) this.playAnimation(images);
  }

  getCurrentImages() {
    if (!this.dead) return this.images;
    const dead = this.IMAGES_DEAD[this.variant];
    if (this.currentImage >= dead.length) {
      this.removable = true;
      return null;
    }
    return dead;
  }

  hit(enemy) {
    this.energy -= 2;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
      this.lastEnemy = enemy;
    }
  }

  isDead() {
    return this.energy <= 0;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  moveUp() {
    this.y -= this.speedY;
    this.isMoving();
  }

  moveDown() {
    this.y += this.speedY;
    this.isMoving();
  }

  moveRight() {
    this.x += this.speedX;
    this.isMoving();
  }

  /**
   * Moves the object to the left within its allowed horizontal bounds.
   * - Decreases `x` by `speed`.
   * - Reverses direction and flips `otherDirection` if hitting left or right boundary.
   * - Keeps object within [0, max_x_fishes].
   */
  moveLeft() {
    this.x -= this.speedX;
    this.isOutOfRange();
    this.changeDirection();
    this.isMoving();
  }

  isMoving() {
    this.lastMovement = new Date().getTime();
  }

  lastTimeMoved() {
    let timepassed = new Date().getTime() - this.lastMovement;
    timepassed = timepassed / 1000;
    return timepassed > 8;
  }

  changeDirection() {
  if (this.x <= 0) {
      this.x = 0;
      this.speedX *= -1;
      this.otherDirection = !this.otherDirection;
    }
  }

  isOutOfRange() {
    if (this.x + this.width >= this.max_x_fishes) {
      this.x = this.max_x_fishes - this.width;
      this.speedX *= -1;
      this.otherDirection = !this.otherDirection;
      this.changeDirectionOfFish();
    }
  }

  /**
   *Changes the horizontal movement direction of the fish
   * when it reaches the screen boundaries.
   */
  changeDirectionOfFish() {
    this.otherDirection = true;
    if (this.x + this.width >= this.max_x_fishes) {
      this.otherDirection = !this.otherDirection;
    }
    if (this.x <= 0) {
      this.otherDirection = !this.otherDirection;
    }
  }

  die() {
    if (this.dead) return;
    this.dead = true;
    this.currentImage = 0;
    this.world.playSFX(this.world.sfx.fly);
  }

  flyAway() {
    if (!this.dead) return;
    this.x += this.flySpeed * this.flyDirection;
    this.y -= this.flySpeed;
  }
}
