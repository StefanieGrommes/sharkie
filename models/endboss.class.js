class Endboss extends MoveableObject {
    y = 0;
    width = 400;
    height= 270;
    IMAGES_INTRODUCE= [
            'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
            'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
            'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
            'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
            'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
            'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
            'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
            'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
            'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
            'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
        ];
    currentImage = 0;

    constructor(){
        super().loadImage('img/2.Enemy/3 Final Enemy/1.Introduce/1.png');
        this.loadImages(this.IMAGES_INTRODUCE);
        this. x = 2500;
        this.speed = 0.0455 + Math.random() * 0.25;
        this.animate();

    }

    animate() {
        this.moveLeft();
        setInterval( () => {
            this.playAnimation(this.IMAGES_INTRODUCE);
        }, 180);
    }
}
