const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../Models/User');
const argon2 = require('argon2');

const extractJwtFromCookie = (req) => {
    if (req && req.cookies) {
        let token = req.cookies.token;

        // TODO Verify if the JWT is still valid.

        return token;
    } else {
        return false;
    }
}

let opts = {};
opts.jwtFromRequest = extractJwtFromCookie;
opts.secretOrKey = process.env.TOKEN_SECRET;

passport.use(new JwtStrategy(opts, function(jwtPayload, done) {
    console.log(jwtPayload);
    
    return done(null, jwtPayload);

}))