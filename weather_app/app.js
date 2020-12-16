const request = require('postman-request');

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


/*
//Api url
const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${process.env.MAPBOX_TOKEN}&limit=1`;

//Api request
request({
    url: mapboxUrl,
    json: true,
}, (error, response) => {
    let mapboxData = response.body;
    let coordinates = mapboxData.features[0].center;

    console.table("Longitude: " + coordinates[0] + " Latitude: " + coordinates[1]);
});*/
