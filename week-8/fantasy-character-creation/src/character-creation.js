"use strict";

/**
 * Author: Will Southard
 * Date: December 2025
 * File Name: character-creation.js
 * Description: Character creation system for a fantasy video game
 */

const fs = require('fs').promises;
const path = require('path');

// Use const variables for file names as required
const CHARACTERS_FILE = path.join(__dirname, '../data/characters.json');

/**
 * Creates a new character and writes it to the file
 * @param {Object} character - Character object with class, gender, and specialAbility
 * @returns {Promise<void>}
 */
async function createCharacter(character) {
  try {
    // Read existing characters
    let characters = [];
    try {
      const data = await fs.readFile(CHARACTERS_FILE, 'utf8');
      characters = JSON.parse(data);
    } catch (error) {
      // If file doesn't exist, start with empty array
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    // Add new character
    characters.push(character);

    // Ensure data directory exists
    const dataDir = path.dirname(CHARACTERS_FILE);
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, ignore error
    }

    // Write updated characters to file
    await fs.writeFile(CHARACTERS_FILE, JSON.stringify(characters, null, 2), 'utf8');
  } catch (error) {
    throw error;
  }
}

/**
 * Reads all characters from the file
 * @returns {Promise<Array>} Array of character objects
 */
async function getCharacters() {
  try {
    const data = await fs.readFile(CHARACTERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

module.exports = { createCharacter, getCharacters };