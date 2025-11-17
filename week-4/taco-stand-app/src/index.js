/**
 * Author: Will Southard
 * Date: November 16, 2025
 * File Name: index.js
 * Description: CLI program for Taco Stand EventEmitter
 */

"use strict";

const TacoStandEmitter = require("./taco-stand");

const tacoStand = new TacoStandEmitter();

// Set up event listeners
tacoStand.on("serve", (customer) => {
  console.log(`Taco Stand serves: ${customer}`);
});

tacoStand.on("prepare", (taco) => {
  console.log(`Taco Stand prepares: ${taco}`);
});

tacoStand.on("rush", (rush) => {
  console.log(`Taco Stand handles rush: ${rush}`);
});

// Handle command-line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("Error: Invalid command. Usage: node index.js <command> <argument>");
  console.error("Commands: serve, prepare, rush");
  process.exit(1);
}

const [command, ...commandArgs] = args;
const argument = commandArgs.join(" ");

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
  default:
    console.error(`Error: Invalid command "${command}". Valid commands are: serve, prepare, rush`);
    process.exit(1);
}
