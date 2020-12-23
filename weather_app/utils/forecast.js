const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_KEY}&query=${latitude},${longitude}&units=f`;
    request({
        url,
        json: true,

    }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (body.error) {
            callback('Unable to find the location.', undefined);
        } else {
            callback(undefined, "The forecast is " + body.current.weather_descriptions[0] + ". The current temperature is " +
                body.current.temperature + " degrees and it feels like " + body.current.feelslike + " outside.");
        }
    });
};

module.exports = forecast;