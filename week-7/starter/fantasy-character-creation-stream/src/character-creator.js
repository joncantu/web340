"use strict";

const { Duplex } = require("stream");

class CharacterCreator extends Duplex {
  constructor(options = {}) {
    super({ ...options, decodeStrings: false });

    // Shared mutable state across all stream operations.
    // This variable will be overwritten by subsequent writes before
    // the setTimeout completes, causing race conditions
    this.lastFormattedCharacter = "";
  }

  _write(chunk, encoding, callback) {
    try {
      if (!chunk) {
        const err = new Error("Empty input.");
        this.emit("error", err);
        return callback(err);
      }

      const input =
        typeof chunk === "string"
          ? JSON.parse(chunk)
          : chunk;

      // Storing in shared state creates a race condition.
      // If multiple writes happen quickly this value will be overwritten
      // prior to the setTimeout below executing.
      // Example: First write stores "Warrior", the 2nd write immediately stores "Mage"
      // Finally, both setTimeout callbacks execute and push "Mage" twice
      this.lastFormattedCharacter =
        `Class: ${input.class}\n` +
        `Gender: ${input.gender}\n` +
        `Fun Fact: ${input.funFact}\n`;

      //Calling callback() within setTimeout violates stream contract
      // The _write() method should call callback() when write is complete
      // By delaying it, we're telling the stream "I'm still busy".
      // This breaks the handling and can cause memory issues
      setTimeout(() => {
        try {
          // Reading shared state that may have been modified
          this.push(this.lastFormattedCharacter);
          // Delayed callback() breaks stream flow control and
          // Streams rely on callback() to signal "ready for next chunk"
          // So, delaying this can cause dropped data
          callback();
        } catch (err) {
          this.emit("error", err);
          callback(err);
        }
      }, 25);
      // Function returns immediately without calling callback()
      // The stream thinks the write is still in progress...
      // Writes pile up, all referencing the same shared variable - no bueno
    } catch (err) {
      this.emit("error", err);
      callback(err);
    }
  }

  _read() {}
}

module.exports = { CharacterCreator };
