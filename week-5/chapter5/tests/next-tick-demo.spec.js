/**
 * Author: Will Southard
 * Date: November 20, 2025
 * File Name: next-tick-demo.spec.js
 * Description: Unit tests for next-tick-demo.js module
 *              Tests process.nextTick vs setImmediate from Chapter 5
 */

"use strict";

const assert = require("assert");
const {
  demonstrateExecutionOrder,
  demonstrateNextTickInCallback,
  demonstrateSetImmediateInCallback,
  getExecutionOrderPromise,
} = require("../next-tick-demo");

function testDemonstrateExecutionOrder() {
  try {
    const order = demonstrateExecutionOrder();
    assert(Array.isArray(order), "should return an array");
    assert(order.length > 0, "order array should not be empty");
    // The synchronous code should be first
    assert(order[0].includes("Synchronous"), "first item should be synchronous");
    console.log("Passed testDemonstrateExecutionOrder");
    return true;
  } catch (error) {
    console.log(`Failed testDemonstrateExecutionOrder: ${error.message}`);
    return false;
  }
}

function testDemonstrateNextTickInCallback() {
  try {
    return new Promise((resolve) => {
      let callbackFired = false;
      let callbackMessage = null;

      demonstrateNextTickInCallback((message) => {
        callbackFired = true;
        callbackMessage = message;
      });

      // process.nextTick should execute before this setTimeout
      setTimeout(() => {
        try {
          assert(callbackFired, "callback should have fired");
          assert.strictEqual(callbackMessage, "process.nextTick callback executed", "message should match");
          console.log("Passed testDemonstrateNextTickInCallback");
          resolve(true);
        } catch (error) {
          console.log(`Failed testDemonstrateNextTickInCallback: ${error.message}`);
          resolve(false);
        }
      }, 10);
    });
  } catch (error) {
    console.log(`Failed testDemonstrateNextTickInCallback: ${error.message}`);
    return Promise.resolve(false);
  }
}

function testDemonstrateSetImmediateInCallback() {
  try {
    return new Promise((resolve) => {
      let callbackFired = false;
      let callbackMessage = null;

      demonstrateSetImmediateInCallback((message) => {
        callbackFired = true;
        callbackMessage = message;
      });

      // setImmediate should execute in the check phase
      setTimeout(() => {
        try {
          assert(callbackFired, "callback should have fired");
          assert.strictEqual(callbackMessage, "setImmediate callback executed", "message should match");
          console.log("Passed testDemonstrateSetImmediateInCallback");
          resolve(true);
        } catch (error) {
          console.log(`Failed testDemonstrateSetImmediateInCallback: ${error.message}`);
          resolve(false);
        }
      }, 10);
    });
  } catch (error) {
    console.log(`Failed testDemonstrateSetImmediateInCallback: ${error.message}`);
    return Promise.resolve(false);
  }
}

function testGetExecutionOrderPromise() {
  try {
    return getExecutionOrderPromise().then((order) => {
      assert(Array.isArray(order), "should return an array");
      assert(order.length >= 3, "order should have at least 3 items");

      // Find indices of each execution type
      const syncStartIndex = order.indexOf("sync-start");
      const syncEndIndex = order.indexOf("sync-end");
      const nextTickIndex = order.indexOf("nextTick");
      const setImmediateIndex = order.indexOf("setImmediate");

      // Synchronous code should be first
      assert(syncStartIndex === 0, "sync-start should be first");
      assert(syncEndIndex > syncStartIndex, "sync-end should be after sync-start");

      // process.nextTick should execute before setImmediate
      // This is the key requirement from Chapter 5
      assert(nextTickIndex !== -1, "nextTick should be in the order");
      assert(setImmediateIndex !== -1, "setImmediate should be in the order");
      assert(nextTickIndex < setImmediateIndex, "nextTick should execute before setImmediate");

      console.log("Passed testGetExecutionOrderPromise");
      return true;
    });
  } catch (error) {
    console.log(`Failed testGetExecutionOrderPromise: ${error.message}`);
    return Promise.resolve(false);
  }
}

async function runTests() {
  console.log("\nRunning Next Tick Demo Tests...\n");

  const results = [
    testDemonstrateExecutionOrder(),
    await testDemonstrateNextTickInCallback(),
    await testDemonstrateSetImmediateInCallback(),
    await testGetExecutionOrderPromise(),
  ];

  const passed = results.filter((result) => result === true).length;
  const total = results.length;

  console.log(`\n--- Test Summary ---`);
  console.log(`Passed: ${passed}/${total}`);
  console.log(`Failed: ${total - passed}/${total}\n`);

  return passed === total;
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().then((allPassed) => {
    process.exit(allPassed ? 0 : 1);
  });
}

module.exports = {
  testDemonstrateExecutionOrder,
  testDemonstrateNextTickInCallback,
  testDemonstrateSetImmediateInCallback,
  testGetExecutionOrderPromise,
  runTests,
};

