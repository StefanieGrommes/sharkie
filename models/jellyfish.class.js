class Jellyfish extends MoveableObject {
    y = 200;
    width = 100;
    IMAGES_SUPER_DANGEROUS = [
            'img/2.Enemy/2 Jelly fish/Super dangerous/Green 1.png',
            'img/2.Enemy/2 Jelly fish/Super dangerous/Green 2.png',
            'img/2.Enemy/2 Jelly fish/Super dangerous/Green 3.png',
            'img/2.Enemy/2 Jelly fish/Super dangerous/Green 4.png',
            'img/2.Enemy/2 Jelly fish/Super dangerous/Pink 1.png',
            'img/2.Enemy/2 Jelly fish/Super dangerous/Pink 2.png',
            'img/2.Enemy/2 Jelly fish/Super dangerous/Pink 3.png',
            'img/2.Enemy/2 Jelly fish/Super dangerous/Pink 4.png'
        ];
    currentImage = 0;

    constructor(){
        super().loadImage('img/2.Enemy/2 Jelly fish/Super dangerous/Green 1.png');
        this.loadImages(this.IMAGES_SUPER_DANGEROUS);
        this. x = 200 + Math.random() * 500;
        this.speed = 0.0455 + Math.random() * 0.25;
        this.animate();

    }

    animate() {
        this.moveLeft();
        setInterval( () => {
            let index = this.currentImage % this.IMAGES_SUPER_DANGEROUS.length; // % heisst modulo also Rest
            let path = this.IMAGES_SUPER_DANGEROUS[index];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 180);
    }
}
