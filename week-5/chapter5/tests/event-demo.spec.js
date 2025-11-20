/**
 * Author: Will Southard
 * Date: November 20, 2025
 * File Name: event-demo.spec.js
 * Description: Unit tests for event-demo.js module
 *              Tests process events from Chapter 5
 */

"use strict";

const assert = require("assert");
const {
  setupBeforeExitListener,
  setupExitListener,
  setupUncaughtExceptionListener,
  setupUnhandledRejectionListener,
  removeAllListeners,
  getListenerCount,
} = require("../event-demo");

function testSetupBeforeExitListener() {
  try {
    let callbackFired = false;
    let exitCode = null;

    setupBeforeExitListener((code) => {
      callbackFired = true;
      exitCode = code;
    });

    const count = getListenerCount("beforeExit");
    assert(count > 0, "beforeExit listener should be registered");

    // Clean up
    removeAllListeners("beforeExit");

    console.log("Passed testSetupBeforeExitListener");
    return true;
  } catch (error) {
    console.log(`Failed testSetupBeforeExitListener: ${error.message}`);
    return false;
  }
}

function testSetupExitListener() {
  try {
    setupExitListener(() => {});

    const count = getListenerCount("exit");
    assert(count > 0, "exit listener should be registered");

    // Clean up
    removeAllListeners("exit");

    console.log("Passed testSetupExitListener");
    return true;
  } catch (error) {
    console.log(`Failed testSetupExitListener: ${error.message}`);
    return false;
  }
}

function testSetupUncaughtExceptionListener() {
  try {
    setupUncaughtExceptionListener(() => {});

    const count = getListenerCount("uncaughtException");
    assert(count > 0, "uncaughtException listener should be registered");

    // Clean up
    removeAllListeners("uncaughtException");

    console.log("Passed testSetupUncaughtExceptionListener");
    return true;
  } catch (error) {
    console.log(`Failed testSetupUncaughtExceptionListener: ${error.message}`);
    return false;
  }
}

function testSetupUnhandledRejectionListener() {
  try {
    setupUnhandledRejectionListener(() => {});

    const count = getListenerCount("unhandledRejection");
    assert(count > 0, "unhandledRejection listener should be registered");

    // Clean up
    removeAllListeners("unhandledRejection");

    console.log("Passed testSetupUnhandledRejectionListener");
    return true;
  } catch (error) {
    console.log(`Failed testSetupUnhandledRejectionListener: ${error.message}`);
    return false;
  }
}

function testRemoveAllListeners() {
  try {
    // Add multiple listeners
    setupBeforeExitListener(() => {});
    setupBeforeExitListener(() => {});

    const countBefore = getListenerCount("beforeExit");
    assert(countBefore >= 2, "should have at least 2 listeners");

    // Remove all
    removeAllListeners("beforeExit");

    const countAfter = getListenerCount("beforeExit");
    assert.strictEqual(countAfter, 0, "should have 0 listeners after removal");

    console.log("Passed testRemoveAllListeners");
    return true;
  } catch (error) {
    console.log(`Failed testRemoveAllListeners: ${error.message}`);
    return false;
  }
}

function testGetListenerCount() {
  try {
    // Start with clean state
    removeAllListeners("beforeExit");

    const initialCount = getListenerCount("beforeExit");
    assert.strictEqual(initialCount, 0, "initial count should be 0");

    // Add a listener
    setupBeforeExitListener(() => {});
    const countAfterAdd = getListenerCount("beforeExit");
    assert.strictEqual(countAfterAdd, 1, "count should be 1 after adding listener");

    // Clean up
    removeAllListeners("beforeExit");

    console.log("Passed testGetListenerCount");
    return true;
  } catch (error) {
    console.log(`Failed testGetListenerCount: ${error.message}`);
    return false;
  }
}

function runTests() {
  console.log("\nRunning Event Demo Tests...\n");

  const results = [
    testSetupBeforeExitListener(),
    testSetupExitListener(),
    testSetupUncaughtExceptionListener(),
    testSetupUnhandledRejectionListener(),
    testRemoveAllListeners(),
    testGetListenerCount(),
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
  const allPassed = runTests();
  process.exit(allPassed ? 0 : 1);
}

module.exports = {
  testSetupBeforeExitListener,
  testSetupExitListener,
  testSetupUncaughtExceptionListener,
  testSetupUnhandledRejectionListener,
  testRemoveAllListeners,
  testGetListenerCount,
  runTests,
};

