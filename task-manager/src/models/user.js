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
    }
});

//Hash plain text pw before saving
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    //Ensure process is completed
    next();
});

/*Authenticate user*/
userSchema.statics.findByCredentials =  async (email, password) => {
    const user = await User.findOne({email: email});

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }


    return user;
};

const User = mongoose.model('User', userSchema);

User.createIndexes();

module.exports = User;