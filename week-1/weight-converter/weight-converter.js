/**
 * Author: Jonathan Cantu
 * Date:   March 29, 2026
 * File Name: weight-converter.js
 * Description:
*/

"use strict";

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('Usage: node weight-converter.js <pounds>');
  process.exit(1);
}

const poundsInput = args[0];
const pounds = parseFloat(poundsInput);

if (Number.isNaN(pounds)) {
  console.error('Input must be a number.');
  process.exit(1);
}

const KG_PER_POUND = 0.45359237;
const kilograms = pounds * KG_PER_POUND;

console.log(`${kilograms.toFixed(2)}`);

