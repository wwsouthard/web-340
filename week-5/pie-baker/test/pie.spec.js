/**
 * Author: Will Southard
 * Date: December 2025
 * File Name: pie.spec.js
 * Description: Unit tests for pie.js module using Jest
 */

"use strict";

const { bakePie } = require("../src/pie");

describe("bakePie", () => {
  let consoleWarnSpy;
  let processExitSpy;

  beforeEach(() => {
    // Mock console.warn to prevent actual warnings during tests
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    // Mock process.exit to prevent actual process termination
    processExitSpy = jest.spyOn(process, 'exit').mockImplementation((code) => {
      throw new Error(`process.exit(${code})`);
    });
  });

  afterEach(() => {
    // Restore original implementations after each test
    consoleWarnSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  test("should successfully bake a pie when all essential ingredients are present", () => {
    const pieType = "Apple";
    const ingredients = ["flour", "sugar", "butter", "apples", "cinnamon"];
    
    const result = bakePie(pieType, ingredients);
    
    expect(result).toBe("Apple pie baked successfully with ingredients: flour, sugar, butter, apples, cinnamon");
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    expect(processExitSpy).not.toHaveBeenCalled();
  });

  test("should successfully bake a pie with only essential ingredients", () => {
    const pieType = "Basic";
    const ingredients = ["flour", "sugar", "butter"];
    
    const result = bakePie(pieType, ingredients);
    
    expect(result).toBe("Basic pie baked successfully with ingredients: flour, sugar, butter");
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    expect(processExitSpy).not.toHaveBeenCalled();
  });

  test("should log warning and call process.exit(1) when essential ingredient is missing", () => {
    const pieType = "Cherry";
    const ingredients = ["flour", "sugar"]; // Missing butter
    
    expect(() => {
      bakePie(pieType, ingredients);
    }).toThrow("process.exit(1)");
    
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining("Warning: Missing essential ingredients: butter")
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });
});