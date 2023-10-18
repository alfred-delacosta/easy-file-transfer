const jwt = require('jsonwebtoken');

const createToken = async (user) => {
    const token = jwt.sign({
        _id: user._id,
        username: user.username
    }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });

    return token;
};

const createRefreshToken = async (user) => {
    const refreshToken = jwt.sign({
        id: user._id,
        issueDate: Date.now()

    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN});

    return refreshToken;
};

module.exports = {
    createToken,
    createRefreshToken
};
