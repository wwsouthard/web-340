/**
 * Author: Will Southard
 * Date: 1/12/2025
 * File Name: index.js
 * Description: CLI program to demonstrate recipe module functionality
*/

// Import your module using require
const recipes = require("./recipes");

// Implement your CLI program here
console.log("Welcome to the Recipe Application!");
console.log("");

// Demonstrate createRecipe function
console.log(recipes.createRecipe(["flour", "eggs", "milk", "sugar"]));
console.log("");

// Demonstrate setTimer function
console.log(recipes.setTimer(30));
console.log("");

// Demonstrate quit function
console.log(recipes.quit());