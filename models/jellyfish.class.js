class Jellyfish extends MoveableObject {
    y = 200;
    width = 100;
    speedY = 5;
    offset = {
        top: 4,
        bottom: 4,
        left: 3,
        right: 3
    };

    IMAGES_SUPER_DANGEROUS_GREEN = [
            'img/2.Enemy/2 Jelly fish/Super dangerous/Green 1.png',
            'img/2.Enemy/2 Jelly fish/Super dangerous/Green 2.png',
            'img/2.Enemy/2 Jelly fish/Super dangerous/Green 3.png',
            'img/2.Enemy/2 Jelly fish/Super dangerous/Green 4.png'
    ];
    IMAGES_SUPER_DANGEROUS_PINK = [
            'img/2.Enemy/2 Jelly fish/Super dangerous/Pink 1.png',
            'img/2.Enemy/2 Jelly fish/Super dangerous/Pink 2.png',
            'img/2.Enemy/2 Jelly fish/Super dangerous/Pink 3.png',
            'img/2.Enemy/2 Jelly fish/Super dangerous/Pink 4.png'
    ];

    currentImage = 0;

    constructor(){
        super().loadImage('img/2.Enemy/2 Jelly fish/Super dangerous/Green 1.png');
        this.loadImages(this.IMAGES_SUPER_DANGEROUS_GREEN);
        this. x = 200 + Math.random() * 500;
        this.speed = 0.0455 + Math.random() * 0.25;
        this.animate();

    }

    animate() {
        setInterval( () => {
        this.y += this.speedY;

        if (this.y >= 380 || this.y <= 0) {
            this.speedY *= -1;
        }
        this.playAnimation(this.IMAGES_SUPER_DANGEROUS_GREEN);
        }, 180);
    }


}
