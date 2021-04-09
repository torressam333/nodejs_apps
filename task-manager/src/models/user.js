const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password must be at least 6 characters'],
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Your password cannot contain the keyword of password')
            }
        }
    },
    tokens : [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

/*Virtual property
* ref: https://futurestud.io/tutorials/understanding-virtuals-in-mongoose
*/
userSchema.virtual('tasks', {
    ref: 'Task', //Relationship to Task model
    localField: '_id',
    foreignField: 'owner'
});

//Only send back non-sensitive data in the response
userSchema.methods.toJSON = function () {
    const user = this;

    //Get back raw obj of user data (mongoose method)
    const userObject = user.toObject();

    //Delete private data from user obj
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

//Hash plain text pw before saving
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    //Ensure process is completed
    next();
});

/*Reusable method to generate JWT for users*/
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'supersimplesecret');

    //Add token to array and save to user table
    user.tokens = user.tokens.concat({token:token});
    //Persist
    await user.save();

    return token;
}

/*Authenticate user - works as middleware*/
userSchema.statics.findByCredentials =  async (email, password) => {
    const user = await User.findOne({email: email});

    if (!user) {
        throw new Error('Unable to login');
    }

    //Compare pw typed in at login to pw from the db belonging to the email
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
};

const User = mongoose.model('User', userSchema);

//Check for duplicate emails
User.createIndexes();

module.exports = User;