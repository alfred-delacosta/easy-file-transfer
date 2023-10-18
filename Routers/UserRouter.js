const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const { createToken, createRefreshToken } = require('../Library/jwtFunctions');
const passport = require('passport');
require('../Library/userAuthenticationMiddleware');

router.post('/create', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username.length < 1) {
        res.status(400).send({ msg: 'Username cannot be empty.'});
        return;
    }

    try {
        let newUser = new User();

        // Hash the password
        const hash = await argon2.hash(password);

        newUser.username = username;
        newUser.password = hash;

        const savedUser = await newUser.save();

        const token = await createToken(savedUser);
        const refreshToken = await createRefreshToken(savedUser);

        res.cookie('refreshToken', refreshToken, { httpOnly: true });

        res.send({ msg: 'User created successfully.', token });
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "There was an error processing the request. ", error });
        
    }
})

// TODO This will be used to determine if the user needs to login again when clicking on the /login route. May not need it though...
router.get('/login', passport.authenticate('jwt', { session: false}), async (req, res) => {
    res.send(true);
})

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username });
    
    // Check to see if the login is correct
    if (await argon2.verify(user.password, password)) {
        const token = await createToken(user);
        const refreshToken = await createRefreshToken(user);

        res.cookie('refreshToken', refreshToken, { httpOnly: true })

        res.send({ token });
        return;
    } else {
        res.send("No user found!")
    }
})

// TODO Remove this eventually. This is just used for testing.
router.get('/protectedRoute/:userId', passport.authenticate('jwt', { session: false}), async (req, res) => {
    const userId = req.params.userId;

    res.send(userId);
})

module.exports = router;