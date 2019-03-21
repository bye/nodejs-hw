const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
import { keys } from './keys'
import { runInNewContext } from 'vm';

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
    })
)

export default passport;