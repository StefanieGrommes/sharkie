class Endboss extends MoveableObject {
  y = 100;
  x = 1800;
  width = 300;
  height = 300;
  offset = {
    top: 150,
    left: 20,
    right: 25,
    bottom: 80,
  };
  hasIntroduced = false;
  currentImage = 0;
  phaseFrames = 0;
  phaseSpeed = 0;
  introStarted = false;
  phaseDir = -1;
  phaseDirY = 0;
  minY = -50;
  maxY = 180;
  introY = 0;
  introSpeed = 3;
  world;

  IMAGES_INTRODUCE = [
    "./img/2.Enemy/3_Final_Enemy/1.Introduce/1.png",
    "./img/2.Enemy/3_Final_Enemy/1.Introduce/2.png",
    "./img/2.Enemy/3_Final_Enemy/1.Introduce/3.png",
    "./img/2.Enemy/3_Final_Enemy/1.Introduce/4.png",
    "./img/2.Enemy/3_Final_Enemy/1.Introduce/5.png",
    "./img/2.Enemy/3_Final_Enemy/1.Introduce/6.png",
    "./img/2.Enemy/3_Final_Enemy/1.Introduce/7.png",
    "./img/2.Enemy/3_Final_Enemy/1.Introduce/8.png",
    "./img/2.Enemy/3_Final_Enemy/1.Introduce/9.png",
    "./img/2.Enemy/3_Final_Enemy/1.Introduce/10.png",
  ];

  IMAGES_SWIMMING = [
    "./img/2.Enemy/3_Final_Enemy/2.floating/1.png",
    "./img/2.Enemy/3_Final_Enemy/2.floating/2.png",
    "./img/2.Enemy/3_Final_Enemy/2.floating/3.png",
    "./img/2.Enemy/3_Final_Enemy/2.floating/4.png",
    "./img/2.Enemy/3_Final_Enemy/2.floating/5.png",
    "./img/2.Enemy/3_Final_Enemy/2.floating/6.png",
    "./img/2.Enemy/3_Final_Enemy/2.floating/7.png",
    "./img/2.Enemy/3_Final_Enemy/2.floating/8.png",
    "./img/2.Enemy/3_Final_Enemy/2.floating/9.png",
    "./img/2.Enemy/3_Final_Enemy/2.floating/10.png",
    "./img/2.Enemy/3_Final_Enemy/2.floating/11.png",
    "./img/2.Enemy/3_Final_Enemy/2.floating/12.png",
    "./img/2.Enemy/3_Final_Enemy/2.floating/13.png",
  ];

  IMAGES_HURT = [
    "./img/2.Enemy/3_Final_Enemy/Hurt/1.png",
    "./img/2.Enemy/3_Final_Enemy/Hurt/2.png",
    "./img/2.Enemy/3_Final_Enemy/Hurt/3.png",
    "./img/2.Enemy/3_Final_Enemy/Hurt/4.png",
  ];

  IMAGES_ATTACKING = [
    "./img/2.Enemy/3_Final_Enemy/Attack/1.png",
    "./img/2.Enemy/3_Final_Enemy/Attack/2.png",
    "./img/2.Enemy/3_Final_Enemy/Attack/3.png",
    "./img/2.Enemy/3_Final_Enemy/Attack/4.png",
    "./img/2.Enemy/3_Final_Enemy/Attack/5.png",
    "./img/2.Enemy/3_Final_Enemy/Attack/6.png",
  ];

  IMAGES_DEAD = [
    "./img/2.Enemy/3_Final_Enemy/Dead/Mesa_de_trabajo_2.png",
    "./img/2.Enemy/3_Final_Enemy/Dead/Mesa_de_trabajo_2_copia_6.png",
    "./img/2.Enemy/3_Final_Enemy/Dead/Mesa_de_trabajo_2_copia_7.png",
    "./img/2.Enemy/3_Final_Enemy/Dead/Mesa_de_trabajo_2_copia_8.png",
    "./img/2.Enemy/3_Final_Enemy/Dead/Mesa_de_trabajo_2_copia_9.png",
    "./img/2.Enemy/3_Final_Enemy/Dead/Mesa_de_trabajo_2_copia_10.png",
  ];

  /**
   * Creates the endboss, preloads all images, sets a random base speed
   * and starts the animation loops.
   */
  constructor() {
    super().loadImage("img/2.Enemy/3_Final_Enemy/1.Introduce/1.png");
    this.loadImages(this.IMAGES_INTRODUCE);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 1800;
    this.y = -this.height;
    this.speed = 0.0455 + Math.random() * 0.25;
    this.animate();
  }

  /**
   * Starts the movement loop (60 times per second) and the image loop (every 180 ms).
   */
  animate() {
    setStoppableFunction(() => this.move(), 1000 / 60);
    setStoppableFunction(() => this.showImages(), 180);
  }

  /**
   * Movement tick: moves the boss in phases within the vertical bounds.
   * Does nothing before the intro is finished or when the boss is dead.
   */
  move() {
    if (this.introStarted && !this.hasIntroduced && this.y < this.introY) {
      this.y = Math.min(this.introY, this.y + this.introSpeed);
    }
    if (!this.hasIntroduced || this.isDead()) return;
    if (this.phaseFrames <= 0) this.startNewPhase();
    this.phaseFrames--;
    this.x += this.phaseDir * this.phaseSpeed;
    const maxX = this.world.level.level_end_x - this.width + this.offset.right;
    this.x = Math.min(maxX, this.x);
    this.y += this.phaseDirY * this.phaseSpeed;
    this.y = Math.min(this.maxY, Math.max(this.minY, this.y));
  }

  /**
   * Switches between a rest phase (speed 0) and a movement phase
   * with random speed and duration towards the character.
   */
  startNewPhase() {
    if (this.phaseSpeed > 0) {
      this.phaseSpeed = 0;
      this.phaseFrames = 30 + Math.random() * 60;
    } else {
      const c = this.world.character;
      this.phaseDir = c.x < this.x ? -1 : 1;
      this.phaseDirY = c.y < this.y ? -1 : 1;
      this.otherDirection = this.phaseDir === 1;
      this.phaseSpeed = 1 + Math.random() * 5;
      this.phaseFrames = 15 + Math.random() * 30;
    }
  }

  /**
   * Chooses the animation for the current state of the boss
   * (dead, hurt, intro, attacking if the character is close, otherwise swimming).
   * @returns {string[]|null} Image paths, or null while the boss is not on screen.
   */
  getCurrentImages() {
    if (this.isDead()) return this.IMAGES_DEAD;
    if (this.isHurt()) return this.IMAGES_HURT;
    if (!this.world || this.isOffscreen()) return null;
    if (!this.hasIntroduced) return this.getIntroImages();
    if (Math.abs(this.world.character.x - this.x) < 220)
      return this.IMAGES_ATTACKING;
    return this.IMAGES_SWIMMING;
  }

  /**
   * Checks if the boss is still outside the visible area on the right side.
   * @returns {boolean} true if the boss is not yet visible.
   */
  isOffscreen() {
    return this.x + this.world.camera_x > this.world.canvas.width - 250;
  }

  /**
   * Returns the intro animation, starts the intro on the first call and
   * switches to the swimming animation when the intro is finished.
   * @returns {string[]} Image paths of the intro or swimming animation.
   */
  getIntroImages() {
    if (!this.introStarted) this.startIntro();
    if (this.currentImage >= this.IMAGES_INTRODUCE.length) {
      this.hasIntroduced = true;
      this.currentImage = 0;
      return this.IMAGES_SWIMMING;
    }
    return this.IMAGES_INTRODUCE;
  }

  /**
   * Moves the boss to the left (inherited moveLeft).
   */
  endbossSwimAttack() {
    this.moveLeft();
  }

  /**
   * Reduces the boss energy (minimum 0), saves the hit time, restarts
   * the animation and plays the hurt sound if the boss survives.
   * @param {number} amount - Damage to apply.
   */
  takeDamage(amount) {
    this.energy = Math.max(0, this.energy - amount);
    this.world.statusbarEnemy.setPercentage(this.energy);
    this.lastHit = new Date().getTime();
    this.currentImage = 0;
    if (this.energy > 0) this.world.playSFX(this.world.sfx.endbossHurt);
  }

  /**
   * Starts the intro: plays the intro sound, pauses the background music
   * and resumes it after 3 seconds if the game is still running and sound is on.
   */
  startIntro() {
    this.introStarted = true;
    this.currentImage = 0;
    this.world.playSFX(this.world.sfx.intro, false, false);
    backgroundmusic.pause();
    setTimeout(() => {
      if (!this.world.gameEnded && volumeOn) playSafe(backgroundmusic);
    }, 3000);
  }
}
