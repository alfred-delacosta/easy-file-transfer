const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const { createToken, createRefreshToken } = require('../Library/jwtFunctions');
const passport = require('passport');
require('../Library/userAuthenticationMiddleware');

router.post("/renewTokens", passport.authenticate('jwt', { session: false}), async (req, res) => {
    // Every time the user requests a new access token, a new refresh token will be sent as well. The old token will be saved in the DB
    // to ensure that it can no longer be used.
    try {
        const user = await User.findById(req.user._id);
        user.addExpiredRefreshToken(req.cookies.refreshToken);
        await user.save();
    
        const token = await createToken(user);
        const refreshToken = await createRefreshToken(user);
    
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
    
        res.send({ token });   
    } catch (error) {
        res.status(400).send({ msg: "There was an error.", error });
    }
});

module.exports = router;