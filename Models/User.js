const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: 'A username is required.',
        unique: true
    },
    password: {
        type: String,
        required: 'A password is required.',
        minlength: 8
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;