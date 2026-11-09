class Endboss extends MoveableObject {
    y = 100;
    x = 2500;
    width = 300;
    height= 300;
    offset = {
    top: 160,
    left: 40,
    right: 5,
    bottom: 70,
    };

    IMAGES_INTRODUCE = [
            './img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
            './img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
            './img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
            './img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
            './img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
            './img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
            './img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
            './img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
            './img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
            './img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];

    IMAGES_SWIMMING = [ './img/2.Enemy/3 Final Enemy/2.floating/1.png',
        './img/2.Enemy/3 Final Enemy/2.floating/2.png',
        './img/2.Enemy/3 Final Enemy/2.floating/3.png',
        './img/2.Enemy/3 Final Enemy/2.floating/4.png',
        './img/2.Enemy/3 Final Enemy/2.floating/5.png',
        './img/2.Enemy/3 Final Enemy/2.floating/6.png',
        './img/2.Enemy/3 Final Enemy/2.floating/7.png',
        './img/2.Enemy/3 Final Enemy/2.floating/8.png',
        './img/2.Enemy/3 Final Enemy/2.floating/9.png',
        './img/2.Enemy/3 Final Enemy/2.floating/10.png',
        './img/2.Enemy/3 Final Enemy/2.floating/11.png',
        './img/2.Enemy/3 Final Enemy/2.floating/12.png',
        './img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];

    currentImage = 0;
    world;

    constructor(){
        super().loadImage('img/2.Enemy/3 Final Enemy/1.Introduce/1.png');
        this.loadImages(this.IMAGES_INTRODUCE);
        this.loadImages(this.IMAGES_SWIMMING);
        this. x = 2500;
        this.speed = 0.0455 + Math.random() * 0.25;
        this.animate();

    }

    animate() {
        let isMoving = false;
        let hasIntroduced = false;

        setInterval( () => {
            if (!this.world || this.x + this.world.camera_x > this.world.canvas.width) {
                return;
            }

            if (!hasIntroduced) {
                this.playAnimation(this.IMAGES_INTRODUCE);
                if (this.currentImage >= this.IMAGES_INTRODUCE.length) {
                    this.currentImage = 0;
                    hasIntroduced = true;
                }
                return;
            }

            if (!isMoving) {
                this.moveLeft();
                isMoving = true;
            }
            this.playAnimation(this.IMAGES_SWIMMING);
        }, 150);
    }
}
