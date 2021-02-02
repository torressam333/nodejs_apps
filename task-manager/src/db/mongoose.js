const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

//Connect to db
mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String,
    },
    age: {
        typeof: Number
    }
});

const sam = new User({
    name: 'Sam',
    age: '28'
}).save().then(res =>console.log(res)).catch(err => console.log(err));