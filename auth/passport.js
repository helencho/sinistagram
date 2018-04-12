const passport = require('passport')
const pgp = require('pg-promise')({})
require('dotenv').config();
const db = pgp(process.env.DATABASE_URL);

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.username)
    })
    passport.deserializeUser((username, done) => {
        db
            .one('SELECT * FROM users WHERE username=$1', [username])
            .then((user) => {
                done(null, user)
            })
            .catch((err) => {
                done(err, null)
            })
    })
}
