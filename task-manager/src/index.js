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
app.post('/users', async (req, res) => {
    //Create user instance
    const user = new User(req.body);

    try {
        await user.save();
        //runs if save promise is fulfilled
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e)
    }
});

//Fetch all users using Mongoose
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        //runs if users are found
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
});

//Find user by id
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try{
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).send()
        }
        res.send(user);
    } catch (e) {
        res.status(500).send()
    }
});

//Update a specific user
app.patch('/users/:id', async (req, res) => {
    //Error handling for updating non-existent/restricted(_id) properties on user
    const updates = Object.keys(req.body); //array of strings
    const allowedUpdates = ['name', 'email', 'password', 'age'];

    //Every string in update must match strings in allowedUpdates array
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    const _id = req.params.id;

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send();
        }

        //If all went well
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

//Delete individual user
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            res.status(404).send('User not found');
        }

        res.send(user);
    }catch (e) {
        res.status(500).send(e);
    }
});


//Create task endpoint
app.post('/tasks', async (req, res) => {
    //Init task
    const task = new Task(req.body);

    try {
        await task.save();

        //runs if save promise is fulfilled
        res.status(201).send(task);
    }catch (e) {
        res.status(400).send(e);
    }
});

//Fetch all tasks
app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        //if tasks are found, send them back
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});

//Find a task by id
app.get('/tasks/:id', async (req, res) => {
   const _id = req.params.id;

   try {
       const task = await Task.findById(_id);

       if (!task) {
           return res.status(404).send('Task not found by that ID');
       }

       res.send(task);

   }catch (e) {
       res.status(500).send();
   }
});

//Update a specific task by its _id
app.patch('/tasks/:id', async (req, res) => {
    //Error handling for updating non-existent/restricted(_id) properties on user
    const updates = Object.keys(req.body); //array of strings
    const allowedUpdates = ['completed', 'description'];

    //Every string in update must match strings in allowedUpdates array
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    //If parameters don't match column names
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidator: true});

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    }catch (e) {
        res.status(400).send(e);
    }
});

//Delete individual task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            res.status(404).send('Task not found');
        }

        res.send(task);
    }catch (e) {
        res.status(500).send(e);
    }
});

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})