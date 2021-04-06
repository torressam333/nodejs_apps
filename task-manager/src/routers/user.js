const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/authentication');

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

//(log in route)
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

//Log out route (individual token)
router.post('/users/logout', auth, async (req, res) => {
   try{
       //Delete specific token from tokens array
       req.user.tokens = req.user.tokens.filter((token) => {
           //If the token in question is not the one we are
           //looking for then keep it in the tokens array
          return token.token !== req.token;
       });

       await req.user.save();

       res.send();
   } catch (e) {
       res.status(500).send(e.message);
   }
});

//Logout of all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        //Delete all tokens
        req.user.tokens = [];

        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send(e.message);
    }
});

//Each user loads their own profile
router.get('/users/me', auth, async (req, res) => {
    //Allow user to get their profile once authenticated
    res.send(req.user);
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
router.delete('/users/me', auth, async (req, res) => {
    try {
        //Remove authenticated user
       await req.user.remove();

       res.send(req.user);
    }catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;
