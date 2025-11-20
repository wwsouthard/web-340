/**
 * Author: Will Southard
 * Date: November 20, 2025
 * File Name: system-info.spec.js
 * Description: Unit tests for system-info.js module
 *              Tests OS module features from Chapter 5
 */

"use strict";

const assert = require("assert");
const os = require("os");
const {
  getHostname,
  getOSType,
  getOSPlatform,
  getOSRelease,
  getArchitecture,
  getOSVersion,
  getCPUCount,
  getTotalMemory,
  getFreeMemory,
  getUptime,
  getUserInfo,
  getHomeDirectoryPath,
  getSystemInfo,
} = require("../system-info");

function testGetHostname() {
  try {
    const hostname = getHostname();
    assert.strictEqual(typeof hostname, "string", "hostname should be a string");
    assert(hostname.length > 0, "hostname should not be empty");
    assert.strictEqual(hostname, os.hostname(), "should match os.hostname()");
    console.log("Passed testGetHostname");
    return true;
  } catch (error) {
    console.log(`Failed testGetHostname: ${error.message}`);
    return false;
  }
}

function testGetOSType() {
  try {
    const type = getOSType();
    assert.strictEqual(typeof type, "string", "type should be a string");
    assert(["Windows_NT", "Linux", "Darwin"].includes(type), "type should be a valid OS type");
    assert.strictEqual(type, os.type(), "should match os.type()");
    console.log("Passed testGetOSType");
    return true;
  } catch (error) {
    console.log(`Failed testGetOSType: ${error.message}`);
    return false;
  }
}

function testGetOSPlatform() {
  try {
    const platform = getOSPlatform();
    assert.strictEqual(typeof platform, "string", "platform should be a string");
    assert.strictEqual(platform, os.platform(), "should match os.platform()");
    console.log("Passed testGetOSPlatform");
    return true;
  } catch (error) {
    console.log(`Failed testGetOSPlatform: ${error.message}`);
    return false;
  }
}

function testGetOSRelease() {
  try {
    const release = getOSRelease();
    assert.strictEqual(typeof release, "string", "release should be a string");
    assert(release.length > 0, "release should not be empty");
    assert.strictEqual(release, os.release(), "should match os.release()");
    console.log("Passed testGetOSRelease");
    return true;
  } catch (error) {
    console.log(`Failed testGetOSRelease: ${error.message}`);
    return false;
  }
}

function testGetArchitecture() {
  try {
    const arch = getArchitecture();
    assert.strictEqual(typeof arch, "string", "architecture should be a string");
    assert(["x64", "arm", "arm64", "ia32"].includes(arch), "architecture should be valid");
    assert.strictEqual(arch, os.arch(), "should match os.arch()");
    console.log("Passed testGetArchitecture");
    return true;
  } catch (error) {
    console.log(`Failed testGetArchitecture: ${error.message}`);
    return false;
  }
}

function testGetOSVersion() {
  try {
    const version = getOSVersion();
    assert.strictEqual(typeof version, "string", "version should be a string");
    assert(version.length > 0, "version should not be empty");
    assert.strictEqual(version, os.version(), "should match os.version()");
    console.log("Passed testGetOSVersion");
    return true;
  } catch (error) {
    console.log(`Failed testGetOSVersion: ${error.message}`);
    return false;
  }
}

function testGetCPUCount() {
  try {
    const cpuCount = getCPUCount();
    assert.strictEqual(typeof cpuCount, "number", "cpuCount should be a number");
    assert(cpuCount > 0, "cpuCount should be greater than 0");
    assert.strictEqual(cpuCount, os.cpus().length, "should match os.cpus().length");
    console.log("Passed testGetCPUCount");
    return true;
  } catch (error) {
    console.log(`Failed testGetCPUCount: ${error.message}`);
    return false;
  }
}

function testGetTotalMemory() {
  try {
    const totalMem = getTotalMemory();
    assert.strictEqual(typeof totalMem, "number", "totalMemory should be a number");
    assert(totalMem > 0, "totalMemory should be greater than 0");
    assert.strictEqual(totalMem, os.totalmem(), "should match os.totalmem()");
    console.log("Passed testGetTotalMemory");
    return true;
  } catch (error) {
    console.log(`Failed testGetTotalMemory: ${error.message}`);
    return false;
  }
}

function testGetFreeMemory() {
  try {
    const freeMem = getFreeMemory();
    assert.strictEqual(typeof freeMem, "number", "freeMemory should be a number");
    assert(freeMem > 0, "freeMemory should be greater than 0");
    assert(freeMem <= os.totalmem(), "freeMemory should be less than or equal to totalMemory");
    assert.strictEqual(freeMem, os.freemem(), "should match os.freemem()");
    console.log("Passed testGetFreeMemory");
    return true;
  } catch (error) {
    console.log(`Failed testGetFreeMemory: ${error.message}`);
    return false;
  }
}

function testGetUptime() {
  try {
    const uptime = getUptime();
    assert.strictEqual(typeof uptime, "number", "uptime should be a number");
    assert(uptime >= 0, "uptime should be non-negative");
    // Allow small difference due to timing
    const osUptime = os.uptime();
    assert(Math.abs(uptime - osUptime) < 2, "should be close to os.uptime()");
    console.log("Passed testGetUptime");
    return true;
  } catch (error) {
    console.log(`Failed testGetUptime: ${error.message}`);
    return false;
  }
}

function testGetUserInfo() {
  try {
    const userInfo = getUserInfo();
    assert.strictEqual(typeof userInfo, "object", "userInfo should be an object");
    assert.strictEqual(typeof userInfo.uid, "number", "userInfo.uid should be a number");
    assert.strictEqual(typeof userInfo.gid, "number", "userInfo.gid should be a number");
    assert.strictEqual(typeof userInfo.username, "string", "userInfo.username should be a string");
    assert.strictEqual(typeof userInfo.homedir, "string", "userInfo.homedir should be a string");
    assert.strictEqual(typeof userInfo.shell, "string", "userInfo.shell should be a string");
    assert.strictEqual(userInfo.uid, os.userInfo().uid, "uid should match os.userInfo().uid");
    assert.strictEqual(userInfo.gid, os.userInfo().gid, "gid should match os.userInfo().gid");
    assert.strictEqual(userInfo.username, os.userInfo().username, "username should match");
    assert.strictEqual(userInfo.homedir, os.userInfo().homedir, "homedir should match");
    assert.strictEqual(userInfo.shell, os.userInfo().shell, "shell should match");
    console.log("Passed testGetUserInfo");
    return true;
  } catch (error) {
    console.log(`Failed testGetUserInfo: ${error.message}`);
    return false;
  }
}

function testGetHomeDirectoryPath() {
  try {
    const filename = "test-file.txt";
    const filePath = getHomeDirectoryPath(filename);
    assert.strictEqual(typeof filePath, "string", "filePath should be a string");
    assert(filePath.endsWith(filename), "filePath should end with filename");
    assert(filePath.includes(os.userInfo().homedir), "filePath should include homedir");
    console.log("Passed testGetHomeDirectoryPath");
    return true;
  } catch (error) {
    console.log(`Failed testGetHomeDirectoryPath: ${error.message}`);
    return false;
  }
}

function testGetSystemInfo() {
  try {
    const sysInfo = getSystemInfo();
    assert.strictEqual(typeof sysInfo, "object", "sysInfo should be an object");
    assert.strictEqual(typeof sysInfo.hostname, "string", "hostname should be a string");
    assert.strictEqual(typeof sysInfo.type, "string", "type should be a string");
    assert.strictEqual(typeof sysInfo.platform, "string", "platform should be a string");
    assert.strictEqual(typeof sysInfo.release, "string", "release should be a string");
    assert.strictEqual(typeof sysInfo.architecture, "string", "architecture should be a string");
    assert.strictEqual(typeof sysInfo.version, "string", "version should be a string");
    assert.strictEqual(typeof sysInfo.cpuCount, "number", "cpuCount should be a number");
    assert.strictEqual(typeof sysInfo.totalMemory, "number", "totalMemory should be a number");
    assert.strictEqual(typeof sysInfo.freeMemory, "number", "freeMemory should be a number");
    assert.strictEqual(typeof sysInfo.uptime, "number", "uptime should be a number");
    assert.strictEqual(typeof sysInfo.userInfo, "object", "userInfo should be an object");
    assert.strictEqual(typeof sysInfo.userInfo.uid, "number", "userInfo.uid should be a number");
    assert.strictEqual(typeof sysInfo.userInfo.gid, "number", "userInfo.gid should be a number");
    assert.strictEqual(typeof sysInfo.userInfo.username, "string", "userInfo.username should be a string");
    assert.strictEqual(typeof sysInfo.userInfo.homedir, "string", "userInfo.homedir should be a string");
    assert.strictEqual(typeof sysInfo.userInfo.shell, "string", "userInfo.shell should be a string");
    console.log("Passed testGetSystemInfo");
    return true;
  } catch (error) {
    console.log(`Failed testGetSystemInfo: ${error.message}`);
    return false;
  }
}

function runTests() {
  console.log("\nRunning System Info Tests...\n");

  const results = [
    testGetHostname(),
    testGetOSType(),
    testGetOSPlatform(),
    testGetOSRelease(),
    testGetArchitecture(),
    testGetOSVersion(),
    testGetCPUCount(),
    testGetTotalMemory(),
    testGetFreeMemory(),
    testGetUptime(),
    testGetUserInfo(),
    testGetHomeDirectoryPath(),
    testGetSystemInfo(),
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
  testGetHostname,
  testGetOSType,
  testGetOSPlatform,
  testGetOSRelease,
  testGetArchitecture,
  testGetOSVersion,
  testGetCPUCount,
  testGetTotalMemory,
  testGetFreeMemory,
  testGetUptime,
  testGetUserInfo,
  testGetHomeDirectoryPath,
  testGetSystemInfo,
  runTests,
};

