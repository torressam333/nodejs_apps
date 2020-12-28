const express = require('express');
const path = require('path');

const app = express();
const publicDir = path.join(__dirname, '../public');

//Serve up directory(s)
app.use(express.static(publicDir));
app.use(express.static(publicDir + '/about.html'));
app.use(express.static(publicDir + '/help.html'));

/*
* Configure what the server should do when someone tries to get the resource
* at a specific URL in our domain.
* DOCS: https://expressjs.com/en/4x/api.html#app.get
*/

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