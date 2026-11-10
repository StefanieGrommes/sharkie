class Pufferfish extends MoveableObject {
    y = 120;
    width = 100;
    offset = {
        top: 8,
        bottom: 8,
        left: 4,
        right: 4
    };
    currentImage = 0;

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

    constructor(variant='GREEN'){
        super();
        this.images = Pufferfish.IMAGES[variant];
        this.loadImage(this.images[0]);
        this.loadImages(this.images);
        this. x = 200 + Math.random() * 2500;
        this. y = 50 + Math.random() * 480;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();

    }

    animate() {
        setStoppableFunction(() => this.showImages(), 180);
        setStoppableFunction(() => this.moveLeft(), 180);
    }

    showImages() {
        this.playAnimation(this.images);
    }

}