import { keyDownMapper, keyUpMapper } from "./keyboard.js";
import { noteDown, noteUp } from "./notes.js";

const keys = document.querySelectorAll(".key");
const checkbox = document.querySelector(".checkbox__keys");
const switcher = document.querySelector(".switcher");
const keySection = document.querySelector(".piano__keys");

checkbox.addEventListener("change", ({ target }) => {
  switcher.classList.toggle("switcher--active");
  keySection.classList.toggle("disabled-keys");
});

// Manipulando Mouse

keys.forEach((key) => {
  key.addEventListener("mousedown", () => noteDown(key));
  key.addEventListener("mouseup", () => noteUp(key));
});


// Manipulando teclado

document.addEventListener("keydown", (event) => {
  event.preventDefault(); // O Tab não fica selecionando os troço da janela, e o f12 não abre mais o devtools
  keyDownMapper[event.key]();
});

document.addEventListener("keyup", (event) => {
  keyUpMapper[event.key]();
})

const playNote = (nota) => {
  const audio = new Audio(`../sounds/${nota}.wav`);
  audio.play();
};

export { keys, playNote };
