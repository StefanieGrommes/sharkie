let canvas;
let world;
let keyboard = new Keyboard();
const GAME_WIDTH = 720;
const GAME_HEIGHT = 480;

function init() {
    const gameContainer = document.getElementById("game-zone");
    const startScreen = document.querySelector(".start-screen");
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
    document.getElementById("start-btn").disabled = true;
    window.addEventListener("resize", handleOrientationChange);
    window.addEventListener("orientationchange", handleOrientationChange);
  }
}