let someConstant = 1000;
//The Axiom-Array, "F"
function setup() {
  createCanvas(windowWidth, windowHeight, P2D);
  background("white");
  stroke(0, 0, 0);

  angleMode(DEGREES);
  rect(0, 0, windowWidth, windowHeight);
  let c = color("#" + randomHexColor);
  fill(c);
  console.log("window width is " + windowWidth);
  console.log("window height is " + windowHeight);
}
// define a line that is the length of the "window"
function draw() {
  strokeWeight(2);

  let p1 = {
    x: random(windowWidth / 0.5, windowWidth - someConstant),
    y: random(windowHeight / 0.5, windowHeight - someConstant),
  };
  let p2 = {
    x: random(windowWidth / 0.2, windowWidth - someConstant),
    y: random(windowHeight / 0.2, windowHeight - someConstant),
  };
  let p3 = {
    x: random(windowWidth / 2, windowWidth - someConstant),
    y: random(windowHeight / 2, windowHeight - someConstant),
  };
  let p4 = {
    x: random(windowWidth / 2, windowWidth - someConstant),
    y: random(windowHeight / 2, windowHeight - someConstant),
  };
  // noFill();

  curve(p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  curve(p3.x, p3.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);

  curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);

  curve(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, p4.x, p4.y);
  curve(p4.x, p4.y, p1.x, p1.y, p4.x, p4.y, p4.x, p4.y);
  noLoop();
}

var randomHexColor = Math.floor(Math.random() * 16777215).toString(16);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
