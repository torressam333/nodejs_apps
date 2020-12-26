const express = require('express');

const app = express();

/*
* Configure what the server should do when someone tries to get the resource
* at a specific URL in our domain.
* DOCS: https://expressjs.com/en/4x/api.html#app.get
*/
app.get('', (req, res) => {
    res.send('Hello express!');
});

app.get('/help', (req, res) => {
    res.send('Help Page!');
});

app.get('/about', (req, res) => {
    res.send('<h1>About express</h1>');
});

app.get('/weather', (req, res) => {
   res.send('<h1>Show Weather</h1>');
});

//Start server (local): http://localhost:3000/
app.listen(3000, () => {
    console.log('starting server on port 3000...');
});