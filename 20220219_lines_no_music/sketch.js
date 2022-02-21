let segmentLength;
let x1;
let y1;
let prevHeading = 0;

let x1B;
let y1B;
let prevHeadingB = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(windowWidth);
  console.log(windowHeight);

  noStroke();
  startX = randomNum(1, windowWidth - 100);
  startY = randomNum(1, windowHeight - 100);
  segmentLength = 5;
  x1 = segmentLength;
  y1 = windowHeight / 2;
  x1B = segmentLength;
  y1B = windowHeight / 2;
}
let colorConst = 80;
function getEdgyColor() {
  return [
    color(colorConst, random(colorConst, 255), 200, 200),
    color(random(colorConst, 255), 200, random(colorConst, 255), 200),
    color(200, random(colorConst, 255), random(colorConst, 255), 200),
  ][randomNum(0, 3)];
}

let colorRectClearCount = 0;
let shouldClear = true;

function draw() {
  const T = 10;
  if (frameCount % T === 0) {
  }

  stroke("black");
  strokeWeight(4);

  // decide whether to turn right or left
  let heading = prevHeading;
  if (random() > 0.1) {
    heading = 0;
    if (random() > 0.1) {
      //   if (random() < 0.1) {
      heading = 1;
      // } else {
      // heading = 2;
    }
    // }
  }
  let x2 = x1;
  let y2 = y1;
  if (heading == 1 && prevHeading !== 2) {
    y2 = y1 + segmentLength;
  } else if (heading == 2 && prevHeading !== 1) {
    y2 = y1 - segmentLength;
  } else {
    heading = 0;
    x2 = x1 + segmentLength;
  }
  line(x1, y1, x2, y2);
  line(windowWidth - x1, y1, windowWidth - x2, y2);
  line(x1, windowHeight - y1, x2, windowHeight - y2);
  line(
    windowWidth - x1,
    windowHeight - y1,
    windowWidth - x2,
    windowHeight - y2
  );
  x1 = x2;
  y1 = y2;

  if (x1 > windowWidth / 2) {
    shouldClear = true;
    x1 = 0;
  }
  if (y1 < 0) {
    // shouldClear = true;
    y1 = windowHeight / 2;
  }
  if (y1 > windowHeight / 2) {
    // shouldClear = true;
    y1 = 0;
  }
  if (heading !== prevHeading) {
    if (heading === 0) {
    }
    if (heading === 1) {
    }
    if (heading === 2) {
    }
  }
  prevHeading = heading;
  // second line
  {
    let headingB = prevHeadingB;
    if (random() < 0.4) {
      headingB = 0;
      if (random() > 0.5) {
        if (random() < 0.1) {
          headingB = 1;
        } else {
          headingB = 2;
        }
      }
    }
    let x2 = x1B;
    let y2 = y1B;
    if (headingB == 1 && prevHeadingB !== 2) {
      y2 = y1B + segmentLength;
    } else if (headingB == 2 && prevHeadingB !== 1) {
      y2 = y1B - segmentLength;
    } else {
      headingB = 0;
      x2 = x1B + segmentLength;
    }
    line(x1B, y1B, x2, y2);
    line(windowWidth - x1B, y1B, windowWidth - x2, y2);
    line(x1B, windowHeight - y1B, x2, windowHeight - y2);
    line(
      windowWidth - x1B,
      windowHeight - y1B,
      windowWidth - x2,
      windowHeight - y2
    );
    x1B = x2;
    y1B = y2;

    if (x1B > windowWidth / 2) {
      shouldClear = true;
      x1B = 0;
    }
    if (y1B < 0) {
      // shouldClear = true;
      y1B = windowHeight / 2;
    }
    if (y1B > windowHeight / 2) {
      // shouldClear = true;
      y1B = 0;
    }
    if (headingB !== prevHeadingB) {
      if (headingB === 0) {
      }
      if (headingB === 1) {
      }
      if (headingB === 2) {
      }
    }
    prevHeadingB = headingB;
  }
}

// You can make functions aswell
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}

function isDivideBy(number, a, b) {
  return number % a === 0 && number % b === 0;
}

let positionArray = [];
