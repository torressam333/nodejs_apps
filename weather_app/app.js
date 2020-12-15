const request = require('postman-request');

const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_KEY}&query=37.8267,-122.4233&units=f`;

request({
    url: url,
    json: true,
}, (error, response) => {
    let data = response.body.current;

    console.log(`${data.weather_descriptions[0]} 
         It is currently ${data.temperature} degrees and it feels like ${data.feelslike} outside.`);
});