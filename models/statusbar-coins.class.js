class StatusbarCoins extends DrawableObject {
     IMAGES_STATUSBAR_COINS = [
        'img/4.Marcadores/Purple/0_ _1.png',
        'img/4.Marcadores/Purple/20_ .png',
        'img/4.Marcadores/Purple/40_ _1.png',
        'img/4.Marcadores/Purple/60_ _1.png',
        'img/4.Marcadores/Purple/80_ _1.png',
        'img/4.Marcadores/Purple/100__1.png'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUSBAR_COINS);
        this.setPercentage(0);
        this.x = 430;
        this.y = 0;
        this.width = 200;
        this.height = 50;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUSBAR_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if(this.percentage == 100) return 5;
        else if (this.percentage >= 80) return 4;
        else if (this.percentage >= 60) return 3;
        else if (this.percentage >= 40) return 2;
        else if (this.percentage >= 20) return 1;
        else return 0;
    }
}