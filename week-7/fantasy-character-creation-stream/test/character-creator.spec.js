/**
 * Author: Will Southard
 * Date: December 07, 2025
 * File Name: character-creator.spec.js
 * Description: Test suite for CharacterCreator Duplex stream class
 */

const CharacterCreator = require('../src/character-creator');

describe('CharacterCreator', () => {
  let characterCreator;

  beforeEach(() => {
    characterCreator = new CharacterCreator();
  });

  test("should process data correctly when written to", (done) => {
    const character = { name: 'Aragorn', class: 'Ranger', level: 50 };
    const characterData = JSON.stringify(character);
    
    let output = '';
    
    characterCreator.on('data', (chunk) => {
      output += chunk.toString();
    });

    characterCreator.on('end', () => {
      const result = JSON.parse(output.trim());
      expect(result.name).toBe('Aragorn');
      expect(result.class).toBe('Ranger');
      expect(result.level).toBe(50);
      expect(result.id).toBe(1);
      expect(result.createdAt).toBeDefined();
      done();
    });

    characterCreator.write(characterData, (error) => {
      if (error) return done(error);
      characterCreator.end();
    });
  });

  test("should emit 'error' when invalid data is written", (done) => {
    const invalidCharacter = { name: 'Aragorn' }; // Missing class and level
    
    characterCreator.on('error', (error) => {
      expect(error.message).toContain('Invalid character data');
      done();
    });

    characterCreator.write(JSON.stringify(invalidCharacter));
  });

  test("should transform data correctly when written to", (done) => {
    const character1 = { name: 'Gandalf', class: 'Wizard', level: 100 };
    const character2 = { name: 'Legolas', class: 'Archer', level: 45 };
    
    const results = [];
    
    characterCreator.on('data', (chunk) => {
      const lines = chunk.toString().trim().split('\n');
      lines.forEach(line => {
        if (line) {
          results.push(JSON.parse(line));
        }
      });
    });

    characterCreator.on('end', () => {
      expect(results).toHaveLength(2);
      expect(results[0].id).toBe(1);
      expect(results[0].name).toBe('Gandalf');
      expect(results[0].createdAt).toBeDefined();
      expect(results[1].id).toBe(2);
      expect(results[1].name).toBe('Legolas');
      expect(results[1].createdAt).toBeDefined();
      done();
    });

    characterCreator.write(JSON.stringify(character1), (error) => {
      if (error) return done(error);
      characterCreator.write(JSON.stringify(character2), (error) => {
        if (error) return done(error);
        characterCreator.end();
      });
    });
  });
});