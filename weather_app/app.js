const geocode = require('./utils/geocodeapi');
const forecast = require('./utils/forecast');
const address = process.argv[2];

geocode(address, (error, geocodeData) => {
    if (error) {
        return error;
    } else if (!address) {
        return console.log('Error: An address is required');
    }

    //forecast input comes from geocode output
    forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
        if (error) {
            return error;
        }
        console.log(geocodeData.location);
        console.log(forecastData);
    });
});
