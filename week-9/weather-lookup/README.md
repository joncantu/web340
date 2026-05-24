# Weather Lookup App

A small modular Node.js command-line application that looks up weather data using the Open-Meteo geocoding and forecast APIs.

## AI Generation Tool
OpenAI GPT-5.4

## Features

- Accepts input in the format: `<city>_<state/province>_<country ISO code>`
- Example:
  - `node app.js Boston_MA_US`
- Looks up:
  - Temperature in Fahrenheit
  - Wind velocity in mph
  - Precipitation in inches
- Uses:
  - `fetch()`
  - async/await
  - Jest tests
  - modular design

## Requirements

- Node.js 18 or later
- npm

Node 18+ is required because this project uses the built-in `fetch()` API.


## Installation

```bash
npm install
```

## Running

EXAMPLES:
```bash
node app.js "New York_NY_US"
node app.js "Cantu_Como_IT"
node app.js "Tokyo_Tokyo_JP"
```

## Testing

```bash
npm test
```

