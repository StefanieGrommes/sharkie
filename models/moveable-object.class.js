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

/**
 * Returns the hit box of this object with offsets applied.
 * @returns {{left: number, right: number, top: number, bottom: number}}
 */
getHitBox() {
  const offset = this.offset || {};
  return {
    left: this.x + (offset.left || 0),
    right: this.x + this.width - (offset.right || 0),
    top: this.y + (offset.top || 0),
    bottom: this.y + this.height - (offset.bottom || 0),
  };
}

/**
 * Checks if this object collides with another one.
 * @param {MoveableObject} mo - The other object.
 * @returns {boolean} true if the hit boxes overlap.
 */
isColliding(mo) {
  const a = this.getHitBox();
  const b = mo.getHitBox();
  return (
    a.right > b.left && a.left < b.right && a.bottom > b.top && a.top < b.bottom
  );
}
  /**
   * Shows the next image of an animation (loops over the given images).
   * @param {string[]} images - Image paths that were preloaded into the image cache.
   */
  playAnimation(images) {
    let index = this.currentImage % images.length;
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Plays the next frame of the animation that matches the current state.
   * Does nothing if there are no images.
   */
  showImages() {
    const images = this.getCurrentImages();
    if (images) this.playAnimation(images);
  }

  /**
   * Returns the images for the current state. For a dead object the dead animation
   * is returned until it is finished, then the object is marked as removable.
   * @returns {string[]|null} Image paths, or null if the dead animation is finished.
   */
  getCurrentImages() {
    if (!this.dead) return this.images;
    const dead = this.IMAGES_DEAD[this.variant];
    if (this.currentImage >= dead.length) {
      this.removable = true;
      return null;
    }
    return dead;
  }

  /**
   * Reduces the energy by 2 (minimum 0). If energy remains, the hit time
   * and the enemy are saved for the hurt animation.
   * @param {MoveableObject} enemy - The enemy that caused the damage.
   */
  hit(enemy) {
    this.energy -= 2;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
      this.lastEnemy = enemy;
    }
  }

  /**
   * Checks if the energy is used up.
   * @returns {boolean} true if energy is 0 or lower.
   */
  isDead() {
    return this.energy <= 0;
  }

  /**
   * Checks if the object was hit less than one second ago.
   * @returns {boolean} true while the hurt state is active.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Moves the object up by speedY and remembers the movement time.
   */
  moveUp() {
    this.y -= this.speedY;
    this.isMoving();
  }

  /**
   * Moves the object down by speedY and remembers the movement time.
   */
  moveDown() {
    this.y += this.speedY;
    this.isMoving();
  }

  /**
   * Moves the object right by speedX and remembers the movement time.
   */
  moveRight() {
    this.x += this.speedX;
    this.isMoving();
  }

  /**
   * Moves the object left by speedX, then handles the left and right level bounds
   * (isOutOfRange, changeDirection) and remembers the movement time.
   */
  moveLeft() {
    this.x -= this.speedX;
    this.isOutOfRange();
    this.changeDirection();
    this.isMoving();
  }

  /**
   * Saves the current time as the time of the last movement.
   */
  isMoving() {
    this.lastMovement = new Date().getTime();
  }

  /**
   * Checks if the object did not move for more than 8 seconds.
   * @returns {boolean} true if the object has been idle for longer than 8 seconds.
   */
  lastTimeMoved() {
    let timepassed = new Date().getTime() - this.lastMovement;
    timepassed = timepassed / 1000;
    return timepassed > 8;
  }

  /**
   * At the left border (x <= 0): sets x to 0, reverses the horizontal
   * speed and flips the looking direction.
   */
  changeDirection() {
    if (this.x <= 0) {
      this.x = 0;
      this.speedX *= -1;
      this.otherDirection = !this.otherDirection;
    }
  }

  /**
   * At the right border (x + width >= max_x_fishes): moves the object back inside,
   * reverses the horizontal speed and flips the looking direction.
   */
  isOutOfRange() {
    if (this.x + this.width >= this.max_x_fishes) {
      this.x = this.max_x_fishes - this.width;
      this.speedX *= -1;
      this.otherDirection = !this.otherDirection;
      this.changeDirectionOfFish();
    }
  }

  /**
   * Sets the looking direction of the fish to the other direction
   * and flips it again at the left or right border.
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

  /**
   * Marks the object as dead, restarts its animation and plays the fly sound.
   * Does nothing if the object is already dead.
   */
  die() {
    if (this.dead) return;
    this.dead = true;
    this.currentImage = 0;
    this.world.playSFX(this.world.sfx.fly);
  }

  /**
   * Moves a dead object diagonally up and out of the screen
   * (direction depends on flyDirection). Does nothing while alive.
   */
  flyAway() {
    if (!this.dead) return;
    this.x += this.flySpeed * this.flyDirection;
    this.y -= this.flySpeed;
  }
}
