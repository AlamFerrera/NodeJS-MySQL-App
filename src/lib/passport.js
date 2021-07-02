const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const {fullname} = req.body;
    const newUser = {
        username,
        password,
        fullname
    }
    newUser.password = await helpers.encryptPassword(password);
   // const result = await db.query('INSERT INTO users SET ?', [newUser]);
    return done(null, newUser);
    
}));
/*
passport.serializeUser((user,done) => {
    console.log(user.id);
    done(null,user.id);
});

passport.deserializeUser(async (id,done) => {
   const rows = await db.query('SELECT * FROM users WHERE id = ?', [id]);
   done(null,rows[0]);
});*/