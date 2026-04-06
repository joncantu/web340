/**
 * Author: Jonathan Cantu
 * Date:   April 5, 2026
 * File Name: recipes.js
 * Description: Recipe management functions
*/

let timer = 0;

// Define the createRecipe function
function createRecipe(ingredients) {
  return "Recipe created with ingredients: " + ingredients.flat().join(', ');
}

// Define the setTimer function
function setTimer(minutes) {
  timer = minutes;
  return "Timer set for " + minutes + " minutes";
}

// Define the quit function
function quit() {
  return "Program exited";
}

module.exports = { createRecipe, setTimer, quit };
