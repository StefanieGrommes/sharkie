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