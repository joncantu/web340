/**
 * Author: Jonathan Cantu
 * Date:   April 19, 2026
 * File Name: index.js
 * Description: Main application file for Assignment 4.2 Taco Stand Event Emitter.
 */

"use strict";

const readline = require("readline");
const TacoStandEmitter = require("./taco-stand");

const tacoStand = new TacoStandEmitter();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

tacoStand.on("serve", (customer) => {
  console.log(`Taco Stand serves customer: ${customer}`);
});

tacoStand.on("prepare", (taco) => {
  console.log(`Taco Stand prepares: ${taco} taco`);
});

tacoStand.on("rush", (rush) => {
  console.log(`Taco Stand handles rush: ${rush}`);
});

rl.on("close", () => {
  console.log("Taco Stand closing.");
  process.exit(0);
});

// Command-line handling
rl.on("line", (input) => {
  const [command, ...args] = input.trim().split(" ");
  const argument = args.join(" ");

  if (!argument && ["serve", "prepare", "rush"].includes(command)) {
    console.log("Please provide an argument.");
    return;
  }

  switch (command) {
    case "serve":
      tacoStand.serveCustomer(argument);
      break;

    case "prepare":
      tacoStand.prepareTaco(argument);
      break;

    case "rush":
      tacoStand.handleRush(argument);
      break;

    case "q":
    case "bye":
    case "quit":
    case "exit":
      console.log("Exiting Taco Stand application. Goodbye!");
      rl.close();
      break;

    default:
      console.log("Invalid command. Use: serve, prepare, or rush. Or to exit, bye, quit, or q to close Taco Stand.");
  }
});

console.log(`Enter a command: serve, prepare, or rush followed by an argument.`);
