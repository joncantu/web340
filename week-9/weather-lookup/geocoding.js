// geocoding.js

// Custom error for bad user input.
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Custom error for problems talking to the geocoding API.
class GeocodingApiError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'GeocodingApiError';

    if (options.cause) {
      this.cause = options.cause;
    }
  }
}

// Custom error for a valid request that simply finds no location.
class LocationNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LocationNotFoundError';
  }
}

// Parse and validate input like: Boston_MA_US
function parseLocationInput(input) {
  if (typeof input !== 'string') {
    throw new ValidationError('Location input must be a string.');
  }

  const trimmedInput = input.trim();
  const parts = trimmedInput.split('_');

  if (parts.length !== 3) {
    throw new ValidationError(
      'Location input must use the format "<city>_<state/province>_<country code>".'
    );
  }

  const [cityRaw, stateRaw, countryRaw] = parts.map((part) => part.trim());

  if (!cityRaw || !stateRaw || !countryRaw) {
    throw new ValidationError(
      'City, state/province, and country code must all be provided.'
    );
  }

  if (!/^[A-Za-z]{2}$/.test(countryRaw)) {
    throw new ValidationError(
      'Country code must be a 2-letter ISO 3166-1 alpha-2 code.'
    );
  }

  return {
    city: cityRaw,
    stateOrProvince: stateRaw,
    countryCode: countryRaw.toUpperCase()
  };
}

// Build the geocoding URL.
// We use the city and country code to narrow results.
function buildGeocodingUrl(city, countryCode) {
  const baseUrl = 'https://geocoding-api.open-meteo.com/v1/search';
  const params = new URLSearchParams({
    name: city,
    count: '10',
    countryCode
  });

  return `${baseUrl}?${params.toString()}`;
}

// Normalize text so comparisons are case-insensitive and punctuation-insensitive.
function normalizeText(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

// Choose the best result from the API response.
function selectBestResult(results, stateOrProvince, countryCode) {
  const normalizedCountry = normalizeText(countryCode);
  const normalizedState = normalizeText(stateOrProvince);

  // First keep only the requested country.
  const countryMatches = results.filter(
    (result) => normalizeText(result.country_code) === normalizedCountry
  );

  if (countryMatches.length === 0) {
    return null;
  }

  // Best effort: if admin1 is available and matches the provided state/province,
  // use that result. Otherwise, fall back to the first country match.
  const stateMatch = countryMatches.find(
    (result) => normalizeText(result.admin1) === normalizedState
  );

  return stateMatch || countryMatches[0];
}

// Main exported async function for geocoding.
async function lookupCoordinates(locationInput, fetchImpl = globalThis.fetch) {
  if (typeof fetchImpl !== 'function') {
    throw new TypeError('A fetch implementation is required.');
  }

  // Capture local state before async work begins.
  const { city, stateOrProvince, countryCode } = parseLocationInput(locationInput);
  const requestUrl = buildGeocodingUrl(city, countryCode);

  let response;
  try {
    response = await fetchImpl(requestUrl);
  } catch (error) {
    // Only convert known network-style errors.
    if (error instanceof TypeError) {
      throw new GeocodingApiError(
        'Network error while contacting the geocoding service.',
        { cause: error }
      );
    }

    // Re-throw unexpected errors so bugs are not hidden.
    throw error;
  }

  if (!response.ok) {
    throw new GeocodingApiError(
      `Geocoding request failed with status ${response.status}.`
    );
  }

  let payload;
  try {
    payload = await response.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new GeocodingApiError('Geocoding service returned invalid JSON.', {
        cause: error
      });
    }

    throw error;
  }

  if (!Array.isArray(payload.results) || payload.results.length === 0) {
    throw new LocationNotFoundError(
      `No location found for ${city}, ${stateOrProvince}, ${countryCode}.`
    );
  }

  const bestMatch = selectBestResult(payload.results, stateOrProvince, countryCode);

  if (
    !bestMatch ||
    typeof bestMatch.latitude !== 'number' ||
    typeof bestMatch.longitude !== 'number'
  ) {
    throw new GeocodingApiError(
      'Geocoding response did not include valid coordinates.'
    );
  }

  return {
    name: bestMatch.name,
    stateOrProvince: bestMatch.admin1 || stateOrProvince,
    countryCode: bestMatch.country_code || countryCode,
    latitude: bestMatch.latitude,
    longitude: bestMatch.longitude
  };
}

module.exports = {
  ValidationError,
  GeocodingApiError,
  LocationNotFoundError,
  parseLocationInput,
  lookupCoordinates
};
