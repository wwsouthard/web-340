/**
 * Author: Will Southard
 * Date: November 20, 2025
 * File Name: process-info.js
 * Description: Demonstrates process object features from Chapter 5
 *              Implements: process.cwd(), process.pid, process.argv,
 *              process.env, process.platform, process.title, process.version
 */

"use strict";

/**
 * Gets the current working directory using process.cwd()
 * Chapter 5: Demonstrates process.cwd() method
 */
function getCurrentWorkingDirectory() {
  return process.cwd();
}

/**
 * Gets the process ID using process.pid
 * Chapter 5: Demonstrates process.pid property
 */
function getProcessId() {
  return process.pid;
}

/**
 * Gets command-line arguments using process.argv
 * Chapter 5: Demonstrates process.argv array
 */
function getCommandLineArguments() {
  return process.argv;
}

/**
 * Sets an environment variable using process.env
 * Chapter 5: Demonstrates setting environment variables
 */
function setEnvironmentVariable(key, value) {
  process.env[key] = value;
  return process.env[key];
}

/**
 * Gets an environment variable using process.env
 * Chapter 5: Demonstrates reading environment variables
 */
function getEnvironmentVariable(key) {
  return process.env[key];
}

/**
 * Gets process platform information
 * Chapter 5: Demonstrates process.platform property
 */
function getProcessPlatform() {
  return process.platform;
}

/**
 * Gets or sets the process title
 * Chapter 5: Demonstrates process.title property
 */
function getProcessTitle() {
  return process.title;
}

function setProcessTitle(title) {
  process.title = title;
  return process.title;
}

/**
 * Gets the Node.js version
 * Chapter 5: Demonstrates process.version property
 */
function getNodeVersion() {
  return process.version;
}

/**
 * Gets all process information as an object
 * Chapter 5: Comprehensive process information gathering
 */
function getProcessInfo() {
  return {
    cwd: getCurrentWorkingDirectory(),
    pid: getProcessId(),
    argv: getCommandLineArguments(),
    platform: getProcessPlatform(),
    title: getProcessTitle(),
    version: getNodeVersion(),
  };
}

module.exports = {
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
};

