/**
 * Author: Will Southard
 * Date: November 16, 2025
 * File Name: taco-stand.js
 * Description: TacoStandEmitter class that extends EventEmitter
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
