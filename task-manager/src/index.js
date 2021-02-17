/*Initial entry for application*/
const express = require('express');

//DB Conn file
require('./db/mongoose');

const User = require('./models/user');
const Task = require('./models/task');

//Init express
const app = express();

//Heroku or local
const port = process.env.PORT || 3000;

//Auto parse incoming json to an object
app.use(express.json());

//Create user endpoint
app.post('/users', (req, res) => {
    //Create user instance
    const user = new User(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((err) => {
        res.status(400)
            .send(err.message)
    });
});

//Create task endpoint
app.post('/tasks', (req, res) => {
    //Init task
    const task = new Task(req.body);
    //persist task
    task.save().then(() => {
        res.status(201).send(task);
    }).catch((err) => {
        res.status(400).send(err.message);
    });
});


//Fetch all users using Mongoose
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users) //sends back all users in response
    }).catch((error) => {
        res.status(500).send(error.message);
    })
});

//Find user by id
app.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(400).send('User not found');
        }

        res.send(user);

    }).catch(error => res.status(500).send(error.message));
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})