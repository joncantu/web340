// test/tasks.spec.js

"use strict";

const tasks = require("../src/tasks");

test("Gardener waters the plants", done => {
  const log = jest.spyOn(console, 'log');
  tasks.waterPlants();
  process.nextTick(() => {
    expect(log).toHaveBeenCalledWith('Gardener: The plants have been watered.');
    log.mockRestore();
    done();
  });
});

test("Gardener prunes the trees", done => {
  const log = jest.spyOn(console, 'log');
  tasks.pruneTrees();
  setTimeout(() => {
    expect(log).toHaveBeenCalledWith("Gardener: The trees have been pruned.");
    log.mockRestore();
    done();
  }, 1000);
});

test("Gardener mows the lawn", done => {
  const log = jest.spyOn(console, 'log');
  tasks.mowLawn();
  setTimeout(() => {
    expect(log).toHaveBeenCalledWith("Gardener: The lawn has been mowed.");
    log.mockRestore();
    done();
  }, 2000);
});
