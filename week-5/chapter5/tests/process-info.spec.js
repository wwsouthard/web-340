/**
 * Author: Will Southard
 * Date: November 20, 2025
 * File Name: process-info.spec.js
 * Description: Unit tests for process-info.js module
 *              Tests process object features from Chapter 5
 */

"use strict";

const assert = require("assert");
const {
  getCurrentWorkingDirectory,
  getProcessId,
  getCommandLineArguments,
  setEnvironmentVariable,
  getEnvironmentVariable,
  getProcessPlatform,
  getProcessTitle,
  setProcessTitle,
  getNodeVersion,
  getProcessInfo,
} = require("../process-info");

function testGetCurrentWorkingDirectory() {
  try {
    const cwd = getCurrentWorkingDirectory();
    assert.strictEqual(typeof cwd, "string", "cwd should be a string");
    assert(cwd.length > 0, "cwd should not be empty");
    assert.strictEqual(cwd, process.cwd(), "should match process.cwd()");
    console.log("Passed testGetCurrentWorkingDirectory");
    return true;
  } catch (error) {
    console.log(`Failed testGetCurrentWorkingDirectory: ${error.message}`);
    return false;
  }
}

function testGetProcessId() {
  try {
    const pid = getProcessId();
    assert.strictEqual(typeof pid, "number", "pid should be a number");
    assert(pid > 0, "pid should be greater than 0");
    assert.strictEqual(pid, process.pid, "should match process.pid");
    console.log("Passed testGetProcessId");
    return true;
  } catch (error) {
    console.log(`Failed testGetProcessId: ${error.message}`);
    return false;
  }
}

function testGetCommandLineArguments() {
  try {
    const argv = getCommandLineArguments();
    assert(Array.isArray(argv), "argv should be an array");
    assert(argv.length >= 2, "argv should have at least 2 elements");
    assert.strictEqual(argv, process.argv, "should match process.argv");
    console.log("Passed testGetCommandLineArguments");
    return true;
  } catch (error) {
    console.log(`Failed testGetCommandLineArguments: ${error.message}`);
    return false;
  }
}

function testSetAndGetEnvironmentVariable() {
  try {
    const testKey = "TEST_ENV_VAR_" + Date.now();
    const testValue = "test-value-123";

    // Test setting
    const setValue = setEnvironmentVariable(testKey, testValue);
    assert.strictEqual(setValue, testValue, "setEnvironmentVariable should return the value");

    // Test getting
    const getValue = getEnvironmentVariable(testKey);
    assert.strictEqual(getValue, testValue, "getEnvironmentVariable should return the value");

    // Clean up
    delete process.env[testKey];

    console.log("Passed testSetAndGetEnvironmentVariable");
    return true;
  } catch (error) {
    console.log(`Failed testSetAndGetEnvironmentVariable: ${error.message}`);
    return false;
  }
}

function testGetProcessPlatform() {
  try {
    const platform = getProcessPlatform();
    assert.strictEqual(typeof platform, "string", "platform should be a string");
    assert(["win32", "darwin", "linux", "freebsd", "openbsd", "sunos", "aix"].includes(platform), "platform should be a valid OS");
    assert.strictEqual(platform, process.platform, "should match process.platform");
    console.log("Passed testGetProcessPlatform");
    return true;
  } catch (error) {
    console.log(`Failed testGetProcessPlatform: ${error.message}`);
    return false;
  }
}

function testGetProcessTitle() {
  try {
    const title = getProcessTitle();
    assert.strictEqual(typeof title, "string", "title should be a string");
    assert.strictEqual(title, process.title, "should match process.title");
    console.log("Passed testGetProcessTitle");
    return true;
  } catch (error) {
    console.log(`Failed testGetProcessTitle: ${error.message}`);
    return false;
  }
}

function testSetProcessTitle() {
  try {
    const originalTitle = process.title;
    const newTitle = "Test Title " + Date.now();

    const setTitle = setProcessTitle(newTitle);
    assert.strictEqual(setTitle, newTitle, "setProcessTitle should return the new title");
    assert.strictEqual(process.title, newTitle, "process.title should be updated");

    // Restore original title
    process.title = originalTitle;

    console.log("Passed testSetProcessTitle");
    return true;
  } catch (error) {
    console.log(`Failed testSetProcessTitle: ${error.message}`);
    return false;
  }
}

function testGetNodeVersion() {
  try {
    const version = getNodeVersion();
    assert.strictEqual(typeof version, "string", "version should be a string");
    assert.match(version, /^v\d+\.\d+\.\d+/, "version should match vX.Y.Z format");
    assert.strictEqual(version, process.version, "should match process.version");
    console.log("Passed testGetNodeVersion");
    return true;
  } catch (error) {
    console.log(`Failed testGetNodeVersion: ${error.message}`);
    return false;
  }
}

function testGetProcessInfo() {
  try {
    const info = getProcessInfo();
    assert.strictEqual(typeof info, "object", "info should be an object");
    assert.strictEqual(typeof info.cwd, "string", "info.cwd should be a string");
    assert.strictEqual(typeof info.pid, "number", "info.pid should be a number");
    assert(Array.isArray(info.argv), "info.argv should be an array");
    assert.strictEqual(typeof info.platform, "string", "info.platform should be a string");
    assert.strictEqual(typeof info.title, "string", "info.title should be a string");
    assert.strictEqual(typeof info.version, "string", "info.version should be a string");
    console.log("Passed testGetProcessInfo");
    return true;
  } catch (error) {
    console.log(`Failed testGetProcessInfo: ${error.message}`);
    return false;
  }
}

function runTests() {
  console.log("\nRunning Process Info Tests...\n");

  const results = [
    testGetCurrentWorkingDirectory(),
    testGetProcessId(),
    testGetCommandLineArguments(),
    testSetAndGetEnvironmentVariable(),
    testGetProcessPlatform(),
    testGetProcessTitle(),
    testSetProcessTitle(),
    testGetNodeVersion(),
    testGetProcessInfo(),
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
  testGetCurrentWorkingDirectory,
  testGetProcessId,
  testGetCommandLineArguments,
  testSetAndGetEnvironmentVariable,
  testGetProcessPlatform,
  testGetProcessTitle,
  testSetProcessTitle,
  testGetNodeVersion,
  testGetProcessInfo,
  runTests,
};

