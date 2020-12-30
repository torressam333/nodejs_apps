const express = require('express');
const path = require('path');

const app = express();
const publicDir = path.join(__dirname, '../public');

//Set up Handlebars
app.set('view engine','hbs');

//Serve up directory for js and css
app.use(express.static(publicDir));

/*
* Configure what the server should do when someone tries to get the resource
* at a specific URL in our domain.
* DOCS: https://expressjs.com/en/4x/api.html#app.get
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
       helpText: 'Do you need help? If so ensure you have followed all troubleshooting steps prior to contacting one' +
           'of our agents. Thank you.',
   });
});

app.get('/weather', (req, res) => {
    res.send(
        {
            forecast: 'Cloudy with a chance of meatballs',
            location: 'Buckeye AZ'
        }
    );
});

//Start express server (local): http://localhost:3000/
app.listen(3000, () => {
    console.log('starting server on port 3000...');
});