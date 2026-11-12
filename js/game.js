let canvas;
let world;
let keyboard = new Keyboard();
const GAME_WIDTH = 720;
const GAME_HEIGHT = 480;
let intervalIds = [];
let i=1;


function init() {
    const gameContainer = document.getElementById("game-zone");
    const startScreen = document.querySelector(".start-screen-container");
    startScreen.classList.add("d-none");
    startScreen.classList.remove("d-flex");
    gameContainer.classList.remove("d-none");
    gameContainer.classList.add("d-flex");
    document.body.style.backgroundImage =
      "url('img/3.Background/BackgroundImage/water.png')";
    canvas = document.getElementById("canvas");
    initLevel1();
    world = new World(canvas, keyboard);
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
}

window.addEventListener("keydown", (event) => {
    const key = event.key;
    switch (key) {
    case " ": keyboard.SPACE = true;
    break;
    case "ArrowLeft": keyboard.LEFT = true;
    break;
    case "ArrowUp": keyboard.UP = true;
    break;
    case "ArrowDown": keyboard.DOWN = true;
    break;
    case "ArrowRight": keyboard.RIGHT = true;
    break;
    case "d": keyboard.D = true;
    break;
    case "f": keyboard.F = true;
    break;
    }
});

window.addEventListener("keyup", (event) => {
    const key = event.key;
    switch (key) {
    case " ": keyboard.SPACE = false;
    break;
    case "ArrowLeft": keyboard.LEFT = false;
    break;
    case "ArrowUp": keyboard.UP = false;
    break;
    case "ArrowDown": keyboard.DOWN = false;
    break;
    case "ArrowRight": keyboard.RIGHT = false;
    break;
    case "d": keyboard.D = false;
    break;
    case "f": keyboard.F = false;
    break;
    }
});

document.getElementById("btn-left").addEventListener("touchstart", (event) => {
  event.preventDefault();
    keyboard.LEFT = true;
});

document.getElementById("btn-left").addEventListener("touchend", (event) => {
  event.preventDefault();
    keyboard.LEFT = false;
});

document.getElementById("btn-right").addEventListener("touchstart", (event) => {
  event.preventDefault();
    keyboard.RIGHT = true;
});

document.getElementById("btn-right").addEventListener("touchend", (event) => {
  event.preventDefault();
    keyboard.RIGHT = false;
});

document.getElementById("btn-up").addEventListener("touchstart", (event) => {
  event.preventDefault();
    keyboard.UP = true;
});

document.getElementById("btn-up").addEventListener("touchend", (event) => {
  event.preventDefault();
    keyboard.UP = false;
});

document.getElementById("btn-down").addEventListener("touchstart", (event) => {
  event.preventDefault();
    keyboard.DOWN = true;
});

document.getElementById("btn-down").addEventListener("touchend", (event) => {
  event.preventDefault();
    keyboard.DOWN = false;
});

document.getElementById("btn-d").addEventListener("touchstart", (event) => {
  event.preventDefault();
   keyboard.D = true;
});

document.getElementById("btn-d").addEventListener("touchend", (event) => {
  event.preventDefault();
    keyboard.D = false;
});

document.getElementById("btn-f").addEventListener("touchstart", (event) => {
  event.preventDefault();
    keyboard.F = true;
});

document.getElementById("btn-f").addEventListener("touchend", (event) => {
  event.preventDefault();
    keyboard.F = false;
});

document.getElementById("btn-space").addEventListener("touchstart", (event) => {
  event.preventDefault();
    keyboard.SPACE = true;
});

document.getElementById("btn-space").addEventListener("touchend", (event) => {
  event.preventDefault();
    keyboard.SPACE = false;
});

/**
 * Handles canvas resizing and responsive layout adjustments
 * Updates both internal resolution and display size
 */
function resizeCanvas() {
  const viewport = getViewportSize();

  setCanvasResolution();

  const displaySize = calculateDisplaySize(viewport);

  applyCanvasStyles(displaySize);
}

/**
 * Gets the current viewport size considering different browser APIs
 * @returns {{width: number, height: number}} The viewport dimensions
 */
function getViewportSize() {
  return {
    width: window.visualViewport
      ? window.visualViewport.width
      : window.innerWidth,
    height: window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight,
  };
}

/**
 * Sets the internal canvas resolution to the game's base resolution
 * This defines the game's logical coordinate system
 */
function setCanvasResolution() {
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
}

/**
 * Fits the canvas to the viewport without enlarging it beyond its base size
 * @param {{width: number, height: number}} viewport - The viewport dimensions
 * @returns {{width: number, height: number}} The calculated display size
 */
function calculateDisplaySize(viewport) {
  const scale = Math.min(1, calculateScale(viewport));
  return {
    width: Math.floor(GAME_WIDTH * scale),
    height: Math.floor(GAME_HEIGHT * scale),
  };
}

/**
 * Calculates the scale factor to maintain aspect ratio
 * @param {{width: number, height: number}} viewport - The viewport dimensions
 * @returns {number} The scale factor
 */
function calculateScale(viewport) {
  const scaleX = viewport.width / GAME_WIDTH;
  const scaleY = viewport.height / GAME_HEIGHT;
  return Math.min(scaleX, scaleY);
}

/**
 * Applies the calculated display size to canvas and game container elements
 * @param {{width: number, height: number}} size - The display size to apply
 */
function applyCanvasStyles(size) {
  const gameZone = document.getElementById("game-zone");

  canvas.style.width = `${size.width}px`;
  canvas.style.height = `${size.height}px`;

  gameZone.style.width = `${size.width}px`;
  gameZone.style.height = `${size.height}px`;
}

/**
 * Detects if the device is likely using touch input
 * @returns {boolean} True if the device appears to be touch-based
 */
function isTouchDevice() {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(hover: none)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

/**
 * Shows a rotate hint for mobile portrait orientation
 * Automatically hides after 3 seconds if in portrait mode
 */
function showRotateHint() {
  if (!isTouchDevice()) return;

  const warning = document.getElementById("rotate-warning");
  const isPortrait = window.innerHeight > window.innerWidth;

  if (isPortrait) {
    warning.classList.remove("d-none");
    document.getElementById("start-game-btn").disabled = true;
    window.addEventListener("resize", handleOrientationChange);
    window.addEventListener("orientationchange", handleOrientationChange);
  }
}

function openOptions() {
  document.getElementById("options-overlay").showModal();

}

function closeOptions() {
  document.getElementById("options-overlay").close();
}

function openImprint() {
  document.getElementById("imprint-overlay").showModal();
}

function closeImprint() {
document.getElementById("imprint-overlay").close();
}

/**
 * sets an interval with a callback function and a time and pushes their id to the intervalIds Array.
 * @returns {number} The id of that interval.
 */
function setStoppableFunction(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}

/* so muss man die Intervlle alle umbenennen setStoppableFunction(sayHello, 200);
setStoppableFunction(sayGoodbye, 100);

function sayHello() {
  console.log("Hallo");
  i++;
}
*/

/**
 * stops all interval functions that belong to the intervalId Array
 * @returns {void}
 */
function stopGame() {
  intervalIds.forEach((id) => {
  clearInterval(id);
  intervalIds = [];
  });
}

function fullscreen(){
const gameZone = document.getElementById("game-zone");
enterFullscreen(gameZone);
}

/**
 * changes the element into fullscreen modus
 */
function enterFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/**
 * changes the element from fullscreen into normal modus
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

