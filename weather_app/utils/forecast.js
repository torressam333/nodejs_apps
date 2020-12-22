const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_KEY}&query=${latitude},${longitude}&units=f`;
    request({
        url: url,
        json: true,

    }, (error, response) => {
        let data = response.body.current;

        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (response.body.error) {
            callback('Unable to find the location.', undefined);
        } else {
            callback(undefined, "The forecast is " + data.weather_descriptions[0] + ". The current temperature is " +
                data.temperature + " degrees and it feels like " + data.feelslike + " outside.");
        }
    });
};

module.exports = forecast;