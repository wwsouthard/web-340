/**
 * Author: Will Southard
 * Date: November 20, 2025
 * File Name: event-demo.js
 * Description: Demonstrates process events from Chapter 5
 *              Implements: beforeExit, exit, and other process events
 */

"use strict";

/**
 * Sets up a beforeExit event listener
 * Chapter 5: Demonstrates process.on('beforeExit') event
 * Note: beforeExit is emitted when Node.js empties its event loop
 */
function setupBeforeExitListener(callback) {
  process.on("beforeExit", (code) => {
    if (callback) {
      callback(code);
    }
  });
}

/**
 * Sets up an exit event listener
 * Chapter 5: Demonstrates process.on('exit') event
 * Note: exit is emitted when the process is about to exit
 */
function setupExitListener(callback) {
  process.on("exit", (code) => {
    if (callback) {
      callback(code);
    }
  });
}

/**
 * Sets up an uncaughtException event listener
 * Chapter 5: Demonstrates process.on('uncaughtException') event
 */
function setupUncaughtExceptionListener(callback) {
  process.on("uncaughtException", (error) => {
    if (callback) {
      callback(error);
    }
  });
}

/**
 * Sets up an unhandledRejection event listener
 * Chapter 5: Demonstrates process.on('unhandledRejection') event
 */
function setupUnhandledRejectionListener(callback) {
  process.on("unhandledRejection", (reason, promise) => {
    if (callback) {
      callback(reason, promise);
    }
  });
}

/**
 * Removes all listeners for a specific event
 * Chapter 5: Demonstrates process.removeAllListeners()
 */
function removeAllListeners(eventName) {
  process.removeAllListeners(eventName);
}

/**
 * Gets the count of listeners for a specific event
 * Chapter 5: Demonstrates process.listenerCount()
 */
function getListenerCount(eventName) {
  return process.listenerCount(eventName);
}

module.exports = {
  setupBeforeExitListener,
  setupExitListener,
  setupUncaughtExceptionListener,
  setupUnhandledRejectionListener,
  removeAllListeners,
  getListenerCount,
};

