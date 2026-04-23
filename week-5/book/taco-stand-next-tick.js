// Filename: taco-stand-next-tick.js
"use strict";

console.log("The Taco Stand Manager starts his day.");

function tacoOrder() {
  setTimeout(() => {
    console.log("An employee prepared a taco. The order ticket is marked as complete and added to the receipt spindle.");
  }, 2000);
}

function burritoOrder() {
  process.nextTick(() => {
    console.log("An employee prepared a burrito. The order ticket is marked as complete and added to the receipt spindle.");
  });
}

function quesadillaOrder() {
  setTimeout(() => {
    console.log("An employee prepared a quesadilla. The order ticket is marked as complete and added to the receipt spindle.");
  }, 1000);
}

console.log("The Manager is busy with the current order. He will check the receipt spindle when he's done.");

tacoOrder();
burritoOrder();
quesadillaOrder();

