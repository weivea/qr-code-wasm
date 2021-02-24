import { QR, Cell } from "qr-code-wasm";
import { memory } from "qr-code-wasm/qr_code_wasm_bg.wasm";

let qr = QR.new("Hello");
let width = qr.width();
const cellsPtr = qr.cells(); // < universe's cells
const cells = new Uint8Array(memory.buffer, cellsPtr, width * width);

let outStr = "";
for (let row = 0; row < width; row++) {
  for (let col = 0; col < width; col++) {
    let index = row * width + col;
    let cell = cells[index] == Cell.Alive ? "◼" : " ";
    outStr += cell;
  }
  outStr += "\n";
}

console.log(outStr);
document.querySelector("#qr").innerText = outStr;

// canvas
const CELL_SIZE = 5; // px
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";
const canvas = document.getElementById("qr-canvas");
canvas.height = CELL_SIZE * width;
canvas.width = CELL_SIZE * width;

const ctx = canvas.getContext("2d");

ctx.beginPath();

for (let row = 0; row < width; row++) {
  for (let col = 0; col < width; col++) {
    let idx = row * width + col;
    ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;

    ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
}

ctx.stroke();

