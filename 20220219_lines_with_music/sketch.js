let r = 1;
let g = 1;
let b = 1;

let startX;
let startY;
let segmentLength;
let x1;
let y1;
let prevHeading = 0;

let osc, playing, freq, amp;
let reverb;
let osc2;

let bass;

let x1B;
let y1B;
let prevHeadingB = 0;
let oscB;

const oscFreq = 440;
const oscBFreq = 550;
const osc2Freq = 660;

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(windowWidth);
  console.log(windowHeight);
  background(color("#D2B48C"));
  // frameRate(200);
  noStroke();
  // rectMode(CENTER);
  // createFibers();
  startX = randomNum(1, windowWidth - 100);
  startY = randomNum(1, windowHeight - 100);
  segmentLength = 5;
  x1 = segmentLength;
  y1 = windowHeight / 2;
  x1B = segmentLength;
  y1B = windowHeight / 2;

  osc = new p5.Oscillator("sine");
  osc.freq(oscFreq);
  osc.amp(0);

  oscB = new p5.Oscillator("sine");
  oscB.freq(oscBFreq);
  oscB.amp(0);

  osc2 = new p5.Oscillator("sine");
  osc2.freq(osc2Freq);
  osc2.amp(0.3);
  osc2.start();

  bass = new p5.Oscillator("sawtooth");
  bass.freq(55);
  bass.amp(0);
  bass.start();

  constantTone = new p5.Oscillator("sawtooth");
  constantTone.freq(55);
  constantTone.amp(0);
  constantTone.start();

  reverb = new p5.Reverb();
  reverb.process(osc, 10, 0);
  reverb.process(osc2, 10, 0);
  reverb.process(oscB, 10, 0);
  reverb.process(bass, 10, 0);

  reverb.drywet(random(0, 1));

  osc.start();
  oscB.start();
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
    constantTone.amp(1);
    constantTone.amp(0, 0.5, 0.1);
  }
  const phase = (frameCount / T) | 0;
  stroke(255, 50);
  line(windowWidth / 2, 0, windowWidth / 2, windowHeight);
  line(0, windowHeight / 2, windowWidth, windowHeight / 2);

  stroke(0);
  if (phase % 4 === 0) {
    line(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight / 2);
  } else if (phase % 4 === 1) {
    line(windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight);
  } else if (phase % 4 === 2) {
    line(windowWidth / 2, windowHeight / 2, 0, windowHeight / 2);
  } else {
    line(windowWidth / 2, windowHeight / 2, windowWidth / 2, 0);
  }

  if (shouldClear) {
    if (random() < 0.8) {
      bass.freq(55 * 1.5 ** randomNum(0, 4));
    } else {
      bass.freq((55 * 15) / 8);
    }
    bass.amp(1);
    bass.amp(0, 0.5, 0.1);
    shouldClear = false;
    colorRectClearCount++;
    noStroke();
    if (true || colorRectClearCount % 4 === 0) {
      fill(getEdgyColor());
      rect(0, 0, windowWidth / 2, windowHeight / 2);
      fill(getEdgyColor());
      rect(windowWidth / 2, 0, windowWidth / 2, windowHeight / 2);

      fill(getEdgyColor());
      rect(0, windowHeight / 2, windowWidth / 2, windowHeight / 2);
      fill(getEdgyColor());
      rect(
        windowWidth / 2,
        windowHeight / 2,
        windowWidth / 2,
        windowHeight / 2
      );
    } else if (colorRectClearCount % 2 === 0) {
      fill(getEdgyColor());
      rect(0, 0, windowWidth / 2, windowHeight);
      fill(getEdgyColor());
      rect(windowWidth / 2, 0, windowWidth / 2, windowHeight);
    } else {
      fill(getEdgyColor());
      rect(0, 0, windowWidth, windowHeight / 2);
      fill(getEdgyColor());
      rect(0, windowHeight / 2, windowWidth, windowHeight / 2);
    }
  }
  stroke("black");
  strokeWeight(4);

  // decide whether to turn right or left
  let heading = prevHeading;
  if (random() < 0.1) {
    heading = 0;
    if (random() > 0.5) {
      if (random() < 0.1) {
        heading = 1;
      } else {
        heading = 2;
      }
    }
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
    osc.amp(1, 0);
    osc.amp(0.05, 1, 0.001);

    const glide = 0.016;
    if (heading === 0) {
      osc.freq(oscFreq, glide);
    }
    if (heading === 1) {
      osc.freq(oscFreq / 1.5, glide);
    }
    if (heading === 2) {
      osc.freq(oscFreq * 1.5, glide);
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
      oscB.amp(1, 0);
      oscB.amp(0.05, 1, 0.001);

      const glide = 0.016;
      if (headingB === 0) {
        oscB.freq(oscBFreq, glide);
      }
      if (headingB === 1) {
        oscB.freq(oscBFreq / 1.5, glide);
      }
      if (headingB === 2) {
        oscB.freq(oscBFreq * 1.5, glide);
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

function randomColor() {
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
  return [r, g, b];
}

hex_codes = ["#D2B48C", "#EBCCAB", "#C37C4D"];

function createFibers() {
  let numFibers = 3000;
  for (let i = 0; i < numFibers; i++) {
    let x1 = random() * width;
    let y1 = random() * height;
    let theta = random() * 2 * Math.PI;
    let segmentLength = random() * 5 + 2;
    let x2 = cos(theta) * segmentLength + x1;
    let y2 = sin(theta) * segmentLength + y1;
    let randomPick = Math.floor(random(0, 3));

    let colorCircle = hex_codes[randomPick];
    let c = color(colorCircle);
    stroke(c);

    stroke(15, 10 - random() * 5, 100 - random() * 8, random() * 10 + 75);
    line(x1, y1, x2, y2);
  }
  console.log("created fibers");
}

let positionArray = [];
