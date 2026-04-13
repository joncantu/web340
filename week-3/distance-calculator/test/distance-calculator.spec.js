"use strict";

/*

  Course: WEB340 – Node.js
  Professor: Richard Krasso
  Author: Jonathan Cantu
  Date: April 11, 2026

*/

const { calculateDistance } = require('../src/distance-calculator');

test("Bad Planet Name 1 Test", () => {
  expect(() => calculateDistance("Bloomy", "Mars")).toThrow("Invalid planet name for planet 1.");
});

test("Bad Planet Name 2 Test", () => {
  expect(() => calculateDistance("Earth", "Moon")).toThrow("Invalid planet name for planet 2.");
});

test("Earth to Mars Test", () => {
  const distance = calculateDistance("Earth", "Mars");
  expect(distance).toBe(0.52);
});

test("Mars to Earth Test", () => {
  const distance = calculateDistance("Mars", "Earth");
  expect(distance).toBe(0.52);
});

test("Venus to Jupiter Mixed Case Test", () => {
  const distance = calculateDistance("veNuS", "jUPitEr");
  expect(distance).toBe(4.48);
});
