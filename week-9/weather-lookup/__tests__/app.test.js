const { run } = require('../app');

describe('app', () => {
  test('run prints a formatted weather report using injected dependencies', async () => {
    const lookupCoordinates = jest.fn().mockResolvedValue({
      name: 'Boston',
      stateOrProvince: 'Massachusetts',
      countryCode: 'US',
      latitude: 42.3601,
      longitude: -71.0589
    });

    const fetchWeather = jest.fn().mockResolvedValue({
      temperatureF: 70,
      windMph: 11,
      precipitationIn: 0.2
    });

    const output = jest.fn();

    const report = await run('Boston_MA_US', {
      lookupCoordinates,
      fetchWeather,
      output
    });

    expect(lookupCoordinates).toHaveBeenCalledWith('Boston_MA_US');
    expect(fetchWeather).toHaveBeenCalledWith(42.3601, -71.0589);
    expect(output).toHaveBeenCalledWith(report);
    expect(report).toContain('Weather for Boston, Massachusetts, US');
    expect(report).toContain('Temperature (F): 70');
  });

  test('run captures the input value before async work continues', async () => {
    let observedInput = null;

    const lookupCoordinates = jest.fn(async (input) => {
      // Wait one microtask turn so the test can mutate outer variables.
      await Promise.resolve();
      observedInput = input;

      return {
        name: 'Boston',
        stateOrProvince: 'Massachusetts',
        countryCode: 'US',
        latitude: 42.3601,
        longitude: -71.0589
      };
    });

    const fetchWeather = jest.fn().mockResolvedValue({
      temperatureF: 65,
      windMph: 7,
      precipitationIn: 0
    });

    const output = jest.fn();

    let rawInput = 'Boston_MA_US';
    const runPromise = run(rawInput, {
      lookupCoordinates,
      fetchWeather,
      output
    });

    // Change the outer variable after run() has already started.
    rawInput = 'Paris_ID_FR';

    await runPromise;

    expect(observedInput).toBe('Boston_MA_US');
  });
});

