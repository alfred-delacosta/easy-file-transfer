/**
 * This file is based on the following:
 * https://www.passportjs.org/packages/passport-jwt/
 */
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../Models/User');

const extractJwtFromCookie = (req) => {
    if (req && req.cookies) {
        return req.cookies.refreshToken;
    } else {
        return false;
    }
}

let opts = {};
opts.jwtFromRequest = extractJwtFromCookie;
opts.secretOrKey = process.env.REFRESH_TOKEN_SECRET;
opts.passReqToCallback = true;

passport.use(new JwtStrategy(opts, async function(req, jwt_payload, done) {
    const user = await User.findById(jwt_payload.id);

    // Confirm that the refreshToken is not in the expired list
    if (user.expiredRefreshTokens.includes(req.cookies.refreshToken)) {
        return done(null, false)
    } else {
        return done(null, user);
    }
}))