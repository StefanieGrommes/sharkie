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
  poisoned_bubbles = [];
  camera_x = 0;
  throwableObjects = [];
  poisonCollected = 0;
  coinsCollected = 0;
  gameEnded = false;
  sfx =  { poison: './audio/poisonbubble.mp3',
          finslap: './audio/finslap.wav',
          bubble: './audio/bubble_normal.wav',
          sleeping: './audio/Snore.mp3',
          hurt: './audio/hurt.mp3',
          endbossHurt: './audio/endboss-hurt.mp3',
          collected: './audio/collectibles.wav',
          win: './audio/youwin.wav',
          lose: './audio/youlose.wav',
          intro: './audio/endboss_intro.mp3',
          fly: './audio/Funpipe 5.mp3'
  }

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
    setStoppableFunction(() => this.checkGameEnd(), 200);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.dead && !enemy.isDead() && this.character.isColliding(enemy)) {
          if (!this.character.isHurt()) this.playSFX(this.sfx.hurt);
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
          !(enemy instanceof Endboss && enemy.isDead()) &&
          (enemy instanceof Pufferfish ||
            enemy instanceof Jellyfish ||
          enemy instanceof Endboss) &&
          bubble.isColliding(enemy),
      );
      if (!hit) return true;
    if (hit instanceof Endboss) {
      hit.takeDamage(bubble.poisoned ? 20 : 10);
    } else {
      hit.flyDirection = bubble.otherDirection ? -1 : 1;
      hit.die();
    }
    return false;
  });
  this.level.enemies = this.level.enemies.filter((enemy) => !enemy.removable);
}

checkThrowObjects() {
  if (this.keyboard.B) this.character.startAttack("BUBBLE");
  if (this.keyboard.SPACE && this.poisonCollected >= 20)
    this.character.startAttack("POISON");
  if (this.keyboard.F) this.character.startAttack("FINSLAP");
}

  checkCollectibles() {
    [...this.level.elements].forEach((element) => {
      if (this.character.isColliding(element)) {
        const index = this.level.elements.indexOf(element);
        this.playSFX(this.sfx.collected);
        this.level.elements.splice(index, 1);
        if (element instanceof Poison) {
          this.poisonCollected = Math.min(100, this.poisonCollected + 20);
          this.statusbarPoison.setPercentage(this.poisonCollected);
        }
        if (element instanceof Coin) {
          this.coinsCollected = Math.min(100, this.coinsCollected + 5);
          this.statusbarCoins.setPercentage(this.coinsCollected);
        }
        if (element instanceof Heart) {
          this.character.energy= Math.min(100, this.character.energy + 20);
          this.statusbarHeart.setPercentage(this.character.energy);
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
    this.animationId = requestAnimationFrame(() => this.draw());

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

throwBubble(poisoned = false) {
  if (poisoned) {
    if (this.poisonCollected < 20) return;
    this.poisonCollected -= 20;
    this.statusbarPoison.setPercentage(this.poisonCollected);
  }
  const left = this.character.otherDirection;
  const x = left ? this.character.x - 40 : this.character.x + 160;
  this.throwableObjects.push(
    new ThrowableObject(x, this.character.y + 110, left, poisoned),
  );
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


checkGameEnd() {
  if (this.gameEnded) return;
  const boss = this.level.enemies.find((e) => e instanceof Endboss);
  if (this.character.isDead()) {
    this.finishGame("game-over-screen");
    this.playSFX(this.sfx.lose);
    }
  else if (boss && boss.isDead()) {
    this.finishGame("win-screen");
    this.playSFX(this.sfx.win);
  }
}

finishGame(screenId) {
  this.gameEnded = true;
  setTimeout(() => {
    stopGame();
    stopMusic();
    const screen = document.getElementById(screenId);
    screen.classList.remove("d-none");
    screen.classList.add("d-flex");
  }, 1500); // Zeit für die Todesanimation
}

playSFX(path) {
 const sound = new Audio(path);
 sound.play();
}

}