import * as tome from "chromotome";
import seedrandom from "seed-random";
import chroma from "chroma-js";

import create_ui from "./ui";
import { get_symmetry } from "./symmetries";
import { create_explorer } from "./explorer";

const canvas_width = 1200;
const canvas_height = 1200;

function setup() {
  createCanvas(windowWidth, windowHeight, P2D);
  background("white");
  stroke(0, 255, 0);
  strokeWeight(1);
}

function draw() {
  stroke("blue");
  strokeWeight(1);
  noFill();
  drawCircle(windowWidth / 2, windowHeight / 2, windowHeight);
  noLoop();
}

function drawCircle(x, y, radius) {
  ellipse(x, y, radius, radius);
  if (radius > 2) {
    radius *= (Math.random() + 0.1) * 8;
    drawCircle(x, y, radius);
  }
}
