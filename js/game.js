let canvas;
let world;
let keyboard = new Keyboard();
const GAME_WIDTH = 720;
const GAME_HEIGHT = 480;
let intervalIds = [];
let i = 1;
let volumeOn = localStorage.getItem("volumeOn") === "true";
const allSounds = [];
const gameContainer = document.getElementById("game-zone");
const startScreen = document.querySelector(".start-screen-container");
let paused = false;

/**
 * Starts the game: hides the start screen, shows the game zone,
 * sets up the canvas, sound and level and creates the world.
 */
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

/**
 * Makes the settings buttons (fullscreen, volume, menu) visible.
 */
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

let masterVolume = parseFloat(localStorage.getItem("masterVolume") ?? "0.5");

/**
 * Sets the master volume, saves it in localStorage and applies it to all active sounds.
 * @param {number|string} amount - New volume between 0 and 1.
 */
function changeVolume(amount) {
  masterVolume = parseFloat(amount);
  localStorage.setItem("masterVolume", masterVolume);
  allSounds.forEach((sound) => {
    sound.volume = masterVolume;
  });
}

document.getElementById("help-btn").addEventListener("click", openMenu);
document.getElementById("settings-btn").addEventListener("click", openMenu);
document.getElementById("legal-btn").addEventListener("click", openMenu);

const closeMenuBtn = document.getElementById("close-menu-btn");
closeMenuBtn.addEventListener("click", closeMenu);
document.addEventListener("click", closeMenu);
const menuContainer = document.getElementById("menu-container");

/**
 * Closes the options overlay dialog.
 */
function closeInstructions() {
  document.getElementById("options-overlay").close();
}

/**
 * Pauses the game, opens the menu dialog and renders the instructions
 * if the click came from the help or settings button.
 * @param {MouseEvent} event - Click event of the opening button.
 */
function openMenu(event) {
  pauseGame();
  menuContainer.showModal();
  const clickedBtn = event.currentTarget;
  if (clickedBtn.id === "help-btn" || clickedBtn.id === "settings-btn") {
    renderInstructions();
  } else if (clickedBtn.id === "legal-btn"){
    renderImprint();
    }
  }


/**
 * Closes the menu dialog, but only if the click hit the backdrop
 * (the dialog itself) or the close button.
 * @param {MouseEvent} event - Click event.
 */
function closeMenu(event) {
  if (event.target !== menuContainer && event.target !== closeMenuBtn) return;
  menuContainer.close();
}

/**
 * Pauses the game and resets all keyboard states so no key stays "pressed".
 */
function pauseGame() {
  paused = true;
  Object.keys(keyboard).forEach((key) => (keyboard[key] = false));
}

menuContainer.addEventListener("close", resumeGame);

/**
 * Resumes the game after a pause.
 */
function resumeGame() {
  paused = false;
}

/**
 * Renders the controls and settings into the menu and syncs the button icons.
 */
function renderInstructions() {
  document.getElementById("menu-content").innerHTML = showInstructions();
  changeFullscreenBtn();
  changeVolumeBtn();
}

/**
 * Renders the imprint into the menu.
 */
function renderImprint() {
  document.getElementById("menu-content").innerHTML = showImprint();
}

/**
 * Renders the game story into the menu.
 */
function renderHistory() {
  document.getElementById("menu-content").innerHTML = showHistory();
}

/**
 * Sets an interval that only runs its callback while the game is not paused
 * and stores the interval id in the intervalIds array so stopGame() can clear it.
 * @param {Function} fn - Callback to execute on every tick.
 * @param {number} time - Interval time in milliseconds.
 */
function setStoppableFunction(fn, time) {
  let id = setInterval(() => {
    if (!paused) fn();
  }, time);
  intervalIds.push(id);
}

document
  .getElementById("fullscreen-btn")
  .addEventListener("click", toggleFullscreen);

/**
 * Toggles fullscreen mode for the main element.
 */
function toggleFullscreen() {
  if (document.fullscreenElement) exitFullscreen();
  else enterFullscreen(document.querySelector("main"));
}

/**
 * Changes the element into fullscreen modus (with vendor prefix fallbacks).
 * @param {HTMLElement} elem - Element that should go fullscreen.
 */
function enterFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

/**
 * Updates all fullscreen button icons to match the current fullscreen state.
 */
function changeFullscreenBtn() {
  const fullscreenBtns = document.querySelectorAll(".fullscreen-btn img");
  fullscreenBtns.forEach((img) => {
    img.src = document.fullscreenElement
      ? "./img/7.Buttons/fullscreen-exit.png"
      : "./img/7.Buttons/fullscreen.png";
  });
}

/**
 * Changes the element from fullscreen into normal modus.
 * Does nothing if the page is not in fullscreen.
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
 * Stops all interval functions that belong to the intervalIds array
 * and cancels the draw loop of the world.
 */
function stopGame() {
  intervalIds.forEach((id) => clearInterval(id));
  intervalIds = [];
  if (world) cancelAnimationFrame(world.animationId);
}

/**
 * Hides the game-over and win screens and removes the "game-ended" state from the body.
 */
function hideEndScreens() {
  ["game-over-screen", "win-screen"].forEach((id) => {
    const el = document.getElementById(id);
    el.classList.add("d-none");
    el.classList.remove("d-flex");
  });
  document.body.classList.remove("game-ended");
}

/**
 * Restarts the game: stops running loops, resets sound, end screens and level
 * and creates a new world.
 */
function restartGame() {
  stopGame();
  checkVolumeSettings();
  hideEndScreens();
  initLevel1();
  world = new World(canvas, keyboard);
}

/**
 * Ends the game and returns to the start screen.
 */
function endGame() {
  stopGame();
  stopAllSounds();
  hideEndScreens();
  exitFullscreen();
  hideGameZone();
  showStartScreen();
}

/**
 * Hides the game zone and the settings buttons and restores the landing page background.
 */
function hideGameZone() {
  document.body.classList.remove("playing");
  document.body.style.backgroundImage =
    "url('./img/3.Background/Mesa_de_trabajo_1.png')";
  const gameZone = document.getElementById("game-zone");
  gameZone.classList.add("d-none");
  gameZone.classList.remove("d-flex");
  document.querySelector(".settings").classList.add("d-none");
}

/**
 * Shows the start screen.
 */
function showStartScreen() {
  const startScreen = document.querySelector(".start-screen-container");
  startScreen.classList.remove("d-none");
  startScreen.classList.add("d-flex");
}

const backgroundmusic = new Audio(
  "./audio/AFRO014017_SUIKERBOSSIE_SONOTON.mp3",
);
backgroundmusic.loop = true;
backgroundmusic.volume = masterVolume;
allSounds.push(backgroundmusic);

/**
 * Reads the saved sound setting from localStorage, turns the sound on or off
 * accordingly and updates the volume button icons.
 */
function checkVolumeSettings() {
  const soundSetting = localStorage.getItem("volumeOn");
  soundSetting === "true" ? soundOn() : muteAll();
  changeVolumeBtn();
}

/**
 * Turns the sound on: plays all registered sounds and saves the setting.
 */
function soundOn() {
  allSounds.forEach((sound) => {
    playSafe(sound);
  });
  localStorage.setItem("volumeOn", "true");
  volumeOn = true;
}

/**
 * Plays a sound and ignores AbortError (play interrupted by pause()).
 * Other errors are logged to the console.
 * @param {HTMLAudioElement} sound - Sound to play.
 */
function playSafe(sound) {
  sound.play().catch((error) => {
    if (error.name !== "AbortError") console.error(error);
  });
}

/**
 * Pauses all sounds, resets all except the background music to the start
 * and removes all sounds from allSounds except the background music.
 */
function stopAllSounds() {
  allSounds.forEach((sound) => {
    sound.pause();
    if (sound !== backgroundmusic) sound.currentTime = 0;
  });
  allSounds.splice(0, allSounds.length, backgroundmusic);
}

/**
 * Mutes the game: stops all sounds and saves the setting.
 */
function muteAll() {
  stopAllSounds();
  localStorage.setItem("volumeOn", "false");
  volumeOn = false;
}

/**
 * Toggles sound on/off and updates the volume button icons.
 * @param {MouseEvent} event - Click event of the volume button (used to remove its focus).
 */
function toggleVolume(event) {
  event.target.closest("button")?.blur();
  volumeOn ? muteAll() : soundOn();
  changeVolumeBtn();
}

/**
 * Sets the icon of all volume buttons depending on the current volumeOn state.
 */
function changeVolumeBtn() {
  document.querySelectorAll(".img-volume").forEach((img) => {
    img.src = volumeOn
      ? "./img/7.Buttons/volume.png"
      : "./img/7.Buttons/volume-mute.png";
  });
}
