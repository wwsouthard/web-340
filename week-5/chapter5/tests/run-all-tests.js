/**
 * Author: Will Southard
 * Date: November 20, 2025
 * File Name: run-all-tests.js
 * Description: Test runner that executes all test files
 */

"use strict";

const processInfoTests = require("./process-info.spec");
const systemInfoTests = require("./system-info.spec");
const eventDemoTests = require("./event-demo.spec");
const nextTickDemoTests = require("./next-tick-demo.spec");

async function runAllTests() {
  console.log("=".repeat(60));
  console.log("Running All Chapter 5 Tests");
  console.log("=".repeat(60));

  let totalPassed = 0;
  let totalTests = 0;
  let allPassed = true;

  // Run process-info tests
  const processInfoResult = processInfoTests.runTests();
  totalTests += 9; // Number of tests in process-info.spec.js
  if (processInfoResult) totalPassed += 9;

  console.log();

  // Run system-info tests
  const systemInfoResult = systemInfoTests.runTests();
  totalTests += 13; // Number of tests in system-info.spec.js
  if (systemInfoResult) totalPassed += 13;

  console.log();

  // Run event-demo tests
  const eventDemoResult = eventDemoTests.runTests();
  totalTests += 6; // Number of tests in event-demo.spec.js
  if (eventDemoResult) totalPassed += 6;

  console.log();

  // Run next-tick-demo tests
  const nextTickResult = await nextTickDemoTests.runTests();
  totalTests += 4; // Number of tests in next-tick-demo.spec.js
  if (nextTickResult) totalPassed += 4;

  console.log();
  console.log("=".repeat(60));
  console.log("Overall Test Summary");
  console.log("=".repeat(60));
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${totalPassed}`);
  console.log(`Failed: ${totalTests - totalPassed}`);
  console.log("=".repeat(60));

  if (totalPassed !== totalTests) {
    allPassed = false;
  }

  return allPassed;
}

// Run all tests if this file is executed directly
if (require.main === module) {
  runAllTests().then((allPassed) => {
    process.exit(allPassed ? 0 : 1);
  });
}

module.exports = { runAllTests };

