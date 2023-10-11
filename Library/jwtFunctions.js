const jwt = require('jsonwebtoken');

const createToken = async (savedUser) => {
    const token = jwt.sign({
        data: savedUser
    }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });

    return token;
};

module.exports = {
    createToken
};
