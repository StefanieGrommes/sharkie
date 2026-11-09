class Character extends MoveableObject {
    y = 200;
    x = 120;
    height = 220;
    width = 220;
    speed = 10;
    speedY = 8;
    offset = {
        top: 120,
        bottom: 55,
        left: 45,
        right: 50
         }
    isMoving = false;


    IMAGES_IDLE = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];

    IMAGES_LONG_IDLE = [
        './img/1.Sharkie/2.Long_IDLE/i1.png',
        './img/1.Sharkie/2.Long_IDLE/i2.png',
        './img/1.Sharkie/2.Long_IDLE/i3.png',
        './img/1.Sharkie/2.Long_IDLE/i4.png',
        './img/1.Sharkie/2.Long_IDLE/i5.png',
        './img/1.Sharkie/2.Long_IDLE/i6.png',
        './img/1.Sharkie/2.Long_IDLE/i7.png',
        './img/1.Sharkie/2.Long_IDLE/i8.png',
        './img/1.Sharkie/2.Long_IDLE/i9.png',
        './img/1.Sharkie/2.Long_IDLE/i10.png',
        './img/1.Sharkie/2.Long_IDLE/i11.png',
        './img/1.Sharkie/2.Long_IDLE/i12.png',
        './img/1.Sharkie/2.Long_IDLE/i13.png',
        './img/1.Sharkie/2.Long_IDLE/i14.png'
    ];

    IMAGES_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_POISONED = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png'
    ];

    IMAGES_POISONED_DEAD = [
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/1.Sharkie/6.dead/1.Poisoned/12.png',
    ];

    currentImage = 0;
    world;

    constructor(){
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_POISONED);
        this.loadImages(this.IMAGES_POISONED_DEAD);
        this.animate();

    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            if (this.world.keyboard.UP && this.y > 0) {
                this.y -= this.speedY;
                this.otherDirection = false;
            }
            if (this.world.keyboard.DOWN && this.y < 480 - this.height) {
                this.y += this.speedY;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 100;
            isMoving = true;

         }, 1000 / 60);

        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_POISONED);
            }
            else if (this.isDead()) {
                this.playAnimation(this.IMAGES_POISONED_DEAD);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_SWIMMING);
            } else {
            this.playAnimation(this.IMAGES_IDLE);
            }
        }, 180);
    }


}