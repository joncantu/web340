"use strict";

const { readFile, writeFile, mkdir } = require("fs").promises;
const path = require("path");

const CHARACTER_FILE_NAME = "character.json";
const DATA_DIR_NAME = "data";

//process.cwd() is problematic in CI/CD. Use __dirname and navigate from there.
const DATA_DIR_PATH = path.join(__dirname, "..", DATA_DIR_NAME);
const STABLE_FILE_PATH = path.join(DATA_DIR_PATH, CHARACTER_FILE_NAME);

/**
 * Encodes character data into JSON and writes it to a stable file path. NOTE: The JSON
 * is kept compact (no extra whitespace) for testing consistency.
 */
async function writeCharacter(character) {
  const filePath = STABLE_FILE_PATH;

  await mkdir(DATA_DIR_PATH, { recursive: true });

  const data = JSON.stringify(character, null, 0);

  await writeFile(filePath, data, "utf8");
  return true;
}

/**
 * Reads and parses character data from the stable file path.
 */
async function readCharacter() {
  const filePath = STABLE_FILE_PATH;

  try {
    const rawData = await readFile(filePath, "utf8");

    return JSON.parse(rawData);
  } catch (err) {
    if (err.code === "ENOENT") {
      return null;
    }
    throw err;
  }
}

module.exports = {
  STABLE_FILE_PATH,
  CHARACTER_FILE: CHARACTER_FILE_NAME,
  writeCharacter,
  readCharacter
};
