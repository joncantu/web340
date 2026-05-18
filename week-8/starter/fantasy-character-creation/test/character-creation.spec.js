"use strict";

const fs = require("fs").promises;
const path = require("path");
const {
  writeCharacter,
  readCharacter,
  STABLE_FILE_PATH,
} = require("../src/character-creation");

const TEST_DIR = path.dirname(STABLE_FILE_PATH);

describe("File System Character Creation", () => {
  // Ensure a clean environment before each test - vital for consistent TDD results.
  beforeEach(async () => {
    try {
      await fs.unlink(STABLE_FILE_PATH);
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }
  });

  test("writes character data to a stable path", async () => {
    const characterData = {
      class: "Warrior",
      gender: "Male",
      funFact: "Hates spiders.",
    };

    // Execution order (wait for completion)
    const result = await writeCharacter(characterData);
    expect(result).toBe(true); // Confirms successful write.

    // Explicitly read the raw file to verify it's not double-stringified.
    const rawData = await fs.readFile(STABLE_FILE_PATH, "utf8");
    expect(rawData).toBe(JSON.stringify(characterData));

    // No shared variable
    await expect(fs.access(STABLE_FILE_PATH)).resolves.toBeUndefined();
  });

  test("reads character data and returns a reliable OBJECT", async () => {
    const inputCharacter = {
      class: "Mage",
      spell: "Fireball",
    };

    await writeCharacter(inputCharacter);

    const resultData = await readCharacter();

    expect(typeof resultData).toBe("object");
    expect(resultData).not.toBeNull(); //
    expect(resultData).toEqual(inputCharacter);
  });

  test("handles missing-file scenarios in a controlled way", async () => {
    const result = await readCharacter();

    expect(result).toBeNull();
  });
});
