let canvas;
let world;
let keyboard = new Keyboard();
const GAME_WIDTH = 720;
const GAME_HEIGHT = 480;
let intervalIds = [];
let i = 1;
let volumeOn = false;
const allSounds = [];
const MIN_FULLSCREEN_RATIO = 1.5;
const MAX_FULLSCREEN_RATIO = 1.8;


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
  setCanvasResolution();
  checkVolumeSettings();
  initLevel1();
  document.body.classList.add("playing");
  world = new World(canvas, keyboard);
  resizeCanvas();
  showSettings();
}

window.addEventListener("resize", resizeCanvas);

window.addEventListener("keydown", (event) => {
  const key = event.key;
  switch (key) {
    case " ":
      keyboard.SPACE = true;
      break;
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;
    case "ArrowUp":
      keyboard.UP = true;
      break;
    case "ArrowDown":
      keyboard.DOWN = true;
      break;
    case "ArrowRight":
      keyboard.RIGHT = true;
      break;
    case "b":
      keyboard.B = true;
      break;
    case "f":
      keyboard.F = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.key;
  switch (key) {
    case " ":
      keyboard.SPACE = false;
      break;
    case "ArrowLeft":
      keyboard.LEFT = false;
      break;
    case "ArrowUp":
      keyboard.UP = false;
      break;
    case "ArrowDown":
      keyboard.DOWN = false;
      break;
    case "ArrowRight":
      keyboard.RIGHT = false;
      break;
    case "b":
      keyboard.B = false;
      break;
    case "f":
      keyboard.F = false;
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
  keyboard.B = true;
});

document.getElementById("btn-d").addEventListener("touchend", (event) => {
  event.preventDefault();
  keyboard.B = false;
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

document.getElementById("volume-btn").addEventListener("click", toggleVolume);
document.getElementById("menu-content").addEventListener("click", (event) => {
  if (event.target.closest("#menu-volume-btn")) toggleVolume(event);
  if (event.target.closest("#menu-fullscreen-btn")) toggleFullscreen();
});

document.addEventListener("fullscreenchange", () => {
  resizeCanvas();
  changeFullscreenBtn();
});

function showSettings() {
  document.querySelector(".settings").classList.remove("d-none");
}
/**
 * Handles canvas resizing and responsive layout adjustments
 * Updates both internal resolution and display size
 */
function resizeCanvas() {
  if (!canvas) return;
  const viewport = getViewportSize();
  const displaySize = calculateDisplaySize(viewport);
  applyCanvasStyles(displaySize);
}

/**
 * Gets the current viewport size considering different browser APIs
 * @returns {{width: number, height: number}} The viewport dimensions
 */
function getViewportSize() {
  const vv = window.visualViewport;
  let width = vv ? vv.width : window.innerWidth;
  let height = vv ? vv.height : window.innerHeight;
  if (!document.fullscreenElement) {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    height -= (header?.offsetHeight || 0) + (footer?.offsetHeight || 0);
  }
  return { width, height };
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
 * Fits the canvas to the viewport. In fullscreen it fills the whole screen,
 * otherwise it is never larger than its base size.
 */
function calculateDisplaySize(viewport) {
  if (document.fullscreenElement) return calculateFullscreenSize(viewport);
  const scale = Math.min(1, calculateScale(viewport));
  return {
    width: Math.floor(GAME_WIDTH * scale),
    height: Math.floor(GAME_HEIGHT * scale),
  };
}

/**
 * Calculates the scale factor to maintain aspect ratio
 */
function calculateScale(viewport) {
  return Math.min(viewport.width / GAME_WIDTH, viewport.height / GAME_HEIGHT);
}

function calculateFullscreenSize(viewport) {
  const ratio = viewport.width / viewport.height;
  const target = Math.min(
    MAX_FULLSCREEN_RATIO,
    Math.max(MIN_FULLSCREEN_RATIO, ratio),
  );
  let { width, height } = viewport;
  if (ratio > target) width = height * target; // zu breit: Balken links/rechts
  else height = width / target; // zu hoch: Balken oben/unten
  return { width: Math.floor(width), height: Math.floor(height) };
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

let masterVolume = parseFloat(localStorage.getItem("masterVolume") ?? "0.5");

function changeVolume(amount) {
   masterVolume = parseFloat(amount);
  localStorage.setItem("masterVolume", masterVolume);
  allSounds.forEach((sound) => {
    sound.volume = masterVolume;
  });
}

document.getElementById("help-btn").addEventListener("click", openMenu);
document.getElementById("imprint-btn").addEventListener("click", openMenu);
document.getElementById("settings-btn").addEventListener("click", openMenu);

const closeMenuBtn = document.getElementById("close-menu-btn");
closeMenuBtn.addEventListener("click", closeMenu);
document.addEventListener("click", closeMenu);
const menuContainer = document.getElementById("menu-container");

function closeInstructions() {
  document.getElementById("options-overlay").close();
}

function openMenu(event) {
  menuContainer.showModal();
  const clickedBtn = event.currentTarget;
  if (clickedBtn.id === "help-btn" || clickedBtn.id === "settings-btn") {
    openInstructions();
  } else if (clickedBtn.id === "imprint-btn") {
    openImprint();
  }
}

function closeMenu(event) {
  if (event.target !== menuContainer && event.target !== closeMenuBtn) return; // wenn man auf den dialog klickt, passiert nichts
  menuContainer.close();
}

function openInstructions() {
  document.getElementById("menu-content").innerHTML = `

  <ol class="controls-list">
  <h2>Controls</h2>
      <ul>
       <h3> MOVING </h3>
        <li>
          <span>Move left</span>
          <div class="preview-btn">←</div>
        </li>

        <li>
          <span>Move right</span>
          <div class="preview-btn">→</div>
        </li>

        <li>
          <span>Move up</span>
          <div class="preview-btn">↑</div>
        </li>

        <li>
          <span>Move down</span>
          <div class="preview-btn">↓</div>
        </li>
        </ul>

<ul>  <h3> ATTACKING</h3>
        <li>
          <span>Fin Slap</span>
          <div class="preview-btn">F</div>
        </li>

        <li>
          <span>Bubble Attack</span>
          <div class="preview-btn">D</div>
        </li>

        <li>
          <span>Poison Attack</span>
          <div class="preview-btn">Space</div>
        </li>
      </ul>
      <h2>Settings</h2>
      <ul class="menu-settings">
      <li><button class="game-btn fullscreen-btn" id="menu-fullscreen-btn">
    <img class="fullscreen-img" src="./img/7.Buttons/fullscreen.png" alt="fullscreen image"
      >
    </button></li>
    <li><button class="game-btn" ><input type="range" id="volumeSlider" min="0" max="1" step="0.1" value="${masterVolume}" class="volume-slider" oninput="changeVolume(this.value)">
       </button></li>
    <li><button class="game-btn" id="menu-volume-btn">
      <img class="img-volume" src="./img/7.Buttons/volume.png" alt="sound image">
    </button></li>
    </ul>
      </ol>`;
      changeFullscreenBtn();
}

function openImprint() {
  document.getElementById("menu-content").innerHTML = `<h2>Imprint</h2>
            <p>
              Stefanie Grommes<br />
              Offenbachstr. 6<br />
              53359 Rheinbach<br />
              Telefon: +49 (0) 1785825548<br />
              E-Mail: steffi.grommes@web.de
            </p>


            <h3>Berufsbezeichnung und berufsrechtliche Regelungen</h3>
            <p>
              Berufsbezeichnung:<br />
              Software Developer
            </p>


            <h3>
              Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle
            </h3>
            <p>
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>

            <p>
              Quelle:
              <a
                href="https://www.e-recht24.de/impressum-generator.html">https://www.e-recht24.de/impressum-generator.html</a>
            </p>
            `;
}

function openHistory() {
  document.getElementById("menu-content").innerHTML =
    `  <h2 class="title">Deep under the waves, in the mysterious Coral Kingdom, lives a brave little shark named Sharkie.</h2>
            <p>
                Long ago, the Coral Kingdom was a place of peace and beauty...
                Puffer fishes gang swims across, blocking the path.
                Jelly fishes glow menacingly.
                Only one hero can save the ocean...
                Sharkie, the Ocean Guardian!
            </p>
            <h4 class="title">The Mission:</h4>
            <ul>
                <li>Collect coins to rebuild the Coral Kingdom </li>
                <li>Collect hearts to regain energy. </li>
                <li>Collect poison bottles in order to build posion bubbles. </li>
                <li>Defeat the enemies by throwing bubbles or slapping them with your fin.</li>
            </ul>
            <h2 class="title">Are you ready to help Sharkie get back the peace?</h2>`;
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


document.getElementById("fullscreen-btn").addEventListener("click", toggleFullscreen);

function toggleFullscreen() {
  if (document.fullscreenElement) exitFullscreen();
  else enterFullscreen(document.querySelector("main"));
}

/**
 * changes the element into fullscreen modus
 */
function enterFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

function changeFullscreenBtn() {
  const fullscreenBtns = document.querySelectorAll(".fullscreen-btn img");
  fullscreenBtns.forEach((img) => {
    img.src = document.fullscreenElement
      ? "./img/7.Buttons/fullscreen-exit.png"
      : "./img/7.Buttons/fullscreen.png";
  });
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

/**
 * stops all interval functions that belong to the intervalId Array
 * @returns {void}
 */
function stopGame() {
  intervalIds.forEach((id) => clearInterval(id));
  intervalIds = [];
  if (world) cancelAnimationFrame(world.animationId);
}

function hideEndScreens() {
  ["game-over-screen", "win-screen"].forEach((id) => {
    const el = document.getElementById(id);
    el.classList.add("d-none");
    el.classList.remove("d-flex");
  });
  document.body.classList.remove("game-ended");
}

function restartGame() {
  stopGame();
  checkVolumeSettings();
  hideEndScreens();
  initLevel1();
  world = new World(canvas, keyboard);
}

function endGame() {
  stopGame();
  stopAllSounds();
  hideEndScreens();
  exitFullscreen();
  document.body.classList.remove("playing");
  const gameZone = document.getElementById("game-zone");
  gameZone.classList.add("d-none");
  gameZone.classList.remove("d-flex");
  const startScreen = document.querySelector(".start-screen-container");
  startScreen.classList.remove("d-none");
  startScreen.classList.add("d-flex");
  document.body.style.backgroundImage =
    "url('img/3.Background/Mesa de trabajo 1.png')";
  document.querySelector(".settings").classList.add("d-none");
}

const backgroundmusic = new Audio(
  "./audio/AFRO014017_SUIKERBOSSIE_SONOTON.mp3",
);
backgroundmusic.loop = true;
backgroundmusic.volume = masterVolume;
allSounds.push(backgroundmusic);

function checkVolumeSettings() {
  const soundSetting = localStorage.getItem("volumeOn");
  soundSetting === "true" ? soundOn() : muteAll();
  changeVolumeBtn();
}

function soundOn() {
  allSounds.forEach((sound) => {
    sound.play();
  });
  localStorage.setItem("volumeOn", "true");
  volumeOn = true;
}

function stopAllSounds() {
  allSounds.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });
  allSounds.splice(0, allSounds.length, backgroundmusic);
}

function muteAll() {
  stopAllSounds();
  localStorage.setItem("volumeOn", "false");
  volumeOn = false;
}

function toggleVolume(event) {
  event.target.closest("button")?.blur();
  volumeOn ? muteAll() : soundOn();
  changeVolumeBtn();
}

function changeVolumeBtn() {
  document.querySelectorAll(".img-volume").forEach((img) => {
    img.src = volumeOn
      ? "./img/7.Buttons/volume.png"
      : "./img/7.Buttons/volume-mute.png";
  });
}

