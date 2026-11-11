class Poison extends MoveableObject {
    IMAGES_POISON= [
        './img/4.Marcadores/Poison/Animada/1.png',
        './img/4.Marcadores/Poison/Animada/2.png',
        './img/4.Marcadores/Poison/Animada/3.png',
        './img/4.Marcadores/Poison/Animada/4.png',
        './img/4.Marcadores/Poison/Animada/5.png',
        './img/4.Marcadores/Poison/Animada/6.png',
        './img/4.Marcadores/Poison/Animada/7.png',
        './img/4.Marcadores/Poison/Animada/8.png'
        ];

width = 40;
height = 40;

constructor() {
    super();
    this.loadImage(this.IMAGES_POISON[0]);
    this.loadImages(this.IMAGES_POISON);

    this.x = 30 + Math.random() * (2100 - 30);
    this.y = Math.random() * (GAME_HEIGHT -  this.height);
    this.animate()
}

    animate() {
        setInterval( () => {
        this.playAnimation(this.IMAGES_POISON);
        }, 250);
    }

}

