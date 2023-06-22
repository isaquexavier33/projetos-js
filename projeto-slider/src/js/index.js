const radio = document.querySelector(".manual-btn");
let currentSlide = 1;

document.getElementById("radio1").checked = true;

setInterval(() => {
  nextSlide();
}, 1800);

function nextSlide() {
  currentSlide++;

  if (currentSlide > 4) currentSlide = 1;

  document.getElementById("radio" + currentSlide).checked = true;
}
