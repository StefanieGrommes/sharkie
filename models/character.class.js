class Character extends MoveableObject {
  y = 220;
  x = 120;
  height = 250;
  width = 220;
  speedX = 10;
  speedY = 8;
  offset = {
    top: 120,
    bottom: 55,
    left: 45,
    right: 50,
  };
  attackType = null;


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
    "./img/1.Sharkie/2.Long_IDLE/i2.png",
    "./img/1.Sharkie/2.Long_IDLE/i3.png",
    "./img/1.Sharkie/2.Long_IDLE/i4.png",
    "./img/1.Sharkie/2.Long_IDLE/i5.png",
    "./img/1.Sharkie/2.Long_IDLE/i6.png",
    "./img/1.Sharkie/2.Long_IDLE/i7.png",
    "./img/1.Sharkie/2.Long_IDLE/i8.png",
    "./img/1.Sharkie/2.Long_IDLE/i9.png",
    "./img/1.Sharkie/2.Long_IDLE/i10.png",
    "./img/1.Sharkie/2.Long_IDLE/i11.png",
    "./img/1.Sharkie/2.Long_IDLE/i12.png",
    "./img/1.Sharkie/2.Long_IDLE/i13.png",
    "./img/1.Sharkie/2.Long_IDLE/i14.png",
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
    "./img/1.Sharkie/5.Hurt/2.Electric shock/1.png",
    "./img/1.Sharkie/5.Hurt/2.Electric shock/2.png",
    "./img/1.Sharkie/5.Hurt/2.Electric shock/3.png",
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
      "./img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
      "./img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
      "./img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
      "./img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
      "./img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
      "./img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
      "./img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
      "./img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
    ],
    FINSLAP: [
      "./img/1.Sharkie/4.Attack/Fin slap/1.png",
      "./img/1.Sharkie/4.Attack/Fin slap/2.png",
      "./img/1.Sharkie/4.Attack/Fin slap/3.png",
      "./img/1.Sharkie/4.Attack/Fin slap/4.png",
      "./img/1.Sharkie/4.Attack/Fin slap/5.png",
      "./img/1.Sharkie/4.Attack/Fin slap/6.png",
      "./img/1.Sharkie/4.Attack/Fin slap/7.png",
      "./img/1.Sharkie/4.Attack/Fin slap/8.png",
    ],
  };

  currentImage = 0;
  world;

  constructor() {
    super().loadImage("img/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_POISONED);
    this.loadImages(this.IMAGES_ELECTRIC_SHOCK);
    this.loadImages(this.IMAGES_POISONED_DEAD);
    this.loadImages(this.IMAGES_ATTACK.BUBBLE);
    this.loadImages(this.IMAGES_ATTACK.FINSLAP);
    this.animate();
  }

  animate() {
    setStoppableFunction(() => this.sharkieSwim(), 1000 / 60);
    setStoppableFunction(() => this.showImages(), 180);
  }

  showImages() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_POISONED_DEAD);
    } else if (this.attackType) {
    this.playAttackAnimation();
    } else if (this.isHurt()) {
      if (this.lastEnemy instanceof Jellyfish) {
        this.playAnimation(this.IMAGES_ELECTRIC_SHOCK);
      } else {
        this.playAnimation(this.IMAGES_POISONED);
      }
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_SWIMMING);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  sharkieSwim() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.x += this.speedX;
      this.otherDirection = false;
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.x -= this.speedX;
      this.otherDirection = true;
    }
    if (this.world.keyboard.UP && this.y > -110) {
      this.y -= this.speedY;
    }
    if (
      this.world.keyboard.DOWN &&
      this.y + this.height - 60 < this.world.canvas.height
    ) {
      this.y += this.speedY;
    }
    this.world.camera_x = -this.x + 100;
  }

  startAttack(type) {
    if (this.attackType || this.isDead()) return;
    this.attackType = type;
    this.currentImage = 0;
  }

playAttackAnimation() {
    const imgs = this.IMAGES_ATTACK[this.attackType];
    this.playAnimation(imgs);
    if (this.attackType === 'FINSLAP' && this.currentImage === 4) { // Frame anpassen
        this.world.checkFinSlapCollisions();
    }
    if (this.currentImage >= imgs.length) {
        if (this.attackType === 'BUBBLE') this.world.throwBubble();
        this.attackType = null;
        this.currentImage = 0;
    }
}
}