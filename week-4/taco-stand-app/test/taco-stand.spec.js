/**
 * Author: Will Southard
 * Date: November 16, 2025
 * File Name: taco-stand.spec.js
 * Description: Unit tests for TacoStandEmitter class
 */

"use strict";

const assert = require("assert");
const TacoStandEmitter = require("../src/taco-stand");

function testServeCustomer() {
  try {
    const tacoStand = new TacoStandEmitter();
    let receivedCustomer = null;

    tacoStand.on("serve", (customer) => {
      receivedCustomer = customer;
    });

    tacoStand.serveCustomer("John");
    assert.strictEqual(receivedCustomer, "John", "serve event should pass customer argument");
    console.log("Passed testServeCustomer");
    return true;
  } catch (error) {
    console.log(`Failed testServeCustomer: ${error.message}`);
    return false;
  }
}

function testPrepareTaco() {
  try {
    const tacoStand = new TacoStandEmitter();
    let receivedTaco = null;

    tacoStand.on("prepare", (taco) => {
      receivedTaco = taco;
    });

    tacoStand.prepareTaco("Carne Asada");
    assert.strictEqual(receivedTaco, "Carne Asada", "prepare event should pass taco argument");
    console.log("Passed testPrepareTaco");
    return true;
  } catch (error) {
    console.log(`Failed testPrepareTaco: ${error.message}`);
    return false;
  }
}

function testHandleRush() {
  try {
    const tacoStand = new TacoStandEmitter();
    let receivedRush = null;

    tacoStand.on("rush", (rush) => {
      receivedRush = rush;
    });

    tacoStand.handleRush("Lunch Rush");
    assert.strictEqual(receivedRush, "Lunch Rush", "rush event should pass rush argument");
    console.log("Passed testHandleRush");
    return true;
  } catch (error) {
    console.log(`Failed testHandleRush: ${error.message}`);
    return false;
  }
}

function runTests() {
  console.log("\nRunning Taco Stand EventEmitter Tests...\n");
  
  const results = [
    testServeCustomer(),
    testPrepareTaco(),
    testHandleRush()
  ];

  const passed = results.filter(result => result === true).length;
  const total = results.length;

  console.log(`\n--- Test Summary ---`);
  console.log(`Passed: ${passed}/${total}`);
  console.log(`Failed: ${total - passed}/${total}\n`);

  return passed === total;
}

// Run tests if this file is executed directly
if (require.main === module) {
  const allPassed = runTests();
  process.exit(allPassed ? 0 : 1);
}

module.exports = { testServeCustomer, testPrepareTaco, testHandleRush, runTests };
