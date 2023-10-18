const jwt = require('jsonwebtoken');

const createToken = async (savedUser) => {
    const token = jwt.sign({
        _id: savedUser._id,
        username: savedUser.username
    }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });

    return token;
};

const createRefreshToken = async (savedUser) => {
    const refreshToken = jwt.sign({
        id: savedUser,
        issueDate: Date.now()

    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN});

    return refreshToken;
};

module.exports = {
    createToken,
    createRefreshToken
};
