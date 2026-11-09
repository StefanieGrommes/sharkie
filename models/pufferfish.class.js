class Pufferfish extends MoveableObject {
    y = 120;
    width = 100;
    offset = {
        top: 8,
        bottom: 8,
        left: 4,
        right: 4
    };

    IMAGES_SWIM_GREEN = [
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];
    IMAGES_SWIM_ORANGE = [
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png'
    ];
    IMAGES_SWIM_PINK = [
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
            'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png'
    ];

    currentImage = 0;

    constructor(){
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIM_GREEN);
        this. x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();

    }

    animate() {
        this.moveLeft();
        setInterval( () => {
            this.playAnimation(this.IMAGES_SWIM_GREEN);
        }, 180);
    }
}