const fetch = require('node-fetch');
const { jest } = require('@jest/globals');

jest.mock('node-fetch');

describe('Weather API Tests', () => {
    const claveApi = '400c8ee64b584d24b0815858242509';
    const idioma = 'es';
    const ciudad = 'Huancayo';
    const apiClimaActual = `http://api.weatherapi.com/v1/current.json?q=${ciudad}&lang=${idioma}&key=${claveApi}`;

    it('should fetch weather data for the specified city', async () => {
        const mockResponse = {
            location: {
                name: 'Huancayo',
                region: '',
                country: 'Peru',
                lat: -12.07,
                lon: -75.2,
                tz_id: 'America/Lima',
                localtime_epoch: 1633036800,
                localtime: '2021-10-01 00:00'
            },
            current: {
                temp_c: 15.0,
                condition: {
                    text: 'Partly cloudy',
                    icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
                    code: 1003
                }
            }
        };

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse)
        });

        const response = await fetch(apiClimaActual);
        const data = await response.json();

        expect(fetch).toHaveBeenCalledWith(apiClimaActual);
        expect(data).toEqual(mockResponse);
    });

    it('should handle fetch errors gracefully', async () => {
        fetch.mockRejectedValue(new Error('Failed to fetch'));

        try {
            await fetch(apiClimaActual);
        } catch (error) {
            expect(error).toEqual(new Error('Failed to fetch'));
        }
    });
});