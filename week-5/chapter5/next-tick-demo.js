/**
 * Author: Will Southard
 * Date: November 20, 2025
 * File Name: next-tick-demo.js
 * Description: Demonstrates process.nextTick vs setImmediate from Chapter 5
 *              Shows execution order: process.nextTick runs before setImmediate
 *              Chapter 5: process.nextTick callbacks are executed in the current phase
 *              before moving to the next phase, while setImmediate runs in the check phase
 */

"use strict";

/**
 * Demonstrates the execution order of process.nextTick vs setImmediate
 * Chapter 5: process.nextTick has higher priority and runs before setImmediate
 * Execution order: synchronous code -> process.nextTick -> setImmediate -> setTimeout
 */
function demonstrateExecutionOrder() {
  const executionOrder = [];

  // Synchronous code executes first
  executionOrder.push("1. Synchronous");

  // setImmediate schedules callback for the check phase
  setImmediate(() => {
    executionOrder.push("4. setImmediate");
    console.log("setImmediate executed");
  });

  // process.nextTick schedules callback for the next tick (current phase)
  process.nextTick(() => {
    executionOrder.push("2. process.nextTick");
    console.log("process.nextTick executed");
  });

  // setTimeout schedules callback for the timers phase
  setTimeout(() => {
    executionOrder.push("3. setTimeout");
    console.log("setTimeout executed");
  }, 0);

  // More synchronous code
  executionOrder.push("1. Synchronous (continued)");

  return executionOrder;
}

/**
 * Demonstrates process.nextTick in a callback
 * Chapter 5: process.nextTick callbacks are processed before any other asynchronous callbacks
 */
function demonstrateNextTickInCallback(callback) {
  process.nextTick(() => {
    if (callback) {
      callback("process.nextTick callback executed");
    }
  });
}

/**
 * Demonstrates setImmediate in a callback
 * Chapter 5: setImmediate callbacks are executed in the check phase of the event loop
 */
function demonstrateSetImmediateInCallback(callback) {
  setImmediate(() => {
    if (callback) {
      callback("setImmediate callback executed");
    }
  });
}

/**
 * Returns a promise that demonstrates nextTick vs setImmediate order
 * Chapter 5: Useful for testing the execution order
 */
function getExecutionOrderPromise() {
  return new Promise((resolve) => {
    const order = [];
    let callbacksCompleted = 0;
    const totalCallbacks = 2; // nextTick and setImmediate (setTimeout may vary)

    order.push("sync-start");

    setImmediate(() => {
      order.push("setImmediate");
      callbacksCompleted++;
      if (callbacksCompleted >= totalCallbacks) {
        // Use setImmediate to ensure we're in the next tick
        setImmediate(() => resolve(order));
      }
    });

    process.nextTick(() => {
      order.push("nextTick");
      callbacksCompleted++;
      if (callbacksCompleted >= totalCallbacks) {
        // Use setImmediate to ensure we're in the next tick
        setImmediate(() => resolve(order));
      }
    });

    setTimeout(() => {
      order.push("setTimeout");
    }, 0);

    order.push("sync-end");
  });
}

module.exports = {
  demonstrateExecutionOrder,
  demonstrateNextTickInCallback,
  demonstrateSetImmediateInCallback,
  getExecutionOrderPromise,
};

