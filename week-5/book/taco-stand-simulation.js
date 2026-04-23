"use strict";

// taco-stand-simulation.js

console.log("The Taco Stand Manager starts his day.");

// An order comes in to prepare a taco
setTimeout(() => { console.log( "An employee prepared a taco. The order ticket is marked as complete and added to the receipt spindle."); }, 3000);

// Another order comes in to prepare a burrito
setTimeout(() => { console.log( "An employee prepared a burrito. The order ticket is marked as complete and added to the receipt spindle."); }, 2000);

// Yet another order comes in to prepare a quesadilla
setTimeout(() => { console.log( "An employee prepared a quesadilla. The order ticket is marked as complete and added to the receipt spindle."); }, 1000);

console.log("The Manager is busy with the current order. He will check the receipt spindle when he's done.");
