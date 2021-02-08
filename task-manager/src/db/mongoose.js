const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

//Connect to db
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const Task = mongoose.model('Task', {
   description: {
       type: String,
       required: true,
       trim: true,
   },
    completed: {
       type: Boolean,
        default: false
    }
});

const task = new Task({
    description: 'Do a successful production release today',
    completed: true
}).save().then(response => console.log(response)).catch(err => console.log(err));


const User = mongoose.model('User', {
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

const Rob = new User({
    name: '  Robby  ',
    email: '  ROBBBY@GMAIL.COM  ',
    password: 'MyRealPassHere'
}).save().then(res =>console.log(res)).catch(err => console.log(err));
