/**
 * Author: Will Southard
 * Date: December 2025
 * File Name: pie.js
 * Description: Module that simulates a simple pie baker
 */
"use strict";

function bakePie(pieType, ingredients) {
  // Essential ingredients required for baking a pie
  const essentialIngredients = ['flour', 'sugar', 'butter'];
  
  // Check if all essential ingredients are present
  const missingIngredients = essentialIngredients.filter(
    ingredient => !ingredients.includes(ingredient)
  );
  
  // If any essential ingredient is missing, log warning and exit
  if (missingIngredients.length > 0) {
    console.warn(`Warning: Missing essential ingredients: ${missingIngredients.join(', ')}`);
    process.exit(1);
  }
  
  // If all essential ingredients are present, return success message
  return `${pieType} pie baked successfully with ingredients: ${ingredients.join(', ')}`;
}

module.exports = { bakePie };