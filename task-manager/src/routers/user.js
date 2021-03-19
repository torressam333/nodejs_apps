const express = require('express');
const router = new express.Router();
const User = require('../models/user');

//Fetch all users using Mongoose
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        //runs if users are found
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
});

//Create user endpoint (sign up)
router.post('/users', async (req, res) => {
    //Create user instance
    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken();

        await user.save();
        //runs if save promise is fulfilled
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e)
    }
});

router.post('/users/login', async (req, res) => {
    try {
        //Call reusable auth method
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({user, token});
    }catch (e) {
        res.status(400).send(e);
    }
});

//Find user by id
router.get('/users/:id', async (req, res) => {
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
router.patch('/users/:id', async (req, res) => {
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
        /*Forces update method/route to recognize mongoose middleware
        * ln(65-71)
        */
        const user = await User.findById(_id);

        //dynamically updates whatever property on user that is being updated ('name, pw, email')
        updates.forEach((update) => user[update] = req.body[update]);

        //Execute middleware
        await user.save();

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
router.delete('/users/:id', async (req, res) => {
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


module.exports = router;
