let level1;

function initLevel1() {
  level1 = new Level(createEnemies(), createElements(), createBackgrounds());
}

function createElements() {
  const elements = [];
  for (let index = 0; index < 20; index++) {
    elements.push(new Coin());
  }
  for (let index = 0; index < 3; index++) {
    elements.push(new Poison());
  }
  for (let index = 0; index < 2; index++) {
    elements.push(new Heart());
  }
  shuffle(elements);
  return elements;
}

function createEnemies() {
  const enemies = [];
  const pufferfishColors = Object.keys(Pufferfish.IMAGES);
  const jellyfishColors = Object.keys(Jellyfish.IMAGES);
  for (let index = 0; index < 10; index++) {
    enemies.push(new Pufferfish(randomItem(pufferfishColors)));
  }
  for (let index = 0; index < 7; index++) {
    enemies.push(new Jellyfish(randomItem(jellyfishColors)));
  }
  shuffle(enemies);
  enemies.push(new Endboss());
  return enemies;
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const path = "../img/3.Background/Layers/"
const backgroundArrayD2 = [
    "5.Water/D2.png",
    "4.Fondo2/D2.png",
    "3.Fondo1/D2.png",
    "2.Floor/D2.png",
];
const backgroundArrayD1 = [
    "5.Water/D1.png",
    "4.Fondo2/D1.png",
    "3.Fondo1/D1.png",
    "2.Floor/D1.png"
];

function createBackgrounds() {
    const backgrounds = [];
    for (let index = -1; index <= 3; index++) {
        const backgroundImage = index % 2 === 0 ? backgroundArrayD1 : backgroundArrayD2;
        backgroundImage.forEach((layer) => {
            backgrounds.push(new Background(path + layer, 720 * index));
        });
    }
    return backgrounds;
}
