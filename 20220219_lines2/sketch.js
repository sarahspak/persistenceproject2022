let segmentLength;
let x_1;
let y_1;
let x_2;
let y_2;
let previousHeading;
let heading;
function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log("window Width is " + windowWidth);
  console.log("windowHeight is " + windowHeight);
  noStroke();
  frameRate(1);
  segmentLength = 50;
  previousHeading = -1;
  x_1 = 0;
  y_1 = windowHeight / 2;
  x_2 = x_1;
  y_2 = y_1;
}

function draw() {
  stroke("black");
  strokeWeight(4);
  direction = Math.floor(randomNum(0, 3));
  // console.log(direction);
  // if 0, go straight
  // if 1, turn up
  // if 2, go down

  // first go straight
  line(x_1, y_1, x_1 + segmentLength, y_1);
  x_2 = x_1 + segmentLength;
  y_2 = y_1 + segmentLength;
  console.log(x_2);
  console.log(y_2);

  if (direction == 0) {
    console.log("going straight");
    line(x_2, y_2, x_2 + segmentLength, y_2);
  } else if (direction == 1) {
    console.log("going up");
    line(x_2, y_2, x_2, y_2 - segmentLength);
  } else if (direction == 2) {
    console.log("going down");
    line(x_2, y_2, x_2, y_2 + segmentLength);
  }
  console.log("complete");
  // line(x_1, y_2, x_2, y_2);
  // line(x_2, y_2, x_2, (y_2 + 100) * sin(90));
  // noLoop();
}

// You can make functions aswell
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}

function isDivideBy(number, a, b) {
  return number % a === 0 && number % b === 0;
}

let positionArray = [];
