class Heart extends MoveableObject {

width = 40;
height = 40;

constructor() {
    super();
    this.loadImage('./img/4.Marcadores/green/100_  copia 3.png');

    this.x = 720 + Math.random() * 480;
    this.y = Math.random() * (GAME_HEIGHT -  this.height);

}


}
