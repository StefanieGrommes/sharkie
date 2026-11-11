class World {
    character = new Character();
    backgrounds = level1.backgrounds;
    statusbarPoison = new StatusbarPoison();
    statusbarHeart = new StatusbarHeart();
    statusbarCoins = new StatusbarCoins();
    level = level1;
    canvas;
    ctx;
    keyboard;
    bubbles = [];
    camera_x = 0;
    thowableObjects = [];


    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        // das canvas wird in die oberste variable let = canvas überschrieben, damit ich es in draw verwenden kann
        this.draw();
        this.setWorld();
        this.run();

    }

    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
               if (this.character.isColliding(enemy)) {
                this.character.hit(enemy);
                this.statusbarHeart.setPercentage(this.character.energy);
               }
            })
    }

    checkThrowObjects() {
        if(this.keyboard.D){
            let bubble = new ThrowableObject(this.character.x + 160, this.character.y + 110);
            this.thowableObjects.push(bubble);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //voher Canvas löschen
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.thowableObjects);
        this.addObjectsToMap(this.level.elements);
        this.ctx.translate(-this.camera_x, 0);
        // ------- SPACE FOR FIXED OBJECTS --------------
        this.addToMap(this.statusbarPoison);
        this.addToMap(this.statusbarHeart);
        this.addToMap(this.statusbarCoins);
        this.ctx.translate(this.camera_x, 0); //FORWARDS

        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
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
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawBorder(this.ctx);
        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        });
    }


    }
