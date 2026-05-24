const {
  ValidationError,
  LocationNotFoundError,
  parseLocationInput,
  lookupCoordinates
} = require('../geocoding');

describe('geocoding', () => {
  test('parseLocationInput parses valid input and normalizes country code', () => {
    const result = parseLocationInput('Boston_MA_us');

    expect(result).toEqual({
      city: 'Boston',
      stateOrProvince: 'MA',
      countryCode: 'US'
    });
  });

  test('intentional failure scenario: invalid input format throws ValidationError', async () => {
    await expect(
      lookupCoordinates('Boston-US', async () => {
        throw new Error('fetch should not be called for invalid input');
      })
    ).rejects.toBeInstanceOf(ValidationError);
  });

  test('lookupCoordinates returns coordinates from the geocoding API', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        results: [
          {
            name: 'Boston',
            admin1: 'Massachusetts',
            country_code: 'US',
            latitude: 42.3601,
            longitude: -71.0589
          }
        ]
      })
    });

    const result = await lookupCoordinates('Boston_MA_US', mockFetch);
    const calledUrl = mockFetch.mock.calls[0][0];

    expect(calledUrl).toContain('name=Boston');
    expect(calledUrl).toContain('countryCode=US');
    expect(result).toEqual({
      name: 'Boston',
      stateOrProvince: 'Massachusetts',
      countryCode: 'US',
      latitude: 42.3601,
      longitude: -71.0589
    });
  });

  test('lookupCoordinates throws LocationNotFoundError when no results are returned', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        results: []
      })
    });

    await expect(
      lookupCoordinates('Nowhere_XX_US', mockFetch)
    ).rejects.toBeInstanceOf(LocationNotFoundError);
  });
});
