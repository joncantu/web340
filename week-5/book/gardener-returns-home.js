// file name: gardener-returns-home.js

"use strict";

let gardener = {
  name: "Art Moze",
  location: "Rose Garden"
};

function returnToHouse() {
  console.log(`${gardener.name} has finished tending to the ${gardener.location}.`);
  process.exit();
}

process.on("exit", () => {
  console.log(`${gardener.name} has returned to the house. Good job, Art!`);
});

setTimeout(returnToHouse, 2000);

