const request = require('postman-request');
const geocode = require('./utils/geocodeapi');

/*
const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_KEY}&query=37.8267,-122.4233&units=f`;

request({
    url: url,
    json: true,
}, (error, response) => {
    let data = response.body.current;

    if (error) {
        console.log('Unable to connect to weather service')
    } else if (response.body.error) {
        console.log('Unable to find specified location. Please double check entered address')
    }else{
        console.log("The forecast is " + data.weather_descriptions[0] + ". The current temperature is " +
            data.temperature + " degrees and it feels like " + data.feelslike + " outside.");
    }
});
*/


geocode('Mecca', (error, data) => {
    console.log('Error:', error);
    console.log('Data:', data);
});