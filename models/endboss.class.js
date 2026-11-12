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

  IMAGES_INTRODUCE = [
    "./img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "./img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];

  IMAGES_SWIMMING = [
    "./img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "./img/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];

  IMAGES_HURT = [
    "./img/2.Enemy/3 Final Enemy/Hurt/1.png",
    "./img/2.Enemy/3 Final Enemy/Hurt/2.png",
    "./img/2.Enemy/3 Final Enemy/Hurt/3.png",
    "./img/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];

  IMAGES_ATTACKING = [
    "./img/2.Enemy/3 Final Enemy/Attack/1.png",
    "./img/2.Enemy/3 Final Enemy/Attack/2.png",
    "./img/2.Enemy/3 Final Enemy/Attack/3.png",
    "./img/2.Enemy/3 Final Enemy/Attack/4.png",
    "./img/2.Enemy/3 Final Enemy/Attack/5.png",
    "./img/2.Enemy/3 Final Enemy/Attack/6.png",
  ];

  IMAGES_DEAD = [
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "./img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
  ];

  currentImage = 0;
  world;

  constructor() {
    super().loadImage("img/2.Enemy/3 Final Enemy/1.Introduce/1.png");
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

    if (this.phaseFrames <= 0) {
      this.startNewPhase();
    }
    this.phaseFrames--;
    this.x -= this.phaseSpeed;
  }

  startNewPhase() {
    if (this.phaseSpeed > 0) {
      // Pause
      this.phaseSpeed = 0;
      this.phaseFrames = 30 + Math.random() * 60; // 0,5 bis 1,5 s
    } else {
      // Ruck
      this.phaseSpeed = 1 + Math.random() * 3; // Speed 1 bis 4
      this.phaseFrames = 15 + Math.random() * 30; // 0,25 bis 0,75 s
    }
  }

  showImages() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (
      !this.world ||
      this.x + this.world.camera_x > this.world.canvas.width
    ) {
      return;
    } else if (!this.hasIntroduced) {
      this.playAnimation(this.IMAGES_INTRODUCE);
      if (this.currentImage >= this.IMAGES_INTRODUCE.length) {
        this.hasIntroduced = true;
      }
    } else if (Math.abs(this.world.character.x - this.x) < 220) {
      this.playAnimation(this.IMAGES_ATTACKING);
    } else {
      this.playAnimation(this.IMAGES_SWIMMING);
    }
  }

  endbossSwimAttack() {
    this.moveLeft();
  }

  takeDamage(amount) {
    this.energy = Math.max(0, this.energy - amount);
    this.lastHit = new Date().getTime();
  }
}
