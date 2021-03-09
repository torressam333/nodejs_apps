const express = require('express');
const router = new express.Router();

const Task = require('../models/task');

//Create task endpoint
router.post('/tasks', async (req, res) => {
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
router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        //if tasks are found, send them back
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});

//Find a task by id
router.get('/tasks/:id', async (req, res) => {
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
router.patch('/tasks/:id', async (req, res) => {
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
router.delete('/tasks/:id', async (req, res) => {
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


module.exports = router;