class ThrowableObject extends MoveableObject {

    constructor(x, y) {
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.throw();
    }

    throw() {
        this.speedX = 30;
        setInterval(() => {
            this.x += 5;
        }, 60);
    }

    }
