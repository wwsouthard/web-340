/**
 * Author: Will Southard
 * Date: November 20, 2025
 * File Name: system-info.js
 * Description: Demonstrates OS module features from Chapter 5
 *              Implements: hostname, type, platform, release, architecture,
 *              version, cpus, totalmem, freemem, uptime, userInfo
 */

"use strict";

const os = require("os");
const path = require("path");

/**
 * Gets the system hostname
 * Chapter 5: Demonstrates os.hostname()
 */
function getHostname() {
  return os.hostname();
}

/**
 * Gets the operating system type
 * Chapter 5: Demonstrates os.type()
 */
function getOSType() {
  return os.type();
}

/**
 * Gets the operating system platform
 * Chapter 5: Demonstrates os.platform()
 */
function getOSPlatform() {
  return os.platform();
}

/**
 * Gets the operating system release
 * Chapter 5: Demonstrates os.release()
 */
function getOSRelease() {
  return os.release();
}

/**
 * Gets the CPU architecture
 * Chapter 5: Demonstrates os.arch()
 */
function getArchitecture() {
  return os.arch();
}

/**
 * Gets the operating system version
 * Chapter 5: Demonstrates os.version()
 */
function getOSVersion() {
  return os.version();
}

/**
 * Gets the number of CPU cores
 * Chapter 5: Demonstrates os.cpus().length
 */
function getCPUCount() {
  return os.cpus().length;
}

/**
 * Gets total system memory in bytes
 * Chapter 5: Demonstrates os.totalmem()
 */
function getTotalMemory() {
  return os.totalmem();
}

/**
 * Gets free system memory in bytes
 * Chapter 5: Demonstrates os.freemem()
 */
function getFreeMemory() {
  return os.freemem();
}

/**
 * Gets system uptime in seconds
 * Chapter 5: Demonstrates os.uptime()
 */
function getUptime() {
  return os.uptime();
}

/**
 * Gets current user information
 * Chapter 5: Demonstrates os.userInfo() with uid, gid, username, homedir, shell
 */
function getUserInfo() {
  return os.userInfo();
}

/**
 * Demonstrates path manipulation with OS module
 * Chapter 5: Uses path.join() with os.userInfo().homedir to create file paths
 */
function getHomeDirectoryPath(filename) {
  const homedir = os.userInfo().homedir;
  return path.join(homedir, filename);
}

/**
 * Gets all system information as an object
 * Chapter 5: Comprehensive system information gathering
 */
function getSystemInfo() {
  const userInfo = getUserInfo();
  return {
    hostname: getHostname(),
    type: getOSType(),
    platform: getOSPlatform(),
    release: getOSRelease(),
    architecture: getArchitecture(),
    version: getOSVersion(),
    cpuCount: getCPUCount(),
    totalMemory: getTotalMemory(),
    freeMemory: getFreeMemory(),
    uptime: getUptime(),
    userInfo: {
      uid: userInfo.uid,
      gid: userInfo.gid,
      username: userInfo.username,
      homedir: userInfo.homedir,
      shell: userInfo.shell,
    },
  };
}

module.exports = {
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
};

