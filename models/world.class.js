class World {
  character = new Character();
  statusbarHeart = new Statusbar("HEART");
  statusbarPoison = new Statusbar("POISON");
  statusbarCoins = new Statusbar("COINS");
  level = level1;
  canvas;
  ctx;
  keyboard;
  bubbles = [];
  poisoned_bubbles = [];
  camera_x = 0;
  throwableObjects = [];
  poisonCollected = 0;
  coinsCollected = 0;
  gameEnded = false;
  currentSFX = null;
  sfx = {
    poison: "./audio/poisonbubble.mp3",
    finslap: "./audio/finslap.wav",
    bubble: "./audio/bubble_normal.wav",
    sleeping: "./audio/snoring.mp3",
    hurt: "./audio/hurt.mp3",
    electric: "./audio/electric-trim.mp3",
    endbossHurt: "./audio/endboss-hurt.mp3",
    collected: "./audio/collectibles.wav",
    win: "./audio/youwin.wav",
    lose: "./audio/youlose.wav",
    intro: "./audio/endboss_intro.mp3",
    fly: "./audio/Funpipe.mp3",
  };
  range = 20;

  /**
   * Creates the world, starts the draw loop, links objects to the world
   * and starts the game logic intervals.
   * @param {HTMLCanvasElement} canvas - Canvas the game is drawn on.
   * @param {Keyboard} keyboard - Keyboard state object.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Starts all game logic checks as stoppable intervals.
   */
  run() {
    setStoppableFunction(() => this.checkCollisions(), 200);
    setStoppableFunction(() => this.checkCollectibles(), 200);
    setStoppableFunction(() => this.checkThrowObjects(), 200);
    setStoppableFunction(() => this.checkBubbleCollisions(), 50);
    setStoppableFunction(() => this.checkGameEnd(), 200);
  }

  /**
   * Checks collisions between the character and living enemies.
   * On a hit the character takes damage and the heart status bar is updated.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.dead && !enemy.isDead() && this.character.isColliding(enemy)) {
        if (!this.character.isHurt()) this.playHurtSFX(enemy);
        this.character.hit(enemy);
        this.character.isMoving();
        this.statusbarHeart.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks if thrown bubbles hit an enemy. Hit bubbles are removed,
   * enemies take damage or die. Removable enemies are removed from the level.
   */
  checkBubbleCollisions() {
    this.throwableObjects = this.throwableObjects.filter((bubble) => {
      const hit = this.isHitting(bubble);
      if (!hit) return true;
      if (hit instanceof Endboss) {
        hit.takeDamage(bubble.poisoned ? 20 : 10);
      } else {
        hit.flyDirection = bubble.otherDirection ? -1 : 1;
        hit.die();
      }
      return false;
    });
    this.level.enemies = this.level.enemies.filter((enemy) => !enemy.removable);
  }

  /**
   * Finds the first living enemy that a bubble collides with.
   * @param {ThrowableObject} bubble - The bubble to check.
   * @returns {MoveableObject|undefined} The hit enemy, or undefined if none was hit.
   */
  isHitting(bubble) {
    return this.level.enemies.find(
      (enemy) =>
        !enemy.dead &&
        !(enemy instanceof Endboss && enemy.isDead()) &&
        (enemy instanceof Pufferfish ||
          enemy instanceof Jellyfish ||
          enemy instanceof Endboss) &&
        bubble.isColliding(enemy),
    );
  }

  /**
   * Starts an attack of the character depending on the pressed keys
   * (B = bubble, SPACE = poison bubble if enough poison, F = fin slap).
   */
  checkThrowObjects() {
    if (this.keyboard.B) this.character.startAttack("BUBBLE");
    if (this.keyboard.SPACE && this.poisonCollected >= 20)
      this.character.startAttack("POISON");
    if (this.keyboard.F) this.character.startAttack("FINSLAP");
  }

  /**
   * Checks if the character touches a collectible. Collected items are
   * removed from the level, a sound is played and the item effect is applied.
   */
  checkCollectibles() {
    [...this.level.elements].forEach((element) => {
      if (this.character.isColliding(element)) {
        const index = this.level.elements.indexOf(element);
        this.playSFX(this.sfx.collected);
        this.level.elements.splice(index, 1);
        this.checkEnemyType(element);
      }
    });
  }

  /**
   * Applies the effect of a collected item (poison, coin or heart)
   * and updates the matching status bar. Values are capped at 100.
   * @param {Poison|Coin|Heart} element - The collected item.
   */
  checkEnemyType(element) {
    if (element instanceof Poison) {
      this.poisonCollected = Math.min(100, this.poisonCollected + 20);
      this.statusbarPoison.setPercentage(this.poisonCollected);
    }
    if (element instanceof Coin) {
      this.coinsCollected = Math.min(100, this.coinsCollected + 5);
      this.statusbarCoins.setPercentage(this.coinsCollected);
    }
    if (element instanceof Heart) {
      this.character.energy = Math.min(100, this.character.energy + 20);
      this.statusbarHeart.setPercentage(this.character.energy);
    }
  }

  /**
   * Draws one frame (background, objects, status bars, character)
   * and schedules itself for the next animation frame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgrounds);
    this.drawMoveableObjects();
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusbars();
    this.animationId = requestAnimationFrame(() => this.draw());
  }

  /**
   * Draws a list of objects on the canvas.
   * @param {DrawableObject[]} objects - Objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Draws a single object and mirrors it if it faces the other direction.
   * @param {DrawableObject} mo - Object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Draws enemies, throwable objects and collectibles.
   */
  drawMoveableObjects() {
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.elements);
  }

  /**
   * Draws the poison, heart and coin status bars.
   */
  drawStatusbars() {
    this.addToMap(this.statusbarPoison);
    this.addToMap(this.statusbarHeart);
    this.addToMap(this.statusbarCoins);
  }

  /**
   * Mirrors the canvas horizontally for an object and inverts its x position.
   * Must be followed by flipImageBack().
   * @param {DrawableObject} mo - Object to mirror.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Reverts flipImage(): restores the x position and the canvas state.
   * @param {DrawableObject} mo - Object that was mirrored.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Gives the character and all enemies a reference to this world.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * Creates a bubble in front of the character. A poisoned bubble costs 20 poison
   * and is only created if enough poison is available.
   * @param {boolean} [poisoned=false] - Whether the bubble is a poison bubble.
   */
  throwBubble(poisoned = false) {
    if (poisoned) {
      if (this.poisonCollected < 20) return;
      this.poisonCollected -= 20;
      this.statusbarPoison.setPercentage(this.poisonCollected);
    }
    const left = this.character.otherDirection;
    const x = left ? this.character.x - 40 : this.character.x + 160;
    this.throwableObjects.push(
      new ThrowableObject(x, this.character.y + 110, left, poisoned),
    );
  }

  /**
   * Calculates the hit box of the fin slap, extended by the slap range
   * in the direction the character is facing.
   * @returns {{x: number, y: number, width: number, height: number, offset: Object}} The hit box.
   */
  getFinSlapBox() {
    const character = this.character;
    const box = {
      x: character.otherDirection ? character.x - this.range : character.x,
      y: character.y,
      width: character.width + this.range,
      height: character.height,
      offset: character.offset,
    };
    box.getHitBox = MoveableObject.prototype.getHitBox.bind(box);
    return box;
  }

  /**
   * Checks which living enemies are inside the fin slap box.
   * The endboss takes damage, other enemies die.
   */
  checkFinSlapCollisions() {
    const box = this.getFinSlapBox();
    this.level.enemies.forEach((enemy) => {
      if (enemy.dead || !enemy.isColliding(box)) return;
      if (enemy instanceof Endboss) {
        enemy.takeDamage(20);
      } else {
        enemy.flyDirection = this.character.otherDirection ? -1 : 1;
        enemy.die();
      }
    });
  }

  /**
   * Checks if the game is over: the game-over screen is shown if the character
   * is dead, the win screen if the endboss is dead. Does nothing after the game ended.
   */
  checkGameEnd() {
    if (this.gameEnded) return;
    const boss = this.level.enemies.find((e) => e instanceof Endboss);
    if (this.character.isDead()) {
      this.finishGame("game-over-screen", this.sfx.lose);
    } else if (boss && boss.isDead()) {
      this.finishGame("win-screen", this.sfx.win);
    }
  }

  /**
   * Ends the game: after 1.5 seconds all loops and sounds are stopped,
   * the end sound is played and the end screen is shown.
   * @param {string} screenId - ID of the end screen element to show.
   * @param {string} sound - Path of the sound to play.
   */
  finishGame(screenId, sound) {
    this.gameEnded = true;
    setTimeout(() => {
      stopGame();
      stopAllSounds();
      this.playSFX(sound, false, false);
      const screen = document.getElementById(screenId);
      screen.classList.remove("d-none");
      screen.classList.add("d-flex");
      document.body.classList.add("game-ended");
    }, 1500);
  }

  /**
   * Plays a sound effect if the sound is turned on. Non-looping sounds stop the
   * currently playing interruptible effect first.
   * @param {string} path - Path of the audio file.
   * @param {boolean} [loop=false] - Whether the sound loops.
   * @param {boolean} [interruptible=true] - Whether a later effect may stop this one.
   * @returns {HTMLAudioElement|null} The sound, or null if the sound is turned off.
   */
  playSFX(path, loop = false, interruptible = true) {
    if (!volumeOn) return null;
    if (!loop) this.stopCurrentSFX();
    const sound = new Audio(path);
    sound.loop = loop;
    sound.volume = masterVolume;
    allSounds.push(sound);
    playSafe(sound);
    sound.onended = () => {
      this.removeSound(sound);
      if (this.currentSFX === sound) this.currentSFX = null;
    };
    if (interruptible && !loop) this.currentSFX = sound;
    return sound;
  }

  /**
   * Stops the currently playing interruptible sound effect and removes it from allSounds.
   */
  stopCurrentSFX() {
    if (!this.currentSFX) return;
    this.currentSFX.pause();
    this.removeSound(this.currentSFX);
    this.currentSFX = null;
  }

  /**
   * Removes a sound from the global allSounds array.
   * @param {HTMLAudioElement} sound - Sound to remove.
   */
  removeSound(sound) {
    const index = allSounds.indexOf(sound);
    if (index > -1) allSounds.splice(index, 1);
  }

  /**
   * Plays the hurt sound that matches the enemy (electric for jellyfish, normal otherwise).
   * @param {MoveableObject} enemy - Enemy that hurt the character.
   */
  playHurtSFX(enemy) {
    const sound =
      enemy instanceof Jellyfish ? this.sfx.electric : this.sfx.hurt;
    this.playSFX(sound);
  }
}
