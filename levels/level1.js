let level1;

/**
 * Creates a new level 1 with fresh enemies, collectibles and backgrounds
 * and stores it in the global variable level1.
 */
function initLevel1() {
  level1 = new Level(createEnemies(), createElements(), createBackgrounds());
}

/**
 * Creates all collectibles of the level (20 coins, 3 poison bottles, 2 hearts)
 * in random order.
 * @returns {(Coin|Poison|Heart)[]} The shuffled collectibles.
 */
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

/**
 * Creates all enemies of the level: 10 pufferfish and 7 jellyfish with random
 * colors in random order, followed by the endboss as the last entry.
 * @returns {(Pufferfish|Jellyfish|Endboss)[]} The enemies.
 */
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

/**
 * Picks a random element of an array.
 * @template T
 * @param {T[]} array - Array with at least one element.
 * @returns {T} A random element of the array.
 */
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffles an array in place (Fisher-Yates). The original array is changed.
 * @param {Array} array - Array to shuffle.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Base path of the background layer images.
 * @type {string}
 */
const path = "./img/3.Background/Layers/";

/**
 * Background layers (back to front) of the "D2" tile.
 * @type {string[]}
 */
const backgroundArrayD2 = [
  "5.Water/D2.png",
  "4.Fondo2/D2.png",
  "3.Fondo1/D2.png",
  "2.Floor/D2.png",
];

/**
 * Background layers (back to front) of the "D1" tile.
 * @type {string[]}
 */
const backgroundArrayD1 = [
  "5.Water/D1.png",
  "4.Fondo2/D1.png",
  "3.Fondo1/D1.png",
  "2.Floor/D1.png",
];

/**
 * Creates the background tiles for the whole level. Five tiles of 720px width
 * (from x = -720 to x = 2160) alternate between the D1 and D2 images,
 * each tile consists of four layers.
 * @returns {Background[]} All background layers in drawing order.
 */
function createBackgrounds() {
  const backgrounds = [];
  for (let index = -1; index <= 3; index++) {
    const backgroundImage =
      index % 2 === 0 ? backgroundArrayD1 : backgroundArrayD2;
    backgroundImage.forEach((layer) => {
      backgrounds.push(new Background(path + layer, 720 * index));
    });
  }
  return backgrounds;
}
