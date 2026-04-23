/**
 * Author: Jonathan Cantu
 * Date:   April 22, 2026
 * File Name: pie.spec.js
 * Description: This file contains unit tests for the pie baking functionality. It uses Jest to test the behavior of the pie function.
 */

"use strict";

const pie = require("../src/pie");
const exit = jest.spyOn(process, 'exit').mockImplementation((code) => code);

describe("makePies", () => {
  let log;
  beforeEach(() => {
    log = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    log.mockRestore();
  });

  test("Make a Strawberry Rhubarb Pie", () => {
    pie.bakePie('strawberry rhubarb', ['flour', 'sugar', 'butter', 'strawberries', 'rhubarb']);
    expect(log).toHaveBeenCalledWith("Baking a delicious strawberry rhubarb pie with flour, sugar, butter, strawberries, rhubarb!");
  });

  test("Make a Apple Pie Missing a Essential Ingredient", () => {
    pie.bakePie('apple', ['flour', 'butter', 'apple puree']);
    expect(log).toHaveBeenCalledWith("Cannot bake apple pie. Missing essential ingredients.");
  });

  test("Make a Cherry Pie Missing a Key Ingredient", () => {
    pie.bakePie('cherry', ['flour', 'sugar', 'butter']);
    expect(log).toHaveBeenCalledWith("Cannot bake cherry pie. Missing key ingredients.");
  });

  test("Make a Pumpkin Pie", () => {
    pie.bakePie('pumpkin', ['flour', 'sugar', 'butter', 'pumpkin puree']);
    expect(log).toHaveBeenCalledWith("Baking a delicious pumpkin pie with flour, sugar, butter, pumpkin puree!");
  });

});
