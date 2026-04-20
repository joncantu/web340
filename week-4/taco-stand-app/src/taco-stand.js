/**
 * Author: Jonathan Cantu
 * Date:   April 19, 2026
 * File Name: taco-stand.js
 * Description: TacoStandEmitter implementation.
 */

"use strict";

const EventEmitter = require("events");

class TacoStandEmitter extends EventEmitter {
  serveCustomer(customer) {
    this.emit("serve", customer);
  }

  prepareTaco(taco) {
    this.emit("prepare", taco);
  }

  handleRush(rush) {
    this.emit("rush", rush);
  }
}

module.exports = TacoStandEmitter;
