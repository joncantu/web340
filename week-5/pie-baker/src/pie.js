/**
 * Author: Jonathan Cantu
 * Date:   April 22, 2026
 * File Name: pie.js
 * Description: This file contains the functionality for baking pies.
 */
"use strict";

function bakePie(pieType, ingredients) {
  if (hasEssentialIngredients(ingredients)) {
    if (hasKeyIngredients(ingredients)) {
      console.log(`Baking a delicious ${pieType} pie with ${ingredients.join(", ")}!`);
    } else {
      console.log(`Cannot bake ${pieType} pie. Missing key ingredients.`);
    }
  } else {
    console.log(`Cannot bake ${pieType} pie. Missing essential ingredients.`);
    process.exit(1);
  }
}

function hasEssentialIngredients(ingredients) {
  const essentialIngredients = ["flour", "sugar", "butter"];
  return essentialIngredients.every(ingredient => ingredients.includes(ingredient));
}

function hasKeyIngredients(ingredients) {
  return ingredients.length > 3;
}

module.exports = { bakePie };
