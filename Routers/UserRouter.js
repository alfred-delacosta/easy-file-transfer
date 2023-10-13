const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const { createToken } = require('../Library/jwtFunctions');

//TODO Setup passportJs and the JWT here eventually.

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

        const token = await createToken(savedUser);

        // token = jwt.sign({
        //     data: savedUser
        // }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true })

        res.send({ msg: 'User created successfully.', user: savedUser });
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: "There was an error processing the request. ", error });
        
    }
})

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = (await User.find({ username: username }))[0];
    
    // Check to see if the login is correct
    if (await argon2.verify(user.password, password)) {
        const token = await createToken(user);

        res.cookie('token', token, { httpOnly: true })

        res.send(user);
        return;
    }

    res.send("No user found!")
})

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    res.send(userId);
})

module.exports = router;