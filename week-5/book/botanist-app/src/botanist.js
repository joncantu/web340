// src/botanist.js
"use strict";

function favoritePlant() {
  const plant = process.env.FAVORITE_PLANT || "Sunflower";
  console.log(`The botanist's favorite plant is ${plant}!`);
}

module.exports = { favoritePlant };
