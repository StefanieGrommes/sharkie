class Pufferfish extends MoveableObject {
    y = 120;
    width = 100;
    offset = {
        top: 8,
        bottom: 20,
        left: 4,
        right: 4
    };
    currentImage = 0;
    speedX = 5;

    static IMAGES = {
            GREEN: [
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
            ],
            ORANGE: [
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png'
            ],
            PINK: [
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png'
            ]
    };

    IMAGES_DEAD = {
        GREEN: [
            './img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
            './img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
            './img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png'
        ],
        ORANGE: [
            './img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png',
            './img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.2.png',
            './img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.3.png'
        ],
        PINK: [
            './img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png',
            './img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.2.png',
            './img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.3.png'
        ]
    }

    constructor(variant='GREEN'){
        super();
        this.images = Pufferfish.IMAGES[variant];
        this.loadImage(this.images[0]);
        this.loadImages(this.images);
        this.x = 250 + Math.random() * (2300 - 30);
        this.y = Math.random() * (GAME_HEIGHT -  this.height);
        this.speed = 0.15 + Math.random() * 0.25;
        this.variant = variant;
        this.loadImages(this.IMAGES_DEAD[variant]);
        this.animate();

    }

    animate() {
        setStoppableFunction(() => this.showImages(), 180);
        setStoppableFunction(() => this.moveLeft(), 180);
        setStoppableFunction(() => this.flyAway(), 1000 / 60);
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