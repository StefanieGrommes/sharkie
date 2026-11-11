class Coin extends MoveableObject {
IMAGES_COINS= [
        './img/4.Marcadores/1. Coins/1.png',
        './img/4.Marcadores/1. Coins/2.png',
        './img/4.Marcadores/1. Coins/3.png',
        './img/4.Marcadores/1. Coins/4.png'
        ];

width = 40;
height = 40;

constructor() {
    super();
    this.loadImage(this.IMAGES_COINS[0]);
    this.loadImages(this.IMAGES_COINS);

    this.x = 30 + Math.random() * (2300 - 30);
    this.y = Math.random() * (GAME_HEIGHT -  this.height);
    this.animate()
}

    animate() {
        setInterval( () => {
        this.playAnimation(this.IMAGES_COINS);
        }, 180);
    }
}




