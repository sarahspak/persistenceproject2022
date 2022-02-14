let canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.strokeStyle = "orange";
context.lineWidth = (Math.random() + 1) * 4;
let gap = (Math.random() + 1) * 25;
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    let width = 60;
    let height = 60;
    let x = 100 + (width + gap) * i;
    let y = 100 + (width + gap) * j;
    context.beginPath();
    context.rect(x, y, width, height);
    context.stroke();
    if (Math.random() > 0.5) {
      context.beginPath();
      context.rect(x + 8, y + 8, width - 16, height - 16);
      context.stroke();
    }
    if (Math.random() > 0.5) {
      context.beginPath();
      context.rect(x + 16, y + 16, width - 32, height - 32);
      context.stroke();
    }
  }
}
