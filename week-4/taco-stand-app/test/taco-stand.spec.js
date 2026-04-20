/**
 * Author: Jonathan Cantu
 * Date:   April 19, 2026
 * File Name: taco-stand.spec.js
 * Description: Tests for Assignment 4.2 Taco Stand Event Emitter.
 */

"use strict";

const assert = require("assert");
const TacoStandEmitter = require("../src/taco-stand");

function testServeCustomer() {
  try {
    const tacoStand = new TacoStandEmitter();
    let result = null;

    tacoStand.on("serve", (customer) => {
      result = customer;
    });

    tacoStand.serveCustomer("Alice");

    assert.strictEqual(result, "Alice");

    console.log("Passed testServeCustomer");
    return true;
  } catch (err) {
    console.error(`Failed testServeCustomer: ${err}`);
    return false;
  }
}

function testPrepareTaco() {
  try {
    const tacoStand = new TacoStandEmitter();
    let result = null;

    tacoStand.on("prepare", (taco) => {
      result = taco;
    });

    tacoStand.prepareTaco("beef");

    assert.strictEqual(result, "beef");

    console.log("Passed testPrepareTaco");
    return true;
  } catch (err) {
    console.error(`Failed testPrepareTaco: ${err}`);
    return false;
  }
}

function testHandleRush() {
  try {
    const tacoStand = new TacoStandEmitter();
    let result = null;

    tacoStand.on("rush", (rush) => {
      result = rush;
    });

    tacoStand.handleRush("Lunch Rush");

    assert.strictEqual(result, "Lunch Rush");

    console.log("Passed testHandleRush");
    return true;
  } catch (err) {
    console.error(`Failed testHandleRush: ${err}`);
    return false;
  }
}

// Run all tests
testServeCustomer();
testPrepareTaco();
testHandleRush();
