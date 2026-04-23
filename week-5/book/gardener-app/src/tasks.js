// src/tasks.js
"use strict";

function mowLawn() {
  process.nextTick(() => {
    console.log("Gardener: The lawn has been mowed.");
  });
}

function waterPlants() {
  process.nextTick(() => {
    console.log("Gardener: The plants have been watered.");
  });
}

function pruneTrees() {
  process.nextTick(() => {
    console.log("Gardener: The trees have been pruned.");
  });
}

module.exports = { mowLawn, waterPlants, pruneTrees };
