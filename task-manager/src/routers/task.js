const express = require('express');
const router = new express.Router();
const auth = require('../middleware/authentication');

const Task = require('../models/task');

//Create task endpoint and associate with a specific owner
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();

        //runs if save promise is fulfilled
        res.status(201).send(task);
    }catch (e) {
        res.status(400).send(e);
    }
});

//Fetch all tasks belonging to a specific user
router.get('/tasks', auth, async (req, res) => {
    try {
       await req.user.populate('tasks').execPopulate();

        //if tasks are found, send them back
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send();
    }
});

//Find a task by id
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({
            _id,
            owner: req.user._id //auth user's id
        });

        if (!task) {
            return res.status(404).send('Task not found');
        }

        res.send(task);

    }catch (e) {
        res.status(500).send();
    }
});

//Auth user tp update their specific tasks by their _id
router.patch('/tasks/:id', auth, async (req, res) => {
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
        //Mongoose middleware application
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id //auth user's id
        });

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => task[update] = req.body[update]);

        await task.save();

        res.send(task);
    }catch (e) {
        res.status(400).send(e);
    }
});

//Delete individual task
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!task) {
            res.status(404).send('Task not found');
        }

        res.send(task);
    }catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;