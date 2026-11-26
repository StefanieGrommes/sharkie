/**
 * Maps lowercase event.key values to the property names of the keyboard object.
 * @type {Object<string, string>}
 */
const KEY_MAP = {
  " ": "SPACE",
  arrowleft: "LEFT",
  arrowup: "UP",
  arrowdown: "DOWN",
  arrowright: "RIGHT",
  b: "B",
  f: "F",
};

/**
 * Maps the IDs of the mobile buttons to the property names of the keyboard object.
 * @type {Object<string, string>}
 */
const TOUCH_BUTTONS = {
  "btn-left": "LEFT",
  "btn-right": "RIGHT",
  "btn-up": "UP",
  "btn-down": "DOWN",
  "btn-b": "B",
  "btn-f": "F",
  "btn-space": "SPACE",
};

window.addEventListener("keydown", (event) => setKeyState(event, true));
window.addEventListener("keyup", (event) => setKeyState(event, false));

/**
 * Sets the keyboard state for a pressed or released key.
 * Keys that are not in KEY_MAP are ignored.
 * @param {KeyboardEvent} event - The keydown or keyup event.
 * @param {boolean} isPressed - true on keydown, false on keyup.
 */
function setKeyState(event, isPressed) {
  const name = KEY_MAP[event.key.toLowerCase()];
  if (name) keyboard[name] = isPressed;
}

/**
 * Sets the keyboard state for a touched mobile button
 * and prevents the default touch behavior (scrolling, zooming, emulated mouse events).
 * @param {TouchEvent} event - The touch event.
 * @param {string} name - Property name of the keyboard object (e.g. "LEFT").
 * @param {boolean} isPressed - true on touchstart, false on touchend/touchcancel.
 */
function setTouchState(event, name, isPressed) {
  event.preventDefault();
  keyboard[name] = isPressed;
}

/**
 * Registers the touch listeners for one mobile button.
 * @param {string} id - ID of the button element.
 * @param {string} name - Property name of the keyboard object (e.g. "LEFT").
 */
function addTouchListeners(id, name) {
  const btn = document.getElementById(id);
  btn.addEventListener("touchstart", (event) =>
    setTouchState(event, name, true),
  );
  ["touchend", "touchcancel"].forEach((type) => {
    btn.addEventListener(type, (event) => setTouchState(event, name, false));
  });
}

Object.entries(TOUCH_BUTTONS).forEach(([id, name]) =>
  addTouchListeners(id, name),
);

/**
 * Sets the keyboard state for a touched mobile button, prevents the default
 * touch behavior (scrolling, zooming, emulated mouse events) and toggles the
 * "pressed" class on the button so it shows the pressed look.
 * @param {TouchEvent} event - The touchstart, touchend or touchcancel event.
 * @param {string} name - Property name of the keyboard object (e.g. "LEFT").
 * @param {boolean} isPressed - true on touchstart, false on touchend/touchcancel.
 */
function setTouchState(event, name, isPressed) {
  event.preventDefault();
  keyboard[name] = isPressed;
  event.currentTarget.classList.toggle("pressed", isPressed);
}
