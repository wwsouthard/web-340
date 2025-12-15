"use strict";

/**
 * Author: Will Southard
 * Date: December 2025
 * File Name: character-creation.spec.js
 * Description: Unit tests for character-creation.js module using Jest
 */

const fs = require('fs').promises;

describe("Character Creation Module", () => {
  let createCharacter;
  let getCharacters;
  let writeFileSpy;
  let readFileSpy;

  beforeEach(() => {
    jest.resetModules();
    // Mock fs.promises methods
    writeFileSpy = jest.spyOn(fs, 'writeFile').mockResolvedValue();
    readFileSpy = jest.spyOn(fs, 'readFile').mockResolvedValue('[]');
    
    ({ createCharacter, getCharacters } = require('../src/character-creation'));
  });

  afterEach(() => {
    // Restore original implementations after each test
    writeFileSpy.mockRestore();
    readFileSpy.mockRestore();
  });

  // Test 1: Test that data can be written to a file
  test("should write character data to a file", async () => {
    const character = {
      class: "Warrior",
      gender: "Male",
      specialAbility: "Can summon lightning"
    };

    await createCharacter(character);

    expect(writeFileSpy).toHaveBeenCalled();
    const writeCall = writeFileSpy.mock.calls[0];
    expect(writeCall[1]).toContain(character.class);
    expect(writeCall[1]).toContain(character.gender);
    expect(writeCall[1]).toContain(character.specialAbility);
  });

  // Test 2: Test that data can be read from a file
  test("should read character data from a file", async () => {
    const mockCharacters = [
      {
        class: "Mage",
        gender: "Female",
        specialAbility: "Can teleport"
      },
      {
        class: "Rogue",
        gender: "Other",
        specialAbility: "Can turn invisible"
      }
    ];

    readFileSpy.mockResolvedValue(JSON.stringify(mockCharacters));

    const characters = await getCharacters();

    expect(readFileSpy).toHaveBeenCalled();
    expect(characters).toEqual(mockCharacters);
    expect(characters).toHaveLength(2);
    expect(characters[0].class).toBe("Mage");
    expect(characters[1].class).toBe("Rogue");
  });

  // Test 3: Test that it handles errors when reading from the file
  test("should handle errors when reading from the file", async () => {
    const error = new Error("File not found");
    readFileSpy.mockRejectedValue(error);

    await expect(getCharacters()).rejects.toThrow("File not found");
    expect(readFileSpy).toHaveBeenCalled();
  });
});