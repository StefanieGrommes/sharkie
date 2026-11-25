class Character extends MoveableObject {
  y = 220;
  x = 120;
  height = 250;
  width = 220;
  speedX = 10;
  speedY = 8;
  offset = {
    top: 140,
    bottom: 65,
    left: 45,
    right: 50,
  };
  attackType = null;
  sleepingSound = null;

  IMAGES_IDLE = [
    "./img/1.Sharkie/1.IDLE/1.png",
    "./img/1.Sharkie/1.IDLE/2.png",
    "./img/1.Sharkie/1.IDLE/3.png",
    "./img/1.Sharkie/1.IDLE/4.png",
    "./img/1.Sharkie/1.IDLE/5.png",
    "./img/1.Sharkie/1.IDLE/6.png",
    "./img/1.Sharkie/1.IDLE/7.png",
    "./img/1.Sharkie/1.IDLE/8.png",
    "./img/1.Sharkie/1.IDLE/9.png",
    "./img/1.Sharkie/1.IDLE/10.png",
    "./img/1.Sharkie/1.IDLE/11.png",
    "./img/1.Sharkie/1.IDLE/12.png",
    "./img/1.Sharkie/1.IDLE/13.png",
    "./img/1.Sharkie/1.IDLE/14.png",
    "./img/1.Sharkie/1.IDLE/15.png",
    "./img/1.Sharkie/1.IDLE/16.png",
    "./img/1.Sharkie/1.IDLE/17.png",
    "./img/1.Sharkie/1.IDLE/18.png",
  ];

  IMAGES_LONG_IDLE = [
    "./img/1.Sharkie/2.Long_IDLE/i1.png",
    "./img/1.Sharkie/2.Long_IDLE/I2.png",
    "./img/1.Sharkie/2.Long_IDLE/I3.png",
    "./img/1.Sharkie/2.Long_IDLE/I4.png",
    "./img/1.Sharkie/2.Long_IDLE/I5.png",
    "./img/1.Sharkie/2.Long_IDLE/I6.png",
    "./img/1.Sharkie/2.Long_IDLE/I7.png",
    "./img/1.Sharkie/2.Long_IDLE/I8.png",
    "./img/1.Sharkie/2.Long_IDLE/I9.png",
    "./img/1.Sharkie/2.Long_IDLE/I10.png",
    "./img/1.Sharkie/2.Long_IDLE/I11.png",
    "./img/1.Sharkie/2.Long_IDLE/I12.png",
    "./img/1.Sharkie/2.Long_IDLE/I13.png",
    "./img/1.Sharkie/2.Long_IDLE/I14.png",
  ];

  IMAGES_SWIMMING = [
    "./img/1.Sharkie/3.Swim/1.png",
    "./img/1.Sharkie/3.Swim/2.png",
    "./img/1.Sharkie/3.Swim/3.png",
    "./img/1.Sharkie/3.Swim/4.png",
    "./img/1.Sharkie/3.Swim/5.png",
    "./img/1.Sharkie/3.Swim/6.png",
  ];

  IMAGES_POISONED = [
    "./img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "./img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "./img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
    "./img/1.Sharkie/5.Hurt/1.Poisoned/5.png",
  ];

  IMAGES_ELECTRIC_SHOCK = [
    "./img/1.Sharkie/5.Hurt/2.Electric_shock/1.png",
    "./img/1.Sharkie/5.Hurt/2.Electric_shock/2.png",
    "./img/1.Sharkie/5.Hurt/2.Electric_shock/3.png",
  ];

  IMAGES_POISONED_DEAD = [
    "./img/1.Sharkie/6.dead/1.Poisoned/1.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/2.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/3.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/4.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/5.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/6.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/7.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/8.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/9.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/10.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/11.png",
    "./img/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];

  IMAGES_ATTACK = {
    BUBBLE: [
      "./img/1.Sharkie/4.Attack/Bubble_trap/op1 (with bubble formation)/1.png",
      "./img/1.Sharkie/4.Attack/Bubble_trap/op1 (with bubble formation)/2.png",
      "./img/1.Sharkie/4.Attack/Bubble_trap/op1 (with bubble formation)/3.png",
      "./img/1.Sharkie/4.Attack/Bubble_trap/op1 (with bubble formation)/4.png",
      "./img/1.Sharkie/4.Attack/Bubble_trap/op1 (with bubble formation)/5.png",
      "./img/1.Sharkie/4.Attack/Bubble_trap/op1 (with bubble formation)/6.png",
      "./img/1.Sharkie/4.Attack/Bubble_trap/op1 (with bubble formation)/7.png",
      "./img/1.Sharkie/4.Attack/Bubble_trap/op1 (with bubble formation)/8.png",
    ],
    FINSLAP: [
      "./img/1.Sharkie/4.Attack/Fin_slap/1.png",
      "./img/1.Sharkie/4.Attack/Fin_slap/2.png",
      "./img/1.Sharkie/4.Attack/Fin_slap/3.png",
      "./img/1.Sharkie/4.Attack/Fin_slap/4.png",
      "./img/1.Sharkie/4.Attack/Fin_slap/5.png",
      "./img/1.Sharkie/4.Attack/Fin_slap/6.png",
      "./img/1.Sharkie/4.Attack/Fin_slap/7.png",
      "./img/1.Sharkie/4.Attack/Fin_slap/8.png",
    ],
  };

  currentImage = 0;
  world;

  /**
   * Creates the character, preloads all images and starts the animation loops.
   */
  constructor() {
    super().loadImage("./img/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_POISONED);
    this.loadImages(this.IMAGES_ELECTRIC_SHOCK);
    this.loadImages(this.IMAGES_POISONED_DEAD);
    this.loadImages(this.IMAGES_ATTACK.BUBBLE);
    this.loadImages(this.IMAGES_ATTACK.FINSLAP);
    this.animate();
    this.isMoving();
  }

  /**
   * Starts the movement loop (60 times per second) and the image loop (every 180 ms).
   */
  animate() {
    setStoppableFunction(() => this.sharkieSwim(), 1000 / 60);
    setStoppableFunction(() => this.showImages(), 150);
    setStoppableFunction(() => this.attackTick(), 60);
  }

  /**
   * Updates the sleeping sound and shows the current state animation.
   */
  showImages() {
    this.checkSleepingSound();
    if (!this.attackType || this.isDead()) super.showImages();
  }

  /**
   * Proves if the attack Anmiation can be played.
   */
  attackTick() {
    if (this.attackType && !this.isDead()) this.playAttackAnimation();
  }

  /**
   * Plays he attack animation if not dead.
   */
  startAttack(type) {
  if (this.attackType || this.isDead()) return;
  this.attackType = type;
  this.currentImage = 0;
  this.playAttackAnimation();
  return true;
  }

  /**
   * Chooses the hurt animation depending on the last enemy that hit the character.
   * @returns {string[]} Electric shock images for jellyfish, poisoned images otherwise.
   */
  getHurtImages() {
    return this.lastEnemy instanceof Jellyfish
      ? this.IMAGES_ELECTRIC_SHOCK
      : this.IMAGES_POISONED;
  }

  /**
   * Chooses the animation for the current state of the character
   * (dead, hurt, swimming, long idle or idle).
   * @returns {string[]} Image paths of the animation.
   */
  getCurrentImages() {
    if (this.isDead()) return this.IMAGES_POISONED_DEAD;
    if (this.isHurt()) return this.getHurtImages();
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
      return this.IMAGES_SWIMMING;
    if (this.lastTimeMoved()) return this.IMAGES_LONG_IDLE;
    return this.IMAGES_IDLE;
  }

  /**
   * Starts the sleeping sound if the character did not move for a long time, otherwise stops it.
   */
  checkSleepingSound() {
    if (this.lastTimeMoved()) this.startSleepingSound();
    else this.stopSleepingSound();
  }

  /**
   * Movement tick: remembers the last movement if a key is pressed,
   * moves the character and updates the camera position.
   */
  sharkieSwim() {
    const key = this.world.keyboard;
    if (key.RIGHT || key.LEFT || key.UP || key.DOWN || key.B || key.F || key.SPACE) {
      this.isMoving();
    }
    this.swim();
    const level = this.world.level;
    const minCam = this.world.canvas.width - level.level_end_x;
    const maxCam = -level.level_start_x;
    this.world.camera_x = Math.min(maxCam, Math.max(minCam, -this.x + 100));
  }

  /**
   * Moves the character horizontally and vertically depending on the pressed keys.
   */
  swim() {
    this.swimHorizontal();
    this.swimVertical();
  }

  /**
   * Moves the character left or right within the level bounds and sets its direction.
   */
  swimHorizontal() {
    const key = this.world.keyboard;
    const level = this.world.level;
    const minX = level.level_start_x - this.offset.left;
    const maxX = level.level_end_x - this.width + this.offset.right;
    if (key.RIGHT) {
      this.x = Math.min(maxX, this.x + this.speedX);
      this.otherDirection = false;
    }
    if (key.LEFT) {
      this.x = Math.max(minX, this.x - this.speedX);
      this.otherDirection = true;
    }
  }

  /**
   * Moves the character up or down within the canvas bounds.
   */
  swimVertical() {
    const key = this.world.keyboard;
    if (key.UP && this.y > -110) this.y -= this.speedY;
    if (key.DOWN && this.y + this.height - 60 < this.world.canvas.height) {
      this.y += this.speedY;
    }
  }

  /**
   * Starts an attack if no other attack is running and the character is alive.
   * @param {"BUBBLE"|"POISON"|"FINSLAP"} type - Type of the attack.
   * @returns {boolean|undefined} true if the attack started, otherwise undefined.
   */
  startAttack(type) {
    if (this.attackType || this.isDead()) return;
    this.attackType = type;
    this.currentImage = 0;
    return true;
  }

  /**
   * Starts the looping sleeping sound if it is not already playing.
   */
  startSleepingSound() {
    if (this.sleepingSound) return;
    this.sleepingSound = this.world.playSFX(this.world.sfx.sleeping, true);
  }

  /**
   * Stops the sleeping sound and removes it from the global sound list.
   */
  stopSleepingSound() {
    if (!this.sleepingSound) return;
    this.sleepingSound.pause();
    this.world.removeSound(this.sleepingSound);
    this.sleepingSound = null;
  }

  /**
   * Plays the next frame of the running attack animation, triggers frame based
   * effects and throws the bubble when the animation is finished.
   */
  playAttackAnimation() {
    const key = this.attackType === "POISON" ? "BUBBLE" : this.attackType;
    const imgs = this.IMAGES_ATTACK[key];
    this.playAnimation(imgs);
    if (this.attackType === "FINSLAP") this.finSlapFrame();
    else this.bubbleFrame();
    if (this.currentImage >= imgs.length) {
      if (this.attackType === "BUBBLE") this.world.throwBubble(false);
      if (this.attackType === "POISON") this.world.throwBubble(true);
      this.attackType = null;
      this.currentImage = 0;
    }
  }

  /**
   * Fin slap effects: damage check on frame 2, sound on frame 3.
   */
  finSlapFrame() {
    if (this.currentImage === 2) this.world.checkFinSlapCollisions();
    if (this.currentImage === 3) this.world.playSFX(this.world.sfx.finslap);
  }

  /**
   * Bubble attack effect: plays the bubble or poison sound on frame 6.
   */
  bubbleFrame() {
    if (this.currentImage !== 6) return;
    const s = this.world.sfx;
    this.world.playSFX(this.attackType === "POISON" ? s.poison : s.bubble);
  }
}
