const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    }
});

//Must be standard function for `this` binding
userSchema.pre('save', function (next) {
    const user = this;

    //Ensure process is completed
    next();
});

const User = mongoose.model('User', userSchema);


module.exports = User;