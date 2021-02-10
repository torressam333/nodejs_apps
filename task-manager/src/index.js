/*Initial entry for application*/
const express = require('express');

//DB Conn file
require('./db/mongoose');

const User = require('./models/user');

//Init express
const app = express();

//Heroku or local
const port = process.env.PORT || 3000;

//Auto parse incoming json to an object
app.use(express.json())

app.post('/users', (req, res) => {
    //Create user instance
    const user = new User(req.body);
    user.save().then(() => {
        res.send(user);
    }).catch((err) => {
        res.status(400)
            .send(err.message)
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})