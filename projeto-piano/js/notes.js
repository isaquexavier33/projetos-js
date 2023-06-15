import { playNote } from "./scripts.js"

const noteDown = (key) => {
  playNote(key.getAttribute("data-note"));

  if (key.className.includes("black")) {
    key.classList.add("black--pressed");
    return;
  }

  key.classList.add("white--pressed");
};

const noteUp = (key) => {
  if (key.className.includes("black")) {
    key.classList.remove("black--pressed");
    return;
  }

  key.classList.remove("white--pressed");
};

export { noteDown, noteUp };
