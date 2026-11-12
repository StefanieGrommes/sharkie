class World {
  character = new Character();
  statusbarPoison = new StatusbarPoison();
  statusbarHeart = new StatusbarHeart();
  statusbarCoins = new StatusbarCoins();
  level = level1;
  canvas;
  ctx;
  keyboard;
  bubbles = [];
  camera_x = 0;
  throwableObjects = [];
  poisonCollected = 0;
  coinsCollected = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    // das canvas wird in die oberste variable let = canvas überschrieben, damit ich es in draw verwenden kann
    this.draw();
    this.setWorld();
    this.run();
  }

  run() {
    setStoppableFunction(() => this.checkCollisions(), 200);
    setStoppableFunction(() => this.checkCollectibles(), 200);
    setStoppableFunction(() => this.checkThrowObjects(), 200);
    setStoppableFunction(() => this.checkBubbleCollisions(), 50);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.dead && !enemy.isDead() && this.character.isColliding(enemy)) {
        this.character.hit(enemy);
        this.statusbarHeart.setPercentage(this.character.energy);
      }
    });
  }

  checkBubbleCollisions() {
    this.throwableObjects = this.throwableObjects.filter((bubble) => {
      const hit = this.level.enemies.find(
        (enemy) =>
          !enemy.dead &&
          (enemy instanceof Pufferfish || enemy instanceof Jellyfish) &&
          bubble.isColliding(enemy),
      );
      if (hit) {
        hit.die();
        hit.flyDirection = bubble.otherDirection ? -1 : 1;
        return false; // Bubble entfernen
      }
      return true;
    });
    this.level.enemies = this.level.enemies.filter((enemy) => !enemy.removable);
  }

  checkThrowObjects() {
    if (this.keyboard.D) this.character.startAttack("BUBBLE");
    if (this.keyboard.SPACE) this.character.startAttack("FINSLAP");
  }

  checkCollectibles() {
    [...this.level.elements].forEach((element) => {
      if (this.character.isColliding(element)) {
        const index = this.level.elements.indexOf(element);
        this.level.elements.splice(index, 1);
        if (element instanceof Poison) {
          this.poisonCollected = Math.min(100, this.poisonCollected + 20);
          this.statusbarPoison.setPercentage(this.poisonCollected);
        }
        if (element instanceof Coin) {
          this.coinsCollected = Math.min(100, this.coinsCollected + 5);
          this.statusbarCoins.setPercentage(this.coinsCollected);
        }
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //voher Canvas löschen
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgrounds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
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
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawBorder(this.ctx);
    if (mo.otherDirection) {
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

throwBubble() {
    const left = this.character.otherDirection;
    const x = left ? this.character.x - 40 : this.character.x + 160;
    this.throwableObjects.push(new ThrowableObject(x, this.character.y + 110, left));
}

checkFinSlapCollisions() {
    const c = this.character;
    const range = 60; // Reichweite des Schlags, anpassen
    const box = {
        x: c.otherDirection ? c.x - range : c.x,
        y: c.y,
        width: c.width + range,
        height: c.height,
        offset: c.offset
    };
    this.level.enemies.forEach((enemy) => {
        if (enemy.dead) return;
        if (!MoveableObject.prototype.isColliding.call(box, enemy)) return;
        if (enemy instanceof Endboss) {
            enemy.takeDamage(20); // Schaden anpassen
        } else {
            enemy.flyDirection = c.otherDirection ? -1 : 1;
            enemy.die();
        }
    });
    }
}