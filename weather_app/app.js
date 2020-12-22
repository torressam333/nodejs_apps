const geocode = require('./utils/geocodeapi');
const forecast = require('./utils/forecast');

geocode('Buckeye', (error, data) => {
    console.log('Error:', error);
    console.log('Data:', data);
});

forecast(33.3703, -112.5839, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
});