// weatherService.js

// Error for invalid coordinates passed into the weather service.
class CoordinateValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CoordinateValidationError';
  }
}

// Error for problems with the weather API itself.
class WeatherApiError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'WeatherApiError';
    if (options.cause) {
      this.cause = options.cause;
    }
  }
}

// Build the weather URL using the required units from the assignment.
function buildWeatherUrl(latitude, longitude) {
  const baseUrl = 'https://api.open-meteo.com/v1/forecast';
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,wind_speed_10m,precipitation',
    temperature_unit: 'fahrenheit',
    wind_speed_unit: 'mph',
    precipitation_unit: 'inch'
  });

  return `${baseUrl}?${params.toString()}`;
}

// Fetch weather data for the provided coordinates.
async function fetchWeather(latitude, longitude, fetchImpl = globalThis.fetch) {
  if (typeof fetchImpl !== 'function') {
    throw new TypeError('A fetch implementation is required.');
  }

  // Capture numeric state before awaiting.
  const lat = Number(latitude);
  const lon = Number(longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    throw new CoordinateValidationError(
      'Latitude and longitude must be finite numbers.'
    );
  }

  const requestUrl = buildWeatherUrl(lat, lon);

  let response;
  try {
    response = await fetchImpl(requestUrl);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new WeatherApiError(
        'Network error while contacting the weather service.',
        { cause: error }
      );
    }

    throw error;
  }

  if (!response.ok) {
    throw new WeatherApiError(
      `Weather request failed with status ${response.status}.`
    );
  }

  let payload;
  try {
    payload = await response.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new WeatherApiError('Weather service returned invalid JSON.', {
        cause: error
      });
    }

    throw error;
  }

  const current = payload.current;

  if (
    !current ||
    typeof current.temperature_2m !== 'number' ||
    typeof current.wind_speed_10m !== 'number' ||
    typeof current.precipitation !== 'number'
  ) {
    throw new WeatherApiError(
      'Weather response did not include the expected current conditions.'
    );
  }

  return {
    temperatureF: current.temperature_2m,
    windMph: current.wind_speed_10m,
    precipitationIn: current.precipitation
  };
}

module.exports = {
  CoordinateValidationError,
  WeatherApiError,
  fetchWeather
};
