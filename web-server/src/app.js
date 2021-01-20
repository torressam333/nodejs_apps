const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocodeapi');
const forecast = require('./utils/forecast');
require('dotenv').config();

/*Initialize express.js*/
const app = express();

/*Define paths for Express config*/
const publicDir = path.join(__dirname, '../public');

/*Where express will look for handlebar files*/
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

/*Set up Handlebars and express 'views' engine and location*/
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

/*Serve up directory for js and css*/
app.use(express.static(publicDir));

/*
* 1. Configure what the server should do when someone tries to get the resource
* at a specific URL in our domain.
* 2. res.render sends through the route name along with optional data
* which can be used in the view(handlebars files) in {{title}} syntax.
* DOCS:
* https://expressjs.com/en/4x/api.html#res.render
* https://expressjs.com/en/4x/api.html#app.get
*/

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Samuel Torres'
    });
});

app.get('/about', (req, res) => {
   res.render('about', {
       title: 'About',
       name: 'Samuel Torres'
   });
});

app.get('/help', (req, res) => {
   res.render('help', {
       title: 'Help Page',
       name: 'Samuel Torres',
       helpText: 'Do you need help? If so ensure you have followed all troubleshooting steps prior to contacting one' +
           'of our agents.',
   });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({error: 'You must provide an address'});
    }

        geocode(address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({ error });
            }

            //forecast input comes from geocode output (destructured)
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }

                //If all went well send back proper data
                res.send(
                    {
                        forecast: forecastData,
                        location: location,
                        address: address
                    }
                );
            });
        });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        notfoundMessage: 'Help article not found',
        name: 'Samuel Torres'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        notfoundMessage: 'Page not found',
        name: 'Samuel Torres'
    });
});

//Start express server (local): http://localhost:3000/
app.listen(3000, () => {
    console.log('starting server on port 3000...');
});