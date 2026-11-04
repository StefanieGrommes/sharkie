let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (event) => {
    const keyCodeNumber = event.keyCode;
    switch (keyCodeNumber) {
    case 32: keyboard.SPACE = true;
    break;
    case 37: keyboard.LEFT = true;
    break;
    case 38: keyboard.UP = true;
    break;
    case 39: keyboard.RIGHT = true;
    break;
    }
});

window.addEventListener("keyup", (event) => {
    const keyCodeNumber = event.keyCode;
    switch (keyCodeNumber) {
    case 32: keyboard.SPACE = false;
    break;
    case 37: keyboard.LEFT = false;
    break;
    case 38: keyboard.UP = false;
    break;
    case 39: keyboard.RIGHT = false;
    break;
    }
});
