class Jellyfish extends MoveableObject {
    width = 80;
    height= 120;
    offset = {
        top: 10,
        bottom: 15,
        left: 2,
        right: 2
    };

    static IMAGES = {
        GREEN: [
            './img/2.Enemy/2 Jelly fish/Super dangerous/Green 1.png',
            './img/2.Enemy/2 Jelly fish/Super dangerous/Green 2.png',
            './img/2.Enemy/2 Jelly fish/Super dangerous/Green 3.png',
            './img/2.Enemy/2 Jelly fish/Super dangerous/Green 4.png'
        ],
        PINK: [
            './img/2.Enemy/2 Jelly fish/Super dangerous/Pink 1.png',
            './img/2.Enemy/2 Jelly fish/Super dangerous/Pink 2.png',
            './img/2.Enemy/2 Jelly fish/Super dangerous/Pink 3.png',
            './img/2.Enemy/2 Jelly fish/Super dangerous/Pink 4.png'
        ],
        LILA: [
            './img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
            './img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
            './img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
            './img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
        ],
        YELLOW: [
            './img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
            './img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
            './img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
            './img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
        ]
    };

    IMAGES_DEAD = {
        GREEN: [
            './img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
            './img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
            './img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
            './img/2.Enemy/2 Jelly fish/Dead/green/g4.png'
        ],
        PINK: [
            './img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png',
            './img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png',
            './img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png',
            './img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png'
        ],
        LILA:  [
            './img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
            './img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
            './img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
            './img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
        ],
        YELLOW: [
            './img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
            './img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
            './img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
            './img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png'
        ]
    }

    constructor(variant = 'GREEN') {
    super();
    this.images = Jellyfish.IMAGES[variant];
    this.loadImage(this.images[0]);
    this.loadImages(this.images);
    this.x = 200 + Math.random() * (2300 - 30);
    this.y = Math.random() * (GAME_HEIGHT -  this.height);
    this.speedY = 0.2 + Math.random() * 0.4;
    this.variant = variant;
    this.loadImages(this.IMAGES_DEAD[variant]);
    this.animate();
}

    animate() {
        setStoppableFunction(() => this.swimUpAndDown(), 1000 / 60);
        setStoppableFunction(() => this.showImages(), 180);
        setStoppableFunction(() => this.flyAway(), 1000 / 60);
    }

    swimUpAndDown() {
        this.y += this.speedY;
        if (this.y >= 380) this.speedY = -Math.abs(this.speedY);
        if (this.y <= 0)   this.speedY = Math.abs(this.speedY);
    }

   die() {
  if (this.dead) return;
  this.dead = true;
  this.currentImage = 0;
  this.world.playSFX(this.world.sfx.fly);
}

    showImages() {
        if (this.dead) {
            const imgs = this.IMAGES_DEAD[this.variant];
            if (this.currentImage < imgs.length) {
                this.playAnimation(imgs);
            } else {
                this.removable = true;
            }
        } else {
            this.playAnimation(this.images);
        }
    }

}

