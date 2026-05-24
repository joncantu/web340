// app.js

const {
  ValidationError,
  GeocodingApiError,
  LocationNotFoundError,
  lookupCoordinates
} = require('./geocoding');

const {
  CoordinateValidationError,
  WeatherApiError,
  fetchWeather
} = require('./weatherService');

// Format the final report for display in the terminal.
function formatWeatherReport(location, weather) {
  return [
    `Weather for ${location.name}, ${location.stateOrProvince}, ${location.countryCode}`,
    `Temperature (F): ${weather.temperatureF}`,
    `Wind Velocity (mph): ${weather.windMph}`,
    `Precipitation (in): ${weather.precipitationIn}`
  ].join('\n');
}

// Main application runner.
// Dependencies can be injected for tests, which keeps the code modular
// and avoids reliance on shared global state.
async function run(rawInput, dependencies = {}) {
  const lookupCoordinatesFn = dependencies.lookupCoordinates || lookupCoordinates;
  const fetchWeatherFn = dependencies.fetchWeather || fetchWeather;
  const output = dependencies.output || console.log;

  // Capture input immediately so async work never reads mutable outside state later.
  const input = String(rawInput ?? '').trim();

  const location = await lookupCoordinatesFn(input);

  // Capture coordinate values before the next async operation.
  const { latitude, longitude } = location;
  const weather = await fetchWeatherFn(latitude, longitude);

  const report = formatWeatherReport(location, weather);
  output(report);

  return report;
}

// CLI entry point.
if (require.main === module) {
  const [, , rawInput] = process.argv;

  run(rawInput).catch((error) => {
    // Handle known error types explicitly.
    if (
      error instanceof ValidationError ||
      error instanceof LocationNotFoundError ||
      error instanceof GeocodingApiError ||
      error instanceof CoordinateValidationError ||
      error instanceof WeatherApiError
    ) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
      return;
    }

    // Unexpected errors are surfaced separately so they are not hidden.
    console.error('Unexpected error:', error);
    process.exitCode = 99;
  });
}

module.exports = {
  run,
  formatWeatherReport
};

