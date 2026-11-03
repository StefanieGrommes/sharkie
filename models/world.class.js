class World {
    character = new Character();
    enemies = [
        new Pufferfish(),
        new Jellyfish(),
        new Pufferfish(),
        new Pufferfish()
    ];
    backgrounds = [
        new Background ('img/3.Background/Layers/5.Water/D1.png', 0),
        new Background('img/3.Background/Layers/4.Fondo2/D1.png', 80),
        new Background('img/3.Background/Layers/3.Fondo1/D1.png', 0),
        new Background('img/3.Background/Layers/2.Floor/D1.png', 0)
    ]
    canvas;
    ctx;

    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        // das canvas wird in die oberste variable let = canvas überschrieben, damit ich es in draw verwenden kann
        this.draw();

    }

        draw() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            //voher Canvas löschen
            this.addObjectsToMap(this.backgrounds);
            this.addObjectsToMap(this.enemies);
            this.addToMap(this.character);



            // Draw() wird immer wieder aufgerufen
            let self = this;
            requestAnimationFrame(function() {
                self.draw();
            });
        }

        addObjectsToMap(objects) {
            objects.forEach(object => {
                this.addToMap(object);
            });
        }

        addToMap(mo) {
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }
    }


