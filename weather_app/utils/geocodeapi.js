const request = require('postman-request');

//Single Reusable geocode function
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" +
        process.env.MAPBOX_TOKEN + "&limit=1";

    request({
        url,
        json: true
    }, (error, { body }) => {
        //Runs when request completes
        if (error) {
            //Send to callback in geocode call
            callback('Unable to connect to geolocation services', undefined);
        } else if (body.features.length === 0) {
            callback('No matching locations found', undefined);
        } else {
            const locationData = {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            }

            callback(undefined, locationData);
        }
    });
};

//To be used elsewhere
module.exports = geocode;