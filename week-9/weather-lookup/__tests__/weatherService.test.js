const {
  CoordinateValidationError,
  WeatherApiError,
  fetchWeather
} = require('../weatherService');

describe('weatherService', () => {
  test('fetchWeather returns temperature, wind, and precipitation', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        current: {
          temperature_2m: 72.5,
          wind_speed_10m: 8.2,
          precipitation: 0.14
        }
      })
    });

    const result = await fetchWeather(42.3601, -71.0589, mockFetch);
    const calledUrl = mockFetch.mock.calls[0][0];

    expect(calledUrl).toContain('temperature_unit=fahrenheit');
    expect(calledUrl).toContain('wind_speed_unit=mph');
    expect(calledUrl).toContain('precipitation_unit=inch');
    expect(result).toEqual({
      temperatureF: 72.5,
      windMph: 8.2,
      precipitationIn: 0.14
    });
  });

  test('fetchWeather throws CoordinateValidationError for invalid coordinates', async () => {
    await expect(
      fetchWeather('not-a-number', -71.0589, jest.fn())
    ).rejects.toBeInstanceOf(CoordinateValidationError);
  });

  test('fetchWeather converts network TypeError into WeatherApiError', async () => {
    const mockFetch = jest.fn().mockRejectedValue(new TypeError('network failure'));

    await expect(
      fetchWeather(42.3601, -71.0589, mockFetch)
    ).rejects.toBeInstanceOf(WeatherApiError);
  });
});

