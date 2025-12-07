/**
 * Author: Will Southard
 * Date: December 07, 2025
 * File Name: character-creator.js
 * Description: Duplex stream class for creating and transforming fantasy game characters
 */

const { Duplex } = require('stream');

class CharacterCreator extends Duplex {
  constructor(options) {
    super(options);
    this.characters = [];
  }

  _write(chunk, encoding, callback) {
    try {
      const data = chunk.toString();
      const character = JSON.parse(data);
      
      // Validate character data
      if (!character.name || !character.class || !character.level) {
        return callback(new Error('Invalid character data: name, class, and level are required'));
      }

      // Transform character data
      const transformedCharacter = {
        ...character,
        id: this.characters.length + 1,
        createdAt: new Date().toISOString()
      };

      this.characters.push(transformedCharacter);
      
      // Push the transformed character to the readable side
      this.push(JSON.stringify(transformedCharacter) + '\n');
      
      callback();
    } catch (error) {
      callback(error);
    }
  }

  _read(size) {
    // Data is pushed in _write, so this can be empty
    // The stream will end when push(null) is called
  }

  _final(callback) {
    // Signal end of readable stream when writable side ends
    this.push(null);
    callback();
  }
}

module.exports = CharacterCreator;