/*Middleware to ensure the user is authenticated
* when attempting to perform particular actions
* within the application
* */
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        //Get auth header/bearer token value
        const token = req.header('Authorization').replace('Bearer ', '');

        //Validate token
        const decoded = jwt.verify(token, 'supersimplesecret');

        //Find related user and match token to one of their existing tokens
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

        if (!user) throw new Error();

        //Ensure route handler runs and has access to fetched user
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({error: 'Please authenticate'});
    }
}

module.exports = auth;

