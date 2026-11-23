class Endboss extends MoveableObject {
  y = 100;
  x = 2500;
  width = 300;
  height = 300;
  offset = {
    top: 100,
    left: 20,
    right: 25,
    bottom: 50,
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

  IMAGES_INTRODUCE = [
    "./../img/2.Enemy/3 Final_Enemy/1.Introduce/1.png",
    "./../img/2.Enemy/3 Final_Enemy/1.Introduce/2.png",
    "./../img/2.Enemy/3 Final_Enemy/1.Introduce/3.png",
    "./../img/2.Enemy/3 Final_Enemy/1.Introduce/4.png",
    "./../img/2.Enemy/3 Final_Enemy/1.Introduce/5.png",
    "./../img/2.Enemy/3 Final_Enemy/1.Introduce/6.png",
    "./../img/2.Enemy/3 Final_Enemy/1.Introduce/7.png",
    "./../img/2.Enemy/3 Final_Enemy/1.Introduce/8.png",
    "./../img/2.Enemy/3 Final_Enemy/1.Introduce/9.png",
    "./../img/2.Enemy/3 Final_Enemy/1.Introduce/10.png",
  ];

  IMAGES_SWIMMING = [
    "./../img/2.Enemy/3 Final_Enemy/2.floating/1.png",
    "./../img/2.Enemy/3 Final_Enemy/2.floating/2.png",
    "./../img/2.Enemy/3 Final_Enemy/2.floating/3.png",
    "./../img/2.Enemy/3 Final_Enemy/2.floating/4.png",
    "./../img/2.Enemy/3 Final_Enemy/2.floating/5.png",
    "./../img/2.Enemy/3 Final_Enemy/2.floating/6.png",
    "./../img/2.Enemy/3 Final_Enemy/2.floating/7.png",
    "./../img/2.Enemy/3 Final_Enemy/2.floating/8.png",
    "./../img/2.Enemy/3 Final_Enemy/2.floating/9.png",
    "./../img/2.Enemy/3 Final_Enemy/2.floating/10.png",
    "./../img/2.Enemy/3 Final_Enemy/2.floating/11.png",
    "./../img/2.Enemy/3 Final_Enemy/2.floating/12.png",
    "./../img/2.Enemy/3 Final_Enemy/2.floating/13.png",
  ];

  IMAGES_HURT = [
    "./../img/2.Enemy/3 Final_Enemy/Hurt/1.png",
    "./../img/2.Enemy/3 Final_Enemy/Hurt/2.png",
    "./../img/2.Enemy/3 Final_Enemy/Hurt/3.png",
    "./../img/2.Enemy/3 Final_Enemy/Hurt/4.png",
  ];

  IMAGES_ATTACKING = [
    "./../img/2.Enemy/3 Final_Enemy/Attack/1.png",
    "./../img/2.Enemy/3 Final_Enemy/Attack/2.png",
    "./../img/2.Enemy/3 Final_Enemy/Attack/3.png",
    "./../img/2.Enemy/3 Final_Enemy/Attack/4.png",
    "./../img/2.Enemy/3 Final_Enemy/Attack/5.png",
    "./../img/2.Enemy/3 Final_Enemy/Attack/6.png",
  ];

  IMAGES_DEAD = [
    "./../img/2.Enemy/3 Final_Enemy/Dead/Mesa_de_trabajo 2.png",
    "./../img/2.Enemy/3 Final_Enemy/Dead/Mesa_de_trabajo 2 copia 6.png",
    "./../img/2.Enemy/3 Final_Enemy/Dead/Mesa_de_trabajo 2 copia 7.png",
    "./../img/2.Enemy/3 Final_Enemy/Dead/Mesa_de_trabajo 2 copia 8.png",
    "./../img/2.Enemy/3 Final_Enemy/Dead/Mesa_de_trabajo 2 copia 9.png",
    "./../img/2.Enemy/3 Final_Enemy/Dead/Mesa_de_trabajo 2 copia 10.png",
  ];

  currentImage = 0;
  world;

  constructor() {
    super().loadImage("img/2.Enemy/3 Final_Enemy/1.Introduce/1.png");
    this.loadImages(this.IMAGES_INTRODUCE);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2500;
    this.speed = 0.0455 + Math.random() * 0.25;
    this.animate();
  }

  animate() {
    setStoppableFunction(() => this.move(), 1000 / 60);
    setStoppableFunction(() => this.showImages(), 180);
  }

  move() {
    if (!this.hasIntroduced || this.isDead()) return;
    if (this.phaseFrames <= 0) this.startNewPhase();
    this.phaseFrames--;
    this.x += this.phaseDir * this.phaseSpeed;
    this.y += this.phaseDirY * this.phaseSpeed;
    this.y = Math.min(this.maxY, Math.max(this.minY, this.y));
  }

  startNewPhase() {
    if (this.phaseSpeed > 0) {
      this.phaseSpeed = 0;
      this.phaseFrames = 30 + Math.random() * 60;
    } else {
      const c = this.world.character;
      this.phaseDir = c.x < this.x ? -1 : 1;
      this.phaseDirY = c.y < this.y ? -1 : 1;
      this.otherDirection = this.phaseDir === 1;
      this.phaseSpeed = 1 + Math.random() * 3;
      this.phaseFrames = 15 + Math.random() * 30;
    }
  }

  getCurrentImages() {
    if (this.isDead()) return this.IMAGES_DEAD;
    if (this.isHurt()) return this.IMAGES_HURT;
    if (!this.world || this.isOffscreen()) return null;
    if (!this.hasIntroduced) return this.getIntroImages();
    if (Math.abs(this.world.character.x - this.x) < 220)
      return this.IMAGES_ATTACKING;
    return this.IMAGES_SWIMMING;
  }

  isOffscreen() {
    return this.x + this.world.camera_x > this.world.canvas.width - 250;
  }

  getIntroImages() {
    if (!this.introStarted) this.startIntro();
    if (this.currentImage >= this.IMAGES_INTRODUCE.length) {
      this.hasIntroduced = true;
      this.currentImage = 0;
      return this.IMAGES_SWIMMING;
    }
    return this.IMAGES_INTRODUCE;
  }

  endbossSwimAttack() {
    this.moveLeft();
  }

  takeDamage(amount) {
    this.energy = Math.max(0, this.energy - amount);
    this.lastHit = new Date().getTime();
    this.currentImage = 0;
    if (this.energy > 0) this.world.playSFX(this.world.sfx.endbossHurt);
  }

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
