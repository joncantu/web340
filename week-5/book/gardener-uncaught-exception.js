// gardener-uncaught-exception.js
"use strict";

let gardener = {
  name: "Art Moze",
  location: "Rose Garden",
};

function returnToHouse() {
  console.log(`${gardener.name} has finished tending to the ${gardener.location}.`);
  nonExistentFunction();
}

process.on("uncaughtException", (err) => {
  console.log(`An error occurred: ${err.message}`);
  console.log(`${gardener.name} will return to the house to recover`);
  process.exit(1);
});

setTimeout(returnToHouse, 2000);

