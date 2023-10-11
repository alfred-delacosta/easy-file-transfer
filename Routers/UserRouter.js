const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const { createToken } = require('../Library/jwtFunctions');

//TODO Setup passportJs and the JWT here eventually.

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    res.send(userId);
})

router.post('/create', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username.length < 1) {
        res.status(400).send({ msg: 'Username cannot be empty.'});
        return;
    }

    try {
        let newUser = new User();
        // let token = {};

        // Hash the password
        const hash = await argon2.hash(password);

        newUser.username = username;
        newUser.password = hash;

        const savedUser = await newUser.save();

        const token = createToken(savedUser);

        // token = jwt.sign({
        //     data: savedUser
        // }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true })

        res.send({ msg: 'User created successfully.', user: savedUser });
    } catch (error) {
        res.status(400).send({ msg: "There was an error processing the request. ", error });
        
    }
})

router.post('/login', async (req, res) => {
    // TODO Figure out what's going on here with the cookies. For some reason token is coming back as empty...
    const username = req.body.username;
    const password = req.body.password;
    const cookies = req.cookies;

    console.log(cookies.token);
    console.log(req.signedCookies);

    res.send(cookies)
})

module.exports = router;