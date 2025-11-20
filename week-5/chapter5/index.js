/**
 * Author: Will Southard
 * Date: November 20, 2025
 * File Name: index.js
 * Description: Main CLI program demonstrating Chapter 5 concepts
 *              Logs process information, OS information, process events,
 *              and demonstrates process.nextTick
 */

"use strict";

const processInfo = require("./process-info");
const systemInfo = require("./system-info");
const eventDemo = require("./event-demo");
const nextTickDemo = require("./next-tick-demo");

/**
 * Main CLI program
 * Chapter 5: Comprehensive demonstration of process, OS, events, and nextTick
 */
function main() {
  console.log("=".repeat(60));
  console.log("Chapter 5: Process, OS, Events, and Event Loop Demo");
  console.log("=".repeat(60));
  console.log();

  // Log process information
  console.log("--- Process Information ---");
  const procInfo = processInfo.getProcessInfo();
  console.log(`Current Working Directory: ${procInfo.cwd}`);
  console.log(`Process ID: ${procInfo.pid}`);
  console.log(`Platform: ${procInfo.platform}`);
  console.log(`Process Title: ${procInfo.title}`);
  console.log(`Node.js Version: ${procInfo.version}`);
  console.log(`Command Line Arguments: ${procInfo.argv.join(" ")}`);
  console.log();

  // Log OS information
  console.log("--- System Information ---");
  const sysInfo = systemInfo.getSystemInfo();
  console.log(`Hostname: ${sysInfo.hostname}`);
  console.log(`OS Type: ${sysInfo.type}`);
  console.log(`OS Platform: ${sysInfo.platform}`);
  console.log(`OS Release: ${sysInfo.release}`);
  console.log(`Architecture: ${sysInfo.architecture}`);
  console.log(`OS Version: ${sysInfo.version}`);
  console.log(`CPU Count: ${sysInfo.cpuCount}`);
  console.log(`Total Memory: ${(sysInfo.totalMemory / 1024 / 1024 / 1024).toFixed(2)} GB`);
  console.log(`Free Memory: ${(sysInfo.freeMemory / 1024 / 1024 / 1024).toFixed(2)} GB`);
  console.log(`Uptime: ${(sysInfo.uptime / 3600).toFixed(2)} hours`);
  console.log(`User: ${sysInfo.userInfo.username} (UID: ${sysInfo.userInfo.uid}, GID: ${sysInfo.userInfo.gid})`);
  console.log(`Home Directory: ${sysInfo.userInfo.homedir}`);
  console.log(`Shell: ${sysInfo.userInfo.shell}`);
  console.log();

  // Demonstrate path manipulation with OS module
  console.log("--- Path Manipulation Example ---");
  const examplePath = systemInfo.getHomeDirectoryPath("example-file.txt");
  console.log(`Example path in home directory: ${examplePath}`);
  console.log();

  // Read command-line arguments
  console.log("--- Command-Line Arguments ---");
  const args = process.argv.slice(2);
  if (args.length > 0) {
    console.log(`Arguments provided: ${args.join(", ")}`);
  } else {
    console.log("No additional arguments provided");
  }
  console.log();

  // Read environment variables
  console.log("--- Environment Variables ---");
  const envVars = ["NODE_ENV", "PATH", "HOME", "USER"];
  envVars.forEach((key) => {
    const value = processInfo.getEnvironmentVariable(key);
    if (value) {
      console.log(`${key}: ${value.substring(0, 80)}${value.length > 80 ? "..." : ""}`);
    }
  });
  console.log();

  // Demonstrate process.nextTick
  console.log("--- Event Loop Demonstration (process.nextTick vs setImmediate) ---");
  console.log("Expected order: Synchronous -> process.nextTick -> setTimeout -> setImmediate");
  console.log();
  nextTickDemo.demonstrateExecutionOrder();

  // Set up process event listeners
  console.log();
  console.log("--- Process Events ---");
  let beforeExitFired = false;
  let exitFired = false;

  eventDemo.setupBeforeExitListener((code) => {
    if (!beforeExitFired) {
      beforeExitFired = true;
      console.log(`beforeExit event fired with code: ${code}`);
    }
  });

  eventDemo.setupExitListener((code) => {
    if (!exitFired) {
      exitFired = true;
      console.log(`exit event fired with code: ${code}`);
    }
  });

  // Allow time for async operations to complete
  setTimeout(() => {
    console.log();
    console.log("=".repeat(60));
    console.log("Program completed. Process will exit shortly.");
    console.log("=".repeat(60));
    process.exit(0);
  }, 100);
}

// Run the main program
if (require.main === module) {
  main();
}

module.exports = { main };

