// game-characters.spec.js
const { GameCharacters } = require("../src/game-characters");
const path = require("path");

describe("GameCharacters", () => {
  let gameCharacters;

  beforeEach(() => {
    gameCharacters = new GameCharacters("game-characters-data.js");
  });

  test("should return game characters data", (done) => {
    gameCharacters.getCharacters((error, data) => {
      expect(error).toBeNull();
      expect(data).not.toBeNull();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty("class");
      expect(data[0]).toHaveProperty("gender");
      expect(data[0]).toHaveProperty("specialAbility");
      done();
    });
  });

  test("should handle an error when the game characters data script is not found", (done) => {
    const gameCharactersNotFound = new GameCharacters("non-existent-script.js");
    gameCharactersNotFound.getCharacters((error, data) => {
      expect(error).not.toBeNull();
      expect(data).toBeNull();
      done();
    });
  });

  test("should handle an error when the game characters data script fails", (done) => {
    const gameCharactersFailing = new GameCharacters("failing-script.js");
    gameCharactersFailing.getCharacters((error, data) => {
      expect(error).not.toBeNull();
      expect(data).toBeNull();
      done();
    });
  });
});
