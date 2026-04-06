/**
 * Author: Jonathan Cantu
 * Date:   April 5, 2026
 * File Name: index.js
 * Description: Application entry point for Recipe application
*/

let recipes;
try {
  recipes = require("./recipes");
} catch (error) {
  console.error("Failed to import module. Make sure you have exported your module correctly.");
  process.exit(1);
}

function main() {
  console.log(recipes.createRecipe(["flour", "sugar", "eggs"]));
  console.log(recipes.setTimer(30));
  console.log(recipes.quit());
}

main();
