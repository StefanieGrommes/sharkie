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
const gameContainer = document.getElementById("game-zone");
const startScreen = document.querySelector(".start-screen-container");

function init() {
  startScreen.classList.add("d-none");
  startScreen.classList.remove("d-flex");
  gameContainer.classList.remove("d-none");
  gameContainer.classList.add("d-flex");
  document.body.style.backgroundImage = "";
  canvas = document.getElementById("canvas");
  setCanvasResolution();
  checkVolumeSettings();
  initLevel1();
  document.body.classList.add("playing");
  world = new World(canvas, keyboard);
  showSettings();
}

document.getElementById("volume-btn").addEventListener("click", toggleVolume);
document.getElementById("menu-content").addEventListener("click", (event) => {
  if (event.target.closest("#menu-volume-btn")) toggleVolume(event);
  if (event.target.closest("#menu-fullscreen-btn")) toggleFullscreen();
});

document.addEventListener("fullscreenchange", () => {
  changeFullscreenBtn();
});

function showSettings() {
  document.querySelector(".settings").classList.remove("d-none");
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
    renderInstructions();
  }
}

function closeMenu(event) {
  if (event.target !== menuContainer && event.target !== closeMenuBtn) return; // wenn man auf den dialog klickt, passiert nichts
  menuContainer.close();
}

function renderInstructions() {
  document.getElementById("menu-content").innerHTML = showInstructions();
  changeFullscreenBtn();
}

function renderImprint() {
  document.getElementById("menu-content").innerHTML = showImprint();
}

function renderHistory() {
  document.getElementById("menu-content").innerHTML = showHistory();
}

/**
 * sets an interval with a callback function and a time and pushes their id to the intervalIds Array.
 * @returns {number} The id of that interval.
 */
function setStoppableFunction(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}


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
  if (!document.fullscreenElement && !document.webkitFullscreenElement) return;
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
    "url('../img/3.Background/Mesa de trabajo 1.png')";
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

