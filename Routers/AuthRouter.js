const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const { createToken, createRefreshToken } = require('../Library/jwtFunctions');
const passport = require('passport');
require('../Library/userAuthenticationMiddleware');

router.pose("/renewTokens", async(req, res) => {
    // TODO Every time an access token is renewed, the refresh token should be renewed as well.

    // User A has RT 1
    // User A gets RT 2

    // User B gets RT 1

    // How do we know that RT 1 is expired?
})