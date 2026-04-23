// test/botanist.spec.js
"use strict";

const botanist = require("../src/botanist");

describe("favoritePlant", () => {
  let log;
  beforeEach(() => {
    log = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    log.mockRestore();
  });

  test("uses favorite plant from environment variable", () => {
    process.env.FAVORITE_PLANT = "Rose";
    botanist.favoritePlant();
    expect(log).toHaveBeenCalledWith("The botanist's favorite plant is Rose!");
  });

  test("uses default favorite plant if environment variable is not set", () => {
    delete process.env.FAVORITE_PLANT;
    botanist.favoritePlant();
    expect(log).toHaveBeenCalledWith("The botanist's favorite plant is Sunflower!");
  });

});
