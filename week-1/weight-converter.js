/**
 * Author: Will Southard
 * Date: 10-26-2025
 * File Name: weight-converter.js
 * Description: This code converts a weight from pounds to kilograms.
*/

"use strict";

// Get command line arguments (process.argv contains node executable and script path at indices 0 and 1)
const args = process.argv.slice(2);

// Check if no argument is provided
if (args.length === 0) {
  console.error('Usage: node weight-converter.js <pounds>');
  process.exit(1);
}

// Get the weight in pounds from command line argument
const pounds = args[0];

// Check if the input is a valid number
if (isNaN(pounds) || isNaN(parseFloat(pounds))) {
  console.error('Input must be a number.');
  process.exit(1);
}

// Convert pounds to kilograms (1 pound = 0.453592 kilograms)
const kilograms = parseFloat(pounds) * 0.453592;

// Round to two decimal places and output
const result = kilograms.toFixed(2);
console.log(result);
