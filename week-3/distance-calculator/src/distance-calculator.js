"use strict";

/*

  Course: WEB340 – Node.js
  Professor: Richard Krasso
  Author: Jonathan Cantu
  Date: April 11, 2026

*/

// Initialize the Map with average planetary distances in AU (Astronomical Units)
const planetMap = new Map();

planetMap.set("Mercury", 0.39);
planetMap.set("Venus", 0.72);
planetMap.set("Earth", 1.00);
planetMap.set("Mars", 1.52);
planetMap.set("Jupiter", 5.20);
planetMap.set("Saturn", 9.58);
planetMap.set("Uranus", 19.22);
planetMap.set("Neptune", 30.05);

/**
  Function to calculate the average distance between two planets

    @param {string} planet1 - The name of the first planet (e.g., "Earth").
    @param {string} planet2 - The name of the second planet (e.g., "Mars").
    @returns {number} - The average distance in AU.
    @throws {Error} - If a planet name is not found.

*/
function calculateDistance(planet1, planet2) {
  // Convert input names to correct case to match Map keys
  const p1 = planet1.charAt(0).toUpperCase() + planet1.slice(1).toLowerCase();
  const p2 = planet2.charAt(0).toUpperCase() + planet2.slice(1).toLowerCase();

  // Check if both planets exist in the Map and throw specific errors.
  if (!planetMap.has(p1)) {
    console.error(`Error: Planet '${p1}' not found.`);
    throw new Error("Invalid planet name for planet 1.");
  }
  if (!planetMap.has(p2)) {
    console.error(`Error: Planet '${p2}' not found.`);
    throw new Error("Invalid planet name for planet 2.");
  }

  // Get the distances from the Sun for both planets
  const dist1 = planetMap.get(p1);
  const dist2 = planetMap.get(p2);

  // Calculate the difference. Use Math.abs() to always get a positive number.
  const distance = Math.abs(dist1 - dist2);

  console.log(`The average distance between ${p1} and ${p2} is ${distance} AU.`);

  return distance;
}

module.exports = { calculateDistance };
