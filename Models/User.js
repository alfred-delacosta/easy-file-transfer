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
    },
    expiredRefreshTokens: [{
        type: String
    }]
});

userSchema.methods.addExpiredRefreshToken = function (token) {
    if (this.expiredRefreshTokens.length >= 5) {
        // Remove the first token that was pushed onto the array.
        this.expiredRefreshTokens.shift();
    }

    try {
        this.expiredRefreshTokens.push(token);
        return this.expiredRefreshTokens;   
    } catch (error) {
        return error;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;